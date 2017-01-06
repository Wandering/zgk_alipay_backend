package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.cloudstack.context.CloudContextFactory;
import cn.thinkjoy.cloudstack.dynconfig.DynConfigClientFactory;
import cn.thinkjoy.common.exception.BizException;
import cn.thinkjoy.sms.api.SMSService;
import cn.thinkjoy.zgk.market.common.BaseCommonController;
import cn.thinkjoy.zgk.market.common.ERRORCODE;
import cn.thinkjoy.zgk.market.common.TimeUtil;
import cn.thinkjoy.zgk.market.constant.SpringMVCConst;
import cn.thinkjoy.zgk.market.domain.Order;
import cn.thinkjoy.zgk.market.domain.OrderStatements;
import cn.thinkjoy.zgk.market.domain.OrdersQuery;
import cn.thinkjoy.zgk.market.domain.Product;
import cn.thinkjoy.zgk.market.edomain.CardHandleStateEnum;
import cn.thinkjoy.zgk.market.edomain.PayEnum;
import cn.thinkjoy.zgk.market.pojo.UserAccountPojo;
import cn.thinkjoy.zgk.market.service.IOrderService;
import cn.thinkjoy.zgk.market.service.IOrderStatementsService;
import cn.thinkjoy.zgk.market.service.IProductService;
import cn.thinkjoy.zgk.market.service.IUserAccountExService;
import cn.thinkjoy.zgk.market.util.IPUtil;
import cn.thinkjoy.zgk.market.util.NumberGenUtil;
import cn.thinkjoy.zgk.market.util.RedisUtil;
import cn.thinkjoy.zgk.zgksystem.DeparmentApiService;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.pingplusplus.Pingpp;
import com.pingplusplus.model.Charge;
import org.apache.commons.collections.map.HashedMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import javax.smartcardio.Card;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * 智高考支付
 * Created by svenlau on 2016/5/11.
 */
@Controller
@Scope(SpringMVCConst.SCOPE)
@RequestMapping(value = "/orders")
public class OrdersController extends BaseCommonController
{
    private static final Logger LOGGER = LoggerFactory.getLogger(OrdersController.class);

    @Autowired
    private IOrderService orderService;

    @Autowired
    private IOrderStatementsService orderStatementService;
    @Autowired
    private IUserAccountExService userAccountExService;

    @Autowired
    private IProductService productService;

    //订单过期时间间隔2小时
    private final long expireDuration = 2 * 60 * 60 * 1000;
    /**
     * 下订单
     *
     * @return
     */
    @RequestMapping(value = "createOrders")
    @ResponseBody
    public Map<String, String> createOrder(OrdersQuery ordersQuery) throws Exception
    {
        if (ordersQuery == null) {
            LOGGER.error("====pay /orders/createOrders PARAM_ERROR ");
            throw new BizException(ERRORCODE.PARAM_ERROR.getCode(), ERRORCODE.PARAM_ERROR.getMessage());
        }
        UserAccountPojo userAccountPojo = getUserAccountPojo(ordersQuery.getUserId());
        if (userAccountPojo == null) {
            throw new BizException(ERRORCODE.NO_LOGIN.getCode(), ERRORCODE.NO_LOGIN.getMessage());
        }
        Long userId = userAccountPojo.getId();
        //返回的地址
        String returnUrl = ordersQuery.getReturnUrl();
        //redis缓存返回url
        RedisUtil.getInstance().set("pay_return_url_" + userId, returnUrl, 24l, TimeUnit.HOURS);
        //生成订单序号
        String orderNo = String.valueOf(System.currentTimeMillis()) + userId;
        //获取产品(状元及第/金榜题名)
        String productId = ordersQuery.getProductId();
        Product product = (Product)productService.fetch(productId);
        if(null == product)
        {
            throw new BizException("1122000", "productId错误！");
        }
        //获取商品信息
        Order order = getOrder(userId, product);
        Map<String, String> resultMap = new HashMap<>();
        try {
            resultMap.put("orderNo", order.getOrderNo());
            //保存订单信息
            orderService.insert(order);
            LOGGER.info("create orders :" + orderNo);
            return resultMap;
        } catch (Exception e) {
            LOGGER.error("====pay /orders/createOrder catch: " + e.getMessage());
            throw new BizException(ERRORCODE.FAIL.getCode(), ERRORCODE.FAIL.getMessage());
        }
    }

    /**
     * 支付宝支付
     *
     * @return
     */
    @RequestMapping(value = "aliOrderPay")
    @ResponseBody
    public Charge aliOrder(@RequestParam(value = "orderNo", required = true) String orderNo,
                           @RequestParam(value = "userId", required = true) String userId,
                           @RequestParam(value = "channel", required = false) String channel){
        String payChannel = "alipay_wap";
        if(org.apache.commons.lang3.StringUtils.isNotEmpty(channel))
        {
            payChannel = channel;
        }
        UserAccountPojo userAccountPojo = getUserAccountPojo(userId);
        if (userAccountPojo == null) {
            throw new BizException(ERRORCODE.NO_LOGIN.getCode(), ERRORCODE.NO_LOGIN.getMessage());
        }
        Order order = getOrder(orderNo);
        String price = new BigDecimal(order.getProductPrice()).
                multiply(new BigDecimal(100)).setScale(0 , BigDecimal.ROUND_HALF_EVEN).toString();
        Map<String,String> paramMap = new HashMap<>();
        paramMap.put("channel", payChannel);
        paramMap.put("orderNo", orderNo);
        paramMap.put("amount", price);
        paramMap.put("productType", order.getProductType());
        Charge charge;
        try {
            charge = getCharge(paramMap);
        } catch (Exception e) {
            LOGGER.info(e.getMessage());
            throw new BizException(ERRORCODE.FAIL.getCode(), e.getMessage());
        }
        return charge;
    }

    private Order getOrder(String orderNo) {
        Order order = (Order) orderService.findOne("order_no", orderNo);
        if (null == order) {
            throw new BizException("0000010", "订单号无效!");
        }
        return order;
    }

    private Order getOrder(Long userId, Product product) {
        String orderNo= NumberGenUtil.genOrderNo();
        Order order=new Order();
        //来源:0微信,1web
        order.setChannle(1);
        order.setCreateDate(System.currentTimeMillis());
        order.setOrderNo(orderNo);
        order.setUserId(userId);
        order.setStatus(0);
        order.setProductType(product.getType()+ "");
        BigDecimal salePrice = new BigDecimal(product.getPrice());
        order.setUnitPrice(salePrice.toString());
        order.setGoodsCount(1);
        order.setProductPrice(salePrice.toString());
        return order;
    }

    private Charge getCharge(Map<String, String> paramMap) throws Exception
    {
        Pingpp.apiKey = DynConfigClientFactory.getClient().getConfig("common", "apiKey");
        String appid = DynConfigClientFactory.getClient().getConfig("common", "appId");
        String aliReturnUrl = DynConfigClientFactory.getClient().getConfig("common", "aliReturnUrl");
        Map<String, Object> chargeParams = new HashMap<>();
        String channel = paramMap.get("channel");
        String productType = paramMap.get("productType");
        Product product = (Product)productService.findOne("type", productType);
        if(null == product)
        {
            throw new BizException("0000007", "无效的产品类型!");
        }
        Map<String, String> app = new HashMap<>();
        app.put("id", appid);
        String statemenstNo = NumberGenUtil.genOrderNo();
        chargeParams.put("order_no", statemenstNo);
        chargeParams.put("amount", paramMap.get("amount"));
        chargeParams.put("app", app);
        chargeParams.put("channel", channel);
        chargeParams.put("client_ip", IPUtil.getRemortIP(request));
        chargeParams.put("subject", product.getName());
        chargeParams.put("body", product.getIntro());
        chargeParams.put("currency", "cny");
        if ("alipay_pc_direct".equals(channel)) {
            Map<String, Object> extraMap = new HashMap<>();
            extraMap.put("success_url", aliReturnUrl);
            chargeParams.put("extra", extraMap);
        }else if("alipay_wap".equals(channel))
        {
            Map<String, String> extra = new HashMap<String, String>();
            extra.put("success_url", aliReturnUrl);
            extra.put("cancel_url", "");
            chargeParams.put("extra", extra);
        }
        createOrderStatement(paramMap, chargeParams, statemenstNo);
        return Charge.create(chargeParams);
    }

    /**
     * 创建交易流水
     * @param paramMap
     * @param chargeParams
     */
    private void createOrderStatement(Map<String, String> paramMap, Map<String, Object> chargeParams, String statemenstNo ) {
        OrderStatements orderstatement=new OrderStatements();
        orderstatement.setAmount(Double.parseDouble(paramMap.get("amount")));
        orderstatement.setCreateDate(System.currentTimeMillis());
        orderstatement.setOrderNo(paramMap.get("orderNo"));
        //0:交易进行中  1：交易成功  2：交易失败
        orderstatement.setStatus(0);
        orderstatement.setStatementNo(statemenstNo);
        orderstatement.setState("N");
        orderstatement.setPayJson(JSONObject.toJSONString(chargeParams));
        orderStatementService.insert(orderstatement);
    }

    /**
     * 获取订单详情
     * @return
     */
    @ResponseBody
    @RequestMapping(value="getOrderInfo")
    public Map<String, Object> getOrderDetail(@RequestParam(value = "orderNo", required = true)String orderNo,
                                              @RequestParam(value = "userId", required = true)String userId)
    {
        Map<String, String> paramMap = new HashMap<>();
        paramMap.put("userId", userId);
        paramMap.put("orderNo", orderNo + "");
        Map<String, Object> orderDetail = userAccountExService.getOrderDetail(paramMap);
        if (null == orderDetail) {
            throw new BizException("0000010", "订单号或userId无效!");
        }
        return orderDetail;
    }

    /**
     * 获取订单详情
     * @return
     */
    @ResponseBody
    @RequestMapping(value="getVipInfo")
    public Map<String, Object> getVipInfo(@RequestParam(value = "userId", required = true)String userId)
    {
        Map<String, String> paramMap = new HashMap<>();
        paramMap.put("userId", userId);
        Map<String, Object> vipInfo = userAccountExService.getVipInfo(paramMap);
        Map<String, Object> map = new HashMap<>();
        int vipstatus = 0;
        String startDate = "";
        String endDate = "";
        if (null == vipInfo) {
            vipstatus = 0;
        }else
        {
            long start = Long.parseLong(vipInfo.get("aliActiveDate") + "");
            long end = Long.parseLong(vipInfo.get("aliEndDate") + "");
            end = end - 1000;
            long now = System.currentTimeMillis();
            if(now >= start && now <= end)
            {
                vipstatus = 1;
            }
            if(now > end)
            {
                vipstatus = 2;
            }
            startDate = TimeUtil.getTimeStamp("yyyy-MM-dd HH:mm:ss", start);
            endDate = TimeUtil.getTimeStamp("yyyy-MM-dd HH:mm:ss", end);
            map.put("vipDateRange", startDate + "@@" + endDate);
        }
        map.put("vipstatus", vipstatus);
        return map;
    }
}
