/**
 * Created by kepeng on 16/5/9.
 */
(function() {

    var util = require('commonjs');
    var cookie = require('cookie');
    var urlConfig = require('urlConfig');
    var handlebars = require('handlebars');

    function back() {
        $('#header-menu').show();
        $('#header-back').hide();
        $('#header-title').text('录取预测');
        $('.container').show();
        $('.content-b').hide();
        $('.content-b').html('');
    }


    function schoolCalculate() {
        var subjectV = $('.options span.active').attr('data-type'),
            scoreV = $.trim($('#score').val());
        if (!cookie.getCookieValue('isLogin')) {
            util.drawToast('请先登录后再操作!');
            setTimeout(function() {
                window.location.href = "/login?state=school-calculate";
            }, 2000)
            return false;
        }

        //非vip
        var vipStatus = cookie.getCookieValue('vipStatus');
        if (vipStatus == 0) {
            util.drawToast('您还不是vip,请升级vip后使用!');
            setTimeout(function() {
                window.location.href = "/vipBck";
            }, 2000)
            return false;
        }

        if (subjectV == "" || subjectV == undefined) {
            util.drawToast('请选择科目');
            return false;
        }

        if (scoreV == "") {
            util.drawToast('请输入分数');
            return false;
        }
        var re = /^[1-9]+[0-9]*]*$/;
        if (!re.test(scoreV)) {
            util.drawToast('请输入正确分数');
            return false;
        }

        if (scoreV > 999) {
            util.drawToast('分数不能超过三位数');
            return false;
        }
        util.ajaxFun(urlConfig.getPredictSchoolList, 'POST', {
            'type': subjectV,
            'score': scoreV
        }, function (res) {
            if (res.rtnCode === "0000000") {
                $('.container').hide();
                $('.content-b').show();
                $('#header-menu').hide();
                $('#header-back').show();
                $('#header-title').text('推荐院校');
                $('#header-back').off('click');
                $('#header-back').on('click', function() {
                    back();
                });
                var source = $("#temp-content").html();
                handlebars.registerHelper('stars', function (val) {
                    var star = '';
                    for (var i = 0; i < val; i++) {
                        star += '<i class="star-icon"></i>'
                    }
                    return star;
                });
                handlebars.registerHelper('batchStr', function (val) {
                    var batchArray = ['','一批本科','二批本科','', '三批本科','','','','高职（专科）'];
                    return batchArray[val];
                });
                handlebars.registerHelper('propertyList', function (data) {
                    var propertyListTpl = '';
                    switch (data) {
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
                var template = handlebars.compile(source);
                $('.content-b').html(template(res.bizData));

                $('#type-subject').text($('.options span.active').text());
                $('#score-tmp').text(scoreV);
                var num = res.bizData;
                var sum = 0;
                for (var key in num) {
                    sum += num[key].count;
                }
                $('#totalnum').text(sum);

            } else {
                if (res.rtnCode == '1000004') {
                    util.drawToast(res.msg);
                    window.location.href = '/login';
                }
            }
        });
    }

    $(document).ready(function() {

        $('.options span').on('click', function() {
            $(this).addClass('active').siblings().removeClass('active');
        });
        $('.calculate-btn').on('click', function() {
            schoolCalculate();
        });

        $('#header-title').text('院校预测');
        $('#header-menu').show();

    });

})();

