package cn.thinkjoy.zgk.market.service.impl;

import cn.thinkjoy.zgk.market.common.WXConfig;
import cn.thinkjoy.zgk.market.pojo.AccessTokenView;
import cn.thinkjoy.zgk.market.pojo.BizData;
import cn.thinkjoy.zgk.market.pojo.UploadFileReturn;
import cn.thinkjoy.zgk.market.service.IWXAvatarSyncService;
import org.springframework.stereotype.Service;

/**
 * Created by douzy on 16/5/12.
 */
@Service("WXAvatarSyncServiceImpl")
public class WXAvatarSyncServiceImpl implements IWXAvatarSyncService {

    /**
     * 微信远程图片处理
     * @param mediaId  微信标示媒体的唯一ID
     * @return
     */
    @Override
    public BizData remoteImgExec(String mediaId) {

        AccessTokenView accessTokenView = WXConfig.getAccessToken();

        String path = "/tmp/";
//        String path = Thread.currentThread().getContextClassLoader().getResource("").toString();
//        path = path.substring(1, path.indexOf("classes")).replaceFirst("ile:", "");

        String result = WXConfig.downloadMedia(accessTokenView.getAccessToken(), mediaId, path);

        BizData bizData = WXConfig.postRemote(result);

        return bizData;
    }
}
