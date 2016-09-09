/**
 * Created by pdeng on 16/3/31.
 */
var util = require('commonjs');
var interfaceUrl = require('urlConfig');
var cookie = require('cookie');
var handlebars = require('handlebars');
$(function () {
    $('.search-btn').on('click', function () {
        if ($('.search-modal').hasClass('hidden')) {
            $('.search-modal').removeClass('hidden');
            $('.backdrop').removeClass('hidden');
        } else {
            $('.search-modal').addClass('hidden');
            $('.backdrop').addClass('hidden');
        }
    });
    $('.backdrop').on('click', function () {
        $('.search-btn').trigger('click');
    });
    util.ajaxFun(interfaceUrl.getSearchList, 'get', {
        page:1,
        rows:20
    }, function (res) {
        var dataJson = res.bizData;
        if (res.rtnCode = '0000000') {
            handlebars.registerHelper('propertyList', function (date) {
                var propertyListTpl = '';
                switch (date) {
                    case '985':
                        propertyListTpl += '<span class="type-985">985</span>';
                        break;
                    case '211':
                        propertyListTpl += '<span class="type-211">211</span>';
                        break;
                    case '有研究生院':
                        propertyListTpl += '<span class="type-yan">研</span>';
                        break;
                    case '含国防生':
                        propertyListTpl += '<span class="type-guo">国</span>';
                        break;
                    case '卓越计划':
                        propertyListTpl += '<span class="type-zhuo">卓</span>';
                        break;
                    case '自主招生':
                        propertyListTpl += '<span class="type-zi">自</span>';
                        break;
                }
                return propertyListTpl;
            });
            var template = handlebars.compile($('#school-list-tpl').html());
            $('#school-list').html(template(dataJson));
            $('.school-sum').html(dataJson.count);
        }
    });
});