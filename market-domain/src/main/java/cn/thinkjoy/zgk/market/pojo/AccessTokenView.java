package cn.thinkjoy.zgk.market.pojo;

import java.io.Serializable;

/**
 * Created by douzy on 16/5/12.
 */
public class AccessTokenView implements Serializable {
    private String access_token;
    private Integer expires_in;

    public String getAccessToken() {
        return access_token;
    }

    public void setAccessToken(String accessToken) {
        this.access_token = accessToken;
    }

    public Integer getExpiresIn() {
        return expires_in;
    }

    public void setExpiresIn(Integer expiresIn) {
        this.expires_in = expiresIn;
    }
}
