(function() {
    $('#header-title').text('我的订单');
    $('#header-menu').show();
    var interfaceUrl = require('urlConfig');
    var cookie = require('cookie');
    var util = require('commonjs');
    var handlebars = require('handlebars');


    var util = require('commonjs');
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

    if(toUrl=='order'){
        if(!isLogin){
            window.location.href='/login?state=order';
        }else{
            var menuV = util.getLinkey('menu');
            if(menuV=="1"){
                cookie.setCookie("flag", "0", 4, "/");
            }
            var flag = cookie.getCookieValue('flag');
            if(flag=="0"){
                cookie.setCookie("flag", "1", 4, "/");
                window.location.assign('/order?state=order&token=' + token+"&code="+getQueryObject(window.location.href).code);
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
        }
    }





    var IScroll = require('iscroll');
    var myScroll = null;
    var Order = (function() {

        return {
            pageNo: 1,
            pageSize: 5,
            getOrderListData: function() {
                var that = this;
                util.ajaxFun(interfaceUrl.getUserOrderList, 'GET', {
                    userId: cookie.getCookieValue('userId') || '13',
                    pageNo: this.pageNo,
                    pageSize: this.pageSize
                }, function (res) {
                    if (res.rtnCode == '0000000') {
                        if (res.bizData.length > 0) {
                            $('.pull-text').show();
                            $('#scroller-pullUp').hide();
                            var source = $('#order_list_tmpl').html();
                            var template = handlebars.compile(source);
                            $('.order-list').append(template(res));

                            //$('.order-list').append(that.orderListRender(res.bizData));
                            $('.paying').off('click');
                            $('.paying').on('click', function() {
                                var orderNo = $(this).attr('data-ordernum');
                                var price = $(this).attr('data-price');
                                var userId = $(this).attr('data-userid');
                                var goodsCount = $(this).attr('data-goodscount');
                                payOrder(orderNo, price, userId, goodsCount);
                            });
                            $('.delete').off('click');
                            $('.delete').on('click', function() {
                                var that = this;
                                var orderNo = $(that).attr('data-ordernum');
                                $('#modal_overlay').removeClass('hidden');
                                $('#modal').removeClass('hidden');
                                $('#modal_overlay').addClass('modal-overlay-visible');
                                $('#modal').addClass('modal-in');
                                $('#delete_order').off('click');
                                $('#delete_order').on('click', function() {
                                    util.ajaxFun(interfaceUrl.getRemoveOrder, 'get', {
                                        orderNo: orderNo
                                    }, function (res) {
                                        if (res.rtnCode == '0000000') {
                                            $('#modal_overlay').removeClass('modal-overlay-visible');
                                            $('#modal').removeClass('modal-in');
                                            $('#modal_overlay').addClass('hidden');
                                            $('#modal').addClass('hidden');
                                            $(that).parent().parent().parent().remove();
                                        }
                                    })
                                });
                            });
                            if (myScroll) myScroll.refresh();
                        } else {
                            if (that.pageNo == 1) {
                                $('#container').html('<div class="no-shopping"><img src="/static/dist/img/no-shopping.png"><p>您还没有任何订单哦!</p></div>');
                            } else {
                                $('.pull-text').show();
                                $('#scroller-pullUp').hide();
                                $('.pull-text').html('没有更多数据~~');
                                $('.pull-text').addClass('no-data');
                            }
                        }
                    }
                })
            }
        }
    })();

    function orderPayStatus(msg) {
        util.drawToast(msg);
        //setTimeout(function() {
        //    window.location.href = '/order?state=order';
        //}, 1000);
    }


    /**
     * 支付
     */
    var orderFlag = false;
    function payOrder(orderNo, price, userId, goodsCount) {
        if (orderFlag) {
            return;
        }
        orderFlag = true;
        var amount = parseFloat(price);
        var openId = cookie.getCookieValue('openId');
        var channel = 'wx_pub';
        if (!isWeiXin()) {
            channel = 'alipay_wap';
        }
        util.ajaxFun(interfaceUrl.payOrder, 'POST', {
            orderNo: orderNo,
            userId: userId,
            amount: amount,
            channel: channel,
            openId: openId,
            goodsCount: goodsCount
        }, function (res) {
            orderFlag = false;
            if (res.rtnCode == '0000000') {
                var charge = res.bizData;
                charge.credential = JSON.parse(charge.credential);
                cookie.setCookie("orderNo", $('#orderNo').val(), 4, "/");
                pingpp.createPayment(charge, function(result, error){
                    if (result == "success") {
                        // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
                        orderPayStatus('支付成功');
                      //window.location.reload();
                        window.location.href = '/pay-success?orderNo=' + orderNo;
                    } else if (result == "fail") {
                        // charge 不正确或者微信公众账号支付失败时会在此处返回
                        orderPayStatus('支付失败');
                    } else if (result == "cancel") {
                        // 微信公众账号支付取消支付
                        orderPayStatus('已取消支付');
                    }
                });
            } else {
                orderPayStatus('支付失败');
            }
        })
    }

    $(document).ready(function() {
        $('#container').css('height', window.innerHeight - 39);

        $('#modal_overlay,#cancle_btn').on('click', function() {
            $('#modal_overlay').removeClass('modal-overlay-visible');
            $('#modal').removeClass('modal-in');
        });

        Date.prototype.Format = function(fmt) { //author: meizz
            var o = {
                "M+" : this.getMonth()+1,                 //月份
                "d+" : this.getDate(),                    //日
                "h+" : this.getHours(),                   //小时
                "m+" : this.getMinutes(),                 //分
                "s+" : this.getSeconds(),                 //秒
                "q+" : Math.floor((this.getMonth()+3)/3), //季度
                "S"  : this.getMilliseconds()             //毫秒
            };
            if(/(y+)/.test(fmt))
                fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
            for(var k in o)
                if(new RegExp("("+ k +")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            return fmt;
        }
        handlebars.registerHelper('compare', function(left, operator, right, options) {
            if (arguments.length < 3) {
                throw new Error('Handlerbars Helper "compare" needs 2 parameters');
            }
            var operators = {
                '==':     function(l, r) {return l == r; },
                '===':    function(l, r) {return l === r; },
                '!=':     function(l, r) {return l != r; },
                '!==':    function(l, r) {return l !== r; },
                '<':      function(l, r) {return l < r; },
                '>':      function(l, r) {return l > r; },
                '<=':     function(l, r) {return l <= r; },
                '>=':     function(l, r) {return l >= r; },
                'typeof': function(l, r) {return typeof l == r; }
            };

            if (!operators[operator]) {
                throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator);
            }

            var result = operators[operator](left, right);

            if (result) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });
        handlebars.registerHelper("format", function(v1){
            return new Date(v1).Format('yyyy年MM月dd日 hh:mm:ss');
        });
        Order.getOrderListData();


        var uy = 0;
        myScroll = new IScroll('#container', {
            probeType: 3,
            tap: true,
            click: true,
            mouseWheel: true,
            scrollbars: true,
            fadeScrollbars: true,
            interactiveScrollbars: false,
            keyBindings: false,
            deceleration: 0.0002
        });
        myScroll.on('scrollStart', function() {
            uy = this.y;
        });

        myScroll.on('scroll', function() {
            var y = this.y - uy;
        });

        myScroll.on('scrollEnd', function() {
            if (!$('.pull-text').hasClass('no-data')) {
                $('.pull-text').hide();
                $('#scroller-pullUp').show();
                myScroll.refresh();

                Order.pageNo++;
                Order.getOrderListData();
            } else {
                $('.pull-text').html('没有更多数据~~');
            }
        });
    });

})();
