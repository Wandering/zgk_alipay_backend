/*
 * Copyright (c) 2013-2014, thinkjoy Inc. All Rights Reserved.
 *
 * Project Name: shishuo
 * $Id:  UserAccountService.java 2015-07-13 09:45:17 $
 */

package cn.thinkjoy.zgk.market.service;


import cn.thinkjoy.zgk.market.domain.UserAccount;
import cn.thinkjoy.zgk.market.pojo.UserAccountPojo;
import cn.thinkjoy.zgk.market.pojo.UserInfoPojo;
import com.google.zxing.WriterException;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface IUserAccountExService {

    boolean insertUserAccount(UserAccount userAccount,String source) throws WriterException, IOException;

    Map<String, Object> findUserInfoByAlipayId(String aliPayId);

    /**
     * 根据qq用户openId检测用户是否已完善信息
     *
     * @param openId
     * @return
     */
    Map<String,Object> checkUserHasInfo(String openId);
}
