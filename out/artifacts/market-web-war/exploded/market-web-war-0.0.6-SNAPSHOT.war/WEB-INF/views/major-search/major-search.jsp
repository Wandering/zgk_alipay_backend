<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
  <%@ include file="../common/meta.jsp"%>
  <link rel="stylesheet" href="<%=ctx%>/static/dist/css/major-search/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp"%>
<div class="container">
  <div class="backdrop1 hidden"></div>
  <div class="search-modal hidden">
    <input id="school_name" autocomplete="off" type="text" placeholder="专业名称"/>
    <span>取消</span>
    <i class="search-normal-icon"></i>
    <div class="search-result-c">
      <ul class="search-result">
      </ul>
    </div>

  </div>
  <div class="tab-list">
    <div data-type="1" class="tab active">本科</div>
    <div data-type="2" class="tab">专科</div>
  </div>
  <div class="tab-content">
    <div class="content">
      <ul class="menu-list marjor-list">
      </ul>
      <ul class="menu-inner-list">
      </ul>
      <div class="no-data hidden"></div>
    </div>
  </div>
</div>
<script type="text/x-handlebars-template" id="marjor_list">
{{#each childList}}
<li data-id="{{id}}">{{name}}</li>
{{/each}}
</script>
<script type="text/x-handlebars-template" id="marjor_detile_list">
  {{#each this}}
  <li><a href="/major-detail?id={{id}}">{{name}}</a></li>
  {{/each}}
</script>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script type="text/javascript" src="<%=ctx%>static/dist/js/majorSearch.js?V=11"></script>
</body>
</html>
