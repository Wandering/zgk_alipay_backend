package cn.thinkjoy.zgk.market.common;

import com.pingplusplus.util.WxpubOAuth;

import java.io.UnsupportedEncodingException;

/**
 * Created by wpliu on 16/4/5.
 */
public class OpenIdUtil {

       private  static final String rediretUrl="";
        public  static String getOpenId(String appId,String appSecret){
            try {
                String getCodeUrl= WxpubOAuth.createOauthUrlForCode(appId, rediretUrl,false);
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }


//            return WxpubOAuth.getOpenId(appId,appSecret,code);
            return null;
        }
}
