/**
 * Created by pdeng on 16/3/31.
 * 注册业务
 */

$(function () {
    $('#header-title').text('注册');
    $('.tab-list .tab').on('click', function () {
        var _this = $(this);
        _this.addClass('active').siblings().removeClass('active');
        $('.tab-content').removeClass('disn').eq(_this.index()).addClass('disn');
    });
    var Util = {
        ajaxFun: function (url, method, data, callback, callbefore, callafter) {
            $.ajax({
                url: url,
                type: method,
                data: data || {},
                beforeSend: callbefore || '',
                complete: callafter || '',
                success: function (res) {
                    callback(res);
                }
            });
        }
    }
    /**
     * 注册
     */
    var Validate = {
        isMobile: function (str) {
            var reg = /^1[3|4|5|7|8][0-9]\d{8}$/ig;
            return reg.test(str);
        },
        msg: function (str) {
            var intervalCounter = null;

            function drawToast(message) {
                var alert = document.getElementById("toast");
                if (!alert) {
                    var toastHTML = '<div id="toast">' + message + '</div>';
                    document.body.insertAdjacentHTML('beforeEnd', toastHTML);
                } else {
                    alert.style.opacity = .9;
                }
                intervalCounter = setInterval(function () {
                    var alert = $("#toast");
                    alert.css('opacity', 0).remove();
                    clearInterval(intervalCounter);
                }, 1000);
            }

            drawToast(str);
        }
    };
    $('#reg-btn-code').click(function () {
        var _this = $(this);
        captchaValidate(_this);
    });
    function captchaValidate(obj) {
        var regName = $.trim($('#reg-tel').val());
        if (regName == '' || !Validate.isMobile(regName)) {
            Validate.msg('手机号码输入有误');
            return false;
        }
        var getCaptchaData = {
            account: regName,
            type: 0  //0注册  1找回密码
        };
        Util.ajaxFun('/captcha/captcha', 'post', getCaptchaData, function (res) {
            if (res.rtnCode == '0000000') {
                obj.attr('disabled', 'disabled');
                var n = 60;
                var timer = setTimeout(function () {
                    n--;
                    if (n <= 0) {
                        clearInterval(timer);
                        obj.removeAttr('disabled');
                    }
                    obj.val(n + 's后重新获取');
                }, 1000);
            } else {
                Validate.msg(res.msg);
            }
        }, '', '');
    }

    $('#reg-submit-btn').click(function () {
        captchaValidate();
        var regCode = $.trim($('#reg-code').val());
        if (regCode == '' || regCode.length != 6) {
            Validate.msg('验证码输入有误');
            return false;
        }
        var regBtn = $.trim($('#reg-btn').val()),
            regPwd = $.trim($('#reg-pwd').val()),
            regConfirmPwd = $('#reg-confirm-pwd').val();
        if (regPwd == '' || regPwd.length < 6) {
            Validate.msg('密码输入有误');
            return false;
        }
        if (regConfirmPwd != regPwd) {
            Validate.msg('确认密码和您输入的密码不一致');
            return false;
        }
        var regData = {
            account: 18710921677,//账号,
            captcha: 1234,
            password: 123,
            provinceId: 123,
            cityId: 123,
            countyId: 123,
            sharerId: 123 //从地址栏中获取分享类型
        };
        Util.ajaxFun('/register/account', 'post', regData, function (res) {
            console.info(res);
        }, '', '');
    })


});