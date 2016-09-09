<%
    String path = request.getContextPath();
    String ctx = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path + "/";
%>
<%@ page language="java" pageEncoding="UTF-8" %>
<meta charset="UTF-8">
<title>智高考</title>
<meta content="智高考,高考,gaokao,zhigaokao ,高考志愿填报, 大学志愿填报系统,模拟填报,高考分数查询,招生计划,志愿防撞车,大学查询,大学排名,优秀学校,高考成绩分析,志愿优化,志愿分析,2016高考,高考,全国大学,高考志愿,高考志愿填报绿色通道，2016高考" name="Keywords">
<meta name="description" content="智高考专注高考志愿填报咨询指导，针对不同地区的考生提供特殊的填报技巧，为高考考生提供智能填报系统。">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<link rel="shortcut icon" href="http://cdn.gaokao360.net/static/global/common/images/icon.ico"/>
<link rel="stylesheet" href="<%=ctx%>/static/dist/css/common.css?v=2"/>
<script src="<%=ctx%>/static/src/lib/jquery/jquery-2.2.2.min.js"></script>
<script>
    // 神策数据
    (function(para) {
        var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script',x = null,y = null;
        w['sensorsDataAnalytic201505'] = n;
        w[n] = w[n] || function(a) {return function() {(w[n]._q = w[n]._q || []).push([a, arguments]);}};
        var ifs = ['track','quick','register','registerPage','registerOnce','registerSession','registerSessionOnce','trackSignup', 'trackAbtest', 'setProfile','setOnceProfile','appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify'];
        for (var i = 0; i < ifs.length; i++) {
            w[n][ifs[i]] = w[n].call(null, ifs[i]);
        }
        if (!w[n]._t) {
            x = d.createElement(s), y = d.getElementsByTagName(s)[0];
            x.async = 1;
            x.src = p;
            y.parentNode.insertBefore(x, y);
            w[n]._t = 1 * new Date();
            w[n].para = para;
        }
    })({
        sdk_url: 'http://static.sensorsdata.cn/sdk/sensorsdata.1.3.5.js',
        name: 'sa',
        server_url:'http://guangzhouyijiao.cloud.sensorsdata.cn:8006/sa?token=666cf1b674fb5d42'
    });
</script>




