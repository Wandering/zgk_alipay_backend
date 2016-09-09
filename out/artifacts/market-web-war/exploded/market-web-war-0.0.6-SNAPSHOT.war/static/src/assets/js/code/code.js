$(function () {

    var util = require('commonjs');
    var interfaceUrl = require('urlConfig');
    var cookie = require('cookie');
    var isLogin = cookie.getCookieValue('isLogin');
    var token = cookie.getCookieValue('token');
    var cookieUserId = cookie.getCookieValue('userId');
    var userId = util.getLinkey('userId');
    var toUrl = util.getLinkey('state');
    var uc = util.getLinkey('uc');

    console.log("cookieUserId=="+cookieUserId)
    console.log("userId=="+userId)
    if(uc=="1"){
        document.title = '二维码';
        $('#header-title').text('二维码');
        $('#header-back').show().on('click', function () {
            window.location.href = 'user-detail?state=user-detail&token='+token;
        });
    }else{
        $('#header-title').text('邀请好友');
        $('#header-menu').show();
    }
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
    var menuV = util.getLinkey('menu');
    if(menuV=="1"){
        cookie.setCookie("flag", "0", 4, "/");
    }
    var flag = cookie.getCookieValue('flag');

    if(toUrl=='code'){
        if(!isLogin){
            window.location.href='/login?state=code';
        }else{
            setTimeout(function(){
                if(flag=="0"){
                    cookie.setCookie("flag", "1", 4, "/");
                    window.location.href='code?state=code&userId=' + cookieUserId+'&token=' + token + "&code="+getQueryObject(window.location.href).code;
                }
                if(flag=="1"){
                    if (isWeiXin()) {
                        if(!openId){
                            var obj = getQueryObject(window.location.href);
                            cookie.setCookie("code", obj.code, 4, "/");
                            getOpenId(obj.code);
                        }
                    }
                }
            },500);
        }
    }




    function getCaptchaImg(){
        $.ajaxSettings.async = false;
        var getCaptchaImg = '';
        util.ajaxFun(interfaceUrl.getCaptchaImg, 'get', {
            'userId': userId
        }, function (res) {
            if (res.rtnCode = '0000000') {
                var dataJson = res.bizData;
                $('.name').text(dataJson.name);
                $('.tel').text(dataJson.account);
                $('#captchImg').attr('src', dataJson.qrcodeUrl);
                getCaptchaImg = dataJson.qrcodeUrl;
            }
        });
        $.ajaxSettings.async = true;
        return getCaptchaImg;
    }
    getCaptchaImg();



    //分享
    if (isWeiXin()) {
        $('.share-btn').click(function () {
            $('.mask').addClass('show');
        });
    } else {
        $('.share-btn').hide();
    }

    $('body').on('click', '.mask', function () {
        $(this).removeClass('show');
    });




    /***************************自定义二维码*************************************/

    var timestamp = parseInt(new Date().getTime() / 1000);

    var noncestr = 'U5iQqjfV123NT5du';

    var  urls = 'http://zgkser.zhigaokao.cn/vip?state=vip&sharerId='+userId+"&sharerType=1";

    function getSign() {
        $.ajaxSettings.async = false;
        var signStr = '';
        $.getJSON('/pay/getAccessToken', function (res) {
            if (res.rtnCode == "0000000") {
                var ticket = res.bizData.ticket;
                var string1 = "jsapi_ticket=" + ticket + "&noncestr=" + noncestr + "&timestamp=" + timestamp + "&url="+window.location.href;

                //alert(string1)

                var sign = CryptoJS.SHA1(string1);
                signStr = sign.toString();
                //alert(signStr)
            }
        })
        $.ajaxSettings.async = true;
        return signStr;
    }
    wx.config({
        debug: false,
        appId: 'wx552f3800df25e964',
        timestamp: timestamp,
        nonceStr: noncestr,
        signature: getSign(),
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
        ]
    });
    wx.ready(function () {
        //document.querySelector('#checkJsApi').onclick = function () {
        //
        //};

        wx.checkJsApi({
            jsApiList: [
                'getNetworkType',
                'previewImage'
            ],
            success: function (res) {
                //alert(JSON.stringify(res));
            }
        });
        var title = '高考【VIP购买】邀请';
        var desc = '“拼拼”成绩靠努力，“选选”院校靠智慧；智高考，智慧填报专家';
        var logo = 'http://zgkser.zhigaokao.cn/static/dist/img/logo.jpg';
        wx.onMenuShareAppMessage({
            title: title,
            desc: desc,
            //link: window.location.href,//分享链接
            link: urls,//分享链接
            imgUrl: logo, // 分享图标
            trigger: function (res) {
                //alert('用户点击发送给朋友');
            },
            success: function (res) {
                //alert('已分享');
            },
            cancel: function (res) {
                //alert('已取消');
            },
            fail: function (res) {
                //alert(JSON.stringify(res));
            }
        });

        wx.onMenuShareTimeline({
            title: title,
            desc: desc,
            //link: window.location.href,//分享链接
            link: urls,//分享链接
            imgUrl: logo, // 分享图标
            trigger: function (res) {
                //alert('用户点击分享到朋友圈');
            },
            success: function (res) {
                //alert('已分享');
            },
            cancel: function (res) {
                //alert('已取消');
            },
            fail: function (res) {
                //alert(JSON.stringify(res));
            }
        });

        //document.querySelector('#onMenuShareAppMessage').onclick = function () {
        //
        //    alert('已注册获取“发送给朋友”状态事件');
        //};
        //
        //
        //// 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
        //document.querySelector('#onMenuShareTimeline').onclick = function () {
        //
        //    alert('已注册获取“分享到朋友圈”状态事件');
        //};
    });

    wx.error(function (res) {
        //alert(res.errMsg);
    });






});