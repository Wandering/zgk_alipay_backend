package cn.thinkjoy.zgk.market.service;

import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created by yangyongping on 2016/10/13.
 */
public interface IScoreAnalysisService {
    Integer queryUserIsFirst(long userId);

    List<Map<String,Object>> getUniversityInfoByKeywords(String keywords);
}
