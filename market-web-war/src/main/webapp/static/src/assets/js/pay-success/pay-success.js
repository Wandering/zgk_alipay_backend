/**
 * Created by kepeng on 16/5/17.
 */
(function() {


    var interfaceUrl = require('urlConfig');
    var util = require('commonjs');
    var cookie = require('cookie');

    var productArray = ['', 'jbdk', 'zyjd'];
    var packageName = {
        'zyjd': '状元及第',
        'jbdk': '金榜登科'
    };

    $(document).ready(function() {
        $('#header-menu').show();
        $('#header-title').text('支付成功');
        var orderNo = util.getLinkey('orderNo') || util.getLinkey('out_trade_no') || cookie.getCookieValue('orderNo');

        util.ajaxFun(interfaceUrl.getOrderInfo, 'GET', {
            orderNo: orderNo
        }, function (res) {
            if (res.rtnCode == '0000000') {
                $('.name').text('成功购买' + packageName[productArray[res.bizData.product_type]] + '会员卡 ' + res.bizData.goods_count + ' 套');
                $('.order-number span').text('订单号码：' + res.bizData.order_no);
                $('.phone span').text(res.bizData.department_phone);
                $('.address').text(res.bizData.goods_address.replace('&', ''));
            }
        });
    });
})();
