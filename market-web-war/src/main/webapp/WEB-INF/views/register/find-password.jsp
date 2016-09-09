<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp"%>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/find-password/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp"%>
<div class="container">
    <div id="register" action="">
        <div class="form-group">
            <div class="input-group">
                <i class="mobile-icon"></i>
                <input type="text" id="register-pwd-phone"  placeholder="请输入手机号码"/>
            </div>
        </div>
        <div class="form-group">
            <input class="check-code" id="verification-pwd-code"  type="text" placeholder="输入验证码"/>
            <button type="button" class="btn btn-code w50" id="verification-pwd-btn">获取验证码</button>
        </div>
        <div class="form-group">
            <div class="input-group">
                <i class="password-icon"></i>
                <input type="password" id="register-pwd-code" placeholder="密码"/>
            </div>
        </div>
        <div class="form-group">
            <div class="input-group">
                <i class="password-icon"></i>
                <input type="password" id="register-pwd-repeat2" placeholder="确认密码"/>
            </div>
        </div>
        <div class="form-group">
            <button class="submit-btn" id="register-pwd-btn">确认</button>
        </div>
    </div>
</div>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script src="<%=ctx%>/static/dist/js/findPassword.js"></script>
</body>
</html>