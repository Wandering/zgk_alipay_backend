<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp"%>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/vip-buy/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp"%>
<div class="container">
    <section class="package hidden zyjd">
            <div class="info">
                <div class="btn">
                    <span class="package-name">状元及第</span>
                    <span class="sub-package">会员卡</span>
                </div>
                <p class="mt">3000+ 院校数据查询</p>
                <p>美国MBTI性格多维度测试</p>
                <p>智能算法精准预测</p>
                <p>全国顶级老师在线辅导</p>
                <div class="price">
                    <span class="main-price"></span>
                    <span class="sub-price"></span>
                </div>
                <div class="look-detial">查看详情</div>
            </div>
    </section>
    <section class="package hidden jbdk">
            <div class="info">
                <div class="btn">
                    <span class="package-name">金榜登科</span>
                    <span class="sub-package">会员卡</span>
                </div>
                <p class="mt">3000+ 院校数据查询</p>
                <p>美国MBTI性格多维度测试</p>
                <p>智能算法精准预测</p>
                <div class="price" style="margin-top: 46px">
                    <span class="main-price"></span>
                    <span class="sub-price"></span>
                </div>
                <div class="look-detial">查看详情</div>
            </div>
    </section>
    <%--<div class="description">--%>
        <%--<img src="<%=ctx%>static/dist/img/bannner_bak_1.png" alt=""/>--%>
        <%--&lt;%&ndash;<div class="title" id="title">智能高考VIP服务卡</div>&ndash;%&gt;--%>
        <%--&lt;%&ndash;<div class="content" id="content">&ndash;%&gt;--%>
            <%--&lt;%&ndash;升级成为VIP后，可免费观看高考学堂全部视频；进行权威职业测评服务；在线浏览数据库资料，全国各大高等院校专业资料；提前熟悉志愿填报流程，享受智能推荐填报志愿服务。&ndash;%&gt;--%>
        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
    <%--</div>--%>
    <%--<div class="vip-check-info">--%>
        <%--&lt;%&ndash;<img src="<%=ctx%>/static/dist/img/icons/vip.png" alt=""/>&ndash;%&gt;--%>
        <%--<div class="text">--%>
            <%--<div>价格：<span id="price"></span>元/套</div>--%>
        <%--</div>--%>
        <%--<div class="num">--%>
            <%--<span>购买数量：</span><span class="sub subtraction"></span><span class="number" id="number">1</span><span class="plus plus-able"></span>--%>
        <%--</div>--%>
    <%--</div>--%>
    <%--<p class="tips-txt">您购买的商品需上门取货，购买之后，请在我的订单中查看取货地址和电话</p>--%>
    <%--<div class="vip-buy-btn">--%>
        <%--立即购买--%>
    <%--</div>--%>
    <%--<div class="console_msg"></div>--%>
    <%--<div class="modal hidden">--%>
        <%--<div class="order-info">--%>
            <%--<div id="orderNo"></div>--%>
            <%--<div id="order_time"></div>--%>
            <%--<div>购买服务名称：智能高考VIP服务卡</div>--%>
            <%--<div id="service_price"></div>--%>
            <%--<div id="pay_number"></div>--%>
            <%--<div id="pay_price"></div>--%>
        <%--</div>--%>
        <%--<div class="confirm-btn">确认支付</div>--%>
    <%--</div>--%>
</div>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script src="<%=ctx%>/static/dist/js/pingpp.js"></script>
<script src="<%=ctx%>/static/dist/js/vipBuy.js?v=11"></script>
</body>
</html>