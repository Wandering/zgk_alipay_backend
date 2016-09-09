package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.common.exception.BizException;
import cn.thinkjoy.zgk.market.common.ERRORCODE;
import cn.thinkjoy.zgk.market.domain.Order;
import cn.thinkjoy.zgk.market.service.IOrderService;
import cn.thinkjoy.zgk.market.service.IUserAccountExService;
import cn.thinkjoy.zgk.market.util.NumberGenUtil;
import cn.thinkjoy.zgk.zgksystem.AgentService;
import cn.thinkjoy.zgk.zgksystem.DeparmentApiService;
import cn.thinkjoy.zgk.zgksystem.domain.Department;
import cn.thinkjoy.zgk.zgksystem.domain.DepartmentProductRelation;
import com.alibaba.dubbo.common.logger.Logger;
import com.alibaba.dubbo.common.logger.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import cn.thinkjoy.zgk.market.common.BaseCommonController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by wpliu on 16/3/27.
 */
@Controller
@RequestMapping("/order")
public class OrderController extends BaseCommonController {
    private Logger logger= LoggerFactory.getLogger(OrderController.class);
    @Autowired
    private IOrderService orderService;
    @Autowired
    private AgentService agentService;
    @Autowired
    private DeparmentApiService deparmentApiService;
    @Autowired
    private IUserAccountExService userAccountExService;


    /**
     * 获取购买信息
     * @return
     */
    @RequestMapping(value = "/getBuyInfo",method = RequestMethod.POST)
    @ResponseBody
    public List<DepartmentProductRelation> getBuyInfo(@RequestParam("userId") String userId){

        //参数错误
        if(userId == null){
            throw new BizException(ERRORCODE.PARAM_ERROR.getCode(),ERRORCODE.PARAM_ERROR.getMessage());
        }
        try{
//            Department  department= agentService.getAgentInfo(userId);
//         UserAccount  userAccount=userAccountExService.findUserAccountById(Long.valueOf(userId));
         List<DepartmentProductRelation>  departmentProductRelations= deparmentApiService.queryProductPriceByAreaId(this.getAreaId()+"");
            return  departmentProductRelations;
        }catch (Exception e){
            logger.error("用户" + userId + ",获取购买信息异常:" + e);
            throw new BizException(ERRORCODE.FAIL.getCode(),ERRORCODE.FAIL.getMessage());
        }
    }

    /**
     * 提交订单
     * @return
     */
    @RequestMapping(value = "/commitOrder",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> commitOrder(@RequestParam("userId") String userId,
                                          @RequestParam("price") double price,
                                          @RequestParam("goodsCount") int goodsCount,
                                           @RequestParam("departmentCode")String departmentCode ,
                                           @RequestParam("productType")int productType){

        //参数错误
        if(userId==null||price==0){
            throw new BizException(ERRORCODE.PARAM_ERROR.getCode(),ERRORCODE.PARAM_ERROR.getMessage());
        }
        try{
            String orderNo= NumberGenUtil.genOrderNo();
            Order order=new Order();

//            Department  department= agentService.getAgentInfo(userId);
//            Department department=deparmentApiService.quertDepartmentInfoByCode(Long.valueOf(departmentCode));
            Department department=deparmentApiService.queryDepartmentInfoByCode(Long.valueOf(departmentCode));

//            if(! department.getSalePrice().equals(price)){
//                logger.error("用户" + order.getUserId() + ",提交的价格不匹配" );
//                throw new BizException(ERRORCODE.FAIL.getCode(),ERRORCODE.FAIL.getMessage());
//            }
            order.setCreateDate(System.currentTimeMillis());
            order.setOrderNo(orderNo);
            order.setDepartmentName(department.getDepartmentName());
            order.setDepartmentCode(department.getDepartmentCode());
            order.setDepartmentPhone(department.getDepartmentPhone());
            order.setGoodsAddress(department.getGoodsAddress());
            order.setProductPrice(String.valueOf(price * goodsCount));
            order.setUnitPrice(String.valueOf(price));
            order.setUserId(Long.valueOf(userId));
            order.setStatus(0);
            order.setGoodsCount(goodsCount);
            order.setHandleState(0);
            order.setProductType(productType);
            // TODO 现阶段客户端只有微信支付
            order.setChannle(0);
            orderService.insert(order);

            Map<String,Object> map=new HashMap<>();
            map.put("orderNo",orderNo);
            map.put("department",department);
            return  map;
        }catch (Exception e){
            logger.error("用户" +userId + ",提交订单异常:" + e);
            throw new BizException(ERRORCODE.FAIL.getCode(),ERRORCODE.FAIL.getMessage());
        }
    }

    /**
     *获取用户订单数据
     * @param userId
     * @param pageNo
     * @param pageSize
     * @return
     */
    @RequestMapping(value = "/getUserOrderList",method = RequestMethod.GET)
    @ResponseBody
    public List<Map<String,Object>> getUserOrderList(@RequestParam("userId")long userId,
                                                     @RequestParam("pageNo")int pageNo,
                                                     @RequestParam("pageSize")int pageSize){
        List<Map<String,Object>> result=new ArrayList<>();
        try {

            result=orderService.queryOrderListByUserId(userId, (pageNo-1)*pageSize, pageSize);
            for(int i=0;i<result.size();i++){
                Map<String,Object> map=result.get(i);
                int productType=(Integer)map.get("product_type");
                String productName="";
                switch (productType){
                    case 1:
                        productName="金榜登科";
                        break;
                    case 2:
                        productName="状元及第 ";
                        break;
                    case 3:
                        productName="金榜题名 ";
                        break;
                    default:productName="";
                }
                map.put("productName",productName);
            }
            return  result;

        }catch (Exception e){
            e.printStackTrace();
            logger.error("获取用户订单数据失败:"+e);
            throw new BizException(ERRORCODE.FAIL.getCode(),ERRORCODE.FAIL.getMessage());
        }
    }


    /**
     * 获取订单详情
     * @param orderNo
     * @return
     */
    @RequestMapping(value = "/getOrderInfo",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> getOrderInfo(@RequestParam("orderNo")String orderNo){

        Map<String,Object> resultMap=new HashMap<>();
        resultMap=orderService.queryOrderByNo(orderNo);
        return  resultMap;
    }

}