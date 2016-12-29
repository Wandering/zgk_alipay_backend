package cn.thinkjoy.zgk.market.service.impl;

import cn.thinkjoy.common.exception.BizException;
import cn.thinkjoy.zgk.market.common.ReportUtil;
import cn.thinkjoy.zgk.market.dao.ex.IScoreAnalysisDAO;
import cn.thinkjoy.zgk.market.domain.*;
import cn.thinkjoy.zgk.market.service.IScoreAnalysisService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @Override
    public List<Map<String, Object>> getUniversityInfoByKeywords(String keywords)
    {
        return scoreAnalysisDAO.getUniversityInfoByKeywords(keywords);
    }

    @Override
    public String getUniversityImage(String name)
    {
        return scoreAnalysisDAO.getUniversityImage(name);
    }

    @Override
    public List<Map<String, Object>> queryUnivsersityBatch(long areaId, long schooleId, String year, Integer majorType)
    {
        return scoreAnalysisDAO.queryUnivsersityBatch(areaId, schooleId, year, majorType);
    }

    @Override
    public boolean enrollingLogin(String key,Integer cate)
    {
        Map map = new HashMap();
        map.put("configKey", key);
        map.put("majorType",cate);
        SystemParmas systemParmas = scoreAnalysisDAO.selectModel(map);
        return systemParmas == null ? false : (Integer.valueOf(systemParmas.getConfigValue()) == 1 ? true : false);
    }

    @Override
    public Integer converPreByScoreV2(ReportForecastView reportParm, String key)
    {
        //一分一段 查找分数对应位次
        Integer prevPre = converPrecedenceByScoreV2(reportParm.getScore(), reportParm.getProvince(), reportParm.getCategorie(), reportParm.getBatch());
        //找位次临近值
        String tableName = ReportUtil.getTableName(reportParm.getProvince(), reportParm.getCategorie(), reportParm.getBatch(), isPre(reportParm, key));

        return getPrecedence(tableName, prevPre);
    }

    @Override
    public Integer converScoreDiffByScore(ReportForecastView parmasView)
    {
        return getLineDiff(parmasView.getBatch(), parmasView.getScore(), parmasView.getCategorie(), parmasView.getProvince());
    }

    @Override
    public String getEnrollingByForecast(ReportForecastView reportForecastView)
    {
        Integer preEnroll = 0, scoreDiffEnroll = 0, resultEnroll = 0;

        scoreDiffEnroll = getScoreDiffEnrolling(reportForecastView);
        if (isPre(reportForecastView, ReportUtil.FORECAST_ENROLLING_LOGIC))
            preEnroll = getPreEnrolling(reportForecastView);

        String[] configkeyArr = {ReportUtil.FORECAST_ENROLLING_DIFF, ReportUtil.FORECAST_ENROLLING_RANDOM};

        resultEnroll = getResultEnroll(reportForecastView, preEnroll, scoreDiffEnroll, configkeyArr);

        return resultEnroll.toString();
    }


    public Integer converPrecedenceByScoreV2(Integer score,String proCode,Integer cate,String batch) {
        Map scoreMap = new HashMap();
        scoreMap.put("tableName", ReportUtil.getOneScoreTableName(proCode, cate, batch));
        ScoreMaxMin scoreMaxMin = selectMaxScore(scoreMap);

        //超过最大及最小分数   按最大、最小分数走
        if (score >= scoreMaxMin.getMaxScore())
            score = scoreMaxMin.getMaxScore();
        if (score <= scoreMaxMin.getMinScore())
            return 0;

        scoreMap.put("score", score);
        //根据分数 查找对应位次
        ScoreConverPrecedence converPrecedence = selectPrecedenceByScore(scoreMap);
        return converPrecedence == null ? 0 : converPrecedence.getLowPre();
    }

    private boolean isPre(ReportForecastView reportForecastView, String key) {
        String parmasKey = ReportUtil.combSystemParmasKey(reportForecastView.getProvince(), key);

        //是否走位次
        return enrollingLogin(parmasKey, reportForecastView.getCategorie());
    }

    public Integer getPrecedence(String tableName,Integer precedence) {
        if (precedence <= 0)
            return 0;
        Map map = new HashMap();
        map.put("tableName", tableName);
        map.put("preceden", precedence);

        List<Integer> preList = selectPrecedence(map);
        if (preList == null || preList.size() <= 0)
            return 0;
        final Integer size = preList.size();
        Integer[] preArr = (Integer[]) preList.toArray(new Integer[size]);
        Integer result = ReportUtil.binarysearchKey(preArr, precedence);
        return result;
    }

    public ScoreMaxMin selectMaxScore(Map map) {
        return scoreAnalysisDAO.selectMaxScore(map);
    }

    public ScoreConverPrecedence selectPrecedenceByScore(Map map) {
        return scoreAnalysisDAO.selectPrecedenceByScore(map);
    }

    public List<Integer> selectPrecedence(Map map){
        return  scoreAnalysisDAO.selectPrecedence(map);
    }

    public Integer getLineDiff(String batch, Integer score, Integer cate, String provinceCode) {
        String[] bch = batch.split(ReportUtil.ROLE_VALUE_SPLIT_SYMBOL);
        String controleLine = getControleLine(bch[0], cate, provinceCode);
        String[] conLineArr = controleLine.split(ReportUtil.VOLUNTEER_KEY_SPLIT_SYMBOL);
        Integer line = 0;
        if (bch.length > 1) {
            line = (score - Integer.valueOf(conLineArr[Integer.valueOf(bch[1])-1]));
        } else
            line = (score - Integer.valueOf(conLineArr[0]));

        return line<0?0:line;
    }

    public String getControleLine(String batch,int cate,String provinceCode) {
        SystemParmas systemParmas = selectSystemParmas(cate, provinceCode);
        return systemParmas != null ? getBatchNumberLine(batch, systemParmas.getConfigValue()) : "0";
    }

    private SystemParmas selectSystemParmas(int cate,String provinceCode) {
        String batchKey = getBatchKey(cate, provinceCode);
        Map parmasMap = new HashMap();
        parmasMap.put("configKey", batchKey);
        parmasMap.put("provinceCode", provinceCode);
        parmasMap.put("majorType", cate);
        SystemParmas systemParmas = selectModel(parmasMap);
        return systemParmas;
    }

    private String getBatchNumberLine(String batch,String configValue) {
        String[] lines = configValue.split(ReportUtil.ROLE_VALUE_SPLIT_SYMBOL);
        String[] arr = ReportUtil.getBatchArr(batch);
        return lines[(Integer.valueOf(arr[0]) - 1)];
    }

    public String getBatchKey(Integer batch,String provinceCode) {
        return provinceCode.toUpperCase() + ReportUtil.ROLE_KEY_SPLIT_SYMBOL + batch +ReportUtil.ROLE_KEY_SPLIT_SYMBOL+ ReportUtil.BATCHLINEKEY;
    }

    public SystemParmas selectModel(Map map) {
        return scoreAnalysisDAO.selectModel(map);
    }

    private Integer getScoreDiffEnrolling(ReportForecastView reportForecastView) {
        BigDecimal bigDecimal = new BigDecimal(100);
        Integer preEnroll = 0;
        //位次获得值
        List<UniversityInfoEnrolling> universityInfoEnrollings = getUniversityEnrollingsByScoreDiff(reportForecastView);

        if (universityInfoEnrollings != null && universityInfoEnrollings.size() > 0) {
            UniversityInfoEnrolling universityInfoEnrolling = universityInfoEnrollings.get(0);
            preEnroll = bigDecimal.multiply(universityInfoEnrolling.getEnrollRate()).intValue();
        } else
            throw new BizException("1000001", "未知异常");
        return preEnroll;
    }

    public List<UniversityInfoEnrolling> getUniversityEnrollingsByScoreDiff(ReportForecastView reportParm) {
        Map parmasMap = new HashMap();
        parmasMap.put("tableName", ReportUtil.getTableName(reportParm.getProvince(), reportParm.getCategorie(), reportParm.getBatch(), false));
        parmasMap.put("universityId", reportParm.getUid());
        parmasMap.put("scoreDiff", reportParm.getScoreDiff());
        parmasMap.put("isJoin", reportParm.isJoin());
        //如果是江苏省 加入选测等级
        putValueJs(parmasMap, reportParm);
        //只有当需要的时候才去放置参数(因为难以预测不需要这些参数)
        if (reportParm.getEnrollRateStart() != null) {
            parmasMap.put("enrollRateStart", reportParm.getEnrollRateStart());
            parmasMap.put("enrollRateEnd", reportParm.getEnrollRateEnd());
        }

        parmasMap.put("orderBy", reportParm.getOrderBy());
        parmasMap.put("rows", (reportParm.getLimit() == null ? 1 : reportParm.getLimit()));

        List<UniversityInfoEnrolling> universityInfoEnrollings = scoreAnalysisDAO.selectUniversityEnrolling(parmasMap);
        return universityInfoEnrollings;
    }

    private void putValueJs(Map parmasMap, ReportForecastView reportParm) {
        if (reportParm.isJoin()) {
            parmasMap.put("isJoin", reportParm.isJoin());
            //选测等级
            parmasMap.put("xcRanks", reportParm.getXcRanks());
            //去关联哪一年的招生计划
            parmasMap.put("year", reportParm.getYear());

            parmasMap.put("batchs", reportParm.getBatchs());
            //文理科
            parmasMap.put("majorType", reportParm.getCategorie());

        }

    }

    private Integer getPreEnrolling(ReportForecastView reportForecastView) {
        BigDecimal bigDecimal = new BigDecimal(100);
        Integer preEnroll = 0;
        //位次获得值
        List<UniversityInfoEnrolling> universityInfoEnrollings = getUniversityEnrollingsByPrecedence(reportForecastView);

        if (universityInfoEnrollings != null && universityInfoEnrollings.size() > 0) {
            UniversityInfoEnrolling universityInfoEnrolling = universityInfoEnrollings.get(0);
            preEnroll = bigDecimal.multiply(universityInfoEnrolling.getEnrollRate()).intValue();
        }
        return preEnroll;
    }

    public List<UniversityInfoEnrolling> getUniversityEnrollingsByPrecedence(ReportForecastView reportParm) {
        Map parmasMap = new HashMap();
        parmasMap.put("tableName", ReportUtil.getTableName(reportParm.getProvince(), reportParm.getCategorie(), reportParm.getBatch(), true));
        parmasMap.put("universityId", reportParm.getUid());
        parmasMap.put("precedence", reportParm.getPrecedence());
        parmasMap.put("isJoin", reportParm.isJoin());
        //如果是江苏省 加入选测等级
        putValueJs(parmasMap, reportParm);
        //只有当需要的时候才去放置参数(因为难以预测不需要这些参数)
        if (reportParm.getEnrollRateStart() != null) {
            parmasMap.put("enrollRateStart", reportParm.getEnrollRateStart());
            parmasMap.put("enrollRateEnd", reportParm.getEnrollRateEnd());
        }
        parmasMap.put("orderBy", reportParm.getOrderBy());
        parmasMap.put("rows", (reportParm.getLimit() == null ? 1 : reportParm.getLimit()));
        List<UniversityInfoEnrolling> universityInfoEnrollings = scoreAnalysisDAO.selectUniversityEnrolling(parmasMap);
        return universityInfoEnrollings;
    }

    private Integer getResultEnroll(ReportForecastView forecastView, Integer preEnroll, Integer scoreDiffEnroll, String[] configKeyArr) {
        Integer resultEnroll = scoreDiffEnroll;
        if (preEnroll > 0) {
            String proCode = forecastView.getProvince(), diffConKey = configKeyArr[0], randomConkey = configKeyArr[1];
            Integer cate = forecastView.getCategorie();
            Integer diffV = getDiffValue(proCode, diffConKey, cate);
            resultEnroll = (preEnroll - scoreDiffEnroll) > diffV ? preEnroll - getEnrollRandom(proCode, randomConkey, cate) : scoreDiffEnroll;
        }
        return (resultEnroll > 98 ? 98 : (resultEnroll < 2 ? 2 : resultEnroll));
    }

    private Integer getDiffValue(String proCode, String key, Integer cate) {
        SystemParmas systemParmas = getSystemParmasModelByKey(proCode, key, cate);
        return systemParmas == null ? -1 : Integer.valueOf(systemParmas.getConfigValue());
    }

    private Integer getEnrollRandom(String proCode, String key, Integer cate) {
        SystemParmas systemParmas = getSystemParmasModelByKey(proCode, key, cate);

        if (systemParmas == null)
            return null;
        String enrollRandom = systemParmas.getConfigValue();
        String[] randomArr = ReportUtil.getEnrollRandomArr(enrollRandom);

        Integer startR = Integer.valueOf(randomArr[0]), endR = Integer.valueOf(randomArr[1]);
        return (int) (startR + Math.random() * endR);
    }

    private SystemParmas getSystemParmasModelByKey(String proCode, String key, Integer cate) {
        String parmasKey = ReportUtil.combSystemParmasKey(proCode, key);
        Map map = new HashMap();
        map.put("configKey", parmasKey);
        map.put("majorType", cate);
        return scoreAnalysisDAO.selectModel(map);
    }
}
