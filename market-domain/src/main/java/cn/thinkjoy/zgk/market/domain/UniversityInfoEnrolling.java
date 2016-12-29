package cn.thinkjoy.zgk.market.domain;

import cn.thinkjoy.common.domain.CreateBaseDomain;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Created by liusven on 2016/12/29.
 */
public class UniversityInfoEnrolling extends CreateBaseDomain<Long> implements Serializable
{
    private Long id;
    /**
     * 批次
     */
    private String batch;
    /**
     * 院校ID
     */
    private Long universityId;
    /**
     * 院校名称
     */
    private String universityName;
    /**
     * 录取率
     */
    private BigDecimal enrollRate;

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public String getBatch() {
        return batch;
    }

    public void setBatch(String batch) {
        this.batch = batch;
    }

    public Long getUniversityId() {
        return universityId;
    }

    public void setUniversityId(Long universityId) {
        this.universityId = universityId;
    }

    public String getUniversityName() {
        return universityName;
    }

    public void setUniversityName(String universityName) {
        this.universityName = universityName;
    }

    public BigDecimal getEnrollRate() {
        return enrollRate;
    }

    public void setEnrollRate(BigDecimal enrollRate) {
        this.enrollRate = enrollRate;
    }
}

