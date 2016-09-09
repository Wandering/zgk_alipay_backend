<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
  <%@ include file="../common/meta.jsp"%>
  <link rel="stylesheet" href="<%=ctx%>/static/dist/css/pay-success/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp"%>
<div class="container">
  <div class="wrapper">
    <img src="<%=ctx%>static/dist/img/pay_success_bg.png">
    <div class="page">
      <h1>恭喜您</h1>
      <h4 class="name"></h4>
      <div class="order-number">
        <span></span>
      </div>
      <p>为保障您的正品权益，请您拨打电话与授权经销商领取产品。领取时请提供订单号码。</p>
      <div class="phone">授权经销商联系电话：<span></span></div>
      <div class="address-lable">授权经销商取货地点：</div>
      <div class="address"></div>
    </div>
  </div>
</div>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script src="<%=ctx%>/static/dist/js/paySuccess.js?v=11"></script>
</body>
</html>