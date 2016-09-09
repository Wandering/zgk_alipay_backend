var util = require('commonjs');
var cookie = require('cookie');
var md5 = require('md5');
var urlConfig = require('urlConfig');

//var domain = util.domain; // 正式

$('#header-back').show().on('click', function () {
    window.location.assign('/login');
});
$('#header-title').html('找回密码');
$('#province-text').remove('');
$(function () {
    //var urlDomain = window.location.hostname + '';
    //var urlArr = urlDomain.split('.');
    //var provinceKey = urlArr[0];
    // 登录提交
    $('#register-pwd-btn').on('click', function () {
        var registerPhoneV = $.trim($('#register-pwd-phone').val()),
            verificationCodeV = $.trim($('#verification-pwd-code').val()),
            registerPwdV = $.trim($('#register-pwd-code').val()),
            registerPwdRepeatV = $.trim($('#register-pwd-repeat2').val());
        console.log(registerPhoneV)
        if (registerPhoneV == "") {
            util.drawToast('请输入手机号');
            return false;
        }
        var regMobile = /^1[3|4|5|6|7|8|9][0-9]{1}[0-9]{8}$/;
        var mobileResult = regMobile.test(registerPhoneV);
        if (mobileResult == false) {
            util.drawToast('手机号有误,请重新输入');
            return false;
        }
        if (verificationCodeV == "") {
            util.drawToast('请输入验证码');
            return false;
        }
        if (verificationCodeV.length != 6) {
            util.drawToast('请输入正确的验证码');
            return false;
        }
        if (registerPwdV == "") {
            util.drawToast('请输入密码');
            return false;
        }
        if (registerPwdRepeatV == "") {
            util.drawToast('请输入确认密码');
            return false;
        }
        if (registerPwdV !== registerPwdRepeatV) {
            util.drawToast('两次密码输入不一致');
            return false;
        }
        var postUrl = urlConfig.postRetrievePassword;
        var md5RegisterPwdV = $.md5(registerPwdV);
        util.ajaxFun(postUrl, 'POST', {
            account: registerPhoneV, //用户账号
            captcha: verificationCodeV, //验证码
            password: md5RegisterPwdV //密码
        }, function (res) {
            console.log(res)
            if (res.rtnCode === "0000000") {
                util.drawToast("密码修改成功!");
                setTimeout(function () {
                    window.location.assign('/login');
                }, 2000);
            } else {
                util.drawToast(res.msg);
            }
        });
    });
    var captchaType = '1'; //0.注册标志  1 找回密码
    // 验证码获取
    $('#verification-pwd-btn').on('click', function () {
        var _this = $(this);
        var registerPhoneV = $.trim($('#register-pwd-phone').val());
        if (registerPhoneV == "") {
            util.drawToast('请输入手机号');
            return false;
        }
        var regMobile = /^1[3|4|5|6|7|8|9][0-9]{1}[0-9]{8}$/;
        var mobileResult = regMobile.test(registerPhoneV);
        if (mobileResult == false) {
            util.drawToast('手机号有误,请重新输入');
            return false;
        }

        //图形验证码接口
        var formHtml = '' +
            '<div class="img-box">' +
            '<div class="img-group">' +
            '<img src="' + urlConfig.getImageCaptcha + '?account=' + registerPhoneV + '" alt="" class="form-control" id="image-captcha">' +
            '<span id="imgTip">换一个?</span>' +
            '</div>'+
            '<input type="text" class="form-control" id="captcha-psd" placeholder="请输入图像验证码">' +
            '<div class="imgCodeErr"></div>' +
            '<button class="btn btn-primary" id="captcha-confirm" type="button">确认</button>' +
            '<button class="btn btn-primary" id="close-modal" type="button">取消</button>' +
            '</div>';




        $.ajax({
            type: "POST",
            url: urlConfig.postConfirmAccountCode,
            dataType: 'json',
            async: false,
            data: {
                type: captchaType,
                account: registerPhoneV
            },
            success: function (res) {
                if (res.rtnCode === "0000000") {
                    util.confirmLayer('图片验证', formHtml);
                    $('#imgTip').on('click', function () {
                        $('#image-captcha').attr('src', urlConfig.getImageCaptcha + '?account=' + registerPhoneV + '&time=' + Date.parse(new Date()));
                    });
                    $('.modal-footer').remove();
                    $('#captcha-confirm').unbind("click").on('click', function () {
                        var _self = $(this);
                        var imgCaptchaV = $.trim($('#captcha-psd').val());
                        if (imgCaptchaV == '') {
                            $('.imgCodeErr').text('图形验证码不能为空!');
                            return false;
                        }
                        if (imgCaptchaV.length != 6) {
                            $('.imgCodeErr').text('图形验证码输入有误!');
                            return false;
                        }
                        _self.attr('disabled',true);
                        util.ajaxFun(urlConfig.postVerificationCode, 'POST', {
                            type: captchaType,
                            account: registerPhoneV,
                            capText: imgCaptchaV
                        }, function (result) {
                            _self.attr('disabled',false);
                            if (result.rtnCode === "0000000") {
                                $('.imgCodeErr').text('');
                                $('.mask').remove();
                                _this.attr({
                                    'background-color': '#ccc',
                                    'disabled': true
                                });
                                var s = (JSON.parse(result.bizData)).time;
                                var timer = setInterval(function () {
                                    s--;
                                    _this.text(s + '秒后重新获取');
                                    if (s <= 0) {
                                        clearInterval(timer);
                                        _this.text('重新获取');
                                        _this.attr('disabled', false)
                                    }
                                }, 1000);
                            } else {
                                $('.imgCodeErr').text(result.msg);
                                $('#image-captcha').attr('src', urlConfig.getImageCaptcha + '?account=' + registerPhoneV + '&time=' + Date.parse(new Date()));
                            }
                        });

                    });
                }else {
                    util.drawToast(res.msg);
                }
            }
        });



        //util.ajaxFun(urlConfig.postConfirmAccountCode, 'POST', {
        //    type: captchaType,
        //    account: registerPhoneV
        //}, function (res) {
        //    if (res.rtnCode === "0000000") {
        //        util.ajaxFun(urlConfig.postVerificationCode, 'POST', {
        //            type: captchaType,
        //            account: registerPhoneV
        //        }, function (res) {
        //            if (res.rtnCode === "0000000") {
        //                _this.attr({
        //                    'background-color': '#ccc',
        //                    'disabled': true
        //                });
        //                var s = (JSON.parse(res.bizData)).time;
        //                var timer = setInterval(function () {
        //                    s--;
        //                    _this.text(s + '秒后重新获取');
        //                    if (s <= 0) {
        //                        clearInterval(timer);
        //                        _this.text('重新获取').css('background-color', '#d80c18');
        //                        _this.attr('disabled', false)
        //                    }
        //                }, 1000);
        //            } else {
        //                util.drawToast(res.msg);
        //            }
        //        });
        //    } else {
        //        util.drawToast(res.msg);
        //    }
        //});

    });

});
