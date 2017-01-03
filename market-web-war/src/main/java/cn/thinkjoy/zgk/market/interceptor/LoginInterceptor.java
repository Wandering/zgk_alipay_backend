package cn.thinkjoy.zgk.market.interceptor;
import cn.thinkjoy.common.exception.BizException;
import cn.thinkjoy.zgk.market.common.UserAreaContext;
import cn.thinkjoy.zgk.market.constant.ServletPathConst;
import cn.thinkjoy.zgk.market.constant.UserRedisConst;
import cn.thinkjoy.zgk.market.pojo.UserAccountPojo;
import cn.thinkjoy.zgk.market.util.CookieUtil;
import cn.thinkjoy.zgk.market.util.RedisUtil;
import com.alibaba.fastjson.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.concurrent.TimeUnit;

public class LoginInterceptor extends HandlerInterceptorAdapter {

	private static final Logger LOGGER= LoggerFactory.getLogger(LoginInterceptor.class);
	public int TOKEN_EXPIRE_TIME = 4* 60*60;

	public LoginInterceptor() { }

    @Override
	public boolean preHandle(HttpServletRequest request,HttpServletResponse response, Object handler) throws Exception {
		UserAreaContext.setCurrentUserArea(request.getParameter("userKey") == null ? "zj" : request.getParameter("userKey"));
		String userId = request.getParameter("userId");
		String key = UserRedisConst.USER_KEY + userId;
		boolean redisFlag = RedisUtil.getInstance().exists(key);
		if(redisFlag)
		{
			return true;
		}
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request,HttpServletResponse response, Object handler,ModelAndView modelAndView) throws Exception {

	}

	@Override
	public void afterCompletion(HttpServletRequest request,HttpServletResponse response, Object handler, Exception ex)
			throws Exception {

	}

	/**
	 * 获取用户信息
	 * @return
	 */
	protected UserAccountPojo getUserAccountPojo(String key) {
		if(key==null)return null;
		UserAccountPojo userAccountBean  = null;
		userAccountBean = JSON.parseObject(RedisUtil.getInstance().get(key).toString(),UserAccountPojo.class);
		//对token进行延期
		store(key, userAccountBean);
		return userAccountBean;
	}

	/**
	 * 对token进行延期
	 * @param key
	 */
	public void store(String key,UserAccountPojo userAccountBean)
	{
		RedisUtil.getInstance().set(key, JSON.toJSONString(userAccountBean), TOKEN_EXPIRE_TIME, TimeUnit.SECONDS);
	}

}
