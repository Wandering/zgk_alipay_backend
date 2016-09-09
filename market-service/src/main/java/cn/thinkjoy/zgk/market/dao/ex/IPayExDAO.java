package cn.thinkjoy.zgk.market.dao.ex;

import cn.thinkjoy.zgk.zgksystem.domain.SplitPrice;
import org.apache.ibatis.annotations.Param;
import org.springframework.expression.spel.ast.Projection;

import java.util.List;
import java.util.Map;

/**
 * Created by yangguorong on 16/4/28.
 */
public interface IPayExDAO {

    /**
     * 根据用户ID获取用户总收益
     *
     * @param userId
     * @return
     */
    Double getAllIncomeByUserId(@Param("userId") long userId);

    /**
     * 根据用户ID获取用户提现总额
     *
     * @param userId
     * @return
     */
    Double getTotalWithdrawalsByUserId(@Param("userId") long userId);

    /**
     * 根据用户ID查询用户收益详情
     *
     * @param userId
     * @param index
     * @param pageSize
     * @return
     */
    List<Map<String,Object>> queryUserIncomeDetailByUserId(@Param("userId") long userId,
                                            @Param("index") int index,
                                            @Param("pageSize") int pageSize);


    List<Map<String, Object>> selectSplitPriceList(Map<String, String> map);
}
