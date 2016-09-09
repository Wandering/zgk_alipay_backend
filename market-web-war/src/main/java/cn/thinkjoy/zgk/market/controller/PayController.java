package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.common.domain.SearchField;
import cn.thinkjoy.common.exception.BizException;
import cn.thinkjoy.common.restful.apigen.annotation.ApiDesc;
import cn.thinkjoy.common.utils.ObjectFactory;
import cn.thinkjoy.common.utils.SqlOrderEnum;
import cn.thinkjoy.zgk.market.common.ERRORCODE;
import cn.thinkjoy.zgk.market.common.ModelUtil;
import cn.thinkjoy.zgk.market.constant.UserRedisConst;
import cn.thinkjoy.zgk.market.domain.Order;
import cn.thinkjoy.zgk.market.domain.OrderStatements;
import cn.thinkjoy.zgk.market.domain.UserWithdrawRecord;
import cn.thinkjoy.zgk.market.edomain.ErrorCode;
import cn.thinkjoy.zgk.market.enumerate.PAYCHANNEL;
import cn.thinkjoy.zgk.market.service.IOrderService;
import cn.thinkjoy.zgk.market.service.IOrderStatementsService;
import cn.thinkjoy.zgk.market.service.IUserAccountExService;
import cn.thinkjoy.zgk.market.service.IUserWithdrawRecordService;
import cn.thinkjoy.zgk.market.service.ex.IPayExService;
import cn.thinkjoy.zgk.market.util.*;
import cn.thinkjoy.zgk.zgksystem.AgentService;
import cn.thinkjoy.zgk.zgksystem.pojo.SplitPricePojo;
import com.alibaba.dubbo.common.logger.Logger;
import com.alibaba.dubbo.common.logger.LoggerFactory;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Maps;
import com.pingplusplus.Pingpp;
import com.pingplusplus.model.Charge;
import com.pingplusplus.util.WxpubOAuth;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;


/**
 * Created by wpliu on 16/3/26.
 */
@Controller
@RequestMapping("/pay")
public class PayController {

    private Logger logger= LoggerFactory.getLogger(PayController.class);
    @Autowired
    private IOrderService orderService;

    @Autowired
    private IOrderStatementsService orderStatementService;

    @Autowired
    private AgentService agentService;

    @Autowired
    private IUserAccountExService userAccountExService;

    @Autowired
    private IPayExService payExService;

    @Autowired
    private IUserWithdrawRecordService userWithdrawRecordService;


    public static final String  CURRENCY ="cny";

    private static final String queryAccessTokenUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s";

    private static final String queryJsapiUrl = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%s&type=jsapi";

    /**
     * 获取accessToken和jsapi_ticket
     * @return
     */
    @RequestMapping(value = "/getAccessToken",method = RequestMethod.GET)
    @ResponseBody
    public Map getAccessToken() throws Exception {
        String appSecret=StaticSource.getSource("appSecret");
        String wxAppId=StaticSource.getSource("wxAppId");
        Map<String,Object> map=new HashMap<>();
        String accessToken ;
        String ticket;
        boolean isAccessTokenExist = RedisUtil.getInstance().exists("accessToken");
        boolean isTicketTokenExist = RedisUtil.getInstance().exists("ticket");
        if(isAccessTokenExist && isTicketTokenExist)
        {
            accessToken = RedisUtil.getInstance().get("accessToken").toString();
            ticket = RedisUtil.getInstance().get("ticket").toString();
            map.put("accessToken",accessToken);
            map.put("ticket", ticket);
            return map;
        }
        try {
            String queryUrl = String.format(queryAccessTokenUrl,wxAppId, appSecret);
            DefaultHttpClient client = new DefaultHttpClient();
            HttpGet httpGetToken = new HttpGet(queryUrl);
            httpGetToken.addHeader("Content-type" , "text/html;charset=utf-8");
            HttpResponse httpResponse = client.execute(httpGetToken);
            if (httpResponse.getStatusLine().getStatusCode() == 200) {
                accessToken = EntityUtils.toString(httpResponse.getEntity(), "UTF-8");
                Map<String, String> tokenMap = JSON.parseObject(accessToken, Map.class);
                map.put("accessToken",tokenMap.get("access_token"));
                RedisUtil.getInstance().set("accessToken",tokenMap.get("access_token"),
                        UserRedisConst.ACCESS_TOKEN_EXPIRE_TIME, TimeUnit.SECONDS);
                String queryJsapiUrl2 = String.format(queryJsapiUrl,tokenMap.get("access_token"));
                HttpGet httpGetJsapi = new HttpGet(queryJsapiUrl2);
                httpGetJsapi.addHeader("Content-type" , "text/html;charset=utf-8");
                HttpResponse httpResponseJsapi = client.execute(httpGetJsapi);
                if (httpResponseJsapi.getStatusLine().getStatusCode() == 200) {
                    ticket = EntityUtils.toString(httpResponseJsapi.getEntity(), "UTF-8");
                    Map<String, String> ticketMap = JSON.parseObject(ticket, Map.class);
                    map.put("ticket", ticketMap.get("ticket"));
                    RedisUtil.getInstance().set("ticket", ticketMap.get("ticket"),
                            UserRedisConst.TICKET_EXPIRE_TIME, TimeUnit.SECONDS);
                }
            }

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            logger.error("获取accessToken异常:" + e);
        }
        return map;
    }

    /**
     * 获取openId
     * @param code
     * @return
     */
    @RequestMapping(value = "/getOpenId",method = RequestMethod.GET)
    @ResponseBody
    public Map getOpenId(@RequestParam(value = "code")String code){
        String appSecret=StaticSource.getSource("appSecret");
        String wxAppId=StaticSource.getSource("wxAppId");
        Map<String,Object> map=new HashMap<>();
        String openId= null;
        try {
            openId = WxpubOAuth.getOpenId(wxAppId, appSecret, code);
            map.put("openId",openId);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            logger.error("获取openId异常:" + e);
        }
        return map;
    }

    /**
     * 支付订单
     * @return
     */
    @RequestMapping(value = "/payOrder",method = RequestMethod.POST)
    @ResponseBody
    public Charge payOrder(@RequestParam(value = "orderNo",required = true) String orderNo,
                           @RequestParam(value = "amount",required = true)String amount,
                           @RequestParam(value = "userId",required = true)long userId,
                           @RequestParam(value = "channel",required = true)String channel ,
                           @RequestParam(value = "openId",required = true)String openId,
                           HttpServletRequest request){
        Map<String,Object> resultMap=new HashMap<>();
        BigDecimal decimal=new BigDecimal(amount);
        String token = request.getParameter("token");
        //参数错误
        if("".equals(orderNo)||orderNo==null||"".equals(amount)||amount==null||userId==0){
            throw  new BizException(ERRORCODE.PARAM_ERROR.getCode(),ERRORCODE.PARAM_ERROR.getMessage());
        }
        try{
            Pingpp.apiKey=StaticSource.getSource("apiKey");
            String appId=StaticSource.getSource("appId");
            String alipayCallBack=StaticSource.getSource("alipayCallBack")+"?token="+token;
            String statemenstNo=NumberGenUtil.genStatementNo();
            OrderStatements orderstatement=new OrderStatements();
            orderstatement.setAmount(Double.valueOf(amount)*100);
            orderstatement.setCreateDate(System.currentTimeMillis());
            orderstatement.setOrderNo(orderNo);
            //0:交易进行中  1：交易成功  2：交易失败
            orderstatement.setStatus(0);
            orderstatement.setStatementNo(statemenstNo);
            orderstatement.setState("N");
            orderstatement.setChannel(channel);
            Map<String,Object> chargeParams=new HashMap<>();
            Map<String,String> app=new HashMap<>();
            app.put("id", appId);
            chargeParams.put("order_no",orderNo);
            chargeParams.put("amount",decimal.doubleValue()*100);
            chargeParams.put("app",app);
            chargeParams.put("channel",channel);
            chargeParams.put("client_ip", IPUtil.getRemortIP(request));
            chargeParams.put("subject","智高考");
            chargeParams.put("body","智高考VIP会员");
            chargeParams.put("currency",CURRENCY);
            if(channel.equals(PAYCHANNEL.WXPUB.getCode())){
                Map<String,Object> extraMap=new HashMap<>();
                extraMap.put("open_id",openId);
                chargeParams.put("extra",extraMap);
            }else  if(channel.equals(PAYCHANNEL.ALIPAYWAP.getCode())){
                Map<String,Object> extraMap=new HashMap<>();

                extraMap.put("success_url",alipayCallBack);
                chargeParams.put("extra",extraMap);
            }

            orderstatement.setPayJson(JSONObject.toJSONString(chargeParams));
            orderStatementService.insert(orderstatement);
            Charge charge=Charge.create(chargeParams);
            return charge;
        }catch (Exception e){
            logger.error("用户"+userId+":"+"支付失败,错误:"+e);
            throw new BizException(ERRORCODE.FAIL.getCode(),ERRORCODE.FAIL.getMessage());
        }

    }

    /**
     * 订单回调函数
     * @return
     */
    @RequestMapping(value = "/callBack",method = RequestMethod.POST)
    @ResponseBody
    public String callBack(HttpServletRequest request){
        String orderNo="";
        try {

            int contentLength = request.getContentLength();
            if(contentLength<0){
                logger.error("回调参数为空");
            }
            byte buffer[] = new byte[contentLength];
            for (int i = 0; i < contentLength;) {
                int readlen = request.getInputStream().read(buffer, i,
                        contentLength - i);
                if (readlen == -1) {
                    break;
                }
                i += readlen;
            }
            String requestJson=new String(buffer,"UTF-8");
            JSONObject object=   JSONObject.parseObject(requestJson);

            Map<String,Object> callBackMap= (Map) ((Map)object.get("data")).get("object");
            orderNo = callBackMap.get("order_no").toString();
            Order order = new Order();
            order.setOrderNo(orderNo);
            order.setStatus(1);
            orderService.updateByOrderNo(order);
            OrderStatements orderStatements = new OrderStatements();
            orderStatements.setOrderNo(orderNo);
            orderStatements.setCallBackJson(requestJson);
            orderStatementService.updateByOrderNo(orderStatements);
            Map<String, Object> orderMap = orderService.queryOrderByNo(orderNo);
            String userId= orderMap.get("user_id").toString();

            List<Map<String,Object>> userRelLs= userAccountExService.getUserRelListByUserId(Long.valueOf(userId));

            if(userRelLs==null ||userRelLs.size()==0 ){
                logger.error("获取用户关系链为空,用户:"+userId);
                return "fail";
            }
            List<SplitPricePojo> splitPricePojos=new ArrayList<>();

            for(Map<String,Object> map:userRelLs){
                SplitPricePojo splitPricePojo=new SplitPricePojo();
                splitPricePojo.setAccountId(Integer.valueOf(map.get("accountId").toString()));
                splitPricePojo.setAgentLevel(Integer.valueOf(map.get("agentLevel").toString()));
                splitPricePojo.setAccountPhone(map.get("account").toString());
                splitPricePojos.add(splitPricePojo);
            }
            boolean result = agentService.SplitPriceExec(splitPricePojos, Integer.valueOf(callBackMap.get("amount").toString()), orderNo);
            if(!result)
            {
                logger.error("订单"+orderNo+":分成失败.");
                throw new BizException(ERRORCODE.FAIL.getCode(),ERRORCODE.FAIL.getMessage());
            }
            return "success";
        }catch (Exception e){
            logger.error("订单"+orderNo+":回调错误"+e);
            throw new BizException(ERRORCODE.FAIL.getCode(),ERRORCODE.FAIL.getMessage());
        }

    }

    /**
     * 获取用户交易流水
     * @param pageNo
     * @param pageSize
     * @return
     */
    @RequestMapping(value = "getTradeInfo",method = RequestMethod.GET)
    @ResponseBody
    public List<Map<String,Object>> getPayList(@RequestParam("userId")long userId,
                                               @RequestParam("pageNo")int pageNo,
                                               @RequestParam("pageSize")int pageSize){

        List<Map<String,Object>> resultMap=new ArrayList<>();
//        resultMap=orderStatementService.queryPage();
        return  resultMap;
    }



    /**
     * 退款函数
     * @return
     */
    @RequestMapping(value = "/refunds",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> refunds(@RequestParam("orderNo") String orderNo,
                                      @RequestParam("amount")String amount,
                                      @RequestParam("userId")long userId,
                                      @RequestParam("channel")String channel ){

        //TO DO
        return  null;
    }


    @ResponseBody
    @ApiDesc(value = "用户申请提现",owner = "杨国荣")
    @RequestMapping(value = "/applyWithdraw",method = RequestMethod.POST)
    public Object applyWithdraw(@RequestParam("userName") String userName,
                                            @RequestParam("cardNo") String cardNo,
                                            @RequestParam("userId") long userId,
                                            @RequestParam("bankName") String bankName,
                                            @RequestParam("money") double money){

        double balance = payExService.getWalletBalance(userId);

        if(money > balance || money < 0){
            ModelUtil.throwException(ErrorCode.ERROR_PARAM);
        }

        UserWithdrawRecord record = new UserWithdrawRecord();
        ModelUtil.initBuild(record);
        record.setMoney(money);
        record.setBankName(bankName);
        record.setCardNo(cardNo);
        record.setUserName(userName);
        record.setUserId(userId);
        userWithdrawRecordService.insert(record);

        return ObjectFactory.getSingle();
    }


    @ResponseBody
    @ApiDesc(value = "提现记录",owner = "杨国荣")
    @RequestMapping(value = "/queryWithdrawRecords",method = RequestMethod.GET)
    public List<UserWithdrawRecord> queryWithdrawRecords(@RequestParam("userId") long userId,
                                                   @RequestParam("pageNo")int pageNo,
                                                   @RequestParam("pageSize")int pageSize){

        Map<String, Object> condition = new HashMap<>();
        condition.put("groupOp", "and");
        condition.put("userId", new SearchField("userId", "=", userId));

        List<UserWithdrawRecord> records = userWithdrawRecordService.queryPage(
                condition,
                (pageNo-1)*pageSize,
                pageSize,
                "createDate",
                SqlOrderEnum.DESC);

        return records;
    }


    @ResponseBody
    @ApiDesc(value = "获取钱包剩余金额",owner = "杨国荣")
    @RequestMapping(value = "/getWalletBalance",method = RequestMethod.GET)
    public Map<String,Object> getWalletBalance(@RequestParam("userId") long userId){
        Map<String,Object> returnMap = Maps.newHashMap();
        returnMap.put("money",payExService.getWalletBalance(userId));
        return returnMap;
    }

    @ResponseBody
    @ApiDesc(value = "根据用户ID查询用户收益详情",owner = "杨国荣")
    @RequestMapping(value = "queryUserIncomeDetailByUserId",method = RequestMethod.GET)
    public List<Map<String,Object>> queryUserIncomeDetailByUserId(@RequestParam("userId") long userId,
                                                @RequestParam("pageNo")int pageNo,
                                                @RequestParam("pageSize")int pageSize) {

        List<Map<String, Object>> maps = payExService.queryUserIncomeDetailByUserId(
                userId,
                pageNo,
                pageSize);

        return maps;
    }

}