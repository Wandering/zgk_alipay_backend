/**
 * Created by kepeng on 16/5/9.
 */
(function() {

    var util = require('commonjs');
    var cookie = require('cookie');
    var urlConfig = require('urlConfig');
    var handlebars = require('handlebars');
    var IScroll = require('iscroll');
    var myScroll = null;

    function openModal(type, id){
        if($('.'+ type +'-modal').hasClass('hidden')){
            $('.'+ type +'-modal').removeClass('hidden');
            $('.backdrop1').removeClass().addClass(type).addClass('backdrop1');
        }
        //$('.school-list').html('');
        switch (id) {
            case '1':
                School.getRemoteProvinceList();
                break;
            case '2':
                School.getSchoolType();
                break;
            case '3':
                School.getLevel();
                break;
            case '4':
                School.getFeature();
                break;
            default :
                break;
        }
    }

    var School = {
        offset: 0,
        /**
         * 院校属地
         */
        getRemoteProvinceList: function() {
            var that = this;
            util.ajaxFun(urlConfig.getProvinceList, 'get', {
            }, function (res) {
                if (res.rtnCode == '0000000') {
                    var source = $('#privance-tpl').html();
                    var template = handlebars.compile(source);
                    $('.location-list').html(template(res));

                    $('.location-list li[data-id="' + $('.select.active').attr('data-select') + '"]').addClass('active').siblings().removeClass('active');
                    $('.location-list li').off('click');
                    $('.location-list li').on('click', function() {
                        $(this).addClass('active').siblings().removeClass('active');
                        $('.school-location-btn').text($(this).text());
                        $('.school-location-btn').attr('data-select', $(this).attr('data-id'));
                        that.offset = 0;
                        $('.school-location-modal').addClass('hidden');
                        $('.backdrop1').addClass('hidden');
                        $('.filter-list').css('z-index', '1');
                        $('.select').removeClass('active');
                        School.getSchoolList();
                    });
                }
            });
        },

        getRemoteDataDictList: function(type) {
            var that = this;
            util.ajaxFun(urlConfig.getCollegeList + '?type=' + type, 'get', {
            }, function (res) {
                if (res.rtnCode == '0000000') {
                    var source = $('#school-type-tpl').html();
                    var template = handlebars.compile(source);
                    $('.location-list').html(template(res));
                    $('.location-list li[data-dictid="' + $('.select.active').attr('data-select') + '"]').addClass('active').siblings().removeClass('active');
                    $('.location-list li').off('click');
                    $('.location-list li').on('click', function() {
                        $(this).addClass('active').siblings().removeClass('active');
                        var typeId = $('.select.active').attr('data-id');
                        var arry = ['','category','level','feature'];
                        $('.' + arry[typeId - 1]).text($(this).text());
                        if(typeId=="4"){
                            $('.' + arry[typeId - 1]).attr('data-select', $(this).attr('data-dictid'));
                        }else{
                            $('.' + arry[typeId - 1]).attr('data-select', $(this).attr('data-dictid'));
                        }
                        that.offset = 0;
                        $('.school-location-modal').addClass('hidden');
                        $('.backdrop1').addClass('hidden');
                        $('.filter-list').css('z-index', '1');
                        $('.select').removeClass('active');
                        School.getSchoolList();
                    });
                }
            });
        },
        /**
         * 院校分类
         */
        getSchoolType: function() {
            this.getRemoteDataDictList('PROPERTY');
        },
        /**
         * 学历层次
         */
        getLevel: function() {
            this.getRemoteDataDictList('EDULEVEL');
        },
        /**
         * 院校特征
         */
        getFeature: function() {
            this.getRemoteDataDictList('FEATURE');
        },
        getSchoolList: function(flag) {
            var areaid = $('.school-location-btn').attr('data-select') || '';
            var type = $('.category').attr('data-select') || '';
            var educationLevel = $('.level').attr('data-select') || '';
            if (!educationLevel && !flag) {
                educationLevel = 1;
            }
            var property = $('.feature').attr('data-select') || '';

            var universityName = '';
            if (flag) {
                universityName = $('#school_name').val();
            }
            var that = this;
            util.ajaxFun(urlConfig.getSearchList, 'get', {
                universityName: universityName,
                areaid: areaid,
                type: type,
                educationLevel: educationLevel,
                property: property,
                offset: that.offset,
                rows: 10
            }, function (res) {
                if (res.rtnCode == '0000000') {
                    $('.pull-text').show();
                    $('#scroller-pullUp').hide();
                    $('.info span').text(res.bizData.count);
                    if (res.bizData.count > 0) {
                        if (that.offset == 0) {
                            $('.school-list').html('');
                        }
                        that.offset += 10;
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
                        var source = $('#temp-search-list').html();
                        var template = handlebars.compile(source);


                        handlebars.registerHelper('whichOne', function (v1,v2) {
                            if(v1.indexOf('http')>-1){
                                var str = '<img src="'+v1+'" class="school-logo" sid="{{id}}">';
                                return str;
                            }else{
                                return v2.fn(this);
                            }
                        });


                        $('.school-list').append(template(res));
                        if (myScroll)myScroll.refresh();
                    } else {
                        if (that.offset == 0) {
                            $('.school-list').html('');
                        }
                        $('.pull-text').html('没有更多数据~~');
                        $('.pull-text').addClass('no-data');
                    }
                }
            });
        },
        getMajoredInfoByKeywords: function() {
            var keywords = $.trim($('#school_name').val());
            if (!keywords) {
                return;
            }
            if (!/^[\u4e00-\u9fa5]{0,}$/.test(keywords)) {
                return;
            }
            util.ajaxFun(urlConfig.getUniversityInfoByKeywords, 'get', {
                keywords: keywords
            }, function (res) {
                if (res.rtnCode == '0000000') {
                    var html = [];
                    for (var key in res.bizData) {
                        html.push('<li class="result" data-id="' + key + '">' + res.bizData[key] + '</li>')
                    }
                    $('.search-result').html(html.join(''));
                }
            });
        }

    };
    $('body').on('click','.location-list li',function(){
        var areaTxt = $(this).text();
        sa.track('WeChat_area',{area:areaTxt});
    });
    $(document).ready(function() {

        $('#container').css('height', window.innerHeight - 93);

        $('#header-title').text('查院校');
        $('#header-menu').show();
        $('#header-search').show();
        School.getSchoolList();

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
                if (myScroll)myScroll.refresh();
                School.getSchoolList();
            } else {
                $('.pull-text').html('没有更多数据~~');
            }
        });

        $('.header-search').on('click', function(){
            if (!$('.school-location-modal').hasClass('hidden')) {
                $('.school-location-modal').addClass('hidden');
            }
            if ($('.search-modal').hasClass('hidden')) {
                $('.search-modal').removeClass('hidden');
                $('.backdrop1').removeClass('hidden');
                $('.filter-list').css('z-index', '0');
            } else {
                $('.search-modal').addClass('hidden');
                $('.backdrop1').addClass('hidden');
                $('.filter-list').css('z-index', '1');
            }
            $('.search-result').html('');
            $('#school_name').val('');

        });

        $('#school_name').on('input propertychange', function() {
            School.getMajoredInfoByKeywords();
        });

        $('.search-result').click(function(event) {
            var ele = $(event.target);
            var id = ele.attr('data-id');
            var name = ele.text();
            $('#school_name').val(name);
            $('#school_name').attr('data-id', id);
            $('.search-result').html('');
            //if (ele.hasClass('result')) {
            //    var id = ele.attr('data-id');
            //    var name = ele.text();
            //    $('#school_name').val(name);
            //    $('#school_name').attr('data-id', id);
            //    $('.search-result').html('');
            //} else {
            //    if ($('.search-result li').length > 0) {
            //        var dom = $('.search-result li').get(0);
            //        var id = $(dom).attr('data-id');
            //        var name = $(dom).text();
            //        $('#school_name').val(name);
            //        $('#school_name').attr('data-id', id);
            //        $('.search-result').html('');
            //    }
            //}
        });

        $('.search-modal span').on('click', function() {
            $('.search-modal').addClass('hidden');
            $('.backdrop1').addClass('hidden');
            $('.filter-list').css('z-index', '1');
            $('.search-result').html('');
        });
        $('.search-normal-icon').on('click', function() {
            $('.search-modal').addClass('hidden');
            $('.backdrop1').addClass('hidden');
            $('.filter-list').css('z-index', '1');
            $('.school-location-btn').attr('data-select', '');
            $('.school-location-btn').text('院校属地');
            $('.category').attr('data-select', '');
            $('.category').text('院校分类');
            $('.level').attr('data-select', '');
            $('.level').text('学历层次');
            $('.feature').attr('data-select', '');
            $('.feature').text('院校特征');
            School.offset = 0;
            School.getSchoolList(true);
        });
        $('.select').on('click', function(){
            if (!$('.search-modal').hasClass('hidden')) {
                $('.search-modal').addClass('hidden');
                $('.backdrop1').addClass('hidden');
                $('.filter-list').css('z-index', '1');
            }
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $('.school-location-modal').addClass('hidden');
                $('.backdrop1').addClass('hidden').addClass('school-location');
            } else {
                $(this).addClass('active').siblings().removeClass('active');
                var id = $(this).attr('data-id');
                openModal('school-location', id);
            }
        });
        $('.backdrop1').on('click', function(){
            $('.school-location-modal').addClass('hidden');
            $('.search-modal').addClass('hidden');
            $('.backdrop1').addClass('hidden');
            $('.filter-list').css('z-index', '1');
            $('.select.active').removeClass('active');
            $('.search-result').html('');
        });
    });
})();