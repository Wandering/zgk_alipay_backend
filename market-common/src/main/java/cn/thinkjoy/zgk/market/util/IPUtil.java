package cn.thinkjoy.zgk.market.util;

import javax.servlet.http.HttpServletRequest;

public class IPUtil {
	
	public static String getRemortIP(HttpServletRequest request) { 
		String ip = request.getHeader("x-forwarded-for");
		if(ip!=null){
			ip = ip.split(",")[0].trim();
		}else{
			ip = "127.0.0.1";
		}
		return ip;
	}
}
