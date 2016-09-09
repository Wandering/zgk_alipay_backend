package cn.thinkjoy.zgk.market.pojo;

import java.io.Serializable;

public class ResponseFile implements Serializable {
        private String fileUrl;

        public String getFileUrl() {
            return fileUrl;
        }

        public void setFileUrl(String fileUrl) {
            this.fileUrl = fileUrl;
        }
    }