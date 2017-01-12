package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.cloudstack.dynconfig.DynConfigClientFactory;
import cn.thinkjoy.common.exception.BizException;
import cn.thinkjoy.zgk.market.common.BaseCommonController;
import cn.thinkjoy.zgk.market.common.ERRORCODE;
import cn.thinkjoy.zgk.market.common.TimeUtil;
import cn.thinkjoy.zgk.market.constant.SpringMVCConst;
import cn.thinkjoy.zgk.market.domain.Order;
import cn.thinkjoy.zgk.market.domain.OrderStatements;
import cn.thinkjoy.zgk.market.pojo.UserAccountPojo;
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
     * 支付宝支付成功回调
     * @param request
     * @return
     */
    @RequestMapping(value = "aLiPayCallback", method = { RequestMethod.GET, RequestMethod.POST })
    public String aLiPayCallback(HttpServletRequest request)
    {
        String returnUrl = "http://alipaybackend.zhigaokao.cn/alipayAuth/authPage";
        try
        {
            returnUrl = DynConfigClientFactory.getClient().getConfig("common", "aLiPayCallbackUrl");
        }
        catch (Exception e)
        {
            LOGGER.error("=================Use default returnUrl=================");
        }
        Map<String, String> paramMap = Maps.newHashMap();
        String prop;
        Enumeration<String> names = request.getParameterNames();
        while (names.hasMoreElements()) {
            prop = names.nextElement();
            paramMap.put(prop, request.getParameter(prop));
        }
        String userId = "";
        try {
            request.setCharacterEncoding("UTF-8");
            if(!paramMap.isEmpty()) {
                String statementNo = paramMap.get("out_trade_no");
                OrderStatements orderStatement =(OrderStatements) orderStatementService.findOne("statement_no", statementNo);
                String orderNo = orderStatement.getOrderNo();
                Order order = (Order) orderService.findOne("order_no", orderNo);
                if(order != null){
                    order.setStatus(1);
                    order.setChannel("alipay_wap");
                    orderService.update(order);
                    userId = order.getUserId() + "";
                    long now = System.currentTimeMillis();
                    Calendar c = TimeUtil.getEndDateByType(order.getProductType(), now);
                    Map<String, String> params = new HashMap<>();
                    params.put("userId", order.getUserId() + "");
                    params.put("aliActiveDate", now + "");
                    params.put("aliEndDate", c.getTimeInMillis() + "");
                    accountExService.updateAliVipStatus(params);
                    LOGGER.error("=================Update Vip Success!!!=================");
                }
            }
        } catch (Exception e) {
            LOGGER.error("=================Update Vip fail!!! UserId="+ userId +"=================");
            LOGGER.error("Update Vip fail reason:" + e);
        }
        return "redirect:"+ returnUrl;
    }
}
