package cn.thinkjoy.zgk.market.domain;

import java.io.Serializable;

/**
 * Created by liusven on 2017/1/3.
 */
public class OrdersQuery implements Serializable
{
    private String userId;
    private String channel;
    private String products;
    private String extra;
    //手机号 2.0需求新加参数
    private String phone;
    private String returnUrl;
    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    public String getProducts() {
        return products;
    }

    public void setProducts(String products) {
        this.products = products;
    }

    public String getExtra() {
        return extra;
    }

    public void setExtra(String extra) {
        this.extra = extra;
    }

    public String getReturnUrl() {
        return returnUrl;
    }

    public void setReturnUrl(String returnUrl) {
        this.returnUrl = returnUrl;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
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
