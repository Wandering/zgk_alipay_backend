<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
  <%@ include file="../common/meta.jsp"%>
  <link rel="stylesheet" href="<%=ctx%>/static/dist/css/school-detail/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp"%>
<div class="container">
  <div class="container-header clearfix">
    <div class="img left">
    </div>
    <div class="summary left">
      <div class="title" id="school_name"></div>
      <div class="description"></div>
      <div class="tags">
        <i class="flag-icon"></i>
        <span class="pm-level"></span>
        <span class="right">录取预测</span>
      </div>
    </div>
  </div>
  <div class="tab-list">
    <div class="tab active">院校简介</div>
    <div class="tab">开设专业</div>
    <div class="tab">招生计划</div>
    <div class="tab">录取情况</div>
  </div>
  <div class="tab-content-list">
    <div class="tab-content">
      <div class="base-info"></div>
      <p class="universityIntro"></p>
    </div>
    <div class="tab-content hidden professional-info">
      <div class="professional" id="special-profession-title"></div>
      <div class="special-content" id="special-content"></div>
      <%--<table>--%>
        <%--<thead>--%>
        <%--<tr>--%>
          <%--<th>专业名称</th>--%>
          <%--<th>学历层次</th>--%>
        <%--</tr>--%>
        <%--</thead>--%>
        <%--<tbody>--%>
        <%--</tbody>--%>
      <%--</table>--%>
    </div>
    <div class="tab-content hidden plan-Enrolling">
      <div class="filter-list">
        <div class="filter" id="year">

        </div>
        <div class="filter" id="subject">
        </div>
        <div class="filter" id="batch" style="overflow: hidden">
        </div>
      </div>
      <table>
        <thead>
        <tr>
          <th>专业名称</th>
          <th>计划人数</th>
          <th>学制</th>
          <th>学费</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
    <div class="tab-content hidden">
      <div class="content school-data">
        <div class="filter-list">
          <div class="title">院校录取数据：</div>
          <div class="filter" id="school_subject">
          </div>
          <div class="filter" id="school_batch">
          </div>
        </div>
        <table>
          <thead>
          <tr>
            <th>年份</th>
            <th>录取数</th>
            <th>最高分</th>
            <th>最低分</th>
            <th>平均分</th>
          </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
      <div class="content professional-data">
        <div class="filter-list">
          <div class="title">专业录取数据：</div>
          <div class="filter" id="professional_year">
          </div>
          <div class="filter" id="professional_subject">
          </div>
          <div class="filter" id="professional_batch">
          </div>
        </div>
        <table>
          <thead>
          <tr>
            <th>专业名称</th>
            <th>录取数</th>
            <th>最高分</th>
            <th>最低分</th>
            <th>平均分</th>
          </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
<script id="baseInfo" type="text/x-handlebars-template">
  <div>院校类型：{{typeName}}</div>
  <div>学历层次：{{levelName}}</div>
  <div>院校隶属：{{subjection}}</div>
  <div>所在省份：{{province}}</div>
  <div>院校网址：{{url}}</div>
  <div>联系电话：{{contactPhone}}</div>
  <div>院校地址：{{address}}</div>
</script>
<script id="open-professional-part1-tpl" type="text/x-handlebars-template">
  {{#each majorList}}
  <tr>
    <td>{{majorName}}</td>
    <td>{{educationLevelName}}</td>
  </tr>
  {{/each}}
</script>
<script id="year-tpl" type="text/x-handlebars-template">
  <label>年份选择：</label>
  {{#each bizData}}
    <span data-id="{{this}}">{{this}}</span>
  {{/each}}
</script>
<script id="subject-tpl" type="text/x-handlebars-template">
  <label>科目选择：</label>
  {{#each bizData}}
  <span data-id="{{dictId}}">{{name}}</span>
  {{/each}}
</script>
<script id="batch-tpl" type="text/x-handlebars-template">
  <label style="float: left">科目选择：</label>
  <div style="float: left;width: 220px">
    {{#each bizData}}
    <span data-id="{{dictId}}">{{name}}</span>
    {{/each}}
  </div>
</script>
<script id="UniversityMajorEnrollingPlan-tpl" type="text/x-handlebars-template">
  {{#each bizData}}
  <tr>
    <td>{{majoredName}}</td>
    <td>{{planEnrolling}}</td>
    <td>{{lengthOfSchooling}}</td>
    <td>{{schoolFee}}</td>
  </tr>
  {{/each}}
</script>
<script id="university-situation-table-tpl" type="text/x-handlebars-template">{{#each bizData}}
<tr>
  <td>{{year}}</td>

  {{#if realEnrollingNumber}}
  <td>{{realEnrollingNumber}}</td>
  {{else}}
  <td>-</td>
  {{/if}}
  {{#if highestScore}}
  <td>{{highestScore}}</td>
  {{else}}
  <td> -</td>
  {{/if}}

  {{#if lowestScore}}
  <td>{{lowestScore}}</td>
  {{else}}
  <td> -</td>
  {{/if}}

  {{#if averageScore}}
  <td>{{averageScore}}</td>
  {{else}}
  <td> -</td>
  {{/if}}
</tr>
{{/each}}
</script>
<script id="UniversityMajorEnrollingSituationList-tpl" type="text/x-handlebars-template">
  {{#each bizData}}
  <tr>
    {{#if majorName}}
    <td>{{majorName}}</td>
    {{else}}
    <td>-</td>
    {{/if}}

    {{#if realEnrollingNumber}}
    <td>{{realEnrollingNumber}}</td>
    {{else}}
    <td>-</td>
    {{/if}}

    {{#if highestScore}}
    <td>{{highestScore}}</td>
    {{else}}
    <td>-</td>
    {{/if}}
    {{#if lowestScore}}
    <td>{{lowestScore}}</td>
    {{else}}
    <td>-</td>
    {{/if}}
    {{#if averageScore}}
    <td>{{averageScore}}</td>
    {{else}}
    <td>-</td>
    {{/if}}
  </tr>
  {{/each}}
</script>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script type="text/javascript" src="<%=ctx%>static/dist/js/schoolDetail.js?V=11"></script>
</body>
</html>
