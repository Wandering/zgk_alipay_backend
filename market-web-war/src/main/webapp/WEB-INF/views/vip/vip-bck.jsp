<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp"%>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/vip/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp"%>
<div class="container">
    <div class="banner">
        <img src="<%=ctx%>static/dist/img/bannner.png" alt=""/>
    </div>
    <div class="no-vip">
        <div class="form-group">
            <div class="input-group">
                <i class="mobile-icon"></i>
                <input type="text" placeholder="充值账号：" id="account-number" disable readonly>
            </div>
        </div>
        <div class="form-group">
            <div class="input-group">
                <i class="card-icon"></i>
                <input type="text" placeholder="卡号：" id="card-number">
            </div>
        </div>
        <div class="form-group">
            <div class="input-group">
                <i class="password-icon"></i>
                <input type="password" placeholder="密码：" id="card-psd">
            </div>
        </div>
        <div class="vip-btn">
            升级vip
        </div>
    </div>
    <div class="viped">
        <p class="title">您已是VIP会员！</p>
        <p class="vip-time"></p>
    </div>
    <div class="link">
        <a id="vip-buy" href="/vip-buy">立即购买</a>
    </div>
</div>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script src="<%=ctx%>/static/dist/js/vip.js"></script>
</body>
</html>