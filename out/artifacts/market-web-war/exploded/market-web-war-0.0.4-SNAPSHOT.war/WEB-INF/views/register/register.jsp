<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp"%>
    <title>登录页</title>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/register/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp"%>
<div class="container">
    <div class="tab-list">
        <div class="tab tab-login ">注册</div>
        <div class="tab tab-register active">登录</div>
    </div>
    <div class="tab-content " id="login">
        <div class="form-group">
            <div class="input-group">
                <i class="mobile-icon"></i>
                <input type="text" placeholder="请输入手机号码" name="tel"/>
            </div>
        </div>
        <div class="form-group">
            <div class="input-group">
                <i class="password-icon"></i>
                <input type="password" placeholder="请输入密码" name="pwd"/>
            </div>
        </div>
        <div class="reset-password">
            <a>忘记密码？</a>
        </div>
        <div class="form-group">
            <button class="submit-btn" id="login-submit-btn">登录</button>
        </div>
    </div>
    <div id="register" class="tab-content disn">
        <div class="form-group">
            <div class="input-group">
                <i class="mobile-icon"></i>
                <input type="text" placeholder="请输入手机号码" id="reg-tel"/>
            </div>
        </div>
        <div class="form-group">
            <input class="check-code" type="text" placeholder="输入验证码" id="reg-code"/>
            <input type="button" value="获取验证码" id="reg-btn-code"/>
        </div>
        <div class="form-group">
            <div class="title">高考报名地区：</div>
            <div class="location-list">
                <div class="location-option-list"><span>省份</span></div>
                <div class="location-option-list"><span>市</span></div>
                <div class="location-option-list"><span>县</span></div>
            </div>
        </div>
        <div class="form-group">
            <div class="input-group">
                <i class="password-icon"></i>
                <input type="password" placeholder="密码" id="reg-pwd"/>
            </div>
        </div>
        <div class="form-group">
            <div class="input-group">
                <i class="password-icon"></i>
                <input type="password" placeholder="确认密码" id="reg-confirm-pwd"/>
            </div>
        </div>
        <div class="form-group">
            <button class="submit-btn" id="reg-submit-btn">注册</button>
        </div>
    </div>
</div>
<script src="<%=ctx%>/static/dist/js/register.min.js"></script>
</body>
</html>