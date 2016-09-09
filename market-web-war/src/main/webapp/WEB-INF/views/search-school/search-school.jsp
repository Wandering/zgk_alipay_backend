<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp"%>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/search-school/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp" %>
<div class="container relative">
        <div class="backdrop1 hidden"></div>
        <div class="filter-list">
            <div data-id="1" class="select school-location-btn">院校属地</div>
            <div data-id="2" class="select category">院校分类</div>
            <div data-id="3" class="select level">学历层次</div>
            <div data-id="4" class="select feature">院校特征</div>
        </div>
        <div class="school-location-modal hidden">
            <ul class="location-list">
            </ul>
        </div>
        <div class="search-modal hidden">
            <input id="school_name" type="text" placeholder="院校名称"/>
            <span>取消</span>
            <i class="search-normal-icon"></i>
            <div class="search-result-c">
                <ul class="search-result">
                </ul>
            </div>

        </div>
        <div class="info">
            共<span></span>所学校
        </div>
        <div id="container">
            <div class="scroll">
                <ul class="school-list">
                </ul>
                <div class="pull">
                    <div class="pull-text">上拉浏览更多</div>
                    <div class="infinite-scroll-preloader" id="scroller-pullUp">
                        <div class="preloader"></div>
                    </div>
                </div>
            </div>
        </div>
</div>
<script id="privance-tpl" type="text/x-handlebars-template">
    <li class="active" data-id="" data-code="">全部</li>
{{#each bizData}}
    <li data-id="{{id}}" data-code="{{code}}">{{name}}</li>
{{/each}}
</script>
<script id="school-type-tpl" type="text/x-handlebars-template">
    <li class="active" data-dictId="">全部</li>
    {{#each bizData}}
    <li data-dictId="{{dictId}}">{{name}}</li>
    {{/each}}
</script>
<script id="temp-search-list" type="text/x-handlebars-template">
{{#each bizData.universityList}}
    <li>
    <div class="img">
        {{#whichOne photoUrl}}
        <img src="http://123.59.12.77:8080/{{photoUrl}}" class="school-logo" sid="{{id}}">
        {{else}}
        <img src="{{photoUrl}}" class="school-logo" sid="{{id}}">
        {{/whichOne}}
    </div>
    <div class="summary">
        <div class="title">
            <a href="/school-detail?id={{id}}&action=search-school">{{name}}</a>
        </div>
        <div class="type-list">
            {{#each this.propertys}}
            {{{propertyList this}}}
            {{/each}}
        </div>
        <div class="footer">
            <span><i class="location-normal-icon"></i><span class="province">{{province}}</span></span>
            {{#if rank}}
                <span><i class="flag-icon"></i>排名：{{rank}}</span>
            {{/if}}
        </div>
    </div>
    <div class="forecast-btn">
        <a href="/level-calculate?schoolName={{name}}&typeName={{typeName}}">录取预测</a>
    </div>
    </li>
{{/each}}
</script>
</body>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script src="<%=ctx%>/static/dist/js/searchSchool.js"></script>
</body>
</html>