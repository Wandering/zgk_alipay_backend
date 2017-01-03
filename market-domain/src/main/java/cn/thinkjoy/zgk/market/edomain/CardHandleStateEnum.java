package cn.thinkjoy.zgk.market.edomain;

/**
 * Created by yangyongping on 2016/10/17.
 */
public enum CardHandleStateEnum {
    Y("已发货",1),
    N("未发货",0);
    private final String state;
    private final Integer code;


    CardHandleStateEnum(String state, Integer code) {
        this.state = state;
        this.code = code;
    }

    public String getState() {
        return state;
    }

    public Integer getCode() {
        return code;
    }
}
