<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp"%>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/modify-user-detail/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp"%>
<input type="hidden" id="user-birthday" value="">
<input type="hidden" id="user-qq" value="">
<input type="hidden" id="province" value="">
<input type="hidden" id="city" value="">
<input type="hidden" id="county" value="">
<div class="container">
        <div class="avatar">
            <div>
                <img id="avatar-img" src="<%=ctx%>static/dist/img/icons/avatar.png" alt=""/>
            </div>
            <div class="upload-btn">上传头像</div>
            <input type="hidden" id="uploadify_img" value="">
        </div>
        <div class="form-group">
            <div class="label">姓名：</div>
            <input id="name" type="text"/>
        </div>
        <div class="form-group">
            <div class="label">性别选择：</div>
            <div class="options right">
                <span data-value="0" class="sex">女</span>
                <span data-value="1" class="sex">男</span>
            </div>
        </div>
        <div class="form-group">
            <div class="label">所在学校：</div>
            <input id="school_name" type="text"/>
        </div>
        <div class="form-group">
            <div class="label">科目选择：</div>
            <div class="options right">
                <span data-value="0" class="subject">文科</span>
                <span data-value="1" class="subject">理科</span>
            </div>
        </div>
        <div class="form-group">
            <div class="label">Email：</div>
            <input id="email" type="text"/>
        </div>
        <%--<div class="address-group">--%>
            <%--<div class="label">收货地址：</div>--%>
            <%--<div class="address-container">--%>
                <%--<div class="form-group-address">--%>
                    <%--<label class="col-sm-2 control-label mb5"><span>*</span>所在地区：</label>--%>
                    <%--<div class="col-sm-12 areaSel">--%>
                        <%--<span class="select"><select name="" id="province_select" class="form-control"></select></span>--%>
                        <%--<span class="select"><select name="" id="city_select" class="form-control"></select></span>--%>
                        <%--<span class="select"><select name="" id="county_select" class="form-control"></select></span>--%>
                    <%--</div>--%>
                <%--</div>--%>
                <%--<div class="form-group-address">--%>
                    <%--<label class="col-sm-2 control-label mb5"><span>*</span>详细地址：</label>--%>
                    <%--<div class="col-sm-12">--%>
                        <%--<textarea class="form-control detail-address" id="detail_address" placeholder="建议您如实填写详细收货地址，例如街道名称，门牌号码，楼层和房间号等信息"></textarea>--%>
                    <%--</div>--%>
                <%--</div>--%>
                <%--<div class="form-group-address">--%>
                    <%--<label for="postalcode" class="col-sm-2 control-label">邮政编码：</label>--%>
                    <%--<div class="col-sm-10">--%>
                        <%--<input type="text" class="form-control" id="postalcode" placeholder="如果您不清楚邮政编码，请填写000000">--%>
                    <%--</div>--%>
                <%--</div>--%>
                <%--<div class="form-group-address">--%>
                    <%--<label for="consignee" class="col-sm-2 control-label"><span>*</span>收&nbsp;货&nbsp;人：</label>--%>
                    <%--<div class="col-sm-10">--%>
                        <%--<input type="text" class="form-control" id="consignee" placeholder="长度不超过20个字符">--%>
                    <%--</div>--%>
                <%--</div>--%>
                <%--<div class="form-group-address">--%>
                    <%--<label for="phone" class="col-sm-2 control-label"><span>*</span>手机号码：</label>--%>
                    <%--<div class="col-sm-10">--%>
                        <%--<input type="text" class="form-control" id="phone" placeholder="长度不超过20个字符">--%>
                    <%--</div>--%>
                <%--</div>--%>
            <%--</div>--%>
        <%--</div>--%>
        <div class="submit-btn">
            提交
        </div>
</div>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="<%=ctx%>/static/src/lib/sha1/sha1.js"></script>
<script type="text/javascript" src="<%=ctx%>static/dist/js/modifyUserDetail.js"></script>
</body>
</html>