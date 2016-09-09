<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
  <%@ include file="../common/meta.jsp"%>
  <link rel="stylesheet" href="<%=ctx%>/static/dist/css/major-detail/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp"%>
<div class="tab">
  <div class="item" data-id="1">专业解读</div>
  <div class="liner"></div>
  <div class="item" data-id="2">开设院校</div>
</div>
<div>
  <div class="container hidden" id="container_1"></div>
  <div class="container hidden" id="container_2">
    <div class="scroll">
      <ul class="school-list">
      </ul>
      <%--<div class="pull">--%>
        <%--<div class="pull-text">上拉浏览更多</div>--%>
        <%--<div class="infinite-scroll-preloader" id="scroller-pullUp">--%>
          <%--<div class="preloader"></div>--%>
        <%--</div>--%>
      <%--</div>--%>
    </div>
  </div>
</div>
<script type="text/x-handlebars-template" id="detile">
  <div class="container-header">
    <div class="title">
      {{majorName}}
    </div>
    <div>授予学位：{{degreeOffered}}</div>
    <div>修学年限：{{schoolingDuration}}</div>
    <div>专业代码：{{majorCode}}</div>
  </div>
  <div class="container-content">
    <div class="content">
      <div class="title">开设课程</div>
      <div class="description">{{offerCourses}}</div>
    </div>
    <div class="content">
      <div class="title">专业解读</div>
      <div class="description" id="majorIntroduce">
      </div>
    </div>
  </div>
</script>
<script id="temp-search-list" type="text/x-handlebars-template">
  {{#each bizData.universityList}}
  <li>
    {{#compare rank '<' 4}}
    <img class="rank-img" src="/static/dist/img/rank_img_{{rank}}.png">
    {{/compare}}
    <div class="img">
      <img src="http://123.59.12.77:8080/{{photo_url}}" class="school-logo" sid="{{id}}">
    </div>
    <div class="summary">
      <div class="title" data-id="{{id}}">
        {{name}}
      </div>
      <div class="type-list">
        {{#each this.property}}
        {{{propertyList this}}}
        {{/each}}
      </div>
      <div class="footer">
        <span><i class="location-normal-icon"></i><span class="province">{{province}}</span></span>
        {{#if rank}}
        <span><i class="flag-icon"></i>全国排名:{{rank}}</span>
        {{/if}}
        {{#if majorRank}}
        <span style="margin-left: 5px">专业排名:{{majorRank}}</span>
        {{/if}}
      </div>
    </div>
  </li>
  {{/each}}
</script>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script type="text/javascript" src="<%=ctx%>static/dist/js/majorDetail.js?V=11"></script>
</body>
</html>
