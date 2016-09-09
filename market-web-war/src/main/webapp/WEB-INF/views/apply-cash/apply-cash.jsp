<%--
  Created by IntelliJ IDEA.
  User: kepeng
  Date: 16/4/27
  Time: 19:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
  <%@ include file="../common/meta.jsp"%>
  <link rel="stylesheet" href="<%=ctx%>/static/dist/css/apply-cash/apply-cash.css"/>
</head>
<body>
<%@ include file="../common/header.jsp"%>
<div class="container" id="container">
  <div class="wrapper">
    <div class="cash-rule">
      <p>提现规则：</p>
      <p>1. 本月申请提现，次月25日到帐</p>
      <p>2. 客服电话400-6699-580</p>
    </div>
    <div class="line"></div>
    <form class="form-horizontal">
      <div class="form-group">
        <label for="zhxm" class="control-label">账户姓名</label>
        <input type="text" class="form-control" id="zhxm" placeholder="请输入持卡人姓名">
      </div>
      <div class="form-group">
        <label for="cardNum" class="control-label">提现账户</label>
        <input type="text" class="form-control" id="cardNum" placeholder="请输入银行卡号">
      </div>
      <div class="form-group">
        <label for="cardAddress" class="control-label">开&nbsp;户&nbsp;行</label>
        <input type="text" class="form-control" id="cardAddress" placeholder="请输入银行开户行地址">
      </div>
      <div class="form-group">
        <label for="cash" class="control-label">提现金额</label>
        <input type="text" class="form-control cash" id="cash" placeholder="">元
      </div>
    </form>
    <div class="btns">确认提现</div>
  </div>
</div>
<script type="text/javascript" src="<%=ctx%>/static/dist/js/commons.js"></script>
<script type="text/javascript" src="<%=ctx%>static/dist/js/applyCash.js"></script>
</body>
</html>
