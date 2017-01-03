package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.common.exception.BizException;
import cn.thinkjoy.zgk.market.common.BaseCommonController;
import cn.thinkjoy.zgk.market.common.ERRORCODE;
import cn.thinkjoy.zgk.market.constant.SpringMVCConst;
import cn.thinkjoy.zgk.market.domain.Order;
import cn.thinkjoy.zgk.market.domain.OrderStatements;
import cn.thinkjoy.zgk.market.service.IOrderService;
import cn.thinkjoy.zgk.market.service.IOrderStatementsService;
import cn.thinkjoy.zgk.market.util.RedisUtil;
import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Maps;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.util.Enumeration;
import java.util.Map;

/**
 * Created by svenlau on 2016/5/19.
 */
@Controller
@Scope(SpringMVCConst.SCOPE)
@RequestMapping("")
public class PayCallbackController extends BaseCommonController
{

    private static final Logger LOGGER= LoggerFactory.getLogger(PayCallbackController.class);

    @Autowired
    private IOrderService orderService;
    @Autowired
    private IOrderStatementsService orderStatementService;
    /**
     * 支付宝支付回调
     * @param request
     * @return
     */
    @RequestMapping(value = "aLiPayCallback", method = RequestMethod.GET)
    public String aLiPayCallback(HttpServletRequest request) {
        String returnUrl = "www.zhigaokao.cn";
        Map<String, String> paramMap = Maps.newHashMap();
        String prop;
        Enumeration<String> names = request.getParameterNames();
        while (names.hasMoreElements()) {
            prop = names.nextElement();
            paramMap.put(prop, request.getParameter(prop));
        }
        try {
            request.setCharacterEncoding("UTF-8");
            if(!paramMap.isEmpty()) {
                String statementNo = paramMap.get("out_trade_no");
                OrderStatements orderStatement =(OrderStatements) orderStatementService.findOne("statement_no", statementNo);
                String orderNo = orderStatement.getOrderNo();
                Order order = (Order) orderService.findOne("order_no", orderNo);
                if(order !=null && order.getStatus()==0){
                    order.setStatus(1);
                    order.setChannel("alipay_pc_direct");
                    orderService.update(order);
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
        } catch (Exception e) {
            LOGGER.error("error",e);
        }
        return "redirect:http://" + returnUrl;
    }
}