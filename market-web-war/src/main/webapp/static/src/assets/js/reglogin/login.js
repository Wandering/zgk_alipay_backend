$(function () {
    var util = require('commonjs');
    var cookie = require('cookie');
    var md5 = require('md5');
    var getTime = require('timeFormat');
    var toUrl = util.getLinkey('state');


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
    cookie.deleteCookie('flag', '');




    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.indexOf('micromessenger') > -1) {
            return true;
        } else {
            return false;
        }
    }
    // 登录提交
    $('#submit-btn').on('click', function () {
        var loginPhoneV = $.trim($('#login-phone').val()),
            loginPwdV = $.trim($('#login-pwd').val());
        if (loginPhoneV == "") {
            util.drawToast('请输入手机号');
            return false;
        }
        var regMobile = /^1[3|4|5|6|7|8|9][0-9]{1}[0-9]{8}$/;
        var mobileResult = regMobile.test(loginPhoneV);
        if (mobileResult == false) {
            util.drawToast('手机号有误,请重新输入');
            return false;
        }
        if (loginPwdV == "") {
            util.drawToast('请输入密码');
            return false;
        }
        var md5loginPwdV = $.md5(loginPwdV);
        util.ajaxFun('/login/login', 'GET', {
            account: loginPhoneV,
            password: md5loginPwdV
        }, function (res) {
            if (res.rtnCode === "0000000") {
                $(this).attr('disabled','disabled');
                var token = res.bizData.token;  // token
                var userName = res.bizData.userInfo.name; // 用户名称
                var userId = res.bizData.userInfo.id;  // userId
                var vipStatus = res.bizData.userInfo.vipStatus; // VIP状态
                var vipActiveDate = res.bizData.userInfo.activeDate;
                var vipEndDate = res.bizData.userInfo.endDate;

                var vipActiveDateV = getTime(vipActiveDate).substr(0, 10);
                var vipEndDateV = getTime(vipEndDate).substr(0, 10);
                var phone = res.bizData.userInfo.account; // 用户账号
                var userKey = res.bizData.userInfo.userKey; // 省份userKey
                var province = res.bizData.userInfo.province; // 选择省份
                var proName = res.bizData.userInfo.proName || ''; // 选择省份
                if (proName === 'undefined')proName = '';
                var city = res.bizData.userInfo.city || ''; // 选择城市
                var cityName = res.bizData.userInfo.cityName || ''; // 选择城市
                if (cityName === 'undefined')cityName = '';
                var county = res.bizData.userInfo.county || ''; // 选择县区
                var countyName = res.bizData.userInfo.countyName || ''; // 选择县区
                if (countyName === 'undefined')countyName = '';
                var qrcodeUrl = res.bizData.userInfo.qrcodeUrl;  // 二维码
                var isReported = res.bizData.userInfo.isReported; // 智能填报次数
                var isSurvey = res.bizData.userInfo.isSurvey; // 专家测试次数
                var avatar = res.bizData.userInfo.icon || '';
                sa.track('WeChat_login',{proName:proName});
                cookie.setCookie("avatar", avatar || '', 4, "");
                cookie.setCookie("vipActiveDate", vipActiveDateV || '', 4, "/");
                cookie.setCookie("vipEndDate", vipEndDateV || '', 4, "/");
                cookie.setCookie("isLogin", "true", 4, "/");
                cookie.setCookie("token", token || '', 4, "/");
                cookie.setCookie("userId", userId || '', 4, "/");
                cookie.setCookie("userName", userName || '', 4, "/");
                cookie.setCookie("vipStatus", vipStatus || '', 4, "/");
                cookie.setCookie("phone", phone || '', 4, "/");
                cookie.setCookie("userKey", userKey || '', 4, "/");
                cookie.setCookie("proName", proName || '', 4, "/");
                cookie.setCookie("cityName", cityName || '', 4, "/");
                cookie.setCookie("countyName", countyName || '', 4, "/");
                cookie.setCookie("province", province || '', 4, "/");
                cookie.setCookie("city", city || '', 4, "/");
                cookie.setCookie("county", county || '', 4, "/");
                cookie.setCookie("qrcodeUrl", qrcodeUrl || '', 4, "/");
                cookie.setCookie("isReported", isReported || '', 4, "/");
                cookie.setCookie("isSurvey", isSurvey || '', 4, "/");
                cookie.setCookie("flag", "0", 4, "/" );
                var webUrl = '/'+toUrl+'?state='+ toUrl+"&menu=1";
                var url = 'http://zgkser.zhigaokao.cn/'+toUrl+'?state='+ toUrl+"&menu=1";
                if (isWeiXin()) {
                    url = encodeURIComponent(url);
                    var rUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx552f3800df25e964&redirect_uri=' + url + '&response_type=code&scope=snsapi_base&#wechat_redirect';
                    window.location.href = rUrl;
                } else {
                    window.location.assign(webUrl);
                }
            } else {
                util.drawToast(res.msg);
            }
        });
    });
});
















