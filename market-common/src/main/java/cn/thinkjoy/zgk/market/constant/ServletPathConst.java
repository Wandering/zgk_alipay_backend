package cn.thinkjoy.zgk.market.constant;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by clei on 15/8/8.
 */
public class ServletPathConst {

    public static List<String> MAPPING_URLS = new ArrayList<String>();

    public static List<String> JSP_URLS = new ArrayList<String>();

    static{
        MAPPING_URLS.add("/user-detail");
        MAPPING_URLS.add("/modify-user-detail");
        MAPPING_URLS.add("/consumer-list");
        MAPPING_URLS.add("/order");
        MAPPING_URLS.add("/vip");
        MAPPING_URLS.add("/vip-buy");
    }
}
