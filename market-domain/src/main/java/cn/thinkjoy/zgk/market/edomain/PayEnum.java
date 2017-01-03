package cn.thinkjoy.zgk.market.edomain;

/**
 * Created by yangyongping on 2016/10/17.
 */
public enum PayEnum {
    //订单状态 0:未支付  1：已支付  2：支付失败 3：订单过期
    NO_PAY("未支付",0),
    SUCCESS("已支付",1),
    PAY_FAIL("支付失败",2),
    PAY_TIME_OUT("订单过期",4),
    PAY_SUCCESS("已发货",3);

    private final String status;
    private final Integer code;

    PayEnum(String status, Integer code) {
        this.status = status;
        this.code = code;
    }

    public String getStatus() {
        return status;
    }

    public Integer getCode() {
        return code;
    }
}
