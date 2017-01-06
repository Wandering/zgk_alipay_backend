package cn.thinkjoy.zgk.market.common;

import cn.thinkjoy.zgk.market.domain.Order;

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

    public static Calendar getEndDateByType(String type, long now)
    {
        Calendar c = Calendar.getInstance();
        c.setTimeInMillis(now);
        c.set(Calendar.HOUR_OF_DAY, 0);
        c.set(Calendar.MINUTE, 0);
        c.set(Calendar.SECOND, 0);
        c.set(Calendar.MILLISECOND, 0);
        if("1".equals(type))
        {
            c.add(Calendar.MONTH,1);
        }else if("2".equals(type))
        {
            c.add(Calendar.YEAR,1);
        }
        return c;
    }
}
