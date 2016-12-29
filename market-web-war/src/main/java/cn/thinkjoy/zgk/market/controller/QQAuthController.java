package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.common.restful.apigen.annotation.ApiDesc;
import cn.thinkjoy.zgk.market.common.ERRORCODE;
import cn.thinkjoy.zgk.market.common.ModelUtil;
import cn.thinkjoy.zgk.market.domain.UserAccount;
import cn.thinkjoy.zgk.market.edomain.ErrorCode;
import cn.thinkjoy.zgk.market.service.IUserAccountExService;
import com.qq.connect.QQConnectException;
import com.qq.connect.api.OpenID;
import com.qq.connect.api.qzone.UserInfo;
import com.qq.connect.javabeans.AccessToken;
import com.qq.connect.javabeans.qzone.UserInfoBean;
import com.qq.connect.oauth.Oauth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;


/**
 * Created by yangguorong on 16/9/19.
 */
@Controller
@RequestMapping("/qqAuth")
public class QQAuthController {

    private static final Logger LOGGER = LoggerFactory.getLogger(QQAuthController.class);

    @Autowired
    private IUserAccountExService userAccountExService;

    @RequestMapping(value = "/authPage",method = RequestMethod.GET)
    @ApiDesc(value = "将请求转发至qq授权页面",owner = "杨国荣")
    public void authPage(HttpServletRequest request, HttpServletResponse response){
        try{
            response.sendRedirect(new Oauth().getAuthorizeURL(request));
        }catch (QQConnectException e){
            LOGGER.error("qq connect error : ",e);
        } catch (IOException e) {
            LOGGER.error("qq connect IO error : ",e);
        }
    }

    @RequestMapping(value = "/getAuthToken",method = RequestMethod.GET)
    @ApiDesc(value = "鉴权",owner = "杨国荣")
    public String getAuthToken(HttpServletRequest request) {

        try {
            // 获取accessToken
            AccessToken tokenObj = (new Oauth()).getAccessTokenByRequest(request);
            if (tokenObj == null ||
                    tokenObj.getAccessToken() == null ||
                    tokenObj.getAccessToken().equals("")) {

                LOGGER.error("get the response parameters error ");
                ModelUtil.throwException(ERRORCODE.AUTHENTICATION_FAIL);
            }

            String accessToken = tokenObj.getAccessToken();

            // 获取openId
            OpenID openIDObj = new OpenID(accessToken);
            String openId = openIDObj.getUserOpenID();

            // 根据openId检测用户是否已经完善信息
            Map<String,Object> resultMap = userAccountExService.checkUserHasInfo(openId);
            if(resultMap != null && openId.equals(resultMap.get("account").toString())){
                return getRedirectUrl(
                        0,
                        openId,
                        Long.valueOf(resultMap.get("userId").toString()));
            }else if(resultMap != null && !openId.equals(resultMap.get("account").toString())){
                return getRedirectUrl(
                        1,
                        openId,
                        Long.valueOf(resultMap.get("userId").toString()));
            }

            // 获取用户信息
            UserInfo qqUserInfo = new UserInfo(accessToken, openId);
            UserInfoBean userInfoBean = qqUserInfo.getUserInfo();
            if (userInfoBean.getRet() != 0) {
                LOGGER.error("get user info error ：" + userInfoBean.getMsg());
                ModelUtil.throwException(
                    ERRORCODE.AUTHENTICATION_FAIL
                );
            }

            long userId = insertUserAccount(openId,userInfoBean.getNickname());
            return getRedirectUrl(0,openId,userId);

        } catch (QQConnectException e) {
            LOGGER.error("qq connect error : ",e);
            ModelUtil.throwException(
                ERRORCODE.AUTHENTICATION_FAIL
            );
        }

        return null;
    }

    /**
     * 新增用户账号
     *
     * @param openId
     * @param nickName
     * @return
     */
    private long insertUserAccount(String openId,String nickName){
        long userId= 0;
        UserAccount userAccount = new UserAccount();
        userAccount.setAccount(openId);
        userAccount.setNickName(nickName);
        userAccount.setCreateDate(System.currentTimeMillis());
        userAccount.setLastModDate(System.currentTimeMillis());
        userAccount.setUserType(0);
        userAccount.setStatus(0);
        userAccount.setUserId(0l);
        userAccount.setCanTargetSchool(true);
        try {
            userId = userAccountExService.insertUserAccount(
                    userAccount,
                    "qq"
            );

            if (userId == 0) {
                ModelUtil.throwException(ERRORCODE.ACCOUNT_REGIST_FAIL);
            }

        } catch (Exception e) {
            ModelUtil.throwException(ERRORCODE.ACCOUNT_REGIST_FAIL);
        }
        return userId;
    }

    /**
     * 拼接重定向路径
     *
     * @param state
     * @param qqUserId
     * @return
     */
    private String getRedirectUrl(int state, String qqUserId,long userId){
        StringBuffer redirectUrl = new StringBuffer("redirect:");
        redirectUrl.append("http://sn.zhigaokao.cn/login-third-back.html");
        // state 是否已完善信息 0:未完善  1:已完善
        redirectUrl.append("?state=").append(state);
        redirectUrl.append("&qqUserId=").append(qqUserId);
        redirectUrl.append("&userId=").append(userId);
        redirectUrl.append("&type=qq");
        return redirectUrl.toString();
    }

}
