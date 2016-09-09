package cn.thinkjoy.zgk.market.pojo;

import java.io.Serializable;

/**
 * Created by douzy on 16/5/12.
 */
public class WeixinMedia implements Serializable {
    private String type;
    private String mediaId;
    private Integer createdAt;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMediaId() {
        return mediaId;
    }

    public void setMediaId(String mediaId) {
        this.mediaId = mediaId;
    }

    public Integer getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Integer createdAt) {
        this.createdAt = createdAt;
    }
}
