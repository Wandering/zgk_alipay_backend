package cn.thinkjoy.zgk.market.common;

import java.text.SimpleDateFormat;
import java.util.Calendar;
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

    public static String getEndTimeStamp(String format)
    {
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(System.currentTimeMillis());
        calendar.add(Calendar.MONTH,2);
        SimpleDateFormat formatter = new SimpleDateFormat(format);
        return formatter.format(new Date(calendar.getTimeInMillis()));
    }

    public static String getTimeStamp(String format, long time)
    {
        SimpleDateFormat formatter = new SimpleDateFormat(format);
        return formatter.format(new Date(time));
    }
}
