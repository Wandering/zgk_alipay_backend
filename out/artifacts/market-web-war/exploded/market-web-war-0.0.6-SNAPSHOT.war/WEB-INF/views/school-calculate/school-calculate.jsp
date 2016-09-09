<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
  <%@ include file="../common/meta.jsp"%>
  <link rel="stylesheet" href="<%=ctx%>/static/dist/css/school-calculate/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp"%>
<div class="container">
  <form action="">
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
    <div class="calculate-btn">
      开始预测
    </div>
    <div class="info">
      温馨提示：选择科类、输入分数，系统自动整合大量院
      校数据，一键预测考生适合哪些院校，并给出各院校录
      取指数。
    </div>
  </form>
</div>
<div class="content-b" style="display: block;">
</div>
<script id="temp-content" type="text/x-handlebars-template">
  <div class="container-header">
    <div class="info">
      <label>科目：</label><span id="type-subject"></span>
      <label>分数：</label><span id="score-tmp"></span>
    </div>
    <div class="info">
      <label>为你推荐目标院校：</label><span id="totalnum">0</span>所
    </div>
  </div>
  <div class="container-content">
    <table>
      <thead>
      <tr>
        <th>专业名称</th>
        <th>排名</th>
        <th>录取批次</th>
        <th>录取指数</th>
      </tr>
      </thead>
      <tbody>
      {{#each this}}
      {{#each list}}
      <tr>
        <td>
          <div class="school-info">
            <p class="name"><a href="/school-detail?id={{universityId}}&action=school-calculate">{{universityName}}</a></p>
              <div class="list-type">
                    <span id="property">
                        {{#each this.propertys}}
                        {{{propertyList this}}}
                        {{/each}}
                    </span>
              </div>
          </div>
        </td>
        {{#if rank}}
        <td>{{rank}}</td>
        {{else}}
        <td>-</td>
        {{/if}}
        <td>
          {{{batchStr batch}}}
        </td>
        <td>
          {{{stars ../star}}}
        </td>
      </tr>
      {{/each }}
      {{/each}}
      </tbody>
    </table>
  </div>
</script>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script type="text/javascript" src="<%=ctx%>static/dist/js/schoolCalculate.js?V=11"></script>
</body>
</html>
