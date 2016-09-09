package cn.thinkjoy.zgk.market.service;

import cn.thinkjoy.zgk.market.pojo.BizData;

/**
 * Created by douzy on 16/5/12.
 */
public interface IWXAvatarSyncService  {
    /**
     * 微信远程图片处理
     * @param mediaId
     * @return
     */
    public BizData remoteImgExec(String mediaId);
}
