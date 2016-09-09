<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="common/meta.jsp"%>
    <title>首页</title>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/index/index.css"/>
</head>
<body>
<%@ include file="common/header.jsp"%>
<div class="hide" id="index-un-login">
    <div class="content">
        <div class="menu">
            <div class="menu-list clearfix">
                <div class="item">
                    <a href="http://dev.zhigaokao.cn/weixin/index.html#/queryCollege">
                        <img src="<%=ctx%>/static/dist/img/1.png" alt=""/>
                        <span>查院校</span>
                    </a>
                </div>
                <div class="item">
                    <a href="http://dev.zhigaokao.cn/weixin/index.html#/queryMajor">
                        <img src="<%=ctx%>/static/dist/img/2.png" alt=""/>
                        <span>查专业</span>
                    </a>
                </div>
                <%--<div class="item">--%>
                    <%--<a href="">--%>
                        <%--<img src="<%=ctx%>/static/dist/img/3.png" alt=""/>--%>
                        <%--<span>省控线</span>--%>
                    <%--</a>--%>
                <%--</div>--%>
                <div class="item">
                    <a href="http://dev.zhigaokao.cn/weixin/index.html#/simulationSchool">
                        <img src="<%=ctx%>/static/dist/img/4.png" alt=""/>

                        <span>院校预测</span>
                    </a>
                </div>
                <%--<div class="item">--%>
                    <%--<a href="">--%>
                        <%--<img src="<%=ctx%>/static/dist/img/5.png" alt=""/>--%>
                        <%--<span>录取预测</span>--%>
                    <%--</a>--%>
                <%--</div>--%>
                <div class="item">
                    <a href="/policy">
                        <img src="<%=ctx%>/static/dist/img/6.png" alt=""/>
                        <span>高考政策</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/schedule">
                        <img src="<%=ctx%>/static/dist/img/7.png" alt=""/>
                        <span>高考日程</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/login">
                        <img src="<%=ctx%>/static/dist/img/10.png" alt=""/>
                        <span>个人信息</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/login">
                        <img src="<%=ctx%>/static/dist/img/8.png" alt=""/>
                        <span>我的钱包</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/login">
                        <img src="<%=ctx%>/static/dist/img/9.png" alt=""/>
                        <span>我的订单</span>
                    </a>
                </div>
                <div class="item">
                    <a href="javascript:void(0)" class="invite-friend">
                        <img src="<%=ctx%>/static/dist/img/11.png" alt=""/>
                        <span>邀请好友</span>
                    </a>
                </div>
            </div>
            <div class="btn login-btn">
                <a href="/login" id="login-btn">登录/注册</a>
                <a class="vipStatus" href="/login">升级VIP</a>
            </div>
        </div>
    </div>
</div>
<div id="index-end-login" class="hide">
    <div class="content">
        <div class="backdrop"></div>
        <div class="menu">
            <div class="title">
                <span id="userName-txt"></span>
                <%--<span>理科</span>--%>
                <%--<span>580分</span>--%>
            </div>
            <div class="menu-list clearfix">
                <div class="item">
                    <a href="">
                        <img src="<%=ctx%>/static/dist/img/1-active.png" alt=""/>
                        <span>查院校</span>
                    </a>
                </div>
                <div class="item">
                    <a href="http://dev.zhigaokao.cn/weixin/index.html#/queryMajor">
                        <img src="<%=ctx%>/static/dist/img/2-active.png" alt=""/>
                        <span>查专业</span>
                    </a>
                </div>
                <%--<div class="item">--%>
                    <%--<a href="">--%>
                        <%--<img src="<%=ctx%>/static/dist/img/3-active.png" alt=""/>--%>
                        <%--<span>省控线</span>--%>
                    <%--</a>--%>
                <%--</div>--%>
                <div class="item">
                    <a href="http://dev.zhigaokao.cn/weixin/index.html#/simulationSchool">
                        <img src="<%=ctx%>/static/dist/img/4-active.png" alt=""/>
                        <span>院校预测</span>
                    </a>
                </div>
                <%--<div class="item">--%>
                    <%--<a href="">--%>
                        <%--<img src="<%=ctx%>/static/dist/img/5-active.png" alt=""/>--%>
                        <%--<span>录取预测</span>--%>
                    <%--</a>--%>
                <%--</div>--%>
                <div class="item">
                    <a href="/policy">
                        <img src="<%=ctx%>/static/dist/img/6-active.png" alt=""/>
                        <span>高考政策</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/schedule">
                        <img src="<%=ctx%>/static/dist/img/7-active.png" alt=""/>
                        <span>高考日程</span>
                    </a>
                </div>
                <div class="item">
                    <a id="userLinks" href="javascript:void(0)">
                        <img src="<%=ctx%>/static/dist/img/10-active.png" alt=""/>
                        <span>个人信息</span>
                    </a>
                </div>
                <div class="item">
                    <a id="consumerLinks" href="javascript:void(0)">
                        <img src="<%=ctx%>/static/dist/img/8-active.png" alt=""/>
                        <span>我的钱包</span>
                    </a>
                </div>
                <div class="item">
                    <a id="orderLinks" href="javascript:void(0)">
                        <img src="<%=ctx%>/static/dist/img/9-active.png" alt=""/>
                        <span>我的订单</span>
                    </a>
                </div>

                <div class="item">
                    <a href="javascript:void(0)" class="invite-friend">
                        <img src="<%=ctx%>/static/dist/img/11-active.png" alt=""/>
                        <span>邀请好友</span>
                    </a>
                </div>
            </div>
            <div class="btn login-btn">
                <a href="/login/logout" id="logout-index-btn">退出</a>
                <a class="vipStatus" id="vipStatus-login" href="javascript:void(0)">升级VIP</a>
            </div>
        </div>
    </div>
</div>


<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script src="<%=ctx%>/static/dist/js/index.js"></script>
</body>
</html>