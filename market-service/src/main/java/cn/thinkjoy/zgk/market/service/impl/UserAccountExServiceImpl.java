/*
 * Copyright (c) 2013-2014, thinkjoy Inc. All Rights Reserved.
 *
 * Project Name: shishuo
 * $Id:  UserAccountServiceImpl.java 2015-07-13 09:45:17 $
 */
package cn.thinkjoy.zgk.market.service.impl;


import cn.thinkjoy.common.utils.SqlOrderEnum;
import cn.thinkjoy.zgk.market.dao.*;
import cn.thinkjoy.zgk.market.domain.*;
import cn.thinkjoy.zgk.market.pojo.UploadFileReturn;
import cn.thinkjoy.zgk.market.pojo.UserAccountPojo;
import cn.thinkjoy.zgk.market.pojo.UserInfoPojo;
import cn.thinkjoy.zgk.market.service.IUserAccountExService;
import cn.thinkjoy.zgk.market.util.MatrixToImageWriter;
import cn.thinkjoy.zgk.market.util.StaticSource;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.jlusoft.microschool.core.utils.JsonMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;


@Service("UserAccountExServiceImpl")
public class UserAccountExServiceImpl implements IUserAccountExService {

    @Autowired
    private IUserAccountExDAO userAccountExDAO;

    @Autowired
    private IUserAccountDAO userAccountDAO;

    @Autowired
    private IUserInfoDAO userInfoDAO;

    @Autowired
    private IUserExamDAO userExamDAO;

    @Autowired
    private IUserInfoExDAO userInfoExDAO;

    @Autowired
    private IUserVipDAO userVipDAO;

    @Autowired
    private IUserMarketDAO userMarketDAO;

    @Override
    public long insertUserAccount(UserAccount userAccount,String source) throws WriterException, IOException {
        userAccountDAO.insert(userAccount);
        long id = userAccount.getId();
        userAccount.setUserId(id);
        userAccountDAO.update(userAccount);
        UserInfo userInfo = new UserInfo();
        userInfo.setId(id);
        String account = userAccount.getAccount();
        if(StringUtils.isNotBlank(userAccount.getNickName()))
        {
            userInfo.setName(userAccount.getNickName());
        }else
        {
            userInfo.setName("gk-" + account.substring(0, 3) + "****" + account.substring(account.length() - 4, account.length()));
        }
        if(StringUtils.isNotBlank(userAccount.getAvatar()))
        {
            userInfo.setIcon(userAccount.getAvatar());
        }
        if("ali".equals(source)){
            userInfo.setAlipayUserId(account);
            userInfo.setProvinceId(userAccount.getProvinceId());
            userInfo.setCityId(userAccount.getCityId());
            userInfo.setCountyId(userAccount.getCountyId());
        }else if ("qq".equals(source)){
            userInfo.setQqUserId(account);
        }
        userInfo.setToken(UUID.randomUUID().toString());

        userInfoExDAO.insertUserInfo(userInfo);
        UserVip userVip = new UserVip();
        userVip.setId(id);
        userVip.setStatus(0);
        userVip.setUserId(id);
        userVip.setCreateDate(System.currentTimeMillis());
        userVipDAO.insert(userVip);
        UserExam userExam = new UserExam();
        userExam.setId(id);
        userExam.setIsReported(0);
        userExam.setIsSurvey(0);
        userExam.setUserId(id);
        userExamDAO.insert(userExam);
        UserMarket userMarket = new UserMarket();
        userMarket.setAccountId(id);
        userMarket.setSharerType(1);
        userMarket.setAgentLevel(0);
        userMarket.setCreateDate(System.currentTimeMillis());
        userMarket.setCreator(id);
        userMarket.setUserId(id);
        userMarket.setFromType(1);//微信
        userMarket.setSharerId(0l);
        String uploadUrl = StaticSource.getSource("uploadUrl");
        String loginUrl = StaticSource.getSource("loginUrl")+"?sharerId="+id+"&sharerType="+1+"&state=user-detail";
        MultiFormatWriter multiFormatWriter = new MultiFormatWriter();
        Map hints = new HashMap();
        hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
        BitMatrix bitMatrix = multiFormatWriter.encode(loginUrl, BarcodeFormat.QR_CODE, 400, 400,hints);
        String path=Thread.currentThread().getContextClassLoader().getResource("").toString();
        path=path.substring(1, path.indexOf("classes")).replaceFirst("ile:","");
        String fileName = id+".jpg";
        File file = new File(path,fileName);
        MatrixToImageWriter.writeToFile(bitMatrix, "jpg", file);
        MultiValueMap<String, Object> param = new LinkedMultiValueMap<String, Object>();
            FileSystemResource resource = new FileSystemResource(file);
            RestTemplate template = new RestTemplate();
        param.add("file", resource);
        param.add("productCode", "gk360");
        param.add("bizSystem", "gk360");
        param.add("spaceName", "gk360");
        param.add("userId", "gk360");
        param.add("dirId", "0");
        template.getMessageConverters().add(new FastJsonHttpMessageConverter());
        String returnJson = template.postForObject(uploadUrl, param, String.class);
        UploadFileReturn  uploadFileReturn = JsonMapper.buildNormalMapper().fromJson(returnJson, UploadFileReturn.class);
        if(uploadFileReturn !=null && "0000000".equals(uploadFileReturn.getRtnCode())){
            userMarket.setQrcodeUrl(uploadFileReturn.getBizData().getFile().getFileUrl());//二维码地址
            file.delete();
        }
        userMarketDAO.insert(userMarket);
        return id;
    }

    @Override
    public Map<String, Object> findUserInfoByAlipayId(String alipayId)
    {
        Map<String, String> params = new HashMap<String,String>();
        params.put("alipayUserId",alipayId);
        return userAccountExDAO.findUserInfoByAlipayId(params);
    }

    @Override
    public Map<String,Object> checkUserHasInfo(String openId) {
        Map<String,Object> resultMap = userAccountExDAO.checkUserHasInfo(openId);
        return resultMap;
    }

    @Override
    public UserAccountPojo findUserAccountPojoById(Long id) {
        Map<String,Object> params = new HashMap<String,Object>();
        params.put("id",id);
        return userAccountExDAO.findUserAccountPojo(params);
    }

    @Override
    public UserAccountPojo findUserAccountPojoByUserId(String account) {
        Map<String,Object> params = new HashMap<String,Object>();
        params.put("id",account);
        return  userAccountExDAO.findUserAccountPojo(params);

    }

    @Override
    public int findUserAccountCountByPhone(String account,Long areaId) {
        Map<String,Object> params = new HashMap<String,Object>();
        params.put("account",account);
        params.put("areaId",areaId);
        return userAccountExDAO.findUserAccountCount(params);
    }

    @Override
    public boolean insertUserMarketInfo(Long sharerId, Integer sharerType, long id) throws WriterException, IOException {
        boolean flag;
        UserMarket userMarket = new UserMarket();
        userMarket.setAccountId(id);
        userMarket.setUserId(id);
        Integer agentLevel = 0;
        if(sharerType == 0){//供货商
            agentLevel =1;
        }else if(sharerType == 1){//普通用户
            UserMarket userMarket1 = (UserMarket)userMarketDAO.findOne("accountId", sharerId, null, null);
            if(userMarket1 !=null){
                agentLevel = userMarket1.getAgentLevel()+1;
            }
        }
        userMarket.setSharerType(sharerType);
        userMarket.setAgentLevel(agentLevel);
        userMarket.setCreateDate(System.currentTimeMillis());
        userMarket.setCreator(id);
        userMarket.setFromType(1);//微信
        userMarket.setSharerId(sharerId);
        String uploadUrl = StaticSource.getSource("uploadUrl");
        String loginUrl = StaticSource.getSource("loginUrl")+"?sharerId="+id+"&sharerType="+1+"&state=user-detail";
        MultiFormatWriter multiFormatWriter = new MultiFormatWriter();
        Map hints = new HashMap();
        hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
        BitMatrix bitMatrix = multiFormatWriter.encode(loginUrl, BarcodeFormat.QR_CODE, 400, 400,hints);
        String path = Thread.currentThread().getContextClassLoader().getResource("").toString();
        path=path.substring(1, path.indexOf("classes")).replaceFirst("ile:","");
        String fileName = id+".jpg";
        File file = new File(path,fileName);
        MatrixToImageWriter.writeToFile(bitMatrix, "jpg", file);
        MultiValueMap<String, Object> param = new LinkedMultiValueMap<>();
        FileSystemResource resource = new FileSystemResource(file);
        RestTemplate template = new RestTemplate();
        param.add("file", resource);
        param.add("productCode", "gk360");
        param.add("bizSystem", "gk360");
        param.add("spaceName", "gk360");
        param.add("userId", "gk360");
        param.add("dirId", "0");
        template.getMessageConverters().add(new FastJsonHttpMessageConverter());
        String returnJson = template.postForObject(uploadUrl, param, String.class);
        UploadFileReturn uploadFileReturn = JsonMapper.buildNormalMapper().fromJson(returnJson, UploadFileReturn.class);
        if(uploadFileReturn !=null && "0000000".equals(uploadFileReturn.getRtnCode())){
            userMarket.setQrcodeUrl(uploadFileReturn.getBizData().getFile().getFileUrl());//二维码地址
            file.delete();
        }
        userMarketDAO.insert(userMarket);
        flag = true;

        return flag;
    }

    @Override
    public boolean updateUserAccount(UserAccount userAccount){
        boolean flag = false;
        userAccountDAO.update(userAccount);
        flag = true;
        return flag;
    }

    @Override
    public UserAccount findUserAccountById(long id){
        return userAccountDAO.findOne("id",id,"id", SqlOrderEnum.ASC.getAction());
    }

    @Override
    public UserInfoPojo getUserInfoPojoById(long id){
        Map<String,Object> params = new HashMap<>();
        params.put("id",id);
        return userAccountExDAO.getUserInfoPojoById(params);
    }

    @Override
    public Map<String, Object> findUserInfo(Map<String, String> paramMap) {
        return userAccountExDAO.findUserInfo(paramMap);
    }

    @Override
    public List<Map<String, Object>> getOrderList(Map<String, String> paramMap) {
        return userAccountExDAO.getOrderList(paramMap);
    }
}
