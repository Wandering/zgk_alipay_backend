/**
 * Created by kepeng on 16/4/27.
 */
(function() {

    var util = require('commonjs');
    var cookie = require('cookie');
    var urlConfig = require('urlConfig');
    var interfaceUrl = require('urlConfig');

    var myApp = {
        initHeader: function() {
            $('#header-back').show();
            $('#header-title').text('申请提现');
            $('#header-back').on('click', function() {
                window.location.href = '/consumer-list';
            });
        },
        confirmCash: function() {
            var zhxm = $('#zhxm').val();
            var cardNum = $.trim($('#cardNum').val());
            var cardAddress = $.trim($('#cardAddress').val());
            var cash = $.trim($('#cash').val());

            if (!cookie.getCookieValue('isLogin')) {
                util.drawToast('请先登录后再操作!');
                setTimeout(function() {
                    window.location.href = "/login?state=apply-cash";
                }, 500)
                return false;
            }
            var regName = /^[\u4e00-\u9fa5 ]{1,20}$/;
            if (!regName.test(zhxm)) {
                util.drawToast('持卡人姓名仅允许1～20位中文字符!');
                return false;
            }
            var reg = /^[0-9]{16,19}$/;
            if (!reg.test(cardNum)) {
                util.drawToast('银行卡号仅允许输入16~19位数字字符!');
                return false;
            }

            if (!regName.test(cardAddress)) {
                util.drawToast('开户行仅允许1～20位中文字符!');
                return false;
            }

            if (isNaN(cash) || cash <= 0) {
                util.drawToast('请输入正确的提取金额!');
                return false;
            }
            var userId = cookie.getCookieValue('userId');
            util.ajaxFun(interfaceUrl.getWalletBalance, 'get', {
                userId: userId
            }, function (res) {
                if (res.rtnCode === '0000000') {
                    if (cash > res.bizData.money) {
                        util.drawToast('提取金额不能大于可用余额' + res.bizData.money + '元!');
                    } else {
                        util.ajaxFun(interfaceUrl.applyWithdraw, 'post', {
                            userId: userId,
                            userName: zhxm,
                            cardNo: cardNum,
                            bankName: cardAddress,
                            money: cash
                        }, function (res) {
                            if (res.rtnCode === '0000000') {
                                util.drawToast('<p class="tip-p">预计会在下月25号到账，请注意查收。</p>');
                                setTimeout(function() {
                                  window.location.href = '/consumer-list?flag=2';
                                },2000);
                            } else {
                                util.drawToast('申请提现失败!');
                            }
                        });
                    }
                }
            });
        },
        getTotalMoney: function() {
            if (!cookie.getCookieValue('isLogin')) {
                util.drawToast('请先登录后再操作!');
                setTimeout(function() {
                    window.location.href = "/login?state=consumer-list";
                }, 2000)
                return false;
            }
            var userId = cookie.getCookieValue('userId');
            util.ajaxFun(interfaceUrl.getWalletBalance, 'get', {
                userId: userId
            }, function (res) {
                if (res.rtnCode === '0000000') {
                    $('#cash').attr('placeholder', '可提现' + res.bizData.money + '元');
                }
            });
        }
    }

    $(document).ready(function() {
        myApp.initHeader();
        myApp.getTotalMoney();
        $('.btns').on('click', function() {
            myApp.confirmCash();
        });
    });
})();
