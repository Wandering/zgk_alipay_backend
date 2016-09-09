<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp" %>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/register/style.css?v=2"/>
</head>
<body>
<%@ include file="../common/header.jsp" %>
<div class="container">
    <div class="tab-list">
        <span class="tab tab-login">登录</span>
        <span class="tab tab-register type-res active" typeRes="1">注册</span>
    </div>
    <div class="tab-content" id="login">
        <div class="form-group">
            <div class="input-group">
                <i class="mobile-icon"></i>
                <input type="text" id="login-phone" placeholder="请输入手机号码"/>
            </div>
        </div>
        <div class="form-group">
            <div class="input-group">
                <i class="password-icon"></i>
                <input type="password" id="login-pwd" placeholder="请输入密码"/>
            </div>
        </div>
        <div class="reset-password">
            <a href="/find-password">忘记密码？</a>
        </div>
        <div class="form-group">
            <button class="submit-btn" id="submit-btn">登录</button>
        </div>
    </div>


    <div class="register-input tab-content login-reg-content" id="register">
        <div class="form-group">
            <div class="input-group">
                <i class="mobile-icon"></i>
                <input type="text" id="register-phone" placeholder="请输入手机号码"/>
            </div>
        </div>
        <div class="form-group">
            <input class="check-code" type="text" id="verification-code" placeholder="输入验证码"/>
            <button type="button" class="btn btn-code w50" id="verification-btn">获取验证码</button>
        </div>
        <div class="form-group areaSel">
            <div class="title">高考报名地区：</div>
            <div class="location-list">
                <span class="select"><select name="" id="province" class="form-control"></select></span>
                <span class="select"><select name="" id="city" class="form-control"></select></span>
                <span class="select"><select name="" id="county" class="form-control"></select></span>
            </div>
            <label class="areaSel-result" id="areaSel-result" style="font-size: 13px;color: #7F7B7B"></label>
        </div>
        <div class="form-group">
            <div class="input-group">
                <i class="password-icon"></i>
                <input type="password" id="register-pwd" placeholder="密码"/>
            </div>
        </div>
        <div class="form-group">
            <div class="input-group">
                <i class="password-icon"></i>
                <input type="password" id="register-pwd-repeat" placeholder="确认密码"/>
            </div>
        </div>
        <div class="form-group">
            <button class="submit-btn" id="register-btn">注册</button>
        </div>
    </div>
</div>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script src="<%=ctx%>/static/dist/js/regLogin.js"></script>
</body>
</html>