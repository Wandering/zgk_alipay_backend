package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.zgk.market.service.ex.IPayExService;
import cn.thinkjoy.zgk.zgksystem.AgentService;
import cn.thinkjoy.zgk.zgksystem.domain.Department;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.math.BigDecimal;
import java.util.*;

@Controller
@RequestMapping("/")
public class WebCotroller {

    @Autowired
    private IPayExService payExService;

    @Autowired
    private AgentService agentService;

    @RequestMapping("/getAgentInfo")
    @ResponseBody
    public Department getAgentInfo(@RequestParam(value = "accountId")String accountId)
    {
        return agentService.getAgentInfo(accountId);
    }

    @RequestMapping("/getSplitPriceInfo")
    @ResponseBody
    public Map<String,List<Map<String, Object>>> getSplitPriceInfo(@RequestParam(value = "accountId")String accountId)
    {
        Map<String, String> paramMap = new HashMap<>();
        paramMap.put("userId", accountId);
        List<Map<String, Object>> list =  payExService.getSplitPriceList(paramMap);
        Map<String,List<Map<String, Object>>> priceMap = new LinkedHashMap<>();
        if(null != list && list.size()>0)
        {
            for (Map<String, Object> price: list) {
                BigDecimal realPrice = new BigDecimal(Integer.parseInt(price.get("price")+"")).
                        divide(new BigDecimal(100), 2, BigDecimal.ROUND_HALF_DOWN);
                price.put("price", realPrice.doubleValue());
                Calendar cal = Calendar.getInstance();
                cal.setTimeInMillis(Long.parseLong(price.get("createTime")+""));
                int year = cal.get(Calendar.YEAR);
                int month = cal.get(Calendar.MONTH) + 1;
                String key = year + "-" + month;
                List<Map<String, Object>> pList = priceMap.get(key);
                if(null == pList)
                {
                    pList = new ArrayList<>();
                    priceMap.put(key, pList);
                }
                pList.add(price);
            }
        }
        return priceMap;
    }
    /**
     * login
     *
     * @return
     */
    @RequestMapping("/login")
    public ModelAndView test() {
        return new ModelAndView("/register/register");
    }
    /**
     * index
     *
     * @return
     */
    @RequestMapping("/index")
    public ModelAndView index() {
        return new ModelAndView("/index");
    }

    /**
     * user-detail
     *
     * @return
     */
    @RequestMapping("/user-detail")
    public ModelAndView userDetail() {
        return new ModelAndView("/user-detail/user-detail");
    }

    /**
     * vipBck
     *
     * @return
     */
    @RequestMapping("/vipBck")
    public ModelAndView vipBck() {
        return new ModelAndView("/vip/vip-bck");
    }
    /**
     * vip
     *
     * @return
     */
    @RequestMapping("/vipLogin")
    public ModelAndView vipLogin() {
        return new ModelAndView("/vip/vip-login");
    }

    /**
     * vip
     *
     * @return
     */
    @RequestMapping("/vip")
    public ModelAndView vip() {
        return new ModelAndView("/vip/vip");
    }

    /**
     * vip-check
     *
     * @return
     */
    @RequestMapping("/vip-check")
    public ModelAndView vipCheck() {
        return new ModelAndView("/vip-check/vip-check");
    }
    /**
     * vip-buy
     *
     * @return
     */
    @RequestMapping("/vip-buy")
    public ModelAndView vipBuy() {
        return new ModelAndView("/vip-buy/vip-buy");
    }

    /**
     * order
     *
     * @return
     */

    @RequestMapping("/order")
    public ModelAndView order() {
        return new ModelAndView("/order/order");
    }

    /**
     * modify-user-detail
     *
     * @return
     */
    @RequestMapping("/modify-user-detail")
    public ModelAndView modifyUserDetail() {
        return new ModelAndView("/modify-user-detail/modify-user-detail");
    }

    /**
     * find-password
     *
     * @return
     */
    @RequestMapping("/find-password")
    public ModelAndView findPassword() {
        return new ModelAndView("/register/find-password");
    }

    /**
     * policy
     *
     * @return
     */
    @RequestMapping("/policy")
    public ModelAndView policy() {
        return new ModelAndView("/policy/policy");
    }

    /**
     * policy-detail
     *
     * @return
     */
    @RequestMapping("/policy-detail")
    public ModelAndView policyDetail() {
        return new ModelAndView("/policy/policy-detail");
    }

    /**
     * school-detail
     *
     * @return
     */
    @RequestMapping("/school-info")
    public ModelAndView schoolInfo() {
        return new ModelAndView("/school-info/school-info");
    }

    /**
     * code
     *
     * @return
     */
    @RequestMapping("/code")
    public ModelAndView code() {
        return new ModelAndView("/code/code");
    }
    /**
     * inventory
     *
     * @return
     */
    @RequestMapping("/consumer-list")
    public ModelAndView inventory() {
        return new ModelAndView("/consumer-list/consumer-list");
    }
    /**
     * level-calculate
     *
     * @return
     */
    @RequestMapping("/level-calculate")
    public ModelAndView levelCalculate() {
        return new ModelAndView("/level-calculate/level-calculate");
    }
    /**
     * inventory
     *
     * @return
     */
    @RequestMapping("/intro")
    public ModelAndView intro() {
        return new ModelAndView("/consumer-list/intro");
    }
    /**
     * schedule
     *
     * @return
     */
    @RequestMapping("/schedule")
    public ModelAndView schedule() {
        return new ModelAndView("/schedule/schedule");
    }

    /**
     * user-bullet
     *
     * @return
     */
    @RequestMapping("/user-bullet")
    public ModelAndView userBullet() {
        return new ModelAndView("/user-bullet/user-bullet");
    }

    /**
     * apply-cash
     *
     * @return
     */
    @RequestMapping("/apply-cash")
    public ModelAndView applyCash() {
        return new ModelAndView("/apply-cash/apply-cash");
    }
    /**
     * searchSchool
     *
     * @return
     */
    @RequestMapping("/search-school")
    public ModelAndView searchSchool() {
        return new ModelAndView("/search-school/search-school");
    }
    /**
     * schoolCalculate
     *
     * @return
     */
    @RequestMapping("/school-calculate")
    public ModelAndView schoolCalculate() {
        return new ModelAndView("/school-calculate/school-calculate");
    }

    /**
     * schoolDetail
     *
     * @return
     */
    @RequestMapping("/school-detail")
    public ModelAndView schoolDetail() {
        return new ModelAndView("/school-detail/school-detail");
    }

    /**
     * majorSearch
     *
     * @return
     */
    @RequestMapping("/major-search")
    public ModelAndView majorSearch() {
        return new ModelAndView("/major-search/major-search");
    }

    /**
     * majorDetail
     *
     * @return
     */
    @RequestMapping("/major-detail")
    public ModelAndView majorDetail() {
        return new ModelAndView("/major-detail/major-detail");
    }
    /**
     * passingScore
     *
     * @return
     */
    @RequestMapping("/passing-score")
    public ModelAndView passingScore() {
        return new ModelAndView("/passing-score/passing-score");
    }

    /**
     * vipBuyDetial
     *
     * @return
     */
    @RequestMapping("/vip-buyDetial")
    public ModelAndView vipBuyDetial() {
        return new ModelAndView("/vip-buy-detail/vip-buy-detail");
    }
    /**
     * paySuccess
     *
     * @return
     */
    @RequestMapping("/pay-success")
    public ModelAndView paySuccess() {
        return new ModelAndView("/pay-success/pay-success");
    }

    /**
     * paySuccess
     *
     * @return
     */
    @RequestMapping("/address")
    public ModelAndView address() {
        return new ModelAndView("/address/address");
    }

}
