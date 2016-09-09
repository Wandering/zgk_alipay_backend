/**
 * Created by kepeng on 16/5/10.
 */
(function() {

    var util = require('commonjs');
    var cookie = require('cookie');
    var urlConfig = require('urlConfig');
    var handlebars = require('handlebars');
    var major = {
        searchFlag: false,
        data: {},
        getMarjor: function() {
            var that = this;
            var type = $('.tab.active').attr('data-type');
            util.ajaxFun(urlConfig.getMajoredCategory, 'get', {
                type: type
            }, function (res) {
                if (res.rtnCode == '0000000') {
                    var source = $('#marjor_list').html();
                    var template = handlebars.compile(source);
                    $('.marjor-list').html(template(res.bizData));
                    $('.marjor-list li').first().addClass('active');
                    $('.marjor-list li').off('click');
                    $('.marjor-list li').on('click', function() {
                        $(this).addClass('active').siblings().removeClass('active');
                        that.getCategoryMajoredList();
                    });
                    that.getCategoryMajoredList();
                }
            });
        },
        getAllList: function(data) {
            var tmp = [];
            for (var i = 0,len = data.length; i < len; i++) {
                tmp.push.apply(tmp, data[i].childList);
            }
            return tmp;
        },
        getCategoryMajoredList: function() {
            var that = this;
            var categoryId = $('.menu-list li.active').attr('data-id');
            var type = $('.tab.active').attr('data-type');
            util.ajaxFun(urlConfig.getMajoredCategoryById, 'get', {
                categoryId: categoryId
            }, function (res) {
                if (res.rtnCode == '0000000') {
                    var source = $('#marjor_detile_list').html();
                    var template = handlebars.compile(source);
                    var arryData = that.getAllList(res.bizData.childList);
                    $('.menu-inner-list').html(template(arryData));
                }
            });
        },
        getMajoredInfoByKeywords: function() {
            var keywords = $.trim($('#school_name').val());
            if (!keywords) {
                return;
            }
            util.ajaxFun(urlConfig.getMajoredInfoByKeywords, 'get', {
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
        },
        mergeData: function(data) {
            var obj = {};
            for (var i = 0, len = data.length; i < len; i++) {
                if (!obj[data[i].disciplineCategoriesName]) {
                    obj[data[i].disciplineCategoriesName] = [];
                }
                obj[data[i].disciplineCategoriesName].push.apply(obj[data[i].disciplineCategoriesName], data[i].majoredList);
            };
            return obj;
        },
        getMajoredByName: function() {
            var that = this;
            var keywords = $.trim($('#school_name').val());
            var type = $('.tab.active').attr('data-type');
            if (!keywords) {
                return;
            }
            util.ajaxFun(urlConfig.getMajoredByName, 'get', {
                majoredName: keywords,
                type: type
            }, function (res) {
                if (res.rtnCode == '0000000') {
                    if (res.bizData.length <= 0) {
                        $('.marjor-list').html('');
                        $('.menu-inner-list').html('');
                        $('.no-data').removeClass('hidden');
                        $('.no-data').html('(ﾟ∀ﾟ) 真抱歉,没有查到相关专业');
                    } else {
                        $('.no-data').addClass('hidden');
                        $('.no-data').html('');
                        major.data = that.mergeData(res.bizData);
                        that.renderSearch(major.data);
                    }
                }
            });
        },
        renderSearch: function(data) {
            var html = [];
            for (var key in data) {
                html.push('<li>' + key + '</li>');
            }
            $('.marjor-list').html(html.join(''));
            $('.marjor-list li').first().addClass('active');
            var name = $($('.marjor-list li').get(0)).text();
            this.renderSearchChildren(name);
            var that = this;
            $('.marjor-list li').off('click');
            $('.marjor-list li').on('click', function() {
                $(this).addClass('active').siblings().removeClass('active');
                var name = $(this).text();
                that.renderSearchChildren(name);
            });
        },
        renderSearchChildren: function(name) {
            var majoredList = this.data[name];
            var html = [];
            for (var i = 0, len = majoredList.length; i < len; i++) {
                html.push('<li><a href="/major-detail?id=' + majoredList[i].majoredId + '">' + majoredList[i].majoredName + '</a></li>');
            }
            $('.menu-inner-list').html(html.join(''));
        }
    }
    $(document).ready(function() {
        $('#header-title').text('查专业');
        $('#header-menu').show();
        $('#header-search').show();

        document.addEventListener('touchstart',function(){},false);

        $('.tab').on('click', function() {
            $('.no-data').addClass('hidden');
            $('.no-data').html('');
            $(this).addClass('active').siblings().removeClass('active');
            major.getMarjor();
        });

        $('.search-normal-icon').on('click', function(event) {
            $('.search-modal').addClass('hidden');
            $('.backdrop1').addClass('hidden');
            major.searchFlag = true;
            major.getMajoredByName();
        });
        $('#header-search, .backdrop1').on('click', function() {
            $('.search-result').html('');
            if ($('.search-modal').hasClass('hidden')) {
                $('.search-modal').removeClass('hidden');
                $('.backdrop1').removeClass('hidden');
                $('#school_name').val('');
            } else {
                $('.search-modal').addClass('hidden');
                $('.backdrop1').addClass('hidden');
            }
        });
        $('#school_name').on('input propertychange', function() {
            major.getMajoredInfoByKeywords();
        });
        $('.search-result').click(function(event) {
            //$(this).addClass('active').siblings().removeClass('active');
            var ele = $(event.target);
            ele.addClass('active').siblings().removeClass('active');
            var id = ele.attr('data-id');
            var name = ele.text();
            $('#school_name').val(name);
            $('#school_name').attr('data-id', id);
            $('.search-result').html('');
            //var ele = $(event.target);
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
            if ($('.search-modal').hasClass('hidden')) {
                $('.search-modal').removeClass('hidden');
            } else {
                $('.search-modal').addClass('hidden');
                $('.backdrop1').addClass('hidden');
            }
            $('.search-result').html('');
        });
        major.getMarjor();
    });
})();
