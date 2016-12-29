package cn.thinkjoy.zgk.market.domain;

import java.io.Serializable;

/**
 * Created by liusven on 2016/12/29.
 */
public class ScoreConverPrecedence implements Serializable
{
    /**
     * 分数
     */
    private Integer score;

    /**
     * 人数
     */
    private Integer num;

    /**
     * 最高位次
     */
    private Integer heighPre;

    /**
     * 最低位次
     */
    private Integer lowPre;

    /**
     * 平均位次
     */
    private Integer avgPre;

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    public Integer getHeighPre() {
        return heighPre;
    }

    public void setHeighPre(Integer heighPre) {
        this.heighPre = heighPre;
    }

    public Integer getLowPre() {
        return lowPre;
    }

    public void setLowPre(Integer lowPre) {
        this.lowPre = lowPre;
    }

    public Integer getAvgPre() {
        return avgPre;
    }

    public void setAvgPre(Integer avgPre) {
        this.avgPre = avgPre;
    }
}

