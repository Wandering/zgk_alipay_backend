$(function(){
    var md5=require('md5');
    var interfaceUrl = require('urlConfig');
    var cookie = require('cookie');
    var util = require('commonjs');
    var token = cookie.getCookieValue('token');
    var toUrl = util.getLinkey('state');
    var isLogin = cookie.getCookieValue('isLogin');
    var menuV = util.getLinkey('menu');
    $('#header-title').text('个人信息');
    $('#header-menu').show();

    function getQueryObject(url) {
        url = url == null ? window.location.href : url;
        var search = url.substring(url.lastIndexOf("?") + 1);
        var obj = {};
        var reg = /([^?&=]+)=([^?&=]*)/g;
        search.replace(reg, function (rs, $1, $2) {
            var name = decodeURIComponent($1);
            var val = decodeURIComponent($2);
            val = String(val);
            obj[name] = val;
            return rs;
        });
        return obj;
    }

    function getOpenId(code) {

        $.get(interfaceUrl.getOpenId,{code: code},function(res){
            //alert(JSON.stringify(res))
            if (res.rtnCode == '0000000') {
                cookie.setCookie("openId", res.bizData.openId, 4, "/");
            }
        });
    }
    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.indexOf('micromessenger') > -1) {
            return true;
        } else {
            return false;
        }
    }
    var openId = cookie.getCookieValue('openId');


    if(toUrl=='user-detail'){
        if(!isLogin){
            window.location.href='/login?state=user-detail';
        }else{
            if(menuV=="1"){
                cookie.setCookie("flag", "0", 4, "/");
            }
            var flag = cookie.getCookieValue('flag');
            if(flag=="0"){
                cookie.setCookie("flag", "1", 4, "/");
                window.location.href='/user-detail?state=user-detail&token=' + token + "&code="+getQueryObject(window.location.href).code;
            }
            if(flag=="1"){
                if (isWeiXin()) {
                    if(!openId){
                        var obj = getQueryObject(window.location.href);
                        cookie.setCookie("code", obj.code, 4, "/");
                        //alert(getQueryObject(window.location.href).code)
                        getOpenId(obj.code);
                    }
                }
            }
        }
    }







    function initUserInfo() {
        var avatar = cookie.getCookieValue('avatar');
        if (!avatar) avatar = '/static/dist/img/icons/avatar.png';
        $('#avatar-img').attr('src', avatar);

        var userName = cookie.getCookieValue('userName');
        $('#header-user-name').text(userName || '');

        var phone = cookie.getCookieValue('phone');
        $('#number').text('账号：' + (phone || ''));

        var schoolName = cookie.getCookieValue('schoolName');
        $('#school-name').text(schoolName || '');


        var province = cookie.getCookieValue('proName');
        $('#province').text(province || '');

        var city = cookie.getCookieValue('countyName');
        $('#city').text(city || '');

        var email = cookie.getCookieValue('email');
        $('#email').text(email || '');

        var qrcodeUrl = cookie.getCookieValue('qrcodeUrl');
        if(!qrcodeUrl){
            $('#code-item').hide();
        }
        $('#qrcodeUrl').attr('src', qrcodeUrl || '/static/dist/img/icons/code.png');
    }

    util.ajaxFun(interfaceUrl.getUserInfo, 'GET', {}, function (res) {
        console.log(res)
        if (res.rtnCode == '0000000') {
            var personListData = res.bizData;
            $('#header-user-name').text(personListData.name);
            $('#school-name').text(personListData.schoolName);
            $('#email').text(personListData.mail);
            $('#avatar-img').attr('src',personListData.icon);
            var sexTxt = personListData.sex;
            if(typeof sexTxt == 'number'){
                sexTxt == "0" ? $('#sex').text('女生') : $('#sex').text('男生');
            }else{
                $('#sex').text('');
            }
            var subjectTypeTxt = personListData.subjectType;
            if(typeof subjectTypeTxt == 'number'){
                subjectTypeTxt == "0" ? $('#subject').text('文科') : $('#subject').text('理科');
            }else{
                $('#subject').text('');
            }
        }
    });

    util.ajaxFun(interfaceUrl.getUserGoodsAddress, 'GET', {}, function (res) {
        if (res.rtnCode == '0000000') {
            var bizData = res.bizData;
            if (bizData && bizData.receivingAddress) {
                $('#address').html(bizData.receivingAddress.replace('&', '') + '&nbsp;&nbsp;&nbsp;&nbsp;(' + bizData.contactName + '收)&nbsp;&nbsp;&nbsp;&nbsp;' +  bizData.contactPhone);
            } else {
                $('.update-address').hide();
                $('#address').html('<span style="color: #D70C18">添加收货地址</span>');
                $('#address').css('text-align', 'center');
            }
        }
    });











    initUserInfo();
    $('.modify-btn').on('click', function () {
        window.location.href = '/modify-user-detail?token='+token;
    });
    $('.change-password-btn').on('click', function () {
        var subHtml = ''
            + '<input id="current-psd" type="password" placeholder="当前密码">'
            + '<input id="new-psd" type="password" placeholder="新密码">'
            + '<input id="confirm-psd" type="password" placeholder="确认新密码">'
        util.confirmLayer('修改密码', subHtml);

    });

    $('body').on('click', '#close-modal', function () {
        $(this).removeClass('show');
    });

    $('.update-address, #address').on('click', function() {
        window.location.href = '/address?action=user-detail';
    });

    var userId = cookie.getCookieValue('userId');
    $('#share-links').attr('href', '/code?userId=' + userId+'&uc=1')

    $('body').on('click', '#confirm-btn', function () {
        var currentPsd = $.trim($('#current-psd').val());
        var newPsd = $.trim($('#new-psd').val());
        var confirmPsd = $.trim($('#confirm-psd').val());
        if (currentPsd == '') {
            util.drawToast('当前密码不能为空');
            return false;
        }
        if (currentPsd.length > 16 && currentPsd.length < 6) {
            util.drawToast('密码输入有误，6-16位');
            return false;
        }
        if (newPsd == '') {
            util.drawToast('新密码不能为空');
            return false;
        }
        if (newPsd.length > 16 && newPsd.length < 6) {
            util.drawToast('新密码输入有误，6-16位');
            return false;
        }
        if (confirmPsd == '') {
            util.drawToast('确认密码不能为空');
            return false;
        }
        if (newPsd != confirmPsd) {
            util.drawToast('两次密码输入不一致');
            return false;
        }
        util.ajaxFun(interfaceUrl.postModifyPassword, 'POST', {
            oldPassword: currentPsd,//旧密码
            password: newPsd//新密码'
        }, function (res) {
            console.log(res)
            if (res.rtnCode == '0000000') {
                cookie.deleteCookie('city', '');
                cookie.deleteCookie('county', '');
                cookie.deleteCookie('icon', '');
                cookie.deleteCookie('isLogin', '');
                cookie.deleteCookie('isReported', '');
                cookie.deleteCookie('isSurvey', '');
                cookie.deleteCookie('phone', '');
                cookie.deleteCookie('province', '');
                cookie.deleteCookie('qrcodeUrl', '');
                cookie.deleteCookie('subjectType', '');
                cookie.deleteCookie('token', '');
                cookie.deleteCookie('userKey', '');
                cookie.deleteCookie('userName', '');
                cookie.deleteCookie('vipStatus', '');
                cookie.deleteCookie('userId', '');
                cookie.deleteCookie('proName', '');
                cookie.deleteCookie('cityName', '');
                cookie.deleteCookie('countyName', '');
                cookie.deleteCookie('vipActiveDate', '');
                cookie.deleteCookie('vipEndDate', '');
                cookie.deleteCookie("flag", '');
                cookie.deleteCookie("openId", '');
                cookie.deleteCookie("code", '');
                window.location.href = '/login?state=user-detail';
            } else {
                util.drawToast(res.msg);
            }
        });
    });



});

