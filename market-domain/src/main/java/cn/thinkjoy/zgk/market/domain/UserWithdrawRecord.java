/*
 * Copyright (c) 2013-2014, thinkjoy Inc. All Rights Reserved.
 *
 * Project Name: system
 * $Id:  UserWithdrawRecord.java 2016-04-28 13:32:03 $
 */



package cn.thinkjoy.zgk.market.domain;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import cn.thinkjoy.common.domain.CreateBaseDomain;

import java.util.*;

public class UserWithdrawRecord extends CreateBaseDomain{
    private Long userId;
    private String userName;
    private String cardNo;
    private String bankName;
    private Double money;

	public UserWithdrawRecord(){
	}
    public void setUserId(Long value) {
        this.userId = value;
    }

    public Long getUserId() {
        return this.userId;
    }
    public void setUserName(String value) {
        this.userName = value;
    }

    public String getUserName() {
        return this.userName;
    }
    public void setCardNo(String value) {
        this.cardNo = value;
    }

    public String getCardNo() {
        return this.cardNo;
    }
    public void setBankName(String value) {
        this.bankName = value;
    }

    public String getBankName() {
        return this.bankName;
    }
    public void setMoney(Double value) {
        this.money = value;
    }

    public Double getMoney() {
        return this.money;
    }

	public String toString() {
		return new ToStringBuilder(this,ToStringStyle.MULTI_LINE_STYLE)
			.append("Id",getId())
			.append("UserId",getUserId())
			.append("UserName",getUserName())
			.append("CardNo",getCardNo())
			.append("BankName",getBankName())
			.append("Money",getMoney())
			.append("Status",getStatus())
			.append("CreateDate",getCreateDate())
			.append("LastModDate",getLastModDate())
			.append("Creator",getCreator())
			.append("LastModifier",getLastModifier())
			.toString();
	}
	
	public int hashCode() {
		return new HashCodeBuilder()
			.append(getId())
			.toHashCode();
	}
	
	public boolean equals(Object obj) {
		if(obj instanceof UserWithdrawRecord == false) return false;
		if(this == obj) return true;
		UserWithdrawRecord other = (UserWithdrawRecord)obj;
		return new EqualsBuilder()
			.append(getId(),other.getId())
			.isEquals();
	}
}

