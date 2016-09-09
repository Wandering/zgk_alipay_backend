/*
 * Copyright (c) 2013-2014, thinkjoy Inc. All Rights Reserved.
 *
 * Project Name: market
 * $Id:  Order.java 2016-03-26 13:36:17 $
 */



package cn.thinkjoy.zgk.market.domain;

import cn.thinkjoy.common.domain.BaseDomain;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

public class Order extends BaseDomain{
    private String state="N";
    private Long userId;
    private String orderNo;
    private Integer channle;
    private Integer status;
    private Long createDate;
    private Long updateDate;
    private String goodsAddress;
    private String productPrice;
    private Long departmentCode;
    private String departmentName;
    private String departmentPhone;
    private Integer goodsCount;
    private Integer handleState;
    private Integer productType;
    private String unitPrice;

    public String getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(String unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Integer getProductType() {
        return productType;
    }

    public void setProductType(Integer productType) {
        this.productType = productType;
    }

    public Order(){
    }
    public void setUserId(Long value) {
        this.userId = value;
    }

    public Long getUserId() {
        return this.userId;
    }
    public void setOrderNo(String value) {
        this.orderNo = value;
    }

    public String getOrderNo() {
        return this.orderNo;
    }
    public void setChannle(Integer value) {
        this.channle = value;
    }

    public Integer getChannle() {
        return this.channle;
    }
    public void setCreateDate(Long value) {
        this.createDate = value;
    }

    public Long getCreateDate() {
        return this.createDate;
    }
    public void setUpdateDate(Long value) {
        this.updateDate = value;
    }

    public Long getUpdateDate() {
        return this.updateDate;
    }
    public void setState(String value) {
        this.state = value;
    }

    public String getState() {
        return this.state;
    }
    public void setGoodsAddress(String value) {
        this.goodsAddress = value;
    }

    public String getGoodsAddress() {
        return this.goodsAddress;
    }
    public void setProductPrice(String value) {
        this.productPrice = value;
    }

    public String getProductPrice() {
        return this.productPrice;
    }
    public void setDepartmentCode(Long value) {
        this.departmentCode = value;
    }

    public Long getDepartmentCode() {
        return this.departmentCode;
    }
    public void setDepartmentName(String value) {
        this.departmentName = value;
    }

    public String getDepartmentName() {
        return this.departmentName;
    }
    public void setDepartmentPhone(String value) {
        this.departmentPhone = value;
    }

    public String getDepartmentPhone() {
        return this.departmentPhone;
    }
    public void setGoodsCount(Integer value) {
        this.goodsCount = value;
    }

    public Integer getGoodsCount() {
        return this.goodsCount;
    }
    public void setHandleState(Integer value) {
        this.handleState = value;
    }

    public Integer getHandleState() {
        return this.handleState;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }



    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.MULTI_LINE_STYLE)
                .append("Id",getId())
                .append("UserId",getUserId())
                .append("Status",getStatus())
                .append("OrderNo",getOrderNo())
                .append("Channle",getChannle())
                .append("CreateDate",getCreateDate())
                .append("UpdateDate",getUpdateDate())
                .append("State",getState())
                .append("GoodsAddress",getGoodsAddress())
                .append("ProductPrice",getProductPrice())
                .append("DepartmentCode",getDepartmentCode())
                .append("DepartmentName",getDepartmentName())
                .append("DepartmentPhone",getDepartmentPhone())
                .append("GoodsCount",getGoodsCount())
                .append("HandleState",getHandleState())
                .toString();
    }

    public int hashCode() {
        return new HashCodeBuilder()
                .append(getId())
                .toHashCode();
    }

    public boolean equals(Object obj) {
        if(obj instanceof Order == false) return false;
        if(this == obj) return true;
        Order other = (Order)obj;
        return new EqualsBuilder()
                .append(getId(),other.getId())
                .isEquals();
    }
}
