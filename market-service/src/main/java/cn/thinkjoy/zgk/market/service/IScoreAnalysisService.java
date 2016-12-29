package cn.thinkjoy.zgk.market.service;

import cn.thinkjoy.zgk.market.domain.ReportForecastView;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created by yangyongping on 2016/10/13.
 */
public interface IScoreAnalysisService {
    Integer queryUserIsFirst(long userId);

    List<Map<String,Object>> getUniversityInfoByKeywords(String keywords);

    String getUniversityImage(String name);

    List<Map<String,Object>> queryUnivsersityBatch(long areaId, long schooleId, String year, Integer majorType);

    boolean enrollingLogin(String parmasKey, Integer categorie);

    Integer converPreByScoreV2(ReportForecastView reportForecastView, String forecastEnrollingLogic);

    Integer converScoreDiffByScore(ReportForecastView reportForecastView);

    String getEnrollingByForecast(ReportForecastView reportForecastView);
}
