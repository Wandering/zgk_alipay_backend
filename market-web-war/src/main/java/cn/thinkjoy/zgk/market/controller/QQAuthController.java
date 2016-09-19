package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.common.restful.apigen.annotation.ApiDesc;
import com.qq.connect.QQConnectException;
import com.qq.connect.api.OpenID;
import com.qq.connect.api.qzone.PageFans;
import com.qq.connect.api.qzone.UserInfo;
import com.qq.connect.javabeans.AccessToken;
import com.qq.connect.javabeans.qzone.PageFansBean;
import com.qq.connect.javabeans.qzone.UserInfoBean;
import com.qq.connect.javabeans.weibo.Company;
import com.qq.connect.oauth.Oauth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;


/**
 * Created by yangguorong on 16/9/19.
 */
@Controller
@RequestMapping("/qqAuth")
public class QQAuthController {

    private static final Logger LOGGER = LoggerFactory.getLogger(QQAuthController.class);

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
    public void getAuthToken(HttpServletRequest request,HttpServletResponse response) throws IOException {
        response.setContentType("text/html; charset=utf-8");
        PrintWriter out = response.getWriter();
        try {

            AccessToken tokenObj = (new Oauth()).getAccessTokenByRequest(request);
            if (tokenObj == null ||
                    tokenObj.getAccessToken() == null ||
                    tokenObj.getAccessToken().equals("")) {
//                我们的网站被CSRF攻击了或者用户取消了授权
//                做一些数据统计工作
                // TODO
                System.out.print("没有获取到响应参数");
                return;
            }

            String accessToken = tokenObj.getAccessToken();
            long  tokenExpireIn = tokenObj.getExpireIn();

            // 利用获取到的accessToken 去获取当前用的openid -------- start
            OpenID openIDObj =  new OpenID(accessToken);
            String openID = openIDObj.getUserOpenID();

            request.getSession().setAttribute("demo_access_token", accessToken);
            request.getSession().setAttribute("demo_token_expirein", String.valueOf(tokenExpireIn));
            request.getSession().setAttribute("demo_openid", openID);

            UserInfo qzoneUserInfo = new UserInfo(accessToken, openID);
            UserInfoBean userInfoBean = qzoneUserInfo.getUserInfo();
            if (userInfoBean.getRet() == 0) {
                out.println(userInfoBean.getNickname() + "<br/>");
                out.println(userInfoBean.getGender() + "<br/>");
                out.println("黄钻等级： " + userInfoBean.getLevel() + "<br/>");
                out.println("会员 : " + userInfoBean.isVip() + "<br/>");
                out.println("黄钻会员： " + userInfoBean.isYellowYearVip() + "<br/>");
                out.println("<image src=" + userInfoBean.getAvatar().getAvatarURL30() + "/><br/>");
                out.println("<image src=" + userInfoBean.getAvatar().getAvatarURL50() + "/><br/>");
                out.println("<image src=" + userInfoBean.getAvatar().getAvatarURL100() + "/><br/>");
            } else {
                out.println("很抱歉，我们没能正确获取到您的信息，原因是： " + userInfoBean.getMsg());
            }

        } catch (QQConnectException e) {
            LOGGER.error("qq connect error : ",e);
        }
    }
}
