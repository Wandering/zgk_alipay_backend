<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp"%>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/order/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp"%>
<div class="container" id="container">
    <div>
        <div class="order-list">

        </div>
        <div class="pull">
            <div class="pull-text">上拉浏览更多</div>
            <div class="infinite-scroll-preloader" id="scroller-pullUp">
                <div class="preloader">

                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal-overlay hidden" id="modal_overlay"></div>
<div class="modal hidden" id="modal">
    <div class="modal-title">订单删除</div>
    <div class="modal-body">
        <div class="delete">
            <span>删除订单？</span>
        </div>
        <div class="btn">
            <span class="active" id="delete_order">确定</span>
            <span id="cancle_btn">取消</span>
        </div>
    </div>
</div>
<script id="order_list_tmpl" type="text/x-handlebars-template">
    {{#each bizData}}
        {{#compare status '>=' 1}}
        <div class="order-item">
            <img class="img-paid" src="<%=ctx%>static/dist/img/icons/paid_{{status}}.png">
            <div class="title">
                <span>总价：{{product_price}}元</span>
                        <span class="order-icon">
                            <span class="delete" data-ordernum="{{order_no}}"></span>
                        </span>
            </div>
            <div class="item-li">名称：智高考{{productName}}会员卡</div>
            <div class="item-li">价格：{{unit_price}}元/套</div>
            <div class="item-li">数量：{{goodsCount}}套</div>

            {{#compare status '==' 1}}
            <div class="item-li">订单时间：{{format create_date}}</div>
            <div class="item-li">订单号码：<span>{{order_no}}</span></div>
            {{/compare}}
            <!--<div class="item-li">授权经销商地点：<span>{{goods_address}}</span></div>
            <div class="item-li">授权经销商电话：<span>{{department_phone}}</span></div>-->
        </div>
            {{else}}
        <div class="order-item">
            <div class="title payying">
                <span>总价：{{product_price}}元</span>
                        <span class="order-icon">
                            <span class="delete" data-ordernum="{{order_no}}"></span>
                            <span class="paying" data-goodscount="{{goodsCount}}" data-price="{{product_price}}" data-userid="{{user_id}}" data-ordernum="{{order_no}}">去支付</span>
                        </span>
            </div>
            <div class="item-li">名称：智高考{{productName}}会员卡</div>
            <div class="item-li">价格：{{unit_price}}元/套</div>
            <div class="item-li">数量：{{goodsCount}}套</div>
        </div>
        {{/compare}}
    {{/each}}
</script>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script src="<%=ctx%>/static/dist/js/pingpp.js"></script>
<script type="text/javascript" src="<%=ctx%>static/dist/js/order.js?V=11"></script>
</body>
</html>