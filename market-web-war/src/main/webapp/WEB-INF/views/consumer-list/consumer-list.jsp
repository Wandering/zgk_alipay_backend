<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp"%>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/consumer-list/consumer-list.css"/>
</head>
<body>
<%@ include file="../common/header.jsp"%>
<div class="container" id="container">
    <div>
        <div class="container-header">
            <div class="right">
                <img src="<%=ctx%>static/dist/img/icons/info.png" alt=""/>
                <a href="/intro">盈利规则</a>
            </div>
            <div class="clearfix"></div>
            <div class="count">
                未提现金额：￥<span id="total-sum"></span>元
            </div>
            <div class="sqtx">
                <a href="javascript:void(0)">申请提现</a>
            </div>
        </div>
        <div class="tab">
            <span class="on"  data-id="1">收入明细</span>
            <span  data-id="2">提现记录</span>
        </div>
        <div class="container-content" id="detail-list">
        </div>
        <%--<div class="pull">--%>
            <%--<div class="pull-text">上拉浏览更多</div>--%>
            <%--<div class="infinite-scroll-preloader" id="scroller-pullUp">--%>
                <%--<div class="preloader"></div>--%>
            <%--</div>--%>
        <%--</div>--%>
    </div>
</div>
<script type="text/javascript" src="<%=ctx%>/static/dist/js/commons.js"></script>
<script type="text/javascript" src="<%=ctx%>static/dist/js/consumerList.js"></script>
</body>
</html>