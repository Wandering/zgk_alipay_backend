<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp" %>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/school-info/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp" %>
<header>
    <div class="header-btn">
        <i class="menu-icon"></i>
    </div>
    <div class="header-title">
        <span>高考政策</span>
        <span class="location location-icon">陕西</span>
    </div>
    <div class="header-btn search-btn">
        <i class="search-icon"></i>
    </div>
</header>
<div class="container">
    <div class="search-modal hidden">
        <input type="text" placeholder="院校姓名"/>
        <span>取消</span>
        <i class="search-normal-icon"></i>
    </div>
    <div class="backdrop hidden"></div>
    <div class="filter-list">
        <div class="location"><span>院校属地</span></div>
        <div class="category"><span>院校分类</span></div>
        <div class="level"><span>学历层次</span></div>
        <div class="feature"><span>院校特征</span></div>
    </div>
    <div class="info">
        共<span class="school-sum"></span>所学校
    </div>
    <ul id="school-list"></ul>
    <script id="school-list-tpl" type="text/x-handlebars-template">
        {{#each universityList}}
        <li>
            <div class="img">
                <img src="http://123.59.12.77:8080{{photoUrl}}" alt="{{name}}"/>
            </div>
            <div class="summary">
                <div class="title" data-url="{{url}}" data-id="{{id}}">{{name}}</div>
                <div class="type-list">
                    {{#each this.propertys}}
                    {{{propertyList this}}}
                    {{/each}}
                </div>
                <div class="footer">
                    <span><i class="location-normal-icon"></i><span>{{province}}</span></span>
                    <span><i class="flag-icon"></i>排名：{{rank}}</span>
                </div>
            </div>
            <div class="forecast-btn" setTarget="{{id}}">录取预测</div>
        </li>
        {{/each}}
    </script>
</div>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script type="text/javascript" src="<%=ctx%>static/dist/js/schoolInfo.js"></script>
</body>
</html>