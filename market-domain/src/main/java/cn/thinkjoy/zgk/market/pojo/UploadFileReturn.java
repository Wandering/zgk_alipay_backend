package cn.thinkjoy.zgk.market.pojo;

import java.io.Serializable;

/**
 * Created by yhwang on 16/4/1.
 */
public class UploadFileReturn implements Serializable{
    private String rtnCode;
    private String msg;
    private String developMsg;
    private String uri;
    private String ts;
    private BizData bizData;
    public String getRtnCode() {
        return rtnCode;
    }
    public void setRtnCode(String rtnCode) {
        this.rtnCode = rtnCode;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getDevelopMsg() {
        return developMsg;
    }

    public void setDevelopMsg(String developMsg) {
        this.developMsg = developMsg;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public String getTs() {
        return ts;
    }

    public void setTs(String ts) {
        this.ts = ts;
    }

    public BizData getBizData() {
        return bizData;
    }

    public void setBizData(BizData bizData) {
        this.bizData = bizData;
    }
}

