package cn.thinkjoy.zgk.market.common;

import cn.thinkjoy.zgk.market.domain.Province;
import cn.thinkjoy.zgk.market.service.IProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by admin on 2016/2/3.
 */
@Component
public class AreaMaps {
    private static Map<String, Long> areaMap = new HashMap<>();

    @Autowired
    private IProvinceService provinceService;

    @PostConstruct
    private Map<String, Long> getAreaMap()
    {
        if(areaMap.isEmpty())
        {
            initAreaInfo();
        }
        return areaMap;
    }


    @PostConstruct
    private void initAreaInfo()
    {
        List<Province> list =  provinceService.findAll();
        for (Province province:list) {
            areaMap.put(province.getCode(), Long.parseLong(String.valueOf(province.getId())));
        }
    }

    /**
     * 获取省份对应简码  -2016/30/8
     * @param areaId
     * @return
     */
    public String getAreaCode(long areaId){
        //默认为空
        try{
            for (String  provinceCode:areaMap.keySet()) {
                long provinceId = areaMap.get(provinceCode);
                if(provinceId==areaId)return provinceCode;
            }
            return null;
        }catch (Exception e){
            return null;
        }
    }

}
