/**
 * Created by pdeng on 16/3/31.
 */
var util = require('commonjs');
var handlebars = require('handlebars');
var interfaceUrl = require('urlConfig');
$('#header-title').text('详情');
$(function () {
    //var domain = util.domain; // 正式
    //var userKey = util.provinceKey;
    var id = util.getLinkey('id');
    util.ajaxFun(interfaceUrl.getGkHotInfo, 'get', {
        "id":id
    }, function (res) {
        if (res.rtnCode == '0000000') {
            var dataJson = res.bizData;
            var template = handlebars.compile($('#policy-detail-tpl').html());
            console.info(dataJson)
            $('#policy-detail').html(template(dataJson));
        }
    });
    $('#header-back').show().on('click',function(){
        window.location.assign('/policy');
    });
});