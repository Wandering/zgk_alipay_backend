$(function(){
    $('#header-title').text('首页');
    var cookie = require('cookie');
    var isLogin = cookie.getCookieValue('isLogin');
    var userName = cookie.getCookieValue('userName');
    var token = cookie.getCookieValue('token');
    if (isLogin) {
        $('#userName').text(userName);
        $('#consumerLinks').attr('href', '/consumer-list?token=' + token);
        $('#orderLinks').attr('href', '/order?token=' + token);
        $('#userLinks').attr('href', '/user-detail?token=' + token);
        $('#vipStatus-login').attr('href', '/vip?token=' + token);
    }



    if(isLogin){
        $('#index-end-login').show();
        $('#userName-txt').text(userName);
    }else{
        $('#index-un-login').show();
    }
    $('#logout-index-btn').on('click', function () {
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




