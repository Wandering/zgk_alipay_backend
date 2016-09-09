<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp" %>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/policy/policy-detail.css"/>
</head>
<body>
<%@ include file="../common/header.jsp"%>
<div class="container" id="policy-detail">
    <script id="policy-detail-tpl" type="text/x-handlebars-template">
        <div class="title">{{title}}</div>
        <div class="date">{{hotDate}}</div>
        <div class="banner">
            <img src="{{image}}" alt="{{title}}"/>
        </div>
        <div class="content">{{{content}}}</div>
    </script>
</div>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script src="<%=ctx%>/static/dist/js/policyDetail.js"></script>
</body>
</html>