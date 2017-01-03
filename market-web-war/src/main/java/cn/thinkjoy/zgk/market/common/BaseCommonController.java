package cn.thinkjoy.zgk.market.common;

import cn.thinkjoy.common.exception.BizException;
import cn.thinkjoy.zgk.market.constant.UserRedisConst;
import cn.thinkjoy.zgk.market.domain.Province;
import cn.thinkjoy.zgk.market.pojo.UserAccountPojo;
import cn.thinkjoy.zgk.market.service.IProvinceService;
import cn.thinkjoy.zgk.market.util.RedisUtil;
import com.alibaba.fastjson.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class BaseCommonController
{

    protected HttpServletRequest request;

    protected HttpServletResponse response;

    protected HttpSession session;

    @ModelAttribute
    public void setReqAndRes(HttpServletRequest request,
        HttpServletResponse response)
    {
        this.request = request;
        this.response = response;
        this.session = request.getSession();
    }

    /**
     * 获取用户信息
     *
     * @return
     */
    protected UserAccountPojo getUserAccountPojo(String userId)
    {
        String key = UserRedisConst.USER_KEY + userId;
        Object userObj = RedisUtil.getInstance().get(key);
        if (null == userObj)
        {
            throw new BizException("1110000", "userId错误！");
        }
        return JSON.parseObject(userObj.toString(), UserAccountPojo.class);
    }

    protected void setUserAccountPojo(UserAccountPojo userAccountBean, String userId)
    {
        if (null != userAccountBean)
        {
            String key = UserRedisConst.USER_KEY + userId;
            try
            {
                RedisUtil.getInstance().set(key, JSON.toJSONString(userAccountBean), 4l, TimeUnit.HOURS);
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }
        }
    }

}