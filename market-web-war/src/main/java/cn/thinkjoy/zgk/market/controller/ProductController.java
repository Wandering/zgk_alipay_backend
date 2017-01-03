package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.zgk.market.constant.SpringMVCConst;
import cn.thinkjoy.zgk.market.domain.OrdersQuery;
import cn.thinkjoy.zgk.market.domain.Product;
import cn.thinkjoy.zgk.market.service.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.List;
import java.util.Map;

/**
 * Created by liusven on 2017/1/3.
 */
@Controller
@Scope(SpringMVCConst.SCOPE)
@RequestMapping(value = "/product")
public class ProductController
{
    @Autowired
    private ProductServiceImpl productService;


    @RequestMapping(value = "productList")
    @ResponseBody
    public List<Product> productList() throws Exception
    {
        List<Product> productList = productService.findAll();
        for (Product p : productList)
        {
            fixData(p);
        }
        return productList;
    }

    private void fixData(Product p)
    {
        p.setAction(null);
        p.setCreateDate(null);
        p.setLastModDate(null);
        p.setId(null);
        p.setValidValue(null);
        p.setUnit(null);
        p.setCode(null);
        p.setStatus(null);
    }
}
