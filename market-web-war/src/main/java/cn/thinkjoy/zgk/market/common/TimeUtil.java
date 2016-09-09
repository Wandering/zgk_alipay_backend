package cn.thinkjoy.zgk.market.common;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by liusven on 16/7/29.
 */
public class TimeUtil
{
    public static String getTimeStamp(String format)
    {
        SimpleDateFormat formatter = new SimpleDateFormat(format);
        return formatter.format(new Date());
    }
}
