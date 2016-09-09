webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	$(function () {

	    var util = __webpack_require__(1);
	    var interfaceUrl = __webpack_require__(3);
	    var cookie = __webpack_require__(2);
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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	var cookie = __webpack_require__(2);

	var isLogin = function () {
	    return cookie.getCookieValue('isLogin')
	};
	function ajaxFun(url, method, data, callback) {
	    if (cookie.getCookieValue('token')) {
	        data.token = cookie.getCookieValue('token');
	        //data.token = 'CG0yO9g/8r1V64iR5X0xiRx6DXdy12bW';
	    }

	    data.userKey = cookie.getCookieValue('userKey');
	    var strParameter = '';
	    for (var i in data) {
	        strParameter += "&" + i + "=" + data[i];
	    }

	    $.ajax({
	        url: url,
	        type: method,
	        data: data || {},
	        success: function(res) {
	            if(res.statusText=='error'){
	                drawToast("登录超时，请重新登录");
	                setTimeout(function(){
	                    window.location.href='/login?state=user-detail';
	                },2000);
	            }
	            if (res.rtnCode === '1000004') {
	                checkLoginTimeout();
	            } else {
	                callback(res);
	            }
	        },
	        error: function(res){
	            if(res.statusText=='error'){
	                drawToast("登录超时，请重新登录");
	                setTimeout(function(){
	                    window.location.href='/login?state=user-detail';
	                },2000);
	            }
	        }
	    });
	};

	function ajaxFunJSON(url, method, data, callback) {
	    if (cookie.getCookieValue('token')) {
	        data.token = cookie.getCookieValue('token');
	    }
	    data.userKey = cookie.getCookieValue('userKey');
	    console.log(JSON.stringify(data));
	    $.ajax({
	        url: url,
	        type: method,
	        contentType: 'application/json',
	        dataType: 'json',
	        data: JSON.stringify(data),
	        success: callback,
	        error: callback
	    });
	}


	var getLinkey = function getLinkey(name) {
	    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
	    if (reg.test(window.location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
	    return "";
	};


	var tips = function tips(obj, txt) {
	    $(obj).text(txt).fadeIn('1500');
	    setTimeout(function () {
	        $(obj).fadeOut('1500');
	    }, 1000);
	};

	function drawToast(message) {
	    var intervalCounter = null;
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
	    }, 3000);
	}


	function layer(message, btns) {
	    var alert = document.getElementById("toast");
	    if (!alert) {
	        var toastHTML = '<div id="toast">'
	            + message;
	        if (btns) {
	            toastHTML += btns;
	        }
	        toastHTML += '</div>';
	        document.body.insertAdjacentHTML('beforeEnd', toastHTML);
	    } else {
	        alert.style.opacity = .9;
	    }
	}


	function confirmLayer(title,content) {
	    var confirmLayer = [];
	    confirmLayer.push('<div class="mask show">');
	    confirmLayer.push('<div class="modal">');
	    confirmLayer.push('<div class="modal-title">'+ title +'</div>');
	    confirmLayer.push('<div class="modal-body">');
	    confirmLayer.push(content);
	    confirmLayer.push('</div>');
	    confirmLayer.push('<div class="modal-footer">');
	    confirmLayer.push('<button id="close-modal" type="button">取消</button>');
	    confirmLayer.push('<button id="confirm-btn" type="button">确定</button>');
	    confirmLayer.push('</div>');
	    confirmLayer.push('</div>');
	    confirmLayer.push('</div>');
	    $('body').append(confirmLayer.join('')).on('click','#close-modal',function() {
	        $('.mask').remove();
	    });
	}

	function checkLoginTimeout() {
	        drawToast('登录超时');
	        setTimeout(function() {
	            window.location.href = '/login?state=user-detail';
	        }, 2000);
	        //if (cookie.getCookieValue('isLogin')) {
	        //    $('#loginTimeoutWindow').modal('show');
	        //} else {
	        //    $('#loginTimeoutWindow').modal('show');
	        //    $('#loginTimeoutWindow-jump-btn').html('登录');
	        //    $('.loginTimeoutWindow-body').attr('class', 'modal-body nologinWindow-body');
	        //}
	}



	exports.isLogin = isLogin;
	exports.ajaxFun = ajaxFun;
	exports.getLinkey = getLinkey;
	//exports.domain = domainStr;
	//exports.provinceKey = provinceKey;
	exports.tips = tips;
	exports.drawToast = drawToast;
	exports.layer = layer;
	exports.ajaxFunJSON = ajaxFunJSON;
	exports.confirmLayer = confirmLayer;

















/***/ }
]);