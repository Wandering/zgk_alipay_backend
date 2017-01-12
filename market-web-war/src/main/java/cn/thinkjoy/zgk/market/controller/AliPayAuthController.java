package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.common.exception.BizException;
import cn.thinkjoy.zgk.market.alipay.*;
import cn.thinkjoy.zgk.market.common.*;
import cn.thinkjoy.zgk.market.domain.Province;
import cn.thinkjoy.zgk.market.domain.UserAccount;
import cn.thinkjoy.zgk.market.pojo.UserAccountPojo;
import cn.thinkjoy.zgk.market.service.IProvinceService;
import cn.thinkjoy.zgk.market.service.IScoreAnalysisService;
import cn.thinkjoy.zgk.market.service.IUserAccountExService;
import com.alibaba.fastjson.JSON;
import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.request.AlipayEcoCmsCdataUploadRequest;
import com.alipay.api.request.AlipaySystemOauthTokenRequest;
import com.alipay.api.request.AlipayUserUserinfoShareRequest;
import com.alipay.api.response.AlipayEcoCmsCdataUploadResponse;
import com.alipay.api.response.AlipaySystemOauthTokenResponse;
import com.alipay.api.response.AlipayUserUserinfoShareResponse;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Created by liusven on 16/7/28.
 */
@Controller
@RequestMapping("/alipayAuth")
@Scope("prototype")
public class AliPayAuthController extends BaseCommonController
{
    @Autowired
    protected IScoreAnalysisService scoreAnalysisService;

    protected static final Logger LOGGER = LoggerFactory.getLogger(AliPayAuthController.class);
    protected static final String ZJ_AREA = "330000";
    protected static final String JS_AREA = "320000";
    protected String userInfoUrl = "https://openapi.alipay.com/gateway.do";

    @Autowired
    private AreaMaps areaMaps;

    @Autowired
    private IUserAccountExService userAccountExService;

    @Autowired
    private IProvinceService provinceService;

    @RequestMapping(value = "/authPage")
    public String authPage()
        throws Exception
    {
        String redirectUrl = getAuthPageUrl();
        StringBuffer baseAuthURL = new StringBuffer(getBaseAuthUrl());
        baseAuthURL.append("app_id=").append(getAppId());
        baseAuthURL.append("&scope=").append("auth_base");
        baseAuthURL.append("&redirect_uri=").append(redirectUrl);
        return "redirect:" + baseAuthURL;
    }

    @RequestMapping(value = "/getAuthToken", produces = "application/json; charset=utf-8")
    public String getAuthToken(@RequestParam(value = "auth_code", required = false) String authCode)
    {
        String accessToken = getAccessToken(getOauthTokenResponse(authCode));
        if (null == accessToken)
        {
            throw new BizException("", "access token不能为空!");
        }
        String result = getResult(accessToken);
        String[] resultArray = result.split("@@");
        String userId = resultArray[0];
        String areaId = null;
        if (resultArray.length > 1)
        {
            areaId = resultArray[1];
        }
        return getRedirectUrl(userId, areaId);
    }

    @RequestMapping(value = "/getUserId", produces = "application/json; charset=utf-8")
    public String getUserId(@RequestParam(value = "auth_code", required = false) String authCode)
    {
        String aliUserId = getUserId(getOauthTokenResponse(authCode));
        Map<String, Object> userInfoMap = userAccountExService.findUserInfoByAlipayId(aliUserId);
        if (null == userInfoMap || userInfoMap.isEmpty())
        {
            String redirectUrl = getUserIdUrl();
            StringBuffer userInfoAuthURL = new StringBuffer(getBaseAuthUrl());
            userInfoAuthURL.append("app_id=").append(getAppId());
            userInfoAuthURL.append("&scope=").append("auth_userinfo");
            userInfoAuthURL.append("&redirect_uri=").append(redirectUrl);
            return "redirect:" + userInfoAuthURL;
        }
        String userId = userInfoMap.get("id") + "";
        String areaId = userInfoMap.get("provinceId") + "";
        setAccountToRedis(userId);
        return getRedirectUrl(userId, areaId);
    }

    private void setAccountToRedis(String userId)
    {
        UserAccountPojo userAccountBean = userAccountExService.findUserAccountPojoByUserId(userId);
        setUserAccountPojo(userAccountBean, userId);
    }

    protected String getRedirectUrl(String userId, String areaId)
    {

        String baseUrl = "redirect:http://alipay.zhigaokao.cn/";
        String baseUrlEnd = "?userId=" + userId + "&areaId=" + areaId + "&userKey=" + areaId == null ? "" : areaMaps.getAreaCode(Long.valueOf(areaId));

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

    private String getResult(String accessToken)
    {
        String userId = "";
        String areaId = "";
        AlipayUserUserinfoShareRequest request = new AlipayUserUserinfoShareRequest();
        try
        {
            AlipayUserUserinfoShareResponse userinfoShareResponse = getClient().execute(request, accessToken);
            String aliUserId = userinfoShareResponse.getAlipayUserId();
            String nickName = userinfoShareResponse.getNickName();
            String avatar = userinfoShareResponse.getAvatar();
            String provinceName = userinfoShareResponse.getProvince();
            UserAccount userAccount = new UserAccount();
            userAccount.setAccount(aliUserId);
            userAccount.setCreateDate(System.currentTimeMillis());
            userAccount.setLastModDate(System.currentTimeMillis());
            userAccount.setUserType(0);
            userAccount.setStatus(0);
            userAccount.setCanTargetSchool(true);
            userAccount.setUserId(0L);
            if (StringUtils.isNotBlank(nickName))
            {
                userAccount.setNickName(nickName);
            }
            if (StringUtils.isNotBlank(avatar))
            {
                userAccount.setAvatar(avatar);
            }
            if (StringUtils.isNotBlank(provinceName))
            {
                Province province = (Province)provinceService.findOne("name", provinceName);
                if (null != province)
                {
                    areaId = String.valueOf(province.getId());
                    userAccount.setAreaId(province.getId());
                    userAccount.setProvinceId(province.getId() + "");
                }
            }
            try
            {
                long tmpUserId = userAccountExService.insertUserAccount(userAccount,"ali");
                if (tmpUserId == 0)
                {
                    throw new BizException(ERRORCODE.PARAM_ERROR.getCode(), "账户注册失败");
                }
            }
            catch (Exception e)
            {
                throw new BizException(ERRORCODE.PARAM_ERROR.getCode(), "账户注册失败");
            }
            userId = userAccount.getId() + "";
            setAccountToRedis(userId);
        }
        catch (AlipayApiException e)
        {
            e.printStackTrace();
        }
        return userId + "@@" + areaId;
    }

    private String getAccessToken(AlipaySystemOauthTokenResponse oauthTokenResponse)
    {
        return oauthTokenResponse.getAccessToken();
    }

    private String getUserId(AlipaySystemOauthTokenResponse oauthTokenResponse)
    {
        return oauthTokenResponse.getUserId();
    }

    private AlipaySystemOauthTokenResponse getOauthTokenResponse(String authCode)
    {
        AlipaySystemOauthTokenResponse oauthTokenResponse;
        AlipaySystemOauthTokenRequest request = new AlipaySystemOauthTokenRequest();
        request.setCode(authCode);
        request.setGrantType("authorization_code");
        try
        {
            oauthTokenResponse = getClient().execute(request);
        }
        catch (AlipayApiException e)
        {
            //throw new BizException(e.getErrCode(), e.getMessage());
            LOGGER.error("first alipay auth authCode error : authCode = "+authCode);
            try {
                LOGGER.info("alipay auth again : authCode = "+authCode);
                oauthTokenResponse = getClient().execute(request);
            } catch (AlipayApiException e1) {
                LOGGER.error("second alipay auth authCode error : authCode = "+authCode);
                oauthTokenResponse = new AlipaySystemOauthTokenResponse();
            }

        }
        return oauthTokenResponse;
    }

    protected String getAuthPageUrl()
    {
        return  "http%3A%2F%2Falipaybackend.zhigaokao.cn%2FalipayAuth%2FgetUserId";
    }

    protected String getUserIdUrl()
    {
        return "http%3A%2F%2Falipaybackend.zhigaokao.cn%2FalipayAuth%2FgetAuthToken";
    }

    protected ZgkAlipayClient getClient()
    {
       return new ZgkAlipayClient(userInfoUrl,
            AlipayConfig.APP_ID, AlipayConfig.APP_PRIVATE_KEY, "json",
            "UTF-8", AlipayConfig.ALIPAY_PUBLIC_KEY);
    }

    protected String getAppId()
    {
        return AlipayConfig.APP_ID;
    }

    protected String getBaseAuthUrl()
    {
        return  "https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?";
    }

    @RequestMapping(value = "/picNotify", produces = "application/json; charset=utf-8")
    @ResponseBody
    public String picNotify()
    {
        String uuid = UUID.randomUUID().toString();
        String imgSrc = "http://i8.qhmsg.com/t01b2a945701805d7f1.jpg";
        AlipayEcoCmsCdataUploadRequest request = new AlipayEcoCmsCdataUploadRequest();
        AliCardRequest req = new AliCardRequest();
        req.setCategory("edu");
        req.setTemplate_name("图文通知");
        req.setMerch_id(uuid);
        req.setAttribute("text_img_edu");
        req.setTamplate_id("1003");
        req.setT_v("1");
        req.setTarget_id("");
        req.setStart_time(TimeUtil.getTimeStamp("yyyy-MM-dd HH:mm:ss"));
        req.setExp_time(TimeUtil.getEndTimeStamp("yyyy-MM-dd HH:mm:ss"));
        req.setSyn(false);
        AliCardSceneData sceneData = new AliCardSceneData();
        sceneData.setSender("智高考");
        sceneData.setIcon("https://t.alipayobjects.com/images/publichome/T1xyFtXalbXXaCwpjX.png");
        sceneData.setSend_time(TimeUtil.getTimeStamp("yyyy-MM-dd HH:mm:ss"));
        sceneData.setContent(
            "图片消息");
        sceneData.setImg1_source_url(imgSrc);
        sceneData.setTarget_url("https://www.baidu.com");
        req.setScene_data(sceneData);
        List<AliCardTemplate> card = new ArrayList<>();
        card.add(new AliCardTemplate("1003"));
        AliCardOpData opData = new AliCardOpData();
        opData.setCard(card);
        req.setOp_data(opData);
        request.setBizContent(JSON.toJSONString(req));
        AlipayEcoCmsCdataUploadResponse response;
        try
        {
//            response = alipayClientDev.execute(request);
            response = getClient().execute(request);
        }
        catch (AlipayApiException e)
        {
            throw new BizException(e.getErrCode(), e.getMessage());
        }
        String result = "";
        if (null != response)
        {
            result = response.getBody();
        }
        return result;
    }

    @RequestMapping(value = "/textNotify", produces = "application/json; charset=utf-8")
    @ResponseBody
    public String textNotify()
    {
        String uuid = UUID.randomUUID().toString();
        AlipayEcoCmsCdataUploadRequest request = new AlipayEcoCmsCdataUploadRequest();
        AliCardRequest req = new AliCardRequest();
        req.setCategory("edu");
        req.setTemplate_name("纯文字");
        req.setMerch_id(uuid);
        req.setAttribute("text_edu");
        req.setTamplate_id("1004");
        req.setT_v("1");
        req.setTarget_id("");
        req.setStart_time(TimeUtil.getTimeStamp("yyyy-MM-dd HH:mm:ss"));
        req.setExp_time(TimeUtil.getEndTimeStamp("yyyy-MM-dd HH:mm:ss"));
        req.setSyn(false);
        AliCardSceneData sceneData = new AliCardSceneData();
        sceneData.setIcon("https://t.alipayobjects.com/images/publichome/T1xyFtXalbXXaCwpjX.png");
        sceneData.setSender("智高考");
        sceneData.setSend_time(TimeUtil.getTimeStamp("yyyy-MM-dd HH:mm:ss"));
        sceneData.setContent(
            "昨天(23日)上午，习近平总书记来到青海省海东市互助土族自治县五十镇班彦村，考察易地扶贫搬迁新村建设情况。在新村建设工地，习近平冒着蒙蒙细雨，走过尚未完工的泥泞道路，来到村民吕有章的新家，察看房屋格局，了解施工进展，关心火炕取暖效果。");
        sceneData.setTarget_url("https://www.baidu.com");
        req.setScene_data(sceneData);
        List<AliCardTemplate> card = new ArrayList<>();
        card.add(new AliCardTemplate("1004"));
        AliCardOpData opData = new AliCardOpData();
        opData.setCard(card);
        req.setOp_data(opData);
        request.setBizContent(JSON.toJSONString(req));
        AlipayEcoCmsCdataUploadResponse response;
        try
        {
//            response = alipayClientDev.execute(request);
            response = getClient().execute(request);
        }
        catch (AlipayApiException e)
        {
            throw new BizException(e.getErrCode(), e.getMessage());
        }
        String result = "";
        if (null != response)
        {
            result = response.getBody();
        }
        return result;
    }

    @RequestMapping(value = "/linkNotify", produces = "application/json; charset=utf-8")
    @ResponseBody
    public String linkNotify()
    {
        String uuid = UUID.randomUUID().toString();
        AlipayEcoCmsCdataUploadRequest request = new AlipayEcoCmsCdataUploadRequest();
        AliCardRequest req = new AliCardRequest();
        req.setCategory("edu");
        req.setTemplate_name("超链接");
        req.setMerch_id(uuid);
        req.setAttribute("link_edu");
        req.setTamplate_id("1005");
        req.setT_v("1");
        req.setTarget_id("");
        req.setStart_time(TimeUtil.getTimeStamp("yyyy-MM-dd HH:mm:ss"));
        req.setExp_time(TimeUtil.getEndTimeStamp("yyyy-MM-dd HH:mm:ss"));
        req.setSyn(false);
        AliCardSceneData sceneData = new AliCardSceneData();
        sceneData.setSender("智高考");
        sceneData.setIcon("https://t.alipayobjects.com/images/publichome/T1xyFtXalbXXaCwpjX.png");
        sceneData.setSend_time(TimeUtil.getTimeStamp("yyyy-MM-dd HH:mm:ss"));
        sceneData.setSource("新浪网");
        sceneData.setContent(
            "链接消息");
        sceneData.setLink_img_url("https://t.alipayobjects.com/images/publichome/T1xyFtXalbXXaCwpjX.png");
        sceneData.setTarget_url("https://www.baidu.com");
        req.setScene_data(sceneData);
        List<AliCardTemplate> card = new ArrayList<>();
        card.add(new AliCardTemplate("1005"));
        AliCardOpData opData = new AliCardOpData();
        opData.setCard(card);
        req.setOp_data(opData);
        request.setBizContent(JSON.toJSONString(req));
        AlipayEcoCmsCdataUploadResponse response;
        try
        {
//            response = alipayClientDev.execute(request);
            response = getClient().execute(request);
        }
        catch (AlipayApiException e)
        {
            throw new BizException(e.getErrCode(), e.getMessage());
        }
        String result = "";
        if (null != response)
        {
            result = response.getBody();
        }
        return result;
    }
}
