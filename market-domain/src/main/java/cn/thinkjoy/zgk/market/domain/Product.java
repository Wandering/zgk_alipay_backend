package cn.thinkjoy.zgk.market.domain;

import cn.thinkjoy.common.domain.BaseDomain;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

/**
 * Created by liusven on 2017/1/3.
 */
public class Product extends BaseDomain
{
    private Integer status;
    private Long createDate;
    private Long lastModDate;
    private Long code;
    private String name;
    private Integer type;
    private String unit;
    private String marketPrice;
    private String price;
    private String icon;
    private String action;
    private String intro;
    private Long validValue;

    public Product(){
    }
    public void setCode(Long value) {
        this.code = value;
    }

    public Long getCode() {
        return this.code;
    }
    public void setName(String value) {
        this.name = value;
    }

    public String getName() {
        return this.name;
    }
    public void setType(Integer value) {
        this.type = value;
    }

    public Integer getType() {
        return this.type;
    }
    public void setUnit(String value) {
        this.unit = value;
    }

    public String getUnit() {
        return this.unit;
    }

    public String getMarketPrice() {
        return marketPrice;
    }

    public void setMarketPrice(String marketPrice) {
        this.marketPrice = marketPrice;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public void setIcon(String value) {
        this.icon = value;
    }

    public String getIcon() {
        return this.icon;
    }
    public void setAction(String value) {
        this.action = value;
    }

    public String getAction() {
        return this.action;
    }
    public void setIntro(String value) {
        this.intro = value;
    }

    public String getIntro() {
        return this.intro;
    }

    public Long getValidValue() {
        return validValue;
    }

    public void setValidValue(Long validValue) {
        this.validValue = validValue;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Long getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Long createDate) {
        this.createDate = createDate;
    }

    public Long getLastModDate() {
        return lastModDate;
    }

    public void setLastModDate(Long lastModDate) {
        this.lastModDate = lastModDate;
    }

    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.MULTI_LINE_STYLE)
            .append("Id",getId())
            .append("Status",getStatus())
            .append("CreateDate",getCreateDate())
            .append("LastModDate",getLastModDate())
            .append("Code",getCode())
            .append("Name",getName())
            .append("Type",getType())
            .append("Unit",getUnit())
            .append("MarketPrice",getMarketPrice())
            .append("Price",getPrice())
            .append("Icon",getIcon())
            .append("Action",getAction())
            .append("Intro",getIntro())
            .append("ValidValue",getValidValue())
            .toString();
    }

    public int hashCode() {
        return new HashCodeBuilder()
            .append(getId())
            .toHashCode();
    }

    public boolean equals(Object obj) {
        if(obj instanceof Product == false) return false;
        if(this == obj) return true;
        Product other = (Product)obj;
        return new EqualsBuilder()
            .append(getId(),other.getId())
            .isEquals();
    }
}
