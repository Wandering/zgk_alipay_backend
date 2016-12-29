package cn.thinkjoy;

import org.apache.commons.lang3.StringUtils;

import java.util.*;

/**
 * Created by liusven on 2016/12/29.
 */
public class ReportUtil
{
    /**
     * 批次控制线 后缀标识
     */
    public static final String BATCHLINEKEY = "CONTROL_LINES";

    /**
     * 录取率筛选规则
     */
    public static final String THRESHOLD_ENROLL_KEY="THRESHOLD_ENROLL";

    /**
     * 利用率筛选规则
     */
    public static final String THRESHOLD_USED_KEY="THRESHOLD_USED";
    /**
     * 录取率梯度筛选规则
     */
    public static final String VOLUNTEER_ENROLL_KEY="VOLUNTEER_ENROLL";
    /**
     * 利用率梯度筛选规则
     */
    public static final String VOLUNTEER_USED_KEY="VOLUNTEER_USED";
    /**
     * 往年院校年份
     */
    public static final String UNIVERSITY_ENROLL_YEAR_KEY="UNIVERSITY_ENROLL_YEAR";
    /**
     * 排名法  --- 细分规则 KEY
     */
    public static final String VOLUNTEER_BATCH_PRECEDENCE_KEY="VOLUNTEER_BATCH_PRECEDENCE";
    /**
     * 排名法 ---位次阀值
     */
    public static final String VOLUNTEER_RANKING_VALUE_KEY="RANKING_VALUE";
    /**
     * 分数补充法 开关
     */
    public static final String SCORE_ROLE_KEY="SCORE_ROLE";
    /**
     * 分数补充法 批次设置
     */
    public static final String SCORE_BATCH_ROLE_KEY="SCORE_BATCH_ROLE";
    /**
     * 批次线追加分数
     */
    public static final String CON_LINE_PLUS_VALUE_KEY="CON_LINE_PLUS_VALUE";
    /**
     * 专业限制数 ---用于完整性判断
     */
    public static final String SPECIALITY_NUMVER="SPECIALITY_NUMVER";
    /**
     * 专业调剂限制数 ---用于完整性判断
     */
    public static final String SWAP_NUMBER="SWAP_NUMBER";
    /**
     * 冲稳保垫
     */
    public static final String CLASSIFY_TAG_KEY="CLASSIFY_TAG";

    /**
     * 算法逻辑
     */
    public static final String LOGIC_TREND="LOGIC_TREND";

    /**
     * 线差---批次线差值
     */
    public static final String LINE_DIFF_CON_LINE_PLUS_VALUE="LINE_DIFF_CON_LINE_PLUS_VALUE";

    /**
     * 线差批次选择  跳转策略  需验证
     */
    public static final String LINE_DIFF_CHK_BATCH_VALID="LINE_DIFF_CHK_BATCH_VALID";
    /**
     * 线差批次选择  跳转策略  直接跳转策略
     */
    public static final String LINE_DIFF_CHK_BATCH_HREF="LINE_DIFF_CHK_BATCH_HREF";

    /**
     * 线差值范围
     */
    public static final String  LINE_DIFF_RANGE_KEY="LINE_DIFF";

    /**
     * 是否存在优先选项 --线差
     */
    public static final String LINEDIFF_SP_FIRST_OR_UN_FIRST_KEY="LINEDIFF_SP_FIRST_OR_UN_FIRST";

    /**
     *  是否存在优先选项 --位次
     */
    public static final String PRECEDENCE_SP_FIRST_OR_UN_FIRST_KEY="PRECEDENCE_SP_FIRST_OR_UN_FIRST";

    /****************************************************难易预测****************************************************/

    /**
     * 录取率差值
     */
    public static final String FORECAST_ENROLLING_DIFF="FORECAST_ENROLLING_DIFF";

    /**
     * 逻辑走向   1:存在一分一段  位次&线差 0:无一分一段  单线差
     */
    public static final String FORECAST_ENROLLING_LOGIC="FORECAST_ENROLLING_LOGIC";

    /**
     * 随机范围
     */
    public static final String FORECAST_ENROLLING_RANDOM="FORECAST_ENROLLING_RANDOM";

    /****************************************************难易预测****************************************************/


    /**
     * 规则值拆分符
     */
    public static final String ROLE_VALUE_SPLIT_SYMBOL="\\-";

    /**
     * 规则KEY拆分符
     */
    public static final String ROLE_KEY_SPLIT_SYMBOL="_";

    /**
     * 梯度规则分隔符
     */
    public static final String VOLUNTEER_KEY_SPLIT_SYMBOL="\\|";

    /**
     * 批次表后缀
     */
    public static final String PRECEDENCE_KEY_SYMBOL="w";

    /**
     * 一分一段表后缀
     */
    public static final String ONESCORE_KEY_SYMBOL="y";
    /****************************************************难易预测****************************************************/

    /**
     * 成绩分析-逻辑走向 1:存在一分一段  位次&线差 0:无一分一段  单线差
     */
    public static final String SCORE_ENROLLING_LOGIC = "SCORE_ENROLLING_LOGIC";

    /**
     * 随机范围
     */
    public static final String SCORE_ENROLLING_RANDOM="SCORE_ENROLLING_RANDOM";

    /**
     * 录取率差值
     */
    public static final String SCORE_ENROLLING_DIFF="SCORE_ENROLLING_DIFF";
    /**
     * 成绩分析limit
     */
    public static final String SCORE_ENROLLING_LIMIT="SCORE_ENROLLING_LIMIT";

    /**
     * 成绩分析sortBy
     */
    public static final String SCORE_SORT_BY="SCORE_SORT_BY";
    /**
     * 成绩分析录取数据所用年份
     */
    public static final String SCORE_ENROLLING_YEAR="SCORE_ENROLLING_YEAR";

    /**
     * 成绩分析分数低于高职所取得院校数量
     */
    public static final int SCORE_VO_LIMIT=10;

    /**
     * 成绩分析分数低于高职所取得院校数量
     */
    public static final int SCORE_VO_TAG=1;


    /**
     * 成绩分析-录取率低的院校参数
     */
    public static final String ENROLLRATE_RANGE_LOW_TAG="ENROLLRATE_RANGE_LOW_TAG";

    /**
     * 成绩分析-录取率高的院校参数
     */
    public static final String ENROLLRATE_RANGE_HIGH_TAG="ENROLLRATE_RANGE_HIGH_TAG";
    /****************************************************难易预测****************************************************/





    /**
     * 组装表名   - 线差表
     * @param provinceCode
     * @param categorie
     * @param batch
     * @return
     */
    public static String getTableName(String provinceCode,Integer categorie,String batch,boolean isPrecedence) {
//        String[] batchArr = getBatchArr(batch);
        if (isPrecedence)
            return provinceCode + ROLE_KEY_SPLIT_SYMBOL + categorie + ROLE_KEY_SPLIT_SYMBOL +batch+ ROLE_KEY_SPLIT_SYMBOL + PRECEDENCE_KEY_SYMBOL;
        else
            return provinceCode + ROLE_KEY_SPLIT_SYMBOL + categorie + ROLE_KEY_SPLIT_SYMBOL + batch;
    }

    /**
     * 获取一分一段表
     * @param provinceCode
     * @param categorie
     * @return
     */
    public static String getOneScoreTableName(String provinceCode,Integer categorie,String batch) {
        if (IsDifference(provinceCode))
            return provinceCode + ROLE_KEY_SPLIT_SYMBOL + categorie + ROLE_KEY_SPLIT_SYMBOL + batch + ROLE_KEY_SPLIT_SYMBOL + ONESCORE_KEY_SYMBOL;
        else
            return provinceCode + ROLE_KEY_SPLIT_SYMBOL + categorie + ROLE_KEY_SPLIT_SYMBOL + ONESCORE_KEY_SYMBOL;

//        return ;
    }

    public static String combSystemParmasKey(String procode,String suffix) {
        return procode.toUpperCase() + ReportUtil.ROLE_KEY_SPLIT_SYMBOL + suffix;
    }
    /**
     * 线差值范围Key组装
     * @return
     */
    public static String getLineDiffRangeKey(String procode,String batch) {
        return procode.toUpperCase() + ReportUtil.ROLE_KEY_SPLIT_SYMBOL + ReportUtil.LINE_DIFF_RANGE_KEY + ReportUtil.ROLE_KEY_SPLIT_SYMBOL + batch;
    }

    /**
     * 批次规则拆分
     * @param batchStr
     * @return
     */
    public static String[] getBatchArr(String batchStr) {
        return batchStr.split(ROLE_VALUE_SPLIT_SYMBOL);
    }

    /**
     * 是否是高职高专
     * @return
     */
    public static boolean isBatch4(String batch) {
        String[] equesBatch = ReportUtil.getBatchArr(batch);

        return equesBatch[0].equals("8");
    }

    /**
     * 批次标记拆分
     * @param batchTag
     * @return
     */
    public static String[] getBatchTagArr(String batchTag){
        return batchTag.split(VOLUNTEER_KEY_SPLIT_SYMBOL);
    }

    public static String[] getEnrollRandomArr(String randomValue) {
        return randomValue.split(ROLE_VALUE_SPLIT_SYMBOL);
    }
    /**
     * 组装位次表名
     * @param provinceCode
     * @param categorie
     * @param batch
     * @param symbol
     * @return
     */
    public static String getTableName(String provinceCode,Integer categorie,Integer batch,String symbol) {
        return provinceCode + ROLE_KEY_SPLIT_SYMBOL + categorie + ROLE_KEY_SPLIT_SYMBOL + batch + ROLE_KEY_SPLIT_SYMBOL + PRECEDENCE_KEY_SYMBOL;
    }
    /**
     * 获取指定梯度规则
     * @param configValue  梯度规则串
     * * @param sequence   获取第几级梯度
     * @return
     */
    public static ArrayList<Integer> getVolunteer(String configValue,Integer sequence) {
        ArrayList<Integer> resultVolunteer = new ArrayList<>();
        if (sequence <= getVolunteerCount(configValue)) {
            String[] volunteerArr = configValue.split(VOLUNTEER_KEY_SPLIT_SYMBOL);
            String[] seqArr = volunteerArr[(sequence-1)].split(ROLE_VALUE_SPLIT_SYMBOL);
            for (String str : seqArr) {
                resultVolunteer.add(Integer.valueOf(str));
            }
        }
        return resultVolunteer;
    }

    /**
     * 获取梯度总数  --总共分几级梯度
     * @return
     */
    public static Integer getVolunteerCount(String configValue) {
        return (configValue.split(VOLUNTEER_KEY_SPLIT_SYMBOL)).length;
    }

    /*****************************************排名法util*****************************************/
    /**
     * 获取排名法  --细分规则key
     * @return
     */
    public static String getPrecedenceRuleKey(String provinceCode) {
        return provinceCode.toUpperCase() + ROLE_KEY_SPLIT_SYMBOL + VOLUNTEER_BATCH_PRECEDENCE_KEY;
    }

    /**
     * 获取当前位次符合的排名规则区间下标
     * @return
     */
    public static Integer getRankingRuleIndex(String rankingRuleStr,Integer value) {
        if (value <= 0)
            return -1;
        String[] rankingRuleArr = rankingRuleStr.split(VOLUNTEER_KEY_SPLIT_SYMBOL);
        for (int i = 0; i < rankingRuleArr.length; i++) {
            String rankStr = rankingRuleArr[i];
            String[] rankRangeArr = rankStr.split(ROLE_VALUE_SPLIT_SYMBOL);
            Integer rankStar = Integer.valueOf(rankRangeArr[0]);
            Integer rankEnd = Integer.valueOf(rankRangeArr[1]);
            if (value >= rankStar && value <= rankEnd)
                return i;
        }
        return -1;
    }
    /**
     * 获取当前位次符合的排名规则区间下标
     * @return
     */
    public static Integer getRankingRuleIndexLineDiff(String rankingRuleStr,Integer value) {
        String[] rankingRuleArr = rankingRuleStr.split(VOLUNTEER_KEY_SPLIT_SYMBOL);
        for (int i = 0; i < rankingRuleArr.length; i++) {
            String rankStr = rankingRuleArr[i];
            String[] rankRangeArr = rankStr.split(ROLE_VALUE_SPLIT_SYMBOL);
            Integer rankStar = Integer.valueOf(rankRangeArr[0]);
            Integer rankEnd = Integer.valueOf(rankRangeArr[1]);
            if (value >= rankStar && value <= rankEnd)
                return i;
        }
        return -1;
    }
    /**
     * 批次排序
     * @return
     */
    public static String[] sortBatchArr(String spStr) {

        String[] batchArr = spStr.split(ROLE_VALUE_SPLIT_SYMBOL);
//
//        String[] batchResultArr = new String[batchArr.length];
//
//        if (batchArr.length >= 1)
//            batchResultArr[0] = batchArr[0];
//        if (batchArr.length >= 2)
//            batchResultArr[1] = batchArr[1];
//        if (batchArr.length >= 4)
//            batchResultArr[2] = batchArr[3];
//        if (batchArr.length >= 3)
//            batchResultArr[3] = batchArr[2];

//        return batchResultArr;

        return batchArr;
    }

    public static String ConverNewBatch(String oldBatch){
        String newBatch="";
        switch (oldBatch){
            case "1":
                newBatch="1";
                break;
            case "1-1":
                newBatch="11";
                break;
            case "1-2":
                newBatch="12";
                break;
            case "2":
                newBatch="2";
                break;
            case "2-1":
                newBatch="21";
                break;
            case "2-2":
                newBatch="22";
                break;
            case "3":
                newBatch="4";
                break;
            case "3-1":
                newBatch="41";
                break;
            case "3-2":
                newBatch="42";
                break;
            case "4":
                newBatch="8";
                break;
            case "4-1":
                newBatch="81";
                break;
            case "4-2":
                newBatch="82";
                break;
        }
        return newBatch;
    }
    /**
     * 批次结果排序
     * @param batchViews
     * @return
     */
    public static List<BatchView> sortBatchResultArr(List<BatchView> batchViews) {
//        List<BatchView> resultBatchViews = new ArrayList<>();
//
//
//        if (batchViews.size() >= 1)
//            resultBatchViews.add(batchViews.get(0));
//        if (batchViews.size() >= 2)
//            resultBatchViews.add(batchViews.get(1));
//        if (batchViews.size() >= 4) {
//            BatchView batchView= batchViews.get(3);
//            BatchView batchView1= batchViews.get(2);
//            String batchOld=batchView.getBatch(),batchOld1=batchView1.getBatch();
//            batchView.setBatch(batchOld1);
//            batchView1.setBatch(batchOld);
//            resultBatchViews.add(batchView);
//        }
//        if (batchViews.size() >= 3) {
//            BatchView batchView= batchViews.get(2);
////            if (batchViews.size() >= 4) {
////                BatchView batchView1= batchViews.get(3);
////                batchView.setBatch(batchView1.getBatch());
////            }
//            resultBatchViews.add(batchView);
//        }
//
//
//        return resultBatchViews;

        return batchViews;
    }


    /**
     * 根据批次获取  批次配置下标
     * @param batch
     * @param rankingRuleStr
     * @return
     */
    public static Integer  getRankingRuleIndex(String batch,String rankingRuleStr) {
        if (StringUtils.isBlank(batch))
            return -1;
        String[] rankingRuleArr = rankingRuleStr.split(VOLUNTEER_KEY_SPLIT_SYMBOL);
        for (int i = 0; i < rankingRuleArr.length; i++) {
            String batchStr = rankingRuleArr[i];

            if (batchStr.equals(batch))
                return i;
        }
        return -1;
    }

    /**
     * 拆分规则串 为Array
     * @param str
     * @param symbol
     * @return
     */
    public static  ArrayList<Integer>  strSplit(String str,String symbol) {
        if (StringUtils.isBlank(str))
            return null;
        ArrayList<Integer> roleArr = new ArrayList<>();
        String[] roleStrArr = str.split(symbol);
        for (String roleStr : roleStrArr) {
            roleArr.add(Integer.valueOf(roleStr));
        }
        return roleArr;
    }
    /*****************************************排名法util*****************************************/
    /**
     * 查找最接近目标值的数，并返回
     * @param array
     * @param targetNum
     * @return
     */
    public static Integer binarysearchKey(Integer[] array, int targetNum) {
        Map<Integer, Integer> resultMap = new TreeMap<Integer, Integer>(
            new Comparator<Integer>() {
                public int compare(Integer obj1, Integer obj2) {
                    // 降序排序
                    return obj1.compareTo(obj2);
                }
            }
        );
        Integer result = 0;
        Arrays.sort(array);
        Integer starNum = array[0],
            endNum = array[(array.length - 1)];
        Integer[] xResult = new Integer[array.length];
        for (int i = 0; i < array.length; i++) {
            if (targetNum <= starNum)
                return starNum;
            if (targetNum >= endNum)
                return endNum;
            Integer num1 = array[i];
            Integer x1 = Math.abs(targetNum - num1);
            xResult[i] = x1;
            resultMap.put(x1, array[i]);
        }

        for (Map.Entry<Integer, Integer> entry : resultMap.entrySet()) {
            result = entry.getValue();
            break;
        }
        return result;
    }

    /**
     * 根据逻辑标识 获取压线生 追加值
     * @param logic
     * @param provinceCode
     * @return
     */
    public static String getLinePlusByLogic(Integer logic,String provinceCode) {
        //默认位次及分数转位次
        String key = provinceCode + ROLE_KEY_SPLIT_SYMBOL + CON_LINE_PLUS_VALUE_KEY;

        ReportEnum.LogicTrend logicTrend = ReportEnum.LogicTrend.getLogic(logic);
        //线差
        if (logicTrend.equals(ReportEnum.LogicTrend.LINEDIFF)) {
            key = provinceCode + ROLE_KEY_SPLIT_SYMBOL + LINE_DIFF_CON_LINE_PLUS_VALUE;
        }
        return key;
    }

    /**
     * 获取key 信息   用于处理省份差异化
     * @param procode
     * @param key
     * @return
     */
    public static String getExecKey(String procode,String key,String batch) {
        String resuKey = key;
        if (IsDifference(procode)) {
            resuKey = key + ROLE_KEY_SPLIT_SYMBOL + batch;
        }
        return resuKey;
    }

    /**
     * 差异化城市
     * @param procode
     * @return
     */
    public static boolean IsDifference(String procode) {
        if (procode.equals("zj") || procode.equals("sh"))
            return true;

        return false;
    }
    public static String ConverOldBatch(String newBatch) {
        String oldBatch = "";
        switch (newBatch) {
            case "1":
                oldBatch = "1";
                break;
            case "11":
                oldBatch = "1-1";
                break;
            case "12":
                oldBatch = "1-2";
                break;
            case "2":
                oldBatch = "2";
                break;
            case "21":
                oldBatch = "2-1";
                break;
            case "22":
                oldBatch = "2-2";
                break;
            case "4":
                oldBatch = "3";
                break;
            case "41":
                oldBatch = "3-1";
                break;
            case "42":
                oldBatch = "3-2";
                break;
            case "8":
                oldBatch = "4";
                break;
            case "81":
                oldBatch = "4-1";
                break;
            case "82":
                oldBatch = "4-2";
                break;
        }
        return oldBatch;
    }
}
