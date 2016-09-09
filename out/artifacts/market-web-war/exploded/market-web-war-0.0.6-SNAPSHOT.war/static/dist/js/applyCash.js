webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by kepeng on 16/4/27.
	 */
	(function() {

	    var util = __webpack_require__(1);
	    var cookie = __webpack_require__(2);
	    var urlConfig = __webpack_require__(3);
	    var interfaceUrl = __webpack_require__(3);

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