package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.zgk.market.pojo.BizData;
import cn.thinkjoy.zgk.market.pojo.UploadFileReturn;
import cn.thinkjoy.zgk.market.service.IWXAvatarSyncService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * Created by douzy on 16/5/12.
 */
@Controller
@RequestMapping("/wx/remote")
public class WxRemoteController {

    @Resource
    IWXAvatarSyncService iwxAvatarSyncService;

    @RequestMapping("/exec")
    @ResponseBody
    public BizData getAgentInfo(@RequestParam(value = "mediaId") String mediaId) {
        return iwxAvatarSyncService.remoteImgExec(mediaId);
    }
}
