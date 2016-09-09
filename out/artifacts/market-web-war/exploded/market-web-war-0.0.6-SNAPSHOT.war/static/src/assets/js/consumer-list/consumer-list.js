
(function () {
    $('#header-menu').show();
    $('#header-title').text('我的钱包');
    var cookie = require('cookie');
    var interfaceUrl = require('urlConfig');
    var getTime = require('timeFormat');
    var handlebars = require('handlebars');
    var IScroll = require('iscroll');
    var myScroll = null;

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

    if(toUrl=='consumer-list'){
        if(!isLogin){
            window.location.href='/login?state=consumer-list';
        }else{
            var menuV = util.getLinkey('menu');
            if(menuV=="1"){
                cookie.setCookie("flag", "0", 4, "/");
            }
            var flag = cookie.getCookieValue('flag');
            if(flag=="0"){
                cookie.setCookie("flag", "1", 4, "/");
                window.location.assign('/consumer-list?state=consumer-list&token=' + token+"&code="+getQueryObject(window.location.href).code);
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

    /**
     * 收支明细
     * @type {{pageNo: number, pageSize: number, render: Function, getData: Function}}
     */
    var IncomeDetail = {
        pageNo: 1,
        pageSize: 1000,
        totalPrice: {},
        render: function(data) {
            var html = [];
            for(var key in data) {
                html.push('<section>');
                html.push('<div class="tip-info">' + key + '月共计收入￥<span id="' + key + '"></span>元，明细如下</div>');
                html.push('<ul class="income-detail">');
                this.totalPrice[key] = 0;
                var list = data[key];
                for (var i = 0,len = list.length; i < len; i++) {
                    this.totalPrice[key] = add(this.totalPrice[key], list[i].price);
                    html.push('<li>');
                    html.push('<p>');
                    html.push('<span class="left">收入&nbsp;+&nbsp;' + list[i].price + '元</span>');
                    html.push('<span class="right">' + getTime(list[i].createTime, 'MM/dd hh:mm:ss') + '</span>');
                    html.push('</p>');
                    html.push('<p class="from-user">来自用户“' + list[i].fromUserName + '”</p>');
                    html.push('</li>');
                }
                html.push('</ul></section>');
            }
            return html.join('');
        },
        getData: function() {
            var that = this;
            var userId = cookie.getCookieValue('userId');
            util.ajaxFun(interfaceUrl.getSplitPriceInfo, 'get', {
                accountId: userId,
                pageNo: that.pageNo,
                pageSize: that.pageSize
            }, function (res) {
                if (res.rtnCode === '0000000') {
                    var html = that.render(res.bizData);
                    //that.pageNo++;
                    if (html) {
                        $('#detail-list').html(html);
                        for (var key in that.totalPrice) {
                            $('#' + key).text(that.totalPrice[key]);
                        }
                    } else {
                        $('#detail-list').html('<p class="no-data">暂无收入！</p>');
                    }

                    //if(myScroll)myScroll.refresh();
                }
            });
        }
    }

    /**
     * 提现记录
     * @type {{pageNo: number, pageSize: number, render: Function, getData: Function}}
     */
    var PresentRecord = {
        pageNo: 1,
        pageSize: 100,
        totalPrice: 0,
        render: function(data) {
            var html = [];
            for (var i = 0,len = data.length; i < len; i++) {
                this.totalPrice = add(this.totalPrice, data[i].money);
                html.push('<li>');
                html.push('<span class="left">提现&nbsp;-&nbsp;' + data[i].money + '元</span>');
                html.push('<span class="right">' + getTime(data[i].createDate, 'MM/dd hh:mm:ss') + '</span>');
                html.push('</li>');
            }
            return html.join('');
        },
        getData: function() {
            var that = this;
            var userId = cookie.getCookieValue('userId');
            util.ajaxFun(interfaceUrl.queryWithdrawRecords, 'get', {
                userId: userId,
                pageNo: that.pageNo,
                pageSize: that.pageSize
            }, function (res) {
                if (res.rtnCode === '0000000') {
                    if (res.bizData.length <= 0) {
                        $('#detail-list').html('<p class="no-data">暂无提现！</p>');
                        return;
                    }
                    if (!$('.present-record')[0]) {
                        var finallyHTML = [];
                        finallyHTML.push('<div class="tip-info">共计提现：￥<span id="total_price"></span>元，明细如下：</div>');
                        finallyHTML.push('<ul class="present-record"></ul>');
                        $('#detail-list').html(finallyHTML.join(''));
                    }
                    var html = that.render(res.bizData);
                    $('.present-record').html(html);
                    $('#total_price').text(that.totalPrice);
                    //if (res.bizData.length <= 0) {
                    //    $('.pull-text').html('没有更多数据~~');
                    //    $('.pull-text').addClass('no-data');
                    //} else {
                    //    that.pageNo++;
                    //}
                    //if(myScroll)myScroll.refresh();
                }
            });
        }
    }

    function initList() {
        var flag = $('.tab span.on').attr('data-id');
        if (flag == 1) {
            IncomeDetail.getData();
        } else if (flag == 2) {
            PresentRecord.getData();
        }
    }

    function getWalletBalance() {
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
                $('#total-sum').text(res.bizData.money);
            }
        });
    }

    function add(num1, num2) {
        var num1 = num1 + '';
        var num2 = num2 + '';
        var index1 = num1.substring(num1.indexOf('.') + 1, num1.length).length;
        var index2 = num2.substring(num2.indexOf('.') + 1, num2.length).length;
        var index = Math.pow(10, Math.max(index1, index2));
        var sum = num1 * index + num2 * index;
        return sum / index;
    }

    $(document).ready(function() {
        var flag = getQueryObject(window.location.href).flag;
        if (flag == 2) {
            $('.tab span[data-id="2"]').addClass('on').siblings().removeClass('on');
        }
        //$('#container').css('height', window.innerHeight - 39);
        //var uy = 0;
        //myScroll = new IScroll('#container', {
        //    probeType: 3,
        //    tap: true,
        //    click: true,
        //    mouseWheel: true,
        //    scrollbars: true,
        //    fadeScrollbars: true,
        //    interactiveScrollbars: false,
        //    keyBindings: false,
        //    deceleration: 0.0002
        //});
        //myScroll.on('scrollStart', function() {
        //    uy = this.y;
        //});
        //
        //myScroll.on('scroll', function() {
        //    var y = this.y - uy;
        //});
        //
        //myScroll.on('scrollEnd', function() {
        //    if (!$('.pull-text').hasClass('no-data')) {
        //        $('.pull-text').hide();
        //        $('#scroller-pullUp').show();
        //        myScroll.refresh();
        //        initList();
        //    } else {
        //        $('.pull-text').html('没有更多数据~~');
        //    }
        //});

        getWalletBalance();
        initList();

        $('.tab span').on('click', function() {
            $(this).addClass('on').siblings().removeClass('on');
            IncomeDetail.pageNo = 1;
            IncomeDetail.totalPrice = {};
            PresentRecord.pageNo = 1;
            PresentRecord.totalPrice = 0;
            initList();
        });

        $('.sqtx a').on('click', function() {
            window.location.href = '/apply-cash';
        });
    });
})();













