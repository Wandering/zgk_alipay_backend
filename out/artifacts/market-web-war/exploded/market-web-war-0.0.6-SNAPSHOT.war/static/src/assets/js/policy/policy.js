/**
 * Created by pdeng on 16/3/31.
 */
var util = require('commonjs');
var handlebars = require('handlebars');
var interfaceUrl = require('urlConfig');
var IScroll = require('iscroll');
$(function () {
    $('#header-menu').show();
    $('#header-title').text('高考热点');
    var Policy = {
        page: 0,
        pageRow: 6,
        getPolicyList: function (num) {
            util.ajaxFun(interfaceUrl.getGkHotList, 'get', {
                'rows': this.pageRow,
                'page': num
            }, function (res) {
                var dataJson = res.bizData;
                if (res.rtnCode == '0000000') {
                    var template = handlebars.compile($('#policy-list-tpl').html());
                    $('#policy-list').append(template(dataJson));
                    if (myScroll) myScroll.refresh();
                }
                if (dataJson.page >= dataJson.total) {
                    $('.pull').attr('data-flag', 'off');
                } else {
                    $('.pull-text').html('上拉浏览更多');
                }
            });
        },
        getPolicyDataPage: function () {
            Policy.page = Policy.page + 1;
            this.getPolicyList(this.page);
        }
    };
    /*
     *
     * 上拉加载更多
     * */
    var myScroll = null;
    $('#container').css('height', window.innerHeight - 39);
    Policy.getPolicyDataPage();
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
    myScroll.on('scrollStart', function () {
        uy = this.y;
    });

    myScroll.on('scroll', function () {
        var y = this.y - uy;
    });
    myScroll.on('scrollEnd', function () {
        if ($('.pull').attr('data-flag') == 'on') {
            $('#scroller-pullUp').show();
            myScroll.refresh();
            setTimeout(function () {
                Policy.getPolicyDataPage();
            }, 500);
        } else {
            $('.pull-text').html('没有更多数据~');
            $('.preloader').hide();
        }
    });

    /*
     * 咨询详情页跳转
     * */
    $('#policy-list').on('click', 'li', function () {
        var id = $(this).attr('id');
        window.location.href = '/policy-detail?id=' + id;
    });
});