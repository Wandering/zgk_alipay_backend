/*
 * Copyright (c) 2013-2014, thinkjoy Inc. All Rights Reserved.
 *
 * Project Name: shishuo
 * $Id:  UserAccountDAO.java 2015-07-13 09:45:17 $
 */
package cn.thinkjoy.zgk.market.dao;


import org.apache.ibatis.annotations.Param;

import java.util.Map;

public interface IUserAccountExDAO {

    Map<String,Object> findUserInfoByAlipayId(Map<String, String> params);

    /**
     * 根据qq用户openId检测用户是否已完善信息
     *
     * @param openId
     * @return
     */
    Map<String,Object> checkUserHasInfo(
            @Param("openId") String openId
    );
}
