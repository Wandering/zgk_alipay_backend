<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp" %>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/vip/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp" %>
<div class="container vip-main">
    <div class="">
        <h3 class="t1">智高考，精准的高考志愿填报产品</h3>
        <h4 class="t2">智高考，不浪费孩子的每一分</h4>
        <img class="img" src="<%=ctx%>/static/dist/img/vip-pic1.png" alt="">
        <p class="txt">别光关注孩子的分数，志愿填报更加重要！</p>
        <p class="txt">
            据权威数据显示，每年参加高考的学子有900多万，而每年900多万考生中只有4%的考生对自己的专业满意。对学校、专业的不满意直接影响学生在大学阶段的学习状态，加之许多专业与社会需求的不匹配，导致毕业后就业难。</p>
        <p class="txt">
            这一现象的背后是高考信息不对称，考生和家长对自身特点不了解。在这种情况下，全通教育旗下的战略性产品——智高考应运而生。智高考本着“不浪费孩子的每一分”的理念，致力于让每个孩子上到满意的大学。</p>
        <img class="img" src="<%=ctx%>/static/dist/img/vip-pic2.png" alt="">
        <p class="txt cred">使用智高考，把孩子的每一分发挥到极致，让孩子进入最满意的大学</p>
        <p class="txt cred"><span class="red-dash-number">1</span>模拟填报，帮助考生合理制定报考目标</p>
        <img class="img" src="<%=ctx%>/static/dist/img/vip-pic3.png" alt="">
        <p class="txt">模拟估分选大学，输入分数一键预测适合院校和录取指数</p>
        <p class="txt cred"><span class="red-dash-number">2</span>一键查询目标院校录取概率，量化与理想的距离</p>
        <img class="img" src="<%=ctx%>/static/dist/img/vip-pic4.png" alt="">
        <p class="txt"><span class="black-dash"></span>定位目标院校，时时查看与目标院校的差距并督促学习</p>
        <p class="txt cred"><span class="red-dash-number">3</span>智能填报，准确推荐报考院校，科学评估报考方案</p>
        <img class="img" src="<%=ctx%>/static/dist/img/vip-pic5.png" alt="">
        <ul>
            <li><span class="black-dash"></span>综合考虑理想地区、大学类型、专业倾向</li>
            <li><span class="black-dash"></span>全面分析考生的分数、位次，结合高校录取分数和名额</li>
            <li><span class="black-dash"></span>将每一分发挥到极致，为考生制定最合理的填报方案</li>
        </ul>
        <p class="txt cred"><span class="red-dash-number">4</span>报考前，掌握最靠谱、最及时的高考信息</p>
        <ul>
            <li><span class="black-dash"></span>高考资讯时时掌握，不错过每一个好机会</li>
            <li><span class="black-dash"></span>知晓大学真实情况，不被虚假信息蒙蔽双眼</li>
            <li><span class="black-dash"></span>充分了解专业概况，不被相似名称混淆视听</li>
            <p class="kouhao">七分成绩定，三分志愿拼</p>
        </ul>
    </div>
</div>

<div class="fix-link-box">
    <a class="col-1" id="vip-buy" href="vip-buy?state=vip-buy&menu=1">购买</a>
    <a class="col-1" id="invite-friends" href="code?state=code&menu=1">邀请好友</a>
</div>


<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script src="<%=ctx%>/static/dist/js/vip.js"></script>
<script type="text/javascript">
    window.onload = function() {
        $('#header-title').text('关于智高考');
    }
</script>
</body>
</html>