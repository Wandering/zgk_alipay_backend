  <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
  <%@ include file="../common/meta.jsp"%>
  <link rel="stylesheet" href="<%=ctx%>/static/dist/css/vip-buy-detial/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp"%>
<div class="container">
  <div class="wrapper">
    <h6></h6>
    <div class="paragraph-title">
      2015年院校数据查询
    </div>
    <p>VIP用户可查看2015年最新数据，包括全国近3000所院校的录取分数、招生计划数、录取人数、最高位次等，更有分数趋势图，清晰直观地为您提供报考依据。</p>
    <div class="img">
      <img src="<%=ctx%>static/dist/img/vbd1.png">
    </div>
    <div class="paragraph-title">
      目标定位
    </div>
    <p>考生已设置为目标院校的大学，可进入“个人中心”-“目标定位”查看当前分数与目标院校的距离，及时调整、迎战高考。</p>
    <div class="img">
      <img src="<%=ctx%>static/dist/img/vbd2.png">
    </div>
    <div class="paragraph-title">
      院校预测
    </div>
    <p>根据分数预测可报考院校，通过录取指数提前锁定学校，让志愿更精准。</p>
    <div class="img">
      <img src="<%=ctx%>static/dist/img/vbd3.png">
    </div>
    <div class="paragraph-title">
      录取难易预测
    </div>
    <p>帮助考生预测目标院校的录取概率，提前预测，控制落榜风险。</p>
    <div class="paragraph-title">
      智能填报
    </div>
    <p>借助大数据分析及智能算法，帮助考生筛选录取机率高、符合心理预期的院校和专业，多方面对比，给出考生一套科学全面的志愿填报方案。</p>
    <div class="paragraph-title">
      专业评测
    </div>
    <p>引进美国MBTI性格测评平台，通过考生的性格、兴趣、职业等多个维度给出专业选择评估报告，避免出现因为专业选择不当而影响毕业就业的情况。</p>
    <div class="paragraph-title jbdk">
      智学堂
    </div>
    <p class="jbdk">特约国内顶级高中名师，提供在线视频指导。精品课程、考点难点，一网打尽。</p>
  </div>
</div>
<div class="buy-bottom">
  <div class="buy-info address" style="border-bottom: 1px solid #D8D8D8;">
    <span class="left icon-address"></span>
    <span class="left address-info">
      <span class="vertical"></span>
    </span>
    <span class="left icon-into"></span>
  </div>
  <div class="buy-info">
    <div class="buy-num">
      <span class="text">数量：</span>
      <span class="sub subtraction"></span>
      <span class="number" id="number">1</span>
      <span class="plus plus-able"></span>
    </div>
    <div class="buy-price">
    </div>
  </div>
  <div class="buy-action">
    <div class="buy-shopping">￥<span class="total-price"></span>.<span class="sub-price">00</span></div>
    <div class="buy-go">现在支付</div>
  </div>
</div>
<div class="modal-overlay" id="modal_overlay"></div>
<div class="modal" id="modal">
  <div class="modal-title">订单确认</div>
  <div class="modal-body">
    <p class="info"></p>
    <div class="btn paying">立即支付</div>
    <input type="hidden" id="orderNo">
  </div>
</div>

<div class="modal" id="modal-tips">
  <div class="modal-title">收货地址</div>
  <div class="modal-body">
    <p class="info">购买前请输入您的收货地址</p>
    <div class="btn modal-tips-close">去填写地址</div>
  </div>
</div>

<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script src="<%=ctx%>/static/dist/js/pingpp.js"></script>
<script src="<%=ctx%>/static/dist/js/vipBuyDetail.js?v=11"></script>
</body>
</html>