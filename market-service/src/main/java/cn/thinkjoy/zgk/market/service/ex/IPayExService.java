package cn.thinkjoy.zgk.market.service.ex;

import java.util.List;
import java.util.Map;

/**
 * Created by yangguorong on 16/4/28.
 */
public interface IPayExService {

    /**
     * 根据用户ID获取用户钱包剩余金额
     *
     * @param userId
     * @return
     */
    double getWalletBalance(long userId);

    /**
     * 根据用户ID获取用户收益详情
     *
     * @param userId
     * @param pageNo
     * @param pageSize
     * @return
     */
    List<Map<String,Object>> queryUserIncomeDetailByUserId(long userId,int pageNo,int pageSize);


    /**
     * 根据用户ID获取用户收益详情
     *
     * @param userId
     * @param pageNo
     * @param pageSize
     * @return
     */
    List<Map<String,Object>> getSplitPriceList(Map<String, String> map);
}
