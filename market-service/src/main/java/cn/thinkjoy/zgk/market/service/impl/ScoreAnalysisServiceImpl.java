package cn.thinkjoy.zgk.market.service.impl;

import cn.thinkjoy.zgk.market.dao.ex.IScoreAnalysisDAO;
import cn.thinkjoy.zgk.market.service.IScoreAnalysisService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by yangyongping on 2016/10/13.
 */
@Service
public class ScoreAnalysisServiceImpl implements IScoreAnalysisService{


    @Autowired
    private IScoreAnalysisDAO scoreAnalysisDAO;
    /**
     * 判断用户是否是第一次进来
     *
     * @param userId
     * @return
     */
    @Override
    public Integer queryUserIsFirst(long userId) {

        //        三种状态
        String gradeInfo = scoreAnalysisDAO.queryUserGradeInfo(userId);
        Integer count = scoreAnalysisDAO.queryScoreCount(userId);
//        0:未保存个人信息，未测评
//        1:保存个人信息，未测评
//        2:保存了个人信息，做了测评
        if(StringUtils.isEmpty(gradeInfo) && count==0){
            return 0;
        }else if(StringUtils.isNotEmpty(gradeInfo) && count==0){
            return 1;
        }else {
            return 2;
        }
    }
}
