<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
  <%@ include file="../common/meta.jsp"%>
  <link rel="stylesheet" href="<%=ctx%>/static/dist/css/modify-user-detail/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp"%>
<div class="container">
  <div class="address-group" style="border-bottom: none">
    <div class="address-container">
      <div class="form-group-address">
        <label class="col-sm-2 control-label mb5"><span>*</span>所在地区：</label>
        <div class="col-sm-10 areaSel">
          <span class="select"><select name="" id="province_select" class="form-control"></select></span>
          <span class="select"><select name="" id="city_select" class="form-control"></select></span>
          <span class="select"><select name="" id="county_select" class="form-control"></select></span>
        </div>
      </div>
      <div class="form-group-address">
        <label class="col-sm-2 control-label mb5"><span>*</span>详细地址：</label>
        <div class="col-sm-10">
          <textarea class="form-control detail-address" id="detail_address" placeholder="建议您如实填写详细收货地址，例如街道名称，门牌号码，楼层和房间号等信息"></textarea>
        </div>
      </div>
      <div class="form-group-address">
        <label for="postalcode" class="col-sm-2 control-label">邮政编码：</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="postalcode" placeholder="如果您不清楚邮政编码，请填写000000">
        </div>
      </div>
      <div class="form-group-address">
        <label for="consignee" class="col-sm-2 control-label"><span>*</span>收&nbsp;货&nbsp;人：</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="consignee" placeholder="长度不超过20个字符">
        </div>
      </div>
      <div class="form-group-address">
        <label for="phone" class="col-sm-2 control-label"><span>*</span>手机号码：</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="phone" placeholder="长度不超过20个字符">
        </div>
      </div>
    </div>
  </div>
  <div class="submit-btn">
    提交
  </div>
</div>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script type="text/javascript" src="<%=ctx%>static/dist/js/address.js"></script>
</body>
</html>