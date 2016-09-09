$(function () {
    var util = require('commonjs');
    var cookie = require('cookie');
    var toUrl = util.getLinkey('state');
    var isLogin = cookie.getCookieValue('isLogin');
    var token = cookie.getCookieValue('token');
    var userName = cookie.getCookieValue('userName');
    var interfaceUrl = require('urlConfig');
    if (isLogin) {
        $('#userName').text(userName);
    }

    $('#login-btn').attr('href','/login?state='+toUrl);



    //var vipStatus = cookie.getCookieValue('vipStatus');
    //if (vipStatus == "1") {
    //    $('#vipStatus').attr('href', '/vip-check?token=' + token);
    //} else {
    //    $('#vipStatus').attr('href', '/vip?token=' + token);
    //}
    // 打开主菜单
    $('#header-menu').on('click', function () {
        if (isLogin) {
            $('#menu-header').hide();
            $('#end-login').show();
            $('.header-close').on('click', function () {
                $('#menu-header').show();
                $('#end-login').hide();
            });
        } else {
            $('#menu-header').hide();
            $('#province-option').addClass('hide');
            $('#un-login').show();
            $('.header-close').on('click', function () {
                $('#menu-header').show();
                $('#un-login').hide();
            });
        }
    });



    // 切换省份
    $('#province-text').on('click', function () {
        $('#province-option').toggleClass('hide');
        if (isLogin) {
            $('#province-option').hide();
        }
    });
    if (!cookie.getCookieValue('userKey')) {
        cookie.setCookie("userKey", 'sn', 4, "/");
        $('#province-text').text('陕西');
    }
    var userKey = cookie.getCookieValue('userKey');
    var provinceTxt = $('#province-option-list a[domain="' + userKey + '"]').text();
    $('#province-text').text(provinceTxt);
    var paths = window.location.pathname.split('/');
    var pagePath = paths[paths.length - 1];
    $('#province-option-list').on('click', 'a', function () {
        var domainProvince = $(this).attr('domain');
        window.location.href = '/' + pagePath;
        console.log(domainProvince);
        if (!userKey) {
            cookie.setCookie("userKey", 'sn', 4, "/");
        } else {
            cookie.setCookie("userKey", domainProvince, 4, "/");
        }
    });

    var userId = cookie.getCookieValue('userId');
    $('.invite-friend').click(function () {
        var loginFlag = cookie.getCookieValue('isLogin');
        if (loginFlag != 'true') {
            window.location.href = '/login?state=code';
            return false;
        }
        window.location.href = '/code?userId=' + userId;
    });


    // 退出
    $('#logout-btn').attr('href','login?state=user-detail').on('click', function () {
        cookie.deleteCookie("avatar", '');
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
        cookie.deleteCookie("sharerId", '');
        cookie.deleteCookie("sharerType", '');
    });







});