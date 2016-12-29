package cn.thinkjoy.zgk.market.domain;

import java.util.List;

/**
 * Created by liusven on 2016/12/29.
 */
public class ReportForecastView
{
    /**
     * 批次
     */
    private String batch;
    /**
     * 分数
     */
    private Integer score;
    /**
     * 省份
     */
    private String province;
    /**
     * 文 理
     */
    private Integer categorie;

    /**
     * 位次
     */
    private Integer precedence;

    /**
     * 线差
     */
    private Integer scoreDiff;
    /**
     * 院校ID
     */
    private Integer uid;

    /**
     * 排序
     */
    private String orderBy;

    /**
     * limit
     */
    private Integer limit;

    /**
     * 是否存在表关联
     */
    private boolean isJoin;

    //关联哪一年的招生计划
    private Integer year;

    //关联哪一年的招生计划
    private String[] batchs;


    //选测等级
    private List<String> xcRanks;

    /**
     * 录取率起始值,小于结束值
     */
    private Float enrollRateStart;

    /**
     * 录取率结束值,大于起始值
     */
    private Float enrollRateEnd;

    public String getBatch() {
        return batch;
    }

    public void setBatch(String batch) {
        this.batch = batch;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public Integer getCategorie() {
        return categorie;
    }

    public void setCategorie(Integer categorie) {
        this.categorie = categorie;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public Integer getPrecedence() {
        return precedence;
    }

    public void setPrecedence(Integer precedence) {
        this.precedence = precedence;
    }

    public Integer getScoreDiff() {
        return scoreDiff;
    }

    public void setScoreDiff(Integer scoreDiff) {
        this.scoreDiff = scoreDiff;
    }

    public String getOrderBy() {
        return orderBy;
    }

    public void setOrderBy(String orderBy) {
        this.orderBy = orderBy;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public boolean isJoin() {
        return isJoin;
    }

    public void setJoin(boolean isJoin) {
        this.isJoin = isJoin;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public List<String> getXcRanks() {
        return xcRanks;
    }

    public void setXcRanks(List<String> xcRanks) {
        this.xcRanks = xcRanks;
    }

    public Float getEnrollRateStart() {
        return enrollRateStart;
    }

    public void setEnrollRateStart(Float enrollRateStart) {
        this.enrollRateStart = enrollRateStart;
    }

    public Float getEnrollRateEnd() {
        return enrollRateEnd;
    }

    public void setEnrollRateEnd(Float enrollRateEnd) {
        this.enrollRateEnd = enrollRateEnd;
    }

    public String[] getBatchs() {
        return batchs;
    }

    public void setBatchs(String[] batchs) {
        this.batchs = batchs;
    }
}
