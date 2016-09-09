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

    UserAccountPojo findUserAccountPojoByToken(String token);

    UserAccountPojo findUserAccountPojoById(Long id);

    UserAccountPojo findUserAccountPojoByPhone(String phone);

    int findUserAccountCountByPhone(String phone);

    boolean insertUserAccount(UserAccount userAccount,Long sharerId,Integer sharerType ) throws WriterException, IOException;

    boolean updateUserAccount(UserAccount userAccount);

    UserAccount findUserAccountById(long id);

    UserInfoPojo getUserInfoPojoById(long id);

    List<Map<String,Object>> getUserRelListByUserId(Long aLong);

    Map<String, Object> findUserInfoByAlipayId(String aliPayId);
}
