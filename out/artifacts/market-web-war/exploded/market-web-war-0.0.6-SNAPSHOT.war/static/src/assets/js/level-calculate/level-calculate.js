/**
 * Created by kepeng on 16/4/25.
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
    function levelCalculate() {

        var subjectV = $('.options span.active').attr('data-type'),
            scoreV = $.trim($('#score').val()),
            universityNameV = $.trim($('#target_institutions').val());
        if (!cookie.getCookieValue('isLogin')) {
            util.drawToast('请先登录后再操作!');
            setTimeout(function() {
                window.location.href = "/login?state=level-calculate";
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
        if (universityNameV == "") {
            util.drawToast('请输入目标院校');
            return false;
        }
        util.ajaxFun(urlConfig.getPredictProbability, 'GET', {
            'type': subjectV,
            'score': scoreV,
            'universityName': universityNameV
        }, function (res) {
            if (res.rtnCode === "0000000") {
                $('.container').hide();
                $('.content-b').show();
                $('#header-menu').hide();
                $('#header-back').show();
                $('#header-title').text('预测结果');
                $('#header-back').off('click');
                $('#header-back').on('click', function() {
                    back();
                });
                var source = $("#temp-content").html();
                var template = handlebars.compile(source);
                $('.content-b').html(template(res.bizData));
                var startNum = res.bizData.probability;
                if (startNum <= 0) {
                    $('.star-list').hide();
                }
                var strArr = '';
                for (var i = 0; i < startNum; i++) {
                    var star = '<i class="star-icon"></i>';
                    strArr += star;
                }
                $('#star-list').html(strArr);
                $('#type-subject').text($('.options span.active').text());
                $('.back').off('click');
                $('.back').on('click', function() {
                    back();
                });

                if(res.bizData.historyList.length==0){
                    $('.data-tips').html(noDataTips('真抱歉,暂无数据'));
                } else {
                    $('.data-tips').html('');
                }

            } else {
                util.drawToast(res.msg);
            }
        });

    }

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

    $(document).ready(function() {
        $('.options span').on('click', function() {
            $(this).addClass('active').siblings().removeClass('active');
        });
        $('.calculate-btn').on('click', function() {
            levelCalculate();
        });

        $('#header-title').text('录取预测');
        $('#header-menu').show();

        var schoolName = getQueryObject(window.location.href).schoolName || '';
        $('#target_institutions').val(schoolName);

    });

})();
