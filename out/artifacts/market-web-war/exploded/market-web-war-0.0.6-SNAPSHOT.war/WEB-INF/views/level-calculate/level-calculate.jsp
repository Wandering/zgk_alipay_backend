<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp"%>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/level-calculate/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp"%>
<div class="container">
    <div class="form-group">
        <label>科目</label>
        <div class="options">
            <span data-type="1">文科</span>
            <span data-type="2" class="active">理科</span>
        </div>
    </div>
    <div class="form-group">
        <label>分数</label>
        <div class="input">
            <input id="score" type="text" placeholder="请输入分数"/>
        </div>
    </div>
    <div class="form-group">
        <label>目标院校</label>
        <div class="input">
            <input id="target_institutions" type="text" placeholder="请输入院校名称"/>
        </div>
    </div>
    <div class="calculate-btn">
        开始预测
    </div>
    <div class="info">
        温馨提示：选择科类、输入分数及目标院校，系统会根据独有算法计算出您的分数与您心仪院校的匹配程度，一键获取目标大学录取难易程度
    </div>
</div>
<div class="content-b" style="display: block;">
</div>
<script id="temp-content" type="text/x-handlebars-template">
<div class="container-header">
    <div class="info">
        <label>科目：</label><span id="type-subject"></span>
        <label>分数：</label><span>{{score}}</span>
    </div>
    <div class="info">
        <label>目标院校：</label><span>{{universityName}}</span>
    </div>
    <div class="info star-list">
        <label>录取难易程度：</label><span id="star-list"></span>
    </div>
    <%--<div class="info">--%>
        <%--<label>推荐批次：</label><span>{{batch}}</span>--%>
    <%--</div>--%>
</div>
<div class="hr">
    <span>历史分数参考价值很大哟！</span>
</div>
<div class="container-content">
    <div class="title">
        {{universityName}}历年分数线
    </div>
    <table>
        <thead>
        <tr>
            <th>年份</th>
            <th>院校</th>
            <th>批次</th>
            <th>录取人数</th>
            <th>最低分</th>
            <th>平均分</th>
        </tr>
        </thead>
        <tbody>
        {{#each historyList}}
        <tr>
            <td>{{year}}</td>
            <td>{{universityName}}</td>
            <td>{{batch}}</td>
            <td>{{enrollingNumber}}</td>
            <td>{{minScore}}</td>
            <td>{{avgScore}}</td>
        </tr>
        {{/each}}
        </tbody>
    </table>
    <div class="data-tips"></div>
    <div class="back">返回上一步</div>
</div>
</script>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script type="text/javascript" src="<%=ctx%>static/dist/js/levelCalculate.js?V=20160608"></script>
</body>
</html>