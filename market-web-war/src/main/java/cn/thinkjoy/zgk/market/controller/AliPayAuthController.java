package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.common.exception.BizException;
import cn.thinkjoy.zgk.market.alipay.*;
import cn.thinkjoy.zgk.market.common.ERRORCODE;
import cn.thinkjoy.zgk.market.common.TimeUtil;
import cn.thinkjoy.zgk.market.domain.Province;
import cn.thinkjoy.zgk.market.domain.UserAccount;
import cn.thinkjoy.zgk.market.service.IProvinceService;
import cn.thinkjoy.zgk.market.service.IUserAccountExService;
import com.alibaba.fastjson.JSON;
import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.request.AlipayEcoCmsCdataUploadRequest;
import com.alipay.api.request.AlipayOpenPublicGisQueryRequest;
import com.alipay.api.request.AlipaySystemOauthTokenRequest;
import com.alipay.api.request.AlipayUserUserinfoShareRequest;
import com.alipay.api.response.AlipayEcoCmsCdataUploadResponse;
import com.alipay.api.response.AlipayOpenPublicGisQueryResponse;
import com.alipay.api.response.AlipaySystemOauthTokenResponse;
import com.alipay.api.response.AlipayUserUserinfoShareResponse;
import org.apache.commons.lang3.StringUtils;
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
public class AliPayAuthController
{
    private String userInfoUrl = "https://openapi.alipay.com/gateway.do";

    private AlipayClient alipayClient =new DefaultAlipayClient(userInfoUrl,
                                        AlipayConfig.APP_ID,AlipayConfig.APP_PRIVATE_KEY,"json",
                                        "GBK",AlipayConfig.ALIPAY_PUBLIC_KEY);


    private String baseAuthUrl = "https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?";

    @Autowired
    private IUserAccountExService userAccountExService;
    @Autowired
    private IProvinceService provinceService;

    @RequestMapping(value = "/authPage")
    public String authPage() throws Exception
    {
        String redirectUrl= "http%3A%2F%2Fzgkser.zhigaokao.cn%2FalipayAuth%2FgetUserId";
        StringBuffer baseAuthURL = new StringBuffer(baseAuthUrl);
        baseAuthURL.append("app_id=").append(AlipayConfig.APP_ID);
        baseAuthURL.append("&scope=").append("auth_base");
        baseAuthURL.append("&redirect_uri=").append(redirectUrl);
        return "redirect:"+baseAuthURL;
    }

    @RequestMapping(value = "/getAuthToken", produces = "application/json; charset=utf-8")
    public String getAuthToken(@RequestParam(value="auth_code",required=false) String authCode)
    {
        String accessToken = getAccessToken(getOauthTokenResponse(authCode));
        if(null == accessToken)
        {
            throw new BizException("", "access token不能为空!");
        }
        String result = getResult(accessToken);
        String[] resultArray = result.split("@@");
        String userId = resultArray[0];
        String areaId = null;
        if(resultArray.length>1)
        {
            areaId = resultArray[1];
        }
        return getRedirectUrl(userId, areaId);
    }

    @RequestMapping(value = "/getUserId", produces = "application/json; charset=utf-8")
    public String getUserId(@RequestParam(value="auth_code",required=false) String authCode)
    {
        String aliUserId = getUserId(getOauthTokenResponse(authCode));
        Map<String, Object> userInfoMap = userAccountExService.findUserInfoByAlipayId(aliUserId);
        if(null == userInfoMap || userInfoMap.isEmpty())
        {
            String redirectUrl= "http%3A%2F%2Fzgkser.zhigaokao.cn%2FalipayAuth%2FgetAuthToken";
            StringBuffer userInfoAuthURL = new StringBuffer(baseAuthUrl);
            userInfoAuthURL.append("app_id=").append(AlipayConfig.APP_ID);
            userInfoAuthURL.append("&scope=").append("auth_userinfo");
            userInfoAuthURL.append("&redirect_uri=").append(redirectUrl);
            return "redirect:"+userInfoAuthURL;
        }
        String userId = userInfoMap.get("id") + "";
        String areaId = userInfoMap.get("provinceId") + "";
        return getRedirectUrl(userId, areaId);
    }

    private String getRedirectUrl(String userId, String areaId)
    {
        return "redirect:http://alipay.test.zhigaokao.cn/welcome.html?userId="+userId+"&areaId="+areaId;
    }

    private String getResult(String accessToken)
    {
        String userId = "";
        String areaId = "";
        AlipayUserUserinfoShareRequest request = new AlipayUserUserinfoShareRequest();
        try {
            AlipayUserUserinfoShareResponse userinfoShareResponse = alipayClient.execute(request, accessToken);
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
            if(StringUtils.isNotBlank(nickName))
            {
                userAccount.setNickName(nickName);
            }
            if(StringUtils.isNotBlank(avatar))
            {
                userAccount.setAvatar(avatar);
            }
            if(StringUtils.isNotBlank(provinceName))
            {
                Province province = (Province)provinceService.findOne("name", provinceName);
                if(null != province)
                {
                    areaId = String.valueOf(province.getId());
                    userAccount.setAreaId(province.getId());
                    userAccount.setProvinceId(province.getId()+"");
                }
            }
            try{
                boolean flag = userAccountExService.insertUserAccount(userAccount, 0l, 0);
                if (!flag){
                    throw new BizException(ERRORCODE.PARAM_ERROR.getCode(), "账户注册失败");
                }
            }catch(Exception e){
                throw new BizException(ERRORCODE.PARAM_ERROR.getCode(), "账户注册失败");
            }
            userId = userAccount.getId()+"";
        } catch (AlipayApiException e) {
            e.printStackTrace();
        }
        return userId+"@@"+areaId;
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
        try {
            oauthTokenResponse = alipayClient.execute(request);
        } catch (AlipayApiException e) {
            throw new BizException(e.getErrCode(), e.getMessage());
        }
        return oauthTokenResponse;
    }

//    @RequestMapping(value = "/getUserInfo", produces = "application/json; charset=utf-8")
//    @ResponseBody
//    public String getUserInfo(@RequestParam(value="auth_code",required=false) String authCode)
//        throws Exception
//    {
//        Map<String, String> paramMap = new HashMap<>();
//        paramMap.put("app_id", AlipayConfig.APP_ID);
//        paramMap.put("method", "alipay.user.userinfo.share");
//        paramMap.put("charset", "gbk");
//        paramMap.put("sign_type", "RSA");
//        paramMap.put("timestamp", TimeUtil.getTimeStamp("yyyy-MM-dd HH:mm:ss"));
//        paramMap.put("version", "1.0");
//        paramMap.put("auth_token", getAccessToken(getOauthTokenResponse(authCode)));
//        paramMap.put("sign", AlipaySignature.rsaSign(paramMap, AlipayConfig.APP_PRIVATE_KEY, AlipayConfig.input_charset));
//        return AlipaySubmit.buildRequest("","", paramMap);
//    }

    @RequestMapping(value = "/picNotify", produces = "application/json; charset=utf-8")
    @ResponseBody
    public String picNotify()
    {
        AlipayClient alipayClient = new DefaultAlipayClient("http://openapi.stable.dl.alipaydev.com/gateway.do",
            AlipayConfig.APP_DEV_ID, AlipayConfig.APP_DEV_PRIVATE_KEY, "json", "UTF-8", AlipayConfig.ALIPAY_DEV_PUBLIC_KEY);
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
        req.setTarget_id("2088202906569241,2088202906569373,2088202906569263,2088202904822755,2088202896861602");
        req.setStart_time(TimeUtil.getTimeStamp("yyyy-MM-dd HH:mm:ss"));
        req.setExp_time("2016-11-11 11:11:11");
        req.setSyn(false);
        AliCardSceneData sceneData = new AliCardSceneData();
        sceneData.setTarget_url("https://www.baidu.com");
        sceneData.setIcon("https://www.baidu.com/img/bd_logo1.png");
        sceneData.setTitle("美国《纽约时报》8月23日发表文章称，2016年是美国总统奥巴马任期的最后一年，随着美国两名总统候选人希拉里和特朗普先后表态反对奥巴马提出的跨太平洋伙伴关系协定(TPP)，因此奥巴马政府将就推动国会批准TPP进行最后一搏。");
        sceneData.setTitle("独家视频：习近平青海考察说了这些事");
        sceneData.setSend_time(TimeUtil.getTimeStamp("yyyy-MM-dd HH:mm:ss"));
        sceneData.setContent("文章称，在奥巴马看来，无论TPP经济价值如何，它都是对抗中国崛起、维护美国国家安全的不二法宝。奥巴马寄希望TPP作为一个有力工具，能阻止中国书写未来国际贸易规则。\n" +
            "　　但文章提醒到，当美国在不断推进TPP时，中国也在同亚太地区TPP签约国，以及韩国、菲律宾、泰国等国进行《区域全面经济伙伴协定》谈判。《纽约时报》称，《区域全面经济伙伴协定》或许不如TPP成熟和全面，但美国仍无力阻止所有国家抢着同中国签订，就如同当初加入中国主导的亚洲基础设施投资银行。\n" +
            "　　文章认为，TPP作为自由贸易协议并不能阻止“中国改写全球贸易规则”。究其原因，最关键在于“美国治下的和平”时代已经不复存在。美国不仅不能向他国提供与众不同的“诱人”贸易协定，更因为相较于中国这一最大的境外投资商而言，其全球最大债务国的身份使其无法向他国提供投资。\n" +
            "　　相比美国，很多国际评测机构声称中国已是世界上最大的经济体，拥有4万亿美元的外汇储备，并着力投资“一带一路”项目，力求更好的连接中东、欧洲和其他亚洲国家市场。中国目前是拉美、非洲、中东大多数发展中国家以及澳大利亚和欧洲许多西方国家最大的境外投资方。");
        sceneData.setContent("昨天(23日)上午，习近平总书记来到青海省海东市互助土族自治县五十镇班彦村，考察易地扶贫搬迁新村建设情况。在新村建设工地，习近平冒着蒙蒙细雨，走过尚未完工的泥泞道路，来到村民吕有章的新家，察看房屋格局，了解施工进展，关心火炕取暖效果。");
        sceneData.setImg1_source_url(imgSrc);
        List<AliCardImg> imgs = new ArrayList<>();
        AliCardImg image = new AliCardImg();
        image.setSource_url(imgSrc);
        image.setThumbnail_url(imgSrc);
        image.setDesc("皮卡丘");
        imgs.add(image);
        sceneData.setImg(imgs);
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
            response = alipayClient.execute(request);
        }
        catch (AlipayApiException e)
        {
            throw new BizException(e.getErrCode(), e.getMessage());
        }
        String result = "";
        if(null != response)
        {
            result = response.getBody();
        }
        return result;
    }

    @RequestMapping(value = "/textNotify", produces = "application/json; charset=utf-8")
    @ResponseBody
    public String textNotify()
    {
        AlipayClient alipayClient = new DefaultAlipayClient("http://openapi.stable.dl.alipaydev.com/gateway.do",
            AlipayConfig.APP_DEV_ID, AlipayConfig.APP_DEV_PRIVATE_KEY, "json", "UTF-8", AlipayConfig.ALIPAY_DEV_PUBLIC_KEY);
        String uuid = UUID.randomUUID().toString();
        String imgSrc = "http://i8.qhmsg.com/t01b2a945701805d7f1.jpg";
        AlipayEcoCmsCdataUploadRequest request = new AlipayEcoCmsCdataUploadRequest();
        AliCardRequest req = new AliCardRequest();
        req.setCategory("edu");
        req.setTemplate_name("纯文字");
        req.setMerch_id(uuid);
        req.setAttribute("text_edu");
        req.setTamplate_id("1004");
        req.setT_v("1");
        req.setTarget_id("2088202906569241,2088202906569373,2088202906569263,2088202904822755,2088202896861602");
        req.setStart_time(TimeUtil.getTimeStamp("yyyy-MM-dd HH:mm:ss"));
        req.setExp_time("2016-11-11 11:11:11");
        req.setSyn(false);
        AliCardSceneData sceneData = new AliCardSceneData();
        sceneData.setTarget_url("https://www.baidu.com");
        sceneData.setIcon("https://www.baidu.com/img/bd_logo1.png");
        sceneData.setTitle("美国《纽约时报》8月23日发表文章称，2016年是美国总统奥巴马任期的最后一年，随着美国两名总统候选人希拉里和特朗普先后表态反对奥巴马提出的跨太平洋伙伴关系协定(TPP)，因此奥巴马政府将就推动国会批准TPP进行最后一搏。");
        sceneData.setTitle("独家视频：习近平青海考察说了这些事");
        sceneData.setSend_time(TimeUtil.getTimeStamp("yyyy-MM-dd HH:mm:ss"));
        sceneData.setContent("文章称，在奥巴马看来，无论TPP经济价值如何，它都是对抗中国崛起、维护美国国家安全的不二法宝。奥巴马寄希望TPP作为一个有力工具，能阻止中国书写未来国际贸易规则。\n" +
            "　　但文章提醒到，当美国在不断推进TPP时，中国也在同亚太地区TPP签约国，以及韩国、菲律宾、泰国等国进行《区域全面经济伙伴协定》谈判。《纽约时报》称，《区域全面经济伙伴协定》或许不如TPP成熟和全面，但美国仍无力阻止所有国家抢着同中国签订，就如同当初加入中国主导的亚洲基础设施投资银行。\n" +
            "　　文章认为，TPP作为自由贸易协议并不能阻止“中国改写全球贸易规则”。究其原因，最关键在于“美国治下的和平”时代已经不复存在。美国不仅不能向他国提供与众不同的“诱人”贸易协定，更因为相较于中国这一最大的境外投资商而言，其全球最大债务国的身份使其无法向他国提供投资。\n" +
            "　　相比美国，很多国际评测机构声称中国已是世界上最大的经济体，拥有4万亿美元的外汇储备，并着力投资“一带一路”项目，力求更好的连接中东、欧洲和其他亚洲国家市场。中国目前是拉美、非洲、中东大多数发展中国家以及澳大利亚和欧洲许多西方国家最大的境外投资方。");
        sceneData.setContent("昨天(23日)上午，习近平总书记来到青海省海东市互助土族自治县五十镇班彦村，考察易地扶贫搬迁新村建设情况。在新村建设工地，习近平冒着蒙蒙细雨，走过尚未完工的泥泞道路，来到村民吕有章的新家，察看房屋格局，了解施工进展，关心火炕取暖效果。");
        sceneData.setImg1_source_url(imgSrc);
        List<AliCardImg> imgs = new ArrayList<>();
        AliCardImg image = new AliCardImg();
        image.setSource_url(imgSrc);
        image.setThumbnail_url(imgSrc);
        image.setDesc("皮卡丘");
        imgs.add(image);
        sceneData.setImg(imgs);
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
            response = alipayClient.execute(request);
        }
        catch (AlipayApiException e)
        {
            throw new BizException(e.getErrCode(), e.getMessage());
        }
        String result = "";
        if(null != response)
        {
            result = response.getBody();
        }
        return result;
    }

    @RequestMapping(value = "/linkNotify", produces = "application/json; charset=utf-8")
    @ResponseBody
    public String linkNotify()
    {
        AlipayClient alipayClient = new DefaultAlipayClient("http://openapi.stable.dl.alipaydev.com/gateway.do",
            AlipayConfig.APP_DEV_ID, AlipayConfig.APP_DEV_PRIVATE_KEY, "json", "UTF-8", AlipayConfig.ALIPAY_DEV_PUBLIC_KEY);
        String uuid = UUID.randomUUID().toString();
        String imgSrc = "http://i8.qhmsg.com/t01b2a945701805d7f1.jpg";
        AlipayEcoCmsCdataUploadRequest request = new AlipayEcoCmsCdataUploadRequest();
        AliCardRequest req = new AliCardRequest();
        req.setCategory("edu");
        req.setTemplate_name("超链接");
        req.setMerch_id(uuid);
        req.setAttribute("link_edu");
        req.setTamplate_id("1005");
        req.setT_v("1");
        req.setTarget_id("2088202906569241,2088202906569373,2088202906569263,2088202904822755,2088202896861602");
        req.setStart_time(TimeUtil.getTimeStamp("yyyy-MM-dd HH:mm:ss"));
        req.setExp_time("2016-11-11 11:11:11");
        req.setSyn(false);
        AliCardSceneData sceneData = new AliCardSceneData();
        sceneData.setSender("智高考");
        sceneData.setTarget_url("https://www.baidu.com");
        sceneData.setLink_url("https://www.baidu.com");
        sceneData.setIcon("https://www.baidu.com/img/bd_logo1.png");
        sceneData.setTitle("美国《纽约时报》8月23日发表文章称，2016年是美国总统奥巴马任期的最后一年，随着美国两名总统候选人希拉里和特朗普先后表态反对奥巴马提出的跨太平洋伙伴关系协定(TPP)，因此奥巴马政府将就推动国会批准TPP进行最后一搏。");
        sceneData.setTitle("独家视频：习近平青海考察说了这些事");
        sceneData.setSend_time(TimeUtil.getTimeStamp("yyyy-MM-dd HH:mm:ss"));
        sceneData.setContent("文章称，在奥巴马看来，无论TPP经济价值如何，它都是对抗中国崛起、维护美国国家安全的不二法宝。奥巴马寄希望TPP作为一个有力工具，能阻止中国书写未来国际贸易规则。\n" +
            "　　但文章提醒到，当美国在不断推进TPP时，中国也在同亚太地区TPP签约国，以及韩国、菲律宾、泰国等国进行《区域全面经济伙伴协定》谈判。《纽约时报》称，《区域全面经济伙伴协定》或许不如TPP成熟和全面，但美国仍无力阻止所有国家抢着同中国签订，就如同当初加入中国主导的亚洲基础设施投资银行。\n" +
            "　　文章认为，TPP作为自由贸易协议并不能阻止“中国改写全球贸易规则”。究其原因，最关键在于“美国治下的和平”时代已经不复存在。美国不仅不能向他国提供与众不同的“诱人”贸易协定，更因为相较于中国这一最大的境外投资商而言，其全球最大债务国的身份使其无法向他国提供投资。\n" +
            "　　相比美国，很多国际评测机构声称中国已是世界上最大的经济体，拥有4万亿美元的外汇储备，并着力投资“一带一路”项目，力求更好的连接中东、欧洲和其他亚洲国家市场。中国目前是拉美、非洲、中东大多数发展中国家以及澳大利亚和欧洲许多西方国家最大的境外投资方。");
        sceneData.setContent("昨天(23日)上午，习近平总书记来到青海省海东市互助土族自治县五十镇班彦村，考察易地扶贫搬迁新村建设情况。在新村建设工地，习近平冒着蒙蒙细雨，走过尚未完工的泥泞道路，来到村民吕有章的新家，察看房屋格局，了解施工进展，关心火炕取暖效果。");
        sceneData.setImg1_source_url(imgSrc);
        sceneData.setImg_url(imgSrc);
        List<AliCardImg> imgs = new ArrayList<>();
        AliCardImg image = new AliCardImg();
        image.setSource_url(imgSrc);
        image.setThumbnail_url(imgSrc);
        image.setDesc("皮卡丘");
        imgs.add(image);
        sceneData.setImg(imgs);
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
            response = alipayClient.execute(request);
        }
        catch (AlipayApiException e)
        {
            throw new BizException(e.getErrCode(), e.getMessage());
        }
        String result = "";
        if(null != response)
        {
            result = response.getBody();
        }
        return result;
    }

    @RequestMapping(value = "/getGis", produces = "application/json; charset=utf-8")
    @ResponseBody
    public String gis()
    {
        AlipayOpenPublicGisQueryRequest request = new AlipayOpenPublicGisQueryRequest();
        request.setBizContent("{\"userId\":\2088402907729754\"}");
        AlipayOpenPublicGisQueryResponse response;
        try
        {
            response = alipayClient.execute(request);
        }
        catch (AlipayApiException e)
        {
            throw new BizException(e.getErrCode(), e.getMessage());
        }
        String areaInfo = "";
        if(null != response)
        {
            areaInfo = response.getBody();
        }
        System.out.println(areaInfo);
        return response.getBody();
    }
}
