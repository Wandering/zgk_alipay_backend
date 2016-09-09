<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp"%>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/vip-check/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp"%>
<div class="container">
    <div class="banner">
        <img src="<%=ctx%>/static/dist/img/icons/banner.png" alt=""/>
    </div>
    <div class="vip-check-info">
        <img src="<%=ctx%>/static/dist/img/icons/vip.png" alt=""/>
        <div class="text">
            <div>您已是VIP会员</div>
            <div>VIP时效：从 <span id="startDate"></span> 到 <span id="endDate"></span></div>
        </div>
    </div>
    <div class="link">
        <a id="vip-buy" href="javascript:void(0)">在线购买VIP特权</a>
    </div>
</div>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script src="<%=ctx%>/static/dist/js/vipCheck.js"></script>
</body>
</html>