<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp" %>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/schedule/schedule.css"/>
</head>
<body>
<%@ include file="../common/header.jsp" %>
<div class="container">
    <div class="calendar-drop-down hidden">
        <div class="year">
            <ul class="calendar-list" id="calendar-list">
                <li data-id="1">1月</li>
                <li data-id="2">2月</li>
                <li data-id="3">3月</li>
                <li data-id="4">4月</li>
                <li data-id="5">5月</li>
                <li data-id="6">6月</li>
                <li data-id="7">7月</li>
                <li data-id="8">8月</li>
                <li data-id="9">9月</li>
                <li data-id="10">10月</li>
                <li data-id="11">11月</li>
                <li data-id="12" class="last-child">12月</li>
            </ul>
        </div>
    </div>
    <div class="header">
        <span id="cur_date">03月/2016年</span>
        <i class="calendar-icon"></i>
    </div>
    <div class="content" id="schedule-content">
    </div>
    <script id="article-detail" type="text/x-handlebars-template">
        <div class="title">{{title}}</div>
        <div class="date">{{formatDate lastModDate}}</div>
        <div class="detail">
            {{{content}}}
        </div>
    </script>
</div>
<script type="text/javascript" src="<%=ctx%>/static/dist/js/commons.js"></script>
<script type="text/javascript" src="<%=ctx%>static/dist/js/schedule.js"></script>
</body>
</html>