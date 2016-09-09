webpackJsonp([26],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	$(function () {
	    var cookie = __webpack_require__(2);
	    var util = __webpack_require__(1);
	    var urlConfig = __webpack_require__(3);
	    var account = cookie.getCookieValue('phone');
	    var getTime = __webpack_require__(4);

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

















/***/ },
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	//时间戳转换
	    Date.prototype.Format = function (fmt) {
	        var o = {
	            "M+": this.getMonth() + 1, //月份
	            "d+": this.getDate(), //日
	            "h+": this.getHours(), //小时
	            "m+": this.getMinutes(), //分
	            "s+": this.getSeconds(), //秒
	            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
	            "S": this.getMilliseconds() //毫秒
	        };
	        if (/(y+)/.test(fmt))
	            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	        for (var k in o)
	            if (new RegExp("(" + k + ")").test(fmt))
	                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	        return fmt;
	    };
	    var getTime = function (timestamp,formatStr) {
	        var newDate = new Date();
	        newDate.setTime(timestamp);
	        return newDate.Format(formatStr || "yyyy-MM-dd hh:mm:ss");
	    };

	    return getTime;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
]);