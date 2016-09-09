$(function () {
    var urlConfig = require('urlConfig');
    var cookie = require('cookie');
    var token = cookie.getCookieValue('token');
    var isLogin = cookie.getCookieValue('isLogin');
    var getTime = require('timeFormat');
    $('#header-title').text('VIP');
    $('#header-menu').show();
    var vipActiveDate = cookie.getCookieValue('vipActiveDate');
    var vipEndDate = cookie.getCookieValue('vipEndDate');
    $('#startDate').text(vipActiveDate);
    $('#endDate').text(vipEndDate);
    $('#vip-buy').attr('href','/vip-buy?token='+token);
});











