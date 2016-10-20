package cn.thinkjoy.zgk.market.dao.ex;

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
}
