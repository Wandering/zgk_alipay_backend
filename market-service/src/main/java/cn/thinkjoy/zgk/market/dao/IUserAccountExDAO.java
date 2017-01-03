/*
 * Copyright (c) 2013-2014, thinkjoy Inc. All Rights Reserved.
 *
 * Project Name: shishuo
 * $Id:  UserAccountDAO.java 2015-07-13 09:45:17 $
 */
package cn.thinkjoy.zgk.market.dao;


import cn.thinkjoy.zgk.market.pojo.UserAccountPojo;
import cn.thinkjoy.zgk.market.pojo.UserInfoPojo;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface IUserAccountExDAO {

    Map<String,Object> findUserInfoByAlipayId(Map<String, String> params);

    Map<String,Object> checkUserHasInfo(@Param("openId") String openId);

    UserAccountPojo findUserAccountPojo(Map<String, Object> params);

    int findUserAccountCount(Map<String, Object> params);

    UserInfoPojo getUserInfoPojoById(Map<String, Object> params);

    Map<String,Object> findUserInfo(Map<String, String> paramMap);


    List<Map<String,Object>> getOrderList(Map<String, String> paramMap);

    int updateUserAccountRegistXueTang(Map<String, Object> paramMap);

}
