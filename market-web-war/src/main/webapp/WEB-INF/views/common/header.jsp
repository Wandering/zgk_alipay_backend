<%@ page language="java" pageEncoding="UTF-8" %>
<div id="menu-header">
    <header>
        <div class="header-btn hide" id="header-menu">
            <i class="menu-icon"></i>
        </div>
        <div class="header-btn header-back  hide" id="header-back">
            <i class="back-icon"></i>
        </div>
        <div class="header-title">
            <span id="header-title"></span>
            <span class="location location-icon" id="province-text"></span>
        </div>
        <div class="header-btn header-search hide" id="header-search">
            <i class="search-icon"></i>
        </div>
    </header>
</div>

<div id="end-login" class="hide">
    <header>
        <div class="header-btn header-close" id="">
            <i class="close-icon"></i>
        </div>
    </header>
    <div class="content">
        <div class="backdrop"></div>
        <div class="menu">
            <div class="title">
                <span id="userName"></span>
                <%--<span>理科</span>--%>
                <%--<span>580分</span>--%>
            </div>
            <div class="menu-list clearfix">
                <div class="item">
                    <a href="/search-school?v=12344">
                        <img src="<%=ctx%>/static/dist/img/1.png" alt=""/>
                        <span>查院校</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/major-search">
                        <img src="<%=ctx%>/static/dist/img/2.png" alt=""/>
                        <span>查专业</span>
                    </a>
                </div>
                <div class="item">
                <a href="/passing-score">
                <img src="<%=ctx%>/static/dist/img/3.png" alt=""/>
                <span>省批次线</span>
                </a>
                </div>
                <div class="item">
                    <a href="/school-calculate">
                        <img src="<%=ctx%>/static/dist/img/4.png" alt=""/>
                        <span>院校预测</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/level-calculate">
                        <img src="<%=ctx%>/static/dist/img/5.png" alt=""/>
                        <span>录取预测</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/policy">
                        <img src="<%=ctx%>/static/dist/img/6.png" alt=""/>
                        <span>高考热点</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/schedule">
                        <img src="<%=ctx%>/static/dist/img/7.png" alt=""/>
                        <span>高考日程</span>
                    </a>
                </div>
                <div class="item">
                    <a id="userLinks" href="user-detail?state=user-detail&menu=1">
                        <img src="<%=ctx%>/static/dist/img/10.png" alt=""/>
                        <span>个人信息</span>
                    </a>
                </div>
                <div class="item">
                    <a id="consumerLinks" href="consumer-list?state=consumer-list&menu=1">
                        <img src="<%=ctx%>/static/dist/img/8.png" alt=""/>
                        <span>我的钱包</span>
                    </a>
                </div>
                <div class="item">
                    <a id="orderLinks" href="order?state=order&menu=1">
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
                <div class="item">
                    <a href="/intro" class="">
                        <img src="<%=ctx%>/static/dist/img/rule.png" alt=""/>
                        <span>盈利规则</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/vip" class="">
                        <img src="<%=ctx%>/static/dist/img/vip.png" alt=""/>
                        <span>关于智高考</span>
                    </a>
                </div>

            </div>
            <div class="btn login-btn">
                <a href="javascript:void(0)" id="logout-btn">退出</a>
                <a id="vipStatus" href="vipBck?state=vipBck">升级VIP</a>
            </div>
        </div>
    </div>
</div>

<div class="hide" id="un-login">
    <header>
        <div class="header-btn header-close" id="">
            <i class="close-icon"></i>
        </div>
    </header>
    <div class="content">
        <div class="backdrop"></div>
        <div class="menu">
            <div class="menu-list clearfix">
                <div class="item">
                    <a href="/search-school?v=1312313">
                        <img src="<%=ctx%>/static/dist/img/1.png" alt=""/>
                        <span>查院校</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/major-search">
                        <img src="<%=ctx%>/static/dist/img/2.png" alt=""/>
                        <span>查专业</span>
                    </a>
                </div>
                <div class="item">
                <a href="/passing-score">
                <img src="<%=ctx%>/static/dist/img/3.png" alt=""/>
                <span>省批次线</span>
                </a>
                </div>
                <div class="item">
                    <a href="/school-calculate">
                        <img src="<%=ctx%>/static/dist/img/4.png" alt=""/>

                        <span>院校预测</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/level-calculate">
                        <img src="<%=ctx%>/static/dist/img/5.png" alt=""/>
                        <span>录取预测</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/policy">
                        <img src="<%=ctx%>/static/dist/img/6.png" alt=""/>
                        <span>高考热点</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/schedule">
                        <img src="<%=ctx%>/static/dist/img/7.png" alt=""/>
                        <span>高考日程</span>
                    </a>
                </div>
                <div class="item">
                    <a href="user-detail?state=user-detail&menu=1">
                        <img src="<%=ctx%>/static/dist/img/10.png" alt=""/>
                        <span>个人信息</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/consumer-list?state=consumer-list&menu=1">
                        <img src="<%=ctx%>/static/dist/img/8.png" alt=""/>
                        <span>我的钱包</span>
                    </a>
                </div>
                <div class="item">
                    <a href="order?state=order&menu=1">
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
                <div class="item">
                    <a href="/intro" class="">
                        <img src="<%=ctx%>/static/dist/img/rule.png" alt=""/>
                        <span>盈利规则</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/vip" class="">
                        <img src="<%=ctx%>/static/dist/img/vip.png" alt=""/>
                        <span>关于智高考</span>
                    </a>
                </div>
            </div>
            <div class="btn login-btn">
                <a href="javascript:void(0)" id="login-btn">登录/注册</a>
                <%--<a class="vipStatus" href="vip?state=vip">购买VIP</a>--%>
                <a class="vipStatus" href="vipBck?state=vipBck">升级VIP</a>
            </div>
        </div>
    </div>
</div>


<div class="hide" id="province-option">
    <div class="content">
        <div class="backdrop"></div>
        <div class="menu">
            <div class="province-option-list" id="province-option-list">
                <a class="province-item" href="javascript:void(0)" domain="sn">陕西</a>
                <a class="province-item" href="javascript:void(0)" domain="zj">浙江</a>
                <a class="province-item" href="javascript:void(0)" domain="fj">福建</a>
                <a class="province-item" href="javascript:void(0)" domain="gd">广东</a>
                <a class="province-item" href="javascript:void(0)" domain="hb">湖北</a>
                <a class="province-item" href="javascript:void(0)" domain="hn">湖南</a>
                <a class="province-item" href="javascript:void(0)" domain="gx">广西</a>
                <a class="province-item" href="javascript:void(0)" domain="ha">河南</a>
                <a class="province-item" href="javascript:void(0)" domain="sd">山东</a>
                <a class="province-item" href="javascript:void(0)" domain="he">河北</a>
                <a class="province-item" href="javascript:void(0)" domain="sc">四川</a>
                <a class="province-item" href="javascript:void(0)" domain="sh">上海</a>
                <a class="province-item" href="javascript:void(0)" domain="cq">重庆</a>
                <a class="province-item" href="javascript:void(0)" domain="jx">江西</a>
                <a class="province-item" href="javascript:void(0)" domain="yn">云南</a>
                <a class="province-item" href="javascript:void(0)" domain="bj">北京</a>
                <a class="province-item" href="javascript:void(0)" domain="tj">天津</a>
                <a class="province-item" href="javascript:void(0)" domain="hi">海南</a>
                <a class="province-item" href="javascript:void(0)" domain="ah">安徽</a>
                <a class="province-item" href="javascript:void(0)" domain="js">江苏</a>
                <a class="province-item" href="javascript:void(0)" domain="jl">吉林</a>
                <a class="province-item" href="javascript:void(0)" domain="ln">辽宁</a>
                <a class="province-item" href="javascript:void(0)" domain="gs">甘肃</a>
                <a class="province-item" href="javascript:void(0)" domain="sx">山西</a>
                <a class="province-item" href="javascript:void(0)" domain="gz">贵州</a>
                <a class="province-item" href="javascript:void(0)" domain="nx">宁夏</a>
                <a class="province-item" href="javascript:void(0)" domain="xj">新疆</a>
                <a class="province-item" href="javascript:void(0)" domain="hl">黑龙江</a>
            </div>
        </div>
    </div>
</div>


<script src="<%=ctx%>/static/dist/js/header.js"></script>