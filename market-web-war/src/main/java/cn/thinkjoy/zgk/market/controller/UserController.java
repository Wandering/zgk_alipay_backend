package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.common.exception.BizException;
import cn.thinkjoy.zgk.market.common.ERRORCODE;
import cn.thinkjoy.zgk.market.pojo.UserInfoPojo;
import cn.thinkjoy.zgk.market.service.IUserAccountExService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import cn.thinkjoy.zgk.market.common.BaseCommonController;

/**
 * Created by yhwang on 16/4/1.
 */
@Controller
@RequestMapping("/user")
public class UserController extends BaseCommonController {
    @Autowired
    private IUserAccountExService userAccountExService;
    @RequestMapping(value = "/getUserProfile")
    @ResponseBody
    public UserInfoPojo registerAccount(@RequestParam(value="userId",required = false) String userId){
        if(StringUtils.isBlank(userId)){
            throw new BizException(ERRORCODE.PARAM_ISNULL.getCode(), ERRORCODE.PARAM_ISNULL.getMessage());
        }
        UserInfoPojo userInfoPojo=userAccountExService.getUserInfoPojoById(Long.valueOf(userId));
        userInfoPojo.setPassword(null);
        return userInfoPojo;
    }
}
