webpackJsonp([28],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by kepeng on 16/5/17.
	 */
	(function() {
	    var util = __webpack_require__(1);
	    var interfaceUrl = __webpack_require__(3);
	    var cookie = __webpack_require__(2);
	    var price = util.getLinkey('price');
	    var packageCode = util.getLinkey('productId');
	    var departmentCode = util.getLinkey('departmentCode');
	    var token = cookie.getCookieValue('token');
	    var toUrl = util.getLinkey('state');
	    var isLogin = cookie.getCookieValue('isLogin');

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
	        $.get(interfaceUrl.getOpenId, {code: code}, function (res) {
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
	    //alert("外" +openId )
	    if (!isLogin) {
	        window.location.href = '/login?state=vip-buyDetial&productId=' + packageCode + '&price=' + price + '&departmentCode=' + departmentCode;
	    } else {
	        if (isWeiXin()) {
	            if (!openId) {
	                var obj = getQueryObject(window.location.href);
	                cookie.setCookie("code", obj.code, 4, "/");
	                //alert("code:"+ obj.code)
	                getOpenId(obj.code);
	            }
	        }
	    }


	    function orderPayStatus(msg) {
	        $('#modal_overlay').removeClass('modal-overlay-visible');
	        $('#modal').removeClass('modal-in');
	        util.drawToast(msg);
	        setTimeout(function () {
	            window.location.href = '/order?state=order';
	        }, 1000);
	    }
	    /**
	     * 支付
	     */
	    function payOrder() {
	        var amount = parseFloat(price);
	        var openId = cookie.getCookieValue('openId');
	        //alert("order:" + openId)
	        var goodsCount = parseInt($('.number').text());

	        var channel = 'wx_pub';
	        if (!isWeiXin()) {
	            channel = 'alipay_wap';
	        }


	        util.ajaxFun(interfaceUrl.payOrder, 'POST', {
	            orderNo: $('#orderNo').val(),
	            userId: cookie.getCookieValue('userId'),
	            amount: amount,
	            channel: channel,
	            goodsCount: goodsCount,
	            openId: openId
	        }, function (res) {
	            if (res.rtnCode == '0000000') {
	                var charge = res.bizData;
	                charge.credential = JSON.parse(charge.credential);
	                cookie.setCookie("orderNo", $('#orderNo').val(), 4, "/");
	                pingpp.createPayment(charge, function (result, error) {
	                    if (result == "success") {
	                        // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
	                        //orderPayStatus('支付成功');
	                        window.location.href = '/pay-success?orderNo=' + $('#orderNo').val();
	                    } else if (result == "fail") {
	                        // charge 不正确或者微信公众账号支付失败时会在此处返回
	                        orderPayStatus('支付失败');
	                    } else if (result == "cancel") {
	                        // 微信公众账号支付取消支付
	                        orderPayStatus('订单取消支付，可在我的订单页面继续支付');
	                    }
	                });
	            } else {
	                orderPayStatus('支付失败');
	            }
	        })
	    }

	    $(document).ready(function() {

	        $('#header-back').show();
	        $('#header-title').text('在线购买');
	        $('#header-back').on('click', function() {
	            window.location.href = '/vip-buy';
	        });

	        $('.buy-price').text('单价：' + price + '元/套');
	        var productArray = ['', 'jbdk', 'zyjd'];
	        var packageName = {
	            'zyjd': '状元及第',
	            'jbdk': '金榜登科'
	        };
	        $('.wrapper h6').text(packageName[productArray[packageCode]]);
	        if (productArray[packageCode] === 'jbdk') {
	            $('.jbdk').hide();
	        }
	        var totalPrice = parseInt($('.number').text()) * price;
	        var splitPrice = totalPrice.toString().split('.');
	        $('.total-price').text(splitPrice[0]);
	        $('.sub-price').text(splitPrice[1] || '00');

	        util.ajaxFun(interfaceUrl.getUserGoodsAddress, 'GET', {}, function (res) {
	            if (res.rtnCode == '0000000') {
	                var bizData = res.bizData;
	                if (bizData && bizData.receivingAddress) {
	                    //$('.buy-go').removeClass('no-address');
	                    $('#modal-tips').hide();
	                    $('.vertical').html(bizData.receivingAddress.replace('&', '') + '&nbsp;&nbsp;&nbsp;&nbsp;(' + bizData.contactName + '收)&nbsp;&nbsp;&nbsp;&nbsp;' +  bizData.contactPhone);
	                } else {
	                    $('.buy-go').addClass('no-address');
	                    $('.vertical').html('<span style="color: #D70C18">添加收货地址</span>');
	                }
	            }
	        });

	        $('.buy-go').on('click', function() {
	            var userId = cookie.getCookieValue('userId');
	            if (!cookie.getCookieValue('isLogin')) {
	                util.drawToast('请登录后再购买!');
	                setTimeout(function () {
	                    window.location.href = '/login?state=vip-buyDetial&productId=' + packageCode + '&price=' + price + '&departmentCode=' + departmentCode;
	                }, 2000);
	                return false;
	            }

	            if ($(this).hasClass('no-address')) {
	                $('#modal_overlay').addClass('modal-overlay-visible');
	                $('#modal-tips').addClass('modal-in');
	                $('.modal-tips-close').off('click');
	                $('.modal-tips-close').on('click',function(){
	                    window.location.href = '/address?action=vip-buyDetial&productId=' + packageCode + '&price=' + price + '&departmentCode=' + departmentCode;
	                });
	                //util.drawToast('购买前请输入您的收货地址!');
	                return false;
	            }
	            util.ajaxFun(interfaceUrl.commitOrder, 'POST', {
	                userId: cookie.getCookieValue('userId'),
	                price: price,
	                goodsCount: $('#number').text(),
	                productType: packageCode,
	                departmentCode: departmentCode
	            }, function (res) {
	                if (res.rtnCode == '0000000') {
	                    //var department = res.bizData.department;
	                    $('#orderNo').val(res.bizData.orderNo);
	                    //$('#orderNo').attr('orderNo', res.bizData.orderNo);
	                    //$('#order_time').html('订单创建日期：' + department.createDateAsDate);
	                    //$('#service_price').html('服务价格：' + department.wechatPrice + '元/套');
	                    var number = parseInt($('.number').text());
	                    //$('#pay_number').html('购买数量：' + number + '套');
	                    //var totalPrice = department.wechatPrice * number;
	                    //$('#pay_price').html('应付费用：' + totalPrice + '元');
	                    //$('#pay_price').attr('data-price', totalPrice);
	                    //$.pgwModal({
	                    //    title: '订单确认',
	                    //    content: $('.modal').html()
	                    //});
	                    $('.info').text('智高考“' + packageName[productArray[packageCode]] + '”会员卡 ' + number + ' 套￥' + number * price + '元');
	                    $('#modal_overlay').addClass('modal-overlay-visible');
	                    $('#modal').addClass('modal-in');
	                    $('.paying').off('click');
	                    $('.paying').click(function () {
	                        payOrder();
	                    });
	                }
	            })
	        });


	        $('#modal_overlay').on('click', function() {
	            $('#modal_overlay').removeClass('modal-overlay-visible');
	            $('#modal').removeClass('modal-in');
	        });

	        $('.address').on('click', function() {
	            window.location.href = '/address?action=vip-buyDetial&productId=' + packageCode + '&price=' + price + '&departmentCode=' + departmentCode;
	        });

	        $('.sub').on('click', function () {
	            if ($(this).hasClass('subtraction')) {
	                return;
	            }
	            var num = parseInt($('.number').text());
	            num--;
	            if (num < 2) {
	                $('.sub').addClass('subtraction').removeClass('subtractionabled');
	            }
	            if (num < 10) {
	                $('.plus').addClass('plus-able').removeClass('plus-abled');
	            }
	            $('.number').text(num);
	            var totalPrice = num * price;
	            var splitPrice = totalPrice.toString().split('.');
	            $('.total-price').text(splitPrice[0]);
	            $('.sub-price').text(splitPrice[1] || '00');
	        });

	        $('.plus').on('click', function () {
	            if ($(this).hasClass('plus-abled')) {
	                return;
	            }
	            var num = parseInt($('.number').text());
	            num++;
	            if (num > 1) {
	                $('.sub').addClass('subtractionabled').removeClass('subtraction');
	            }
	            if (num >= 10) {
	                $('.plus').addClass('plus-abled').removeClass('plus-able');
	            }
	            $('.number').text(num);
	            var totalPrice = num * price;
	            var splitPrice = totalPrice.toString().split('.');
	            $('.total-price').text(splitPrice[0]);
	            $('.sub-price').text(splitPrice[1] || '00');
	        })
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