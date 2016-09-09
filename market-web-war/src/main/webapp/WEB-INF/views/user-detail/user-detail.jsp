<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp" %>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/user-detail/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp" %>
<div class="container">
    <div class="user-info">
        <span class="modify-btn">
            修改
        </span>
        <div class="info-center">
            <div><img id="avatar-img" src="<%=ctx%>/static/dist/img/icons/avatar.png" alt=""/></div>
            <div class="name" id="header-user-name"></div>
            <div class="account" id="number"></div>
        </div>
    </div>
    <div class="user-detail">
        <ul class="detail-list">
            <li>
                <span>性别：</span>
                <span id="sex"></span>
            </li>
            <li>
                <span>所在省份：</span>
                <span id="province"></span>
            </li>
            <li>
                <span>所在县区：</span>
                <span id="city"></span>
            </li>
            <li>
                <span>所在中学：</span>
                <span id="school-name"></span>
            </li>
            <li>
                <span>科目：</span>
                <span id="subject"></span>
            </li>
            <li>
                <span>Email：</span>
                <span id="email"></span>
            </li>
            <li class="code-item" id="code-item">
                <a href="javascript:;" class="code-links" id="share-links">
                    <span>我的二维码：</span>
                    <span>
                        <img id="qrcodeUrl" src="" alt=""/>
                    </span>
                </a>
            </li>
            <li class="detail-info">
                <span>收货地址：</span><span class="update-address" style="color: #D70C18">修改收货地址</span>
                <div id="address"></div>
            </li>
        </ul>
    </div>
    <div class="change-password-btn">
        修改密码
    </div>
</div>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script type="text/javascript" src="<%=ctx%>static/dist/js/userDetail.js"></script>
</body>
</html>