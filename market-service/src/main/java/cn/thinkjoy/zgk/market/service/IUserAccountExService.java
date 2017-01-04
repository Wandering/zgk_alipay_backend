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

    long insertUserAccount(UserAccount userAccount,String source) throws WriterException, IOException;

    Map<String, Object> findUserInfoByAlipayId(String aliPayId);

    Map<String,Object> checkUserHasInfo(String openId);

    UserAccountPojo findUserAccountPojoById(Long id);

    UserAccountPojo findUserAccountPojoByUserId(String phone);

    int findUserAccountCountByPhone(String phone, Long areaId);

    boolean insertUserMarketInfo(Long sharerId, Integer sharerType, long id) throws WriterException, IOException;

    boolean updateUserAccount(UserAccount userAccount);

    UserAccount findUserAccountById(long id);

    UserInfoPojo getUserInfoPojoById(long id);

    Map<String,Object> findUserInfo(Map<String, String> paramMap);

    List<Map<String,Object>> getOrderList(Map<String, String> paramMap);

    Map<String,Object> getOrderDetail(Map<String, String> paramMap);

    int updateAliVipStatus(Map<String, String> params);
}
