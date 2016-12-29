package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.common.exception.BizException;
import cn.thinkjoy.common.restful.apigen.annotation.ApiDesc;
import cn.thinkjoy.zgk.market.common.ERRORCODE;
import cn.thinkjoy.zgk.market.common.ModelUtil;
import cn.thinkjoy.zgk.market.common.ReportUtil;
import cn.thinkjoy.zgk.market.constant.SpringMVCConst;
import cn.thinkjoy.zgk.market.domain.ReportForecastView;
import cn.thinkjoy.zgk.market.service.IScoreAnalysisService;
import com.google.common.collect.Maps;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

/**
 * Created by liusven on 2016/12/28.
 */
@Controller
@Scope(SpringMVCConst.SCOPE)
@RequestMapping(value = "/predict")
public class PredictController
{
    @Autowired
    private cn.thinkjoy.zgk.remote.IUniversityService gk360UniversityService;

    @Autowired
    private IScoreAnalysisService scoreAnalysisService;

    /**
     * 录取难易预测接口
     * @param name
     * @param score
     * @param name
     * @return
     */
    @RequestMapping(value = "/predictProbability")
    @ResponseBody
    public Map<String, Object> predictProbability(@RequestParam(value = "universityName") String name,
        @RequestParam(value = "score") int score,
        @RequestParam(value = "type",required = false) String type,
        @RequestParam(value = "areaId") long areaId)
    {
        if(score <= 0 || score > 999)
        {
            ModelUtil.throwException(ERRORCODE.SCORE_ERROR);
        }
        if(null == name || "".equals(name))
        {
            ModelUtil.throwException(ERRORCODE.SCHOOL_NAME_ERROR);
        }

        List<Map<String, String>> universityList = gk360UniversityService.getUniversityByName(name);
        if(universityList.size()==0)
        {
            throw new BizException("error", "请输入正确的院校名称!");
        }
        String uName = "";
        if(universityList.size()==1)
        {
            uName = universityList.get(0).get("label");
        }
        if(universityList.size()>1)
        {
            for (Map<String, String> map : universityList) {
                if(name.equals(map.get("label")))
                {
                    uName = map.get("label");
                }
            }
        }
        if("".equals(uName))
        {
            throw new BizException("error", "请输入正确的院校名称!");
        }

        Map<String, Object> params = new HashMap<>();
        params.put("universityName", name);
        params.put("score", score);
        if(!StringUtils.isBlank(type))
            params.put("type", type);
        params.put("areaId", areaId);
        Map<String, Object> resultMap = new HashMap<>();
        try {
            resultMap = gk360UniversityService.getPredictProbability(params);
        } catch (Exception e) {
            setBatch(score, type, resultMap);
            resultMap.put("probability", 0);
            if (!StringUtils.isBlank(type))
                resultMap.put("type", type);
        }
        resultMap.put("universityName", name);
        resultMap.put("score", score);
        String url = scoreAnalysisService.getUniversityImage(name);
        if(StringUtils.isNotEmpty(url))
        {
            resultMap.put("img", "http://123.59.12.77:8080" + url);
        }
        return resultMap;
    }

    private void setBatch(int score, String type, Map<String, Object> resultMap) {
        if("1".equals(type))
        {
            if(score>=626)
            {
                resultMap.put("batch", "一本");
            }
            else if(score>=472)
            {
                resultMap.put("batch", "二本");
            }
            else if(score>=400)
            {
                resultMap.put("batch", "三本");
            }else{
                resultMap.put("batch", "专科");
            }
        }
        else
        {
            if(score>=605)
            {
                resultMap.put("batch", "一本");
            }
            else if(score>=428)
            {
                resultMap.put("batch", "二本");
            }
            else if(score>=380)
            {
                resultMap.put("batch", "三本");
            }else{
                resultMap.put("batch", "专科");
            }
        }
    }

    @RequestMapping(value = "/university", method = RequestMethod.GET)
    @ResponseBody
    public Map<String,String> getUniversityInfoByKeywords(@RequestParam(value = "name") String name) {
        Map<String,String> map = Maps.newHashMap();
        List<Map<String, Object>> universities = scoreAnalysisService.getUniversityInfoByKeywords(name);
        for(Map<String, Object> university : universities){
            map.put(university.get("id").toString(),university.get("name") + "");
        }
        return map;
    }

    /**
     * 根据大学ID和省份ID查询相应的录取批次
     * @return
     */
    @RequestMapping(value = "/batch",method = RequestMethod.GET)
    @ResponseBody

    public Object queryBatchsBySchoolIdAndAreaId(@RequestParam long areaId, @RequestParam long schoolId, Integer majorType){
        List<Map<String, Object>> list = null;
        Integer year = Integer.valueOf(getYear());
        list = scoreAnalysisService.queryUnivsersityBatch(areaId, schoolId, year.toString(), majorType);
        //尝试获取次年对应的录取批次,获取不到获取次年的录取批次
        if (list == null || list.size() == 0) {
            list = scoreAnalysisService.queryUnivsersityBatch(areaId, schoolId, (year - 1) + "", majorType);
        }
        return list;
    }

    public String getYear() {
        Calendar calendar = Calendar.getInstance();
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH) + 1;
        if (month >= 7) {
            return year + "";
        } else {
            return year - 1 + "";
        }
    }

    @RequestMapping(value = "/forecast",method=RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> reportMain(
        @RequestParam(value = "batch") String batch,
        @RequestParam(value = "score") Integer score,
        @RequestParam(value = "areaId") String areaId,
        @RequestParam(value = "categorie") Integer categorie,
        @RequestParam(value="uid") Integer uid) {

        String province = scoreAnalysisService.getProvince(areaId);
        ReportForecastView reportForecastView = new ReportForecastView();
        reportForecastView.setBatch(ReportUtil.ConverOldBatch(batch));
        reportForecastView.setScore(score);
        reportForecastView.setProvince(province);
        reportForecastView.setCategorie(categorie);
        reportForecastView.setUid(uid);

        String parmasKey = ReportUtil.combSystemParmasKey(reportForecastView.getProvince(), ReportUtil.FORECAST_ENROLLING_LOGIC);

        //是否走位次
        boolean isPre = scoreAnalysisService.enrollingLogin(parmasKey, reportForecastView.getCategorie());

        if (isPre)
            reportForecastView.setPrecedence(scoreAnalysisService.converPreByScoreV2(reportForecastView, ReportUtil.FORECAST_ENROLLING_LOGIC));
        reportForecastView.setScoreDiff(scoreAnalysisService.converScoreDiffByScore(reportForecastView));
        reportForecastView.setJoin(false);


        String enrolling = scoreAnalysisService.getEnrollingByForecast(reportForecastView);
        Map map = new HashMap();
        map.put("enrolling", enrolling);
        return map;
    }
}
