var util = require('commonjs');
var urlConfig = require('urlConfig');
var handlebars = require('handlebars');
var getTime = require('timeFormat');

$(function(){
    $('#header-menu').show();
    $('#header-title').text('高考日程');
    $('.calendar-icon').on('click', function(event){
        event.stopPropagation();
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $('.calendar-drop-down').addClass('hidden');
        } else {
            $(this).addClass('active');
            $('.calendar-drop-down').removeClass('hidden');
        }
    });
    $('body').on('click',function(){
        $('.calendar-icon').removeClass('active');
        $('.calendar-drop-down').addClass('hidden');
    });


    //    高考时间倒计时
    function showCountDown(year, month, day) {
        var now = new Date();
        var endDate = new Date(year, month - 1, day);
        var leftTime = endDate.getTime() - now.getTime();
        var leftsecond = parseInt(leftTime / 1000);
        var day1 = Math.floor(leftsecond / (60 * 60 * 24));
        var hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
        var minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
        var second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
        console.info("距离高考" + year + "年" + month + "月" + day + "日还有：" + day1 + "天" + hour + "小时" + minute + "分" + second + "秒");
        var d = day1 + '';
        return d.split('');
    }

    var gkYear = new Date().getFullYear();//暂定高考时间每年的6.7
    $('.gk-year').text(gkYear);
    var gkTime = (showCountDown(gkYear, 6, 7));
    if(gkTime.length == 1){
        $('.ten,.a').hide()
    }
    if(gkTime.length == 2){
        $('.a').hide();
    }
    if(gkTime.length == 1 && gkTime.length == 2){
        $('.ten,.a').hide()
    }
    $('.hundred').text(gkTime[0]);
    $('.ten').text(gkTime[1]);
    $('.a').text(gkTime[2]);

    //获取高考日程list
    $('#calendar-list').on('click', ' li', function () {
        $(".article-list").html("");
        $(this).addClass('active').siblings().removeClass('active');
        var month = $(this).html();
        month = month.substring(0, month.length - 1);
        getMonth(month);
    });





    //获取当前月分的新闻
    var nowMonth = new Date().getMonth() + 1;
    $('.calendar-list li').eq(nowMonth-1).addClass('active');
    getMonth(nowMonth);
    function getMonth(month) {
        //var m = new Date().getFullYear() + '-' + new Date().getMonth() + 1;
        util.ajaxFun(urlConfig.getScheduleList, 'get', {
            month: month,
            rows: 12,
            isIndex:true,
            scheduleRows: 10
        }, function (res) {
            console.log(res)
            if (res.rtnCode == '0000000') {
                var schedules = res.bizData;
                var curMonth = schedules[0];
                var month = curMonth.month > 9 ? curMonth.month : '0' + curMonth.month;

                $('#cur_date').html(month + '月/' + curMonth.years + '年');


                util.ajaxFun(urlConfig.getScheduleInfo, 'get', {id: curMonth.schedules[0].id}, function (res) {
                    if (res.rtnCode == '0000000') {
                        handlebars.registerHelper('formatDate', function (date) {
                            return getTime(date);
                        });
                        var template = handlebars.compile($("#article-detail").html());
                        var list = res.bizData;
                        var html = template(list);
                        $('#schedule-content').html(html);
                    }
                });
            }
        })
    }

    //默认加载第一个新闻详情
    $(document).on('click', '.article-container a', function () {
        var id = $(this).attr('id');
        getDetail(id);
    });
    //    通过id获取日程详情
    function getDetail(id) {

    }

});


