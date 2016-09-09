/**
 * Created by kepeng on 16/5/9.
 */
(function() {

    var util = require('commonjs');
    var cookie = require('cookie');
    var urlConfig = require('urlConfig');
    var handlebars = require('handlebars');

    function getSchoolInfo() {
        var id = util.getLinkey('id');
        util.ajaxFun(urlConfig.getSchoolDetail, 'get', {
            universityId: id
        }, function (res) {
            if (res.rtnCode == '0000000') {
                $('.img').html('<img src="http://123.59.12.77:8080/' + res.bizData.photoUrl + '" >');
                $('#school_name').text(res.bizData.name);
                $('.description').text(res.bizData.property);
                if (res.bizData.rank) {
                    $('.pm-level').html('排名：' + res.bizData.rank);
                } else {
                    $('.pm-level').hide();
                }
                var source = $('#baseInfo').html();
                var template = handlebars.compile(source);
                $('.base-info').html(template(res.bizData));
                $('.universityIntro').html(res.bizData.universityIntro);
                $('.right').on('click', function() {
                    window.location.href = '/level-calculate?schoolName=' + encodeURIComponent(res.bizData.name);
                });
            }
        });
    }

    function getRemoteUniversityMajorListByUniversityId() {
        var id = util.getLinkey('id');
        util.ajaxFun(urlConfig.getOpenProfessional, 'get', {
            universityId: id
            //majorFeature: '特色专业',
            //offset: 0,
            //rows: 100
        }, function (res) {
            if (res.rtnCode == '0000000') {

                var jsonData = res.bizData;
                $('.open-professional').show();
                var $specialContent = $('#special-content');
                var tabsHtml = [];

                for (var tabs in jsonData) {
                    tabsHtml.push('<p class="professional-sub-title">' + tabs + '</p>');
                    $('#special-profession-title').html(tabsHtml);
                }
                $('body').on('click', '.professional-sub-title', function () {
                    $(this).addClass('bt3').siblings().removeClass('bt3');
                    $specialContent.html('');
                    if (Object.prototype.toString.call(jsonData[$(this).text()]) === '[object Object]') {
                        for (var tabsub in jsonData[$(this).text()]) {
                            $specialContent.append('<div class="tabsub">' + tabsub + '</div>');
                            for (var j = 0; j < jsonData[$(this).text()][tabsub].length; j++) {
                                var majorId = jsonData[$(this).text()][tabsub][j].majorId,
                                    majorName = jsonData[$(this).text()][tabsub][j].majorName;
                                majorId ? $specialContent.append('<span class="feature-major"><a href="/major-detail?action=school-detail&schoolId=' + util.getLinkey('id') + '&id='+ majorId +'">'+majorName+'</a></span>') :$specialContent.append('<span class="feature-major">'+majorName+'</span>');
                            }
                        }
                    }
                    for (var i = 0; i < jsonData[$(this).text()].length; i++) {
                        var majorIdSub = jsonData[$(this).text()][i].majorId,
                            majorNameSub = jsonData[$(this).text()][i].majorName;
                        majorIdSub ? $specialContent.append('<span class="feature-major"><a href="/major-detail?action=school-detail&schoolId=' + util.getLinkey('id') + '&id='+ majorIdSub +'">'+majorNameSub+'</a></span>') :$specialContent.append('<span class="feature-major">'+majorNameSub+'</span>');
                    }
                });
                $('body').find('.professional-sub-title:eq(0)').click();

                //$('.professional').html('特色专业：' + res.bizData.featureMajorList.join('、'));
                //if (res.bizData.majorList.length == 0) {
                //    $('.professional-info table tbody').html('<tr><td colspan="2">(ﾟ∀ﾟ) 真抱歉,没有匹配到招生计划相关数据！</td></tr>');
                //} else {
                //    var source = $('#open-professional-part1-tpl').html();
                //    var template = handlebars.compile(source);
                //    $('.professional-info table tbody').html(template(res.bizData));
                //}
            }
        });
    }

    var Plan = {
        /**
         * 获取年份
         */
        getYear: function() {
            util.ajaxFun(urlConfig.getAdmissionline, 'get', {
            }, function (res) {
                if (res.rtnCode == '0000000') {
                    var source = $('#year-tpl').html();
                    var template = handlebars.compile(source);
                    $('#year').html(template(res));
                    //$('#school_year').html(template(res));
                    $('#professional_year').html(template(res));
                    $($('#year span').get(0)).addClass('active');
                    //$($('#school_year span').get(0)).addClass('active');
                    $($('#professional_year span').get(0)).addClass('active');
                    Plan.getSubject();
                    $('#year span').click(function() {
                        $(this).addClass('active').siblings().removeClass('active');
                        Plan.getUniversityMajorEnrollingPlanList();
                    });
                    //$('#school_year span').click(function() {
                    //    $(this).addClass('active').siblings().removeClass('active');
                    //    Plan.queryUniversityEnrollingChart();
                    //});
                    $('#professional_year span').click(function() {
                        $(this).addClass('active').siblings().removeClass('active');
                        Plan.getUniversityMajorEnrollingSituationList();
                    });
                }
            });
        },
        /**
         * 获取文史类型
         */
        getSubject: function() {
            util.ajaxFun(urlConfig.getCollegeList + '?type=UNIVERSITY_MAJOR_TYPE', 'get', {
            }, function (res) {
                if (res.rtnCode == '0000000') {
                    var source = $('#subject-tpl').html();
                    var template = handlebars.compile(source);
                    $('#subject').html(template(res));
                    $('#school_subject').html(template(res));
                    $('#professional_subject').html(template(res));
                    $($('#subject span').get(0)).addClass('active');
                    $($('#school_subject span').get(0)).addClass('active');
                    $($('#professional_subject span').get(0)).addClass('active');
                    Plan.getRemoteDataDictList();
                    $('#subject span').click(function() {
                        $(this).addClass('active').siblings().removeClass('active');
                        Plan.getUniversityMajorEnrollingPlanList();
                    });
                    $('#school_subject span').click(function() {
                        $(this).addClass('active').siblings().removeClass('active');
                        Plan.queryUniversityEnrollingChart();
                    });
                    $('#professional_subject span').click(function() {
                        $(this).addClass('active').siblings().removeClass('active');
                        Plan.getUniversityMajorEnrollingSituationList();
                    });
                }
            });
        },
        /**
         * 获取批次
         */
        getRemoteDataDictList: function() {
            util.ajaxFun(urlConfig.getCollegeList + '?type=BATCHTYPE', 'get', {
            }, function (res) {
                if (res.rtnCode == '0000000') {
                    var source = $('#batch-tpl').html();
                    var template = handlebars.compile(source);
                    $('#batch').html(template(res));
                    $('#professional_batch').html(template(res));
                    $('#school_batch').html(template(res));
                    $($('#batch span').get(0)).addClass('active');
                    $($('#school_batch span').get(0)).addClass('active');
                    $($('#professional_batch span').get(0)).addClass('active');
                    Plan.getUniversityMajorEnrollingPlanList();
                    Plan.queryUniversityEnrollingChart();
                    Plan.getUniversityMajorEnrollingSituationList();
                    $('#batch span').click(function() {
                        $(this).addClass('active').siblings().removeClass('active');
                        Plan.getUniversityMajorEnrollingPlanList();
                    });
                    $('#school_batch span').click(function() {
                        $(this).addClass('active').siblings().removeClass('active');
                        Plan.queryUniversityEnrollingChart();
                    });
                    $('#professional_batch span').click(function() {
                        $(this).addClass('active').siblings().removeClass('active');
                        Plan.getUniversityMajorEnrollingSituationList();
                    });
                }
            });
        },
        /**
         * 获取招生计划
         */
        getUniversityMajorEnrollingPlanList: function() {
            var universityId = util.getLinkey('id');
            var year = $('#year span.active').attr('data-id');
            var batch = $('#batch span.active').attr('data-id');
            var universityMajorType = $('#subject span.active').attr('data-id');
            util.ajaxFun(urlConfig.getUniversityMajorEnrollingPlanList, 'get', {
                universityId: universityId,
                year: year,
                batch: batch,
                universityMajorType: universityMajorType,
                offset: 0,
                rows: 100
            }, function (res) {
                if (res.rtnCode == '0000000') {
                    if (res.bizData.length == 0) {
                        $('.plan-Enrolling table tbody').html('<tr><td colspan="4">(ﾟ∀ﾟ) 真抱歉,没有匹配到招生计划相关数据！</td></tr>');
                    } else {
                        var source = $('#UniversityMajorEnrollingPlan-tpl').html();
                        var template = handlebars.compile(source);
                        $('.plan-Enrolling table tbody').html(template(res));
                    }
                }
            });
        },
        /**
         * 获取院校录取信息
         */
        queryUniversityEnrollingChart: function() {
            var universityId = util.getLinkey('id');
            //var year = $('#school_year span.active').attr('data-id');
            var batch = $('#school_batch span.active').attr('data-id');
            var universityMajorType = $('#school_subject span.active').attr('data-id');
            util.ajaxFun(urlConfig.queryUniversityEnrollingChartList, 'get', {
                universityId: universityId,
                //year: year,
                batch: batch,
                majorType: universityMajorType,
                offset: 0,
                rows: 100
            }, function (res) {
                if (res.rtnCode == '0000000') {
                    if (res.bizData.length == 0) {
                        $('.school-data table tbody').html('<tr><td colspan="5">(ﾟ∀ﾟ) 真抱歉,没有匹配到院校录取详情相关数据！</td></tr>');
                    } else {
                        var source = $('#university-situation-table-tpl').html();
                        var template = handlebars.compile(source);
                        $('.school-data table tbody').html(template(res));
                    }
                }
            });
        },
        /**
         * 获取专业录取信息
         */
        getUniversityMajorEnrollingSituationList: function() {
            var universityId = util.getLinkey('id');
            var year = $('#professional_year span.active').attr('data-id');
            var batch = $('#professional_batch span.active').attr('data-id');
            var universityMajorType = $('#professional_subject span.active').attr('data-id');
            util.ajaxFun(urlConfig.getUniversityMajorEnrollingSituationList, 'get', {
                universityId: universityId,
                year: year,
                batch: batch,
                universityMajorType: universityMajorType,
                offset: 0,
                rows: 100
            }, function (res) {
                if (res.rtnCode == '0000000') {
                    if (res.bizData.length == 0) {
                        $('.professional-data table tbody').html('<tr><td colspan="5">(ﾟ∀ﾟ) 真抱歉,没有匹配到专业录取详情相关数据！</td></tr>');
                    } else {
                        var source = $('#UniversityMajorEnrollingSituationList-tpl').html();
                        var template = handlebars.compile(source);
                        $('.professional-data table tbody').html(template(res));
                    }
                }
            });
        }
    }

    $(document).ready(function() {

        $('#header-back').show();
        $('#header-title').text('院校详情');

        $('#header-back').on('click', function() {
            var action = util.getLinkey('action');
            var majoredId = util.getLinkey('majoredId');
            if (action) {
                var url = '/' + action;
                if (majoredId) {
                    url += '?id=' + majoredId + '&active=2';
                }
                window.location.href = url;
            }
        });

        getSchoolInfo();
        getRemoteUniversityMajorListByUniversityId();
        Plan.getYear();
        $('.tab-list .tab').on('click', function(){
            $('.tab-list .tab').removeClass('active');
            $(this).addClass('active');

            $('.tab-content').addClass('hidden');
            $('.tab-content').eq($(this).index()).removeClass('hidden');
        });
    });
})();