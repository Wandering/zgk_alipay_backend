<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp" %>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/code/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp" %>
<div class="container">
    <div class="user-info clearfix">
        <div class="avatar left">
            <img src="<%=ctx%>/static/dist/img/icons/avatar.png"/>
        </div>
        <div class="summary left">
            <div class="name"></div>
            <div class="account">账号：<span class="tel"></span></div>
        </div>
    </div>
    <div class="code">
        <img src="" class='captchImg' id="captchImg"/>
    </div>
    <p class="code-txt">分享二维码，获取盈利</p>
    <div class="share-btn">
        分享二维码
    </div>
</div>
<div class="mask">
    <img class="sharer-png" src="/static/dist/img/sharer.png"/>
    <p class="sharer-txt">点这里分享二维码</p>
</div>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script src="<%=ctx%>/static/dist/js/code.js"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="<%=ctx%>/static/src/lib/sha1/sha1.js"></script>

</body>
</html>