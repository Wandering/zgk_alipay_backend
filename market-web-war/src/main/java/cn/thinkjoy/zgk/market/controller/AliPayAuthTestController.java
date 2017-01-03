package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.zgk.market.alipay.AlipayConfig;
import cn.thinkjoy.zgk.market.common.ZgkAlipayClient;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by liusven on 16/7/28.
 */
@Controller
@RequestMapping("/alipayAuthTest")
@Scope("prototype")
public class AliPayAuthTestController extends AliPayAuthController
{

    @RequestMapping(value = "/authPage")
    public String authPage() throws Exception
    {
        return super.authPage();
    }

    @RequestMapping(value = "/getAuthToken", produces = "application/json; charset=utf-8")
    public String getAuthToken(@RequestParam(value = "auth_code", required = false) String authCode)
    {
        return super.getAuthToken(authCode);
    }

    @RequestMapping(value = "/getUserId", produces = "application/json; charset=utf-8")
    public String getUserId(@RequestParam(value = "auth_code", required = false) String authCode)
    {

        return super.getUserId(authCode);
    }

    protected String getAuthPageUrl()
    {
        return "http%3A%2F%2Falipaybackend.test.zhigaokao.cn%2FalipayAuthTest%2FgetUserId";
    }

    protected String getUserIdUrl()
    {
        return "http%3A%2F%2Falipaybackend.test.zhigaokao.cn%2FalipayAuthTest%2FgetAuthToken";
    }

    protected ZgkAlipayClient getClient()
    {
        return new ZgkAlipayClient(userInfoUrl,
            AlipayConfig.APP_TEST_ID, AlipayConfig.APP_TEST_PRIVATE_KEY, "json",
            "UTF-8", AlipayConfig.ALIPAY_TEST_PUBLIC_KEY);
    }

    protected String getAppId()
    {
        return AlipayConfig.APP_TEST_ID;
    }

    protected String getRedirectUrl(String userId, String areaId)
    {

        String baseUrl = "redirect:http://alipay.test.zhigaokao.cn/";
        String baseUrlEnd = "?userId=" + userId + "&areaId=" + areaId;

        if (scoreAnalysisService.queryUserIsFirst(Long.valueOf(userId))==0){
            baseUrl+="is-new.html";
            baseUrl+=baseUrlEnd;
            return baseUrl;
        }else {
            baseUrl+="app.html";
            baseUrl+=baseUrlEnd;
        }

//        switch (areaId){
//            case ZJ_AREA:
//                baseUrl+="is-old-zj.html";
//                baseUrl+=baseUrlEnd;
//                break;
//            case JS_AREA:
//                baseUrl+="is-old-js.html";
//                baseUrl+=baseUrlEnd;
//                break;
//            default:
//                baseUrl+="is-old.html";
//                baseUrl+=baseUrlEnd;
//                break;
//
//        }
        return baseUrl;
    }
}
