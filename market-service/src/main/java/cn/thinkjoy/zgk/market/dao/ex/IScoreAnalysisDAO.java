package cn.thinkjoy.zgk.market.dao.ex;

import cn.thinkjoy.zgk.market.domain.ScoreConverPrecedence;
import cn.thinkjoy.zgk.market.domain.ScoreMaxMin;
import cn.thinkjoy.zgk.market.domain.SystemParmas;
import cn.thinkjoy.zgk.market.domain.UniversityInfoEnrolling;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created by yangyongping on 2016/10/13.
 */
public interface IScoreAnalysisDAO {
    /**
     * 获取用户年级
     * @param userId
     * @return
     */
    String queryUserGradeInfo(long userId);

    /**
     *  获取用户测评条数
     * @param userId
     * @return
     */
    Integer queryScoreCount(long userId);

    /**
     *
     * @param keywords
     * @return
     */
    List<Map<String,Object>> getUniversityInfoByKeywords(@Param("keywords") String keywords);

    /**
     *
     * @param name
     * @return
     */
    String getUniversityImage(String name);

    /**
     *
     * @param areaId
     * @param schooleId
     * @param year
     * @param majorType
     * @return
     */
    List<Map<String,Object>> queryUnivsersityBatch(@Param("areaId")long areaId, @Param("schooleId")long schooleId,
        @Param("year")String year, @Param("majorType")Integer majorType);

    SystemParmas selectModel(Map map);

    ScoreMaxMin selectMaxScore(Map map);

    ScoreConverPrecedence selectPrecedenceByScore(Map map);

    List<Integer> selectPrecedence(Map map);

    List<UniversityInfoEnrolling> selectUniversityEnrolling(Map parmasMap);

    String getProvince(@Param("areaId")String areaId);
}
