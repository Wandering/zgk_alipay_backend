package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.common.exception.BizException;
import cn.thinkjoy.zgk.market.common.BaseCommonController;
import cn.thinkjoy.zgk.market.common.ERRORCODE;
import cn.thinkjoy.zgk.market.constant.SpringMVCConst;
import cn.thinkjoy.zgk.market.domain.Order;
import cn.thinkjoy.zgk.market.domain.OrderStatements;
import cn.thinkjoy.zgk.market.service.IOrderService;
import cn.thinkjoy.zgk.market.service.IOrderStatementsService;
import cn.thinkjoy.zgk.market.service.IUserAccountExService;
import cn.thinkjoy.zgk.market.util.RedisUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Maps;
import com.pingplusplus.model.Event;
import com.pingplusplus.model.PingppObject;
import com.pingplusplus.model.Webhooks;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.util.*;

/**
 * Created by svenlau on 2016/5/19.
 */
@Controller
@Scope(SpringMVCConst.SCOPE)
@RequestMapping("")
public class PayCallbackController extends BaseCommonController
{

    private static final Logger LOGGER = LoggerFactory.getLogger(PayCallbackController.class);

    @Autowired
    private IOrderService orderService;
    @Autowired
    private IOrderStatementsService orderStatementService;

    @Autowired
    private IUserAccountExService accountExService;
    /**
     * 支付宝支付回调
     * @param request
     * @return
     */
    @RequestMapping(value = "aLiPayCallback", method = RequestMethod.POST)
    public String aLiPayCallback(HttpServletRequest request) {
        String returnUrl = "www.zhigaokao.cn";
        BufferedReader reader = null;
        try
        {
            reader = request.getReader();
            StringBuffer buffer = new StringBuffer();
            String string;
            while ((string = reader.readLine()) != null) {
                buffer.append(string);
            }
            reader.close();
            // 解析异步通知数据
            Event event = Webhooks.eventParse(buffer.toString());
            if (null != event && "charge.succeeded".equals(event.getType())) {
                response.setStatus(200);
                PingppObject object = event.getData().getObject();
                if(null != object) {
                    Map<String, Object> paramMap  = JSON.parseObject(object.toString(), Map.class);
                    String statementNo = paramMap.get("order_no") + "";
                    String channel = paramMap.get("channel") + "";
                    OrderStatements orderStatement =(OrderStatements) orderStatementService.findOne("statement_no", statementNo);
                    String orderNo = orderStatement.getOrderNo();
                    Order order = (Order) orderService.findOne("order_no", orderNo);
                    if(order !=null && order.getStatus() == 0){
                        order.setStatus(1);
                        order.setChannel(channel);
                        orderService.update(order);
                        long now = System.currentTimeMillis();
                        Calendar c = Calendar.getInstance();
                        c.setTimeInMillis(now);
                        c.set(Calendar.HOUR_OF_DAY, 0);
                        c.set(Calendar.MINUTE, 0);
                        c.set(Calendar.SECOND, 0);
                        c.set(Calendar.MILLISECOND, 0);
                        if("1".equals(order.getProductType()))
                        {
                            c.add(Calendar.MONTH,1);
                        }else if("2".equals(order.getProductType()))
                        {
                            c.add(Calendar.YEAR,1);
                        }
                        Map<String, String> params = new HashMap<>();
                        params.put("userId", order.getUserId() + "");
                        params.put("aliActiveDate", now + "");
                        params.put("aliEndDate", c.getTimeInMillis() + "");
                        accountExService.updateAliVipStatus(params);
                    }
                    long userId = order.getUserId();
                    String urlKey = "pay_return_url_"+userId;
                    //获取回调url
                    if(RedisUtil.getInstance().exists(urlKey))
                    {
                        returnUrl = String.valueOf(RedisUtil.getInstance().get(urlKey));
                        returnUrl = URLDecoder.decode(returnUrl, "UTF-8");
                        RedisUtil.getInstance().del(urlKey);
                    }
                }
            } else if ("refund.succeeded".equals(event.getType())) {
                response.setStatus(200);
            } else {
                response.setStatus(500);
            }
        }
        catch (IOException e)
        {
            LOGGER.error("error",e);
            response.setStatus(500);
        }
        return "redirect:http://" + returnUrl;
    }

    public static void main(String[] args)
    {
        System.out.println(new Date(1483523472390l));
        System.out.println(new Date(1514995200000l));
    }
}
