package cn.thinkjoy.zgk.market.domain;

import java.io.Serializable;

/**
 * Created by liusven on 2017/1/3.
 */
public class OrdersQuery implements Serializable
{
    private String userId;
    private String channel;
    private String productId;
    private String returnUrl;
    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    public String getProductId()
    {
        return productId;
    }

    public void setProductId(String productId)
    {
        this.productId = productId;
    }

    public String getReturnUrl() {
        return returnUrl;
    }

    public void setReturnUrl(String returnUrl) {
        this.returnUrl = returnUrl;
    }

    public String getUserId()
    {
        return userId;
    }

    public void setUserId(String userId)
    {
        this.userId = userId;
    }
}
