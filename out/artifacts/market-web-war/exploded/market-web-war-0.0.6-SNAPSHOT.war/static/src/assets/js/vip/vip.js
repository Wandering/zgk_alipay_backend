$(function () {
    var cookie = require('cookie');
    var util = require('commonjs');
    var urlConfig = require('urlConfig');
    var account = cookie.getCookieValue('phone');
    var getTime = require('timeFormat');

    var isLogin = cookie.getCookieValue('isLogin');
    var toUrl = util.getLinkey('state');
    var userId = cookie.getCookieValue('userId');


    $('#account-number').val(account);
    $('#header-menu').show();
    $('#header-title').text('升级VIP');





    var sharerId = util.getLinkey('sharerId');
    var sharerType = util.getLinkey('sharerType');

    cookie.setCookie("sharerId", sharerId, 4, "/" );
    cookie.setCookie("sharerType", sharerType, 4, "/" );





    function initInfo() {
        var vipStatus = cookie.getCookieValue('vipStatus');
        if (vipStatus == '1') {
            var vipActiveDateV = cookie.getCookieValue('vipActiveDate');
            var vipEndDateV = cookie.getCookieValue('vipEndDate');
            $('.vip-time').html('VIP时效:从' + vipActiveDateV + '到' + vipEndDateV);
            $('.viped').show();
            $('.no-vip').hide();
        }
    }

    $(document).ready(function() {
        initInfo();
        $('.vip-btn').click(function () {
            var cardNum = $.trim($('#card-number').val());
            var cardPsd = $.trim($('#card-psd').val());
            if (!cookie.getCookieValue('isLogin')) {
                util.drawToast('请先登录后再操作!');
                setTimeout(function() {
                    window.location.href = "/login?state=vipBck";
                }, 500)
                return false;
            }
            if (cardNum == "") {
                util.drawToast('卡号不能为空');
                return;
            }
            if (cardNum.length != 10 && cardNum.length != 8) {
                util.drawToast('请输入正确的卡号');
                return;
            }
            if (cardPsd == "") {
                util.drawToast('卡密码不能为空');
                return;
            }
            if (cardPsd.length != 10) {
                util.drawToast('请输入正确的卡密码');
                return;
            }
            util.ajaxFun(urlConfig.upgradeVipByCard, 'POST', {
                "cardNumber": cardNum,
                "password": cardPsd
            }, function (res) {
                if (res.rtnCode == '0000000') {
                    util.drawToast(res.msg || '升级成功');
                    var vipStatus = res.bizData.vipStatus;
                    var vipActiveDate = res.bizData.vipActiveDate;
                    var vipEndDate = res.bizData.vipEndDate;
                    var vipActiveDateV = vipActiveDate.substr(0,10);
                    var vipEndDateV = vipEndDate.substr(0,10);
                    cookie.setCookie("vipStatus", vipStatus, 4, "/");
                    cookie.setCookie("vipActiveDate", vipActiveDateV, 4, "/");
                    cookie.setCookie("vipEndDate", vipEndDateV, 4, "/");
                    $('.vip-time').html('VIP时效:从' + vipActiveDateV + '到' + vipEndDateV);
                    $('.viped').show();
                    $('.no-vip').hide();
                } else {
                    util.drawToast(res.msg || '升级失败，请联系客服查询详细信息');
                }
            });
        });
    });

});










