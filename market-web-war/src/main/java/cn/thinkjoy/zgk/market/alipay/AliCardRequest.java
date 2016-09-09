package cn.thinkjoy.zgk.market.alipay;

/**
 * Created by liusven on 16/8/23.
 */
public class AliCardRequest
{
    private String category;
    private String template_name;
    private String merch_id;
    private String attribute;
    private String tamplate_id;
    private String t_v;
    private String target_id;
    private AliCardSceneData scene_data;
    private AliCardOpData op_data;
    private String start_time;
    private String exp_time;
    private boolean syn;
    private String invoke_id;

    public String getCategory()
    {
        return category;
    }

    public void setCategory(String category)
    {
        this.category = category;
    }

    public String getTemplate_name()
    {
        return template_name;
    }

    public void setTemplate_name(String template_name)
    {
        this.template_name = template_name;
    }

    public String getMerch_id()
    {
        return merch_id;
    }

    public void setMerch_id(String merch_id)
    {
        this.merch_id = merch_id;
    }

    public String getAttribute()
    {
        return attribute;
    }

    public void setAttribute(String attribute)
    {
        this.attribute = attribute;
    }

    public String getTamplate_id()
    {
        return tamplate_id;
    }

    public void setTamplate_id(String tamplate_id)
    {
        this.tamplate_id = tamplate_id;
    }

    public String getT_v()
    {
        return t_v;
    }

    public void setT_v(String t_v)
    {
        this.t_v = t_v;
    }

    public String getTarget_id()
    {
        return target_id;
    }

    public void setTarget_id(String target_id)
    {
        this.target_id = target_id;
    }

    public AliCardSceneData getScene_data()
    {
        return scene_data;
    }

    public void setScene_data(AliCardSceneData scene_data)
    {
        this.scene_data = scene_data;
    }

    public AliCardOpData getOp_data()
    {
        return op_data;
    }

    public void setOp_data(AliCardOpData op_data)
    {
        this.op_data = op_data;
    }

    public String getStart_time()
    {
        return start_time;
    }

    public void setStart_time(String start_time)
    {
        this.start_time = start_time;
    }

    public String getExp_time()
    {
        return exp_time;
    }

    public void setExp_time(String exp_time)
    {
        this.exp_time = exp_time;
    }

    public boolean isSyn()
    {
        return syn;
    }

    public void setSyn(boolean syn)
    {
        this.syn = syn;
    }

    public String getInvoke_id()
    {
        return invoke_id;
    }

    public void setInvoke_id(String invoke_id)
    {
        this.invoke_id = invoke_id;
    }
}
