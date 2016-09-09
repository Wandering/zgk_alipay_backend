<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp" %>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/policy/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp" %>
<div class="container" id="container">
    <div>
        <ul id="policy-list"></ul>
        <script id="policy-list-tpl" type="text/x-handlebars-template">
            {{#each rows}}
            <li id="{{id}}">
                <a href="/policy-detail?id={{id}}">
                    <p class="img">
                        <img src="{{image}}" alt="{{title}}" class="info-img"/>
                    </p>
                    <div class="summary">
                        <div class="title">{{title}}</div>
                        <div class="content">{{subContent}}</div>
                        <div class="date">
                            {{hotDate}}
                        </div>
                    </div>
                </a>
            </li>
            {{/each}}
        </script>
        <div class="pull" data-flag="on">
            <div class="pull-text"></div>
            <div class="infinite-scroll-preloader" id="scroller-pullUp">
                <div class="preloader"></div>
            </div>
        </div>
    </div>
</div>

<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script src="<%=ctx%>/static/dist/js/policy.js"></script>
</body>
</html>