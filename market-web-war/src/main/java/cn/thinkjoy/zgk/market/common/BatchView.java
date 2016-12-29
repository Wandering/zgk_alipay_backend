package cn.thinkjoy.zgk.market.common;

import java.io.Serializable;

/**
 * Created by liusven on 2016/12/29.
 */
public class BatchView implements Serializable,Comparable<BatchView> {
    /**
     * 批次
     */
    private String batch;
    /**
     * 文科控制线
     */
    private String wenLine;
    /**
     * 理科控制线
     */
    private String liLine;

    /**
     * 文科压线生追加分数
     */
    private Integer wenPlus;
    /**
     * 理科压线生追加分数
     */
    private Integer liPlus;

    /**
     * 是否推荐
     */
    private boolean isRecommend;
    /**
     * 是否符合
     */
    private boolean isConform;

    /**
     * 是否为压线生
     */
    private boolean isLine;

    /**
     * 是否存在优先筛选
     */
    private boolean isFirst;

    /**
     * 是否存在优先筛选
     */
    private Integer year;

    public String getBatch() {
        return batch;
    }

    public void setBatch(String batch) {
        this.batch = batch;
    }

    public String getWenLine() {
        return wenLine;
    }

    public void setWenLine(String wenLine) {
        this.wenLine = wenLine;
    }

    public String getLiLine() {
        return liLine;
    }

    public void setLiLine(String liLine) {
        this.liLine = liLine;
    }

    public Integer getWenPlus() {
        return wenPlus;
    }

    public void setWenPlus(Integer wenPlus) {
        this.wenPlus = wenPlus;
    }

    public Integer getLiPlus() {
        return liPlus;
    }

    public void setLiPlus(Integer liPlus) {
        this.liPlus = liPlus;
    }

    public boolean isRecommend() {
        return isRecommend;
    }

    public void setRecommend(boolean isRecommend) {
        this.isRecommend = isRecommend;
    }

    public boolean isConform() {
        return isConform;
    }

    public void setConform(boolean isConform) {
        this.isConform = isConform;
    }

    public boolean isLine() {
        return isLine;
    }

    public void setIsLine(boolean isLine) {
        this.isLine = isLine;
    }

    public boolean isFirst() {
        return isFirst;
    }

    public void setFirst(boolean isFirst) {
        this.isFirst = isFirst;
    }

    @Override
    public int compareTo(BatchView batchView) {
        return batchView.getWenLine().compareTo(this.wenLine);
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }
}

