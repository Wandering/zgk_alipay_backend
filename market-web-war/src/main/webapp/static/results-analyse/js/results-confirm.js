var Util = {
    BASEURL: 'http://10.136.13.245:8084',
    READMEURL: 'http://wiki.qtonecloud.cn/pages/viewpage.action?pageId=42960811',
    setHeadTxt: function(name, hideDom, showDom) {
        $('#header-title').text(name);
        if (hideDom) {
            $(hideDom).hide();
        }
        if (showDom) {
            $(showDom).show();
        }
    },
    getQueryString: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r !== null) {
            return unescape(r[2]);
        }
        return null;
    },
    drawToast: function(message) {
        var intervalCounter = null;
        var alert = document.getElementById("toast");
        if (!alert) {
            var toastHTML = '<div id="toast">' + message + '</div>';
            document.body.insertAdjacentHTML('beforeEnd', toastHTML);
        } else {
            alert.style.opacity = 0.9;
        }
        intervalCounter = setInterval(function() {
            var alert = $("#toast");
            alert.css('opacity', 0).remove();
            clearInterval(intervalCounter);
        }, 2000);
    }
};
$(function() {
    /*
     * ====================
     * 首次进入：根据省份code获取地市
     * 所在院校、所在年级、所在班级
     * ====================
     */
    var Area = {
        init: function() {
            this.url = 'http://zj.zhigaokao.cn/region/getAllRegion.do';
            this.data = null;
            this.fetch();
            this.changeProvince();
            this.addEventForArea();
        },
        fetch: function() {
            var that = this;
            this.promiseSource = $.ajax(this.url);
            this.promiseSource.then(function(res) {
                if (res.rtnCode === '0000000') {
                    that.data = res.bizData;
                }
            });
        },
        addEventForArea: function() {
            var that = this;
            $('#province').change(function() {
                that.getCity();
            });
            $('#city').change(function() {
                that.changeCity();
            });
            $('#area').change(function() {
                that.changeArea();
            });
        },
        render: function(clsName, data) {
            var optionTpl = '';
            this.promiseSource.then(function() {
                $.each(data, function(i, v) {
                    if (v.id !== 900000) {
                        optionTpl += '<option value="' + v.id + '">' + v.name + '</option>';
                    }
                });
                $(clsName).html(optionTpl);
                // $('#province').children("option[value='610000']").attr('selected', true);
                // $('#city').children("option[value='610900']").attr('selected', true);
                // $('#area').children("option[value='610902']").attr('selected', true);
                if (clsName === '#area') {
                    var aIndex = $('#area').children('option:selected').val();
                    GetSchool.init(UserBaseInfo.userId, aIndex);
                }
            });
        },
        getProvince: function() {
            var that = this;
            this.promiseSource.then(function() {
                that.render('#province', that.data);
                that.getCity();
            });
        },
        getCity: function(flag) {
            var that = this;
            this.promiseSource.then(function() {
                if (flag) {
                    that.getArea();
                } else {
                    var pIndex = $('#province').children('option:selected').val();
                    for (var i in that.data) {
                        if (that.data[i].id === parseInt(pIndex)) {
                            that.render('#city', that.data[i].cityList);
                            that.getArea();
                        }
                    }
                }
            });
        },
        getArea: function(flag) {
            var that = this;
            this.promiseSource.then(function(res) {
                if (!flag) {
                    var pIndex = $('#province').children('option:selected').val();
                    var cIndex = $('#city').children('option:selected').val();
                    for (var i in that.data) {
                        if (that.data[i].id === parseInt(pIndex)) {
                            for (var j in that.data[i].cityList) {
                                if (that.data[i].cityList[j].id === parseInt(cIndex)) {
                                    that.render('#area', that.data[i].cityList[j].countyList);
                                }
                            }
                        }
                    }
                }
            });
        },
        changeProvince: function() {
            this.getProvince();
        },
        changeCity: function() {
            this.getCity(true);
        },
        changeArea: function() {
            this.getArea(true);
            var aIndex = $('#area').children('option:selected').val();
            GetSchool.init(this.userId, aIndex);
        }
    };
    //根据区获取院校、班级、年级信息 610902
    var GetSchool = {
        init: function(userId, areaId) {
            this.url = Util.BASEURL + '/score/queryHighSchoolByCountyId.do';
            this.data = null;
            this.fetch(userId, areaId);
            this.render();
        },
        fetch: function(userId, areaId) {
            var that = this;
            this.promiseGetSchool = $.ajax({
                url: this.url,
                data: {
                    countyId: areaId,
                    userId: userId,
                    schoolName: ''
                }
            }).then(function(res) {
                if (res.rtnCode === '0000000') {
                    that.data = res.bizData;
                }
            });
        },
        render: function() {
            var that = this;
            this.promiseGetSchool.then(function() {
                var optionTpl = '';
                if (that.data.length !== 0) {
                    $.each(that.data, function(i, v) {
                        optionTpl += '<option value="' + v.schoolCode + '">' + v.schoolName + '</option>';
                    });
                    $('#school').html(optionTpl);
                    // $('#school').children("option[value='6109024086']").attr('selected', true);
                } else {
                    optionTpl = '<option value="000">暂无</option>';
                    $('#school').html(optionTpl);
                }
            });
        },
    };
    var UserBaseInfo = {
        userProfileDom: $('.user-profile'), //基本信息输入
        settingFullScoreDom: $('.main-section2-container'), //满分设置
        scoreAnalyseDom: $('.main-section1-container'), //分析
        userId: 100, // 用户id
        areaId: '610000',
        init: function() {
            Area.init();
            this.newOrOld(this.userId);
            this.addEventForUserBase();
        },
        addEventForUserBase: function() {
            var that = this;
            this.userProfileDom.find('.btn-complete').click(function() {
                that.completeArea();
            });
            $('.modify-base-info .modify-btn').click(function() {
                that.modifyArea(that.userId);
            });
            this.scoreAnalyseDom.find('.btn-score-analyse').click(function() {
                that.submitToAnalyse();
            });
        },
        completeArea: function() {
            if (
                $('#province').val() === '00' ||
                $('#city').val() === '00' ||
                $('#area').val() === '00' ||
                $('#province').val() === '00'
            ) {
                Util.drawToast('省市区没有填写完整');
                return false;
            }
            if ($('#school').val() == '000') {
                Util.drawToast('抱歉该地区暂时不支持');
                return false;
            }
            if (
                $.trim($('#grade').val()) === '' ||
                $.trim($('#class').val()) === ''
            ) {
                Util.drawToast('年级和班级不能为空');
                return false;
            }
            Util.setHeadTxt('成绩分析', '.user-profile', '.main-section1-container');
            var inputProvince = $('#province').children('option:selected').html();
            var inputSchool = $('#school').children('option:selected').html();
            $('.modify-base-info .user-from').text(inputProvince + inputSchool + '考生欢迎你！');
        },
        modifyArea: function(userId) {
            Util.setHeadTxt('修改信息', '.main-section1-container', '.user-profile');
            var that = this;
            $.ajax({
                url: Util.BASEURL + '/score/queryUserInfo.do',
                data: {
                    "userId": userId
                }
            }).then(function(res) {
                if (res.rtnCode === '0000000') {
                    var dataJson = res.bizData;
                    $('#province').children("option[value='" + dataJson.provinceId + "']").attr('selected', true);
                    $('#province').change();
                    $('#city').children("option[value='" + dataJson.cityId + "']").attr('selected', true);
                    $('#city').change();
                    $('#area').children("option[value='" + dataJson.countyId + "']").attr('selected', true);
                    $('#area').change();
                    $('#school').children("option[value='" + dataJson.schoolCode + "']").attr('selected', true);
                    $('#grade').val(dataJson.gradeInfo);
                    $('#class').val(dataJson.classInfo);
                }
            });
        },
        newOrOld: function(userId) {
            var that = this;
            $.ajax({
                url: Util.BASEURL + '/score/queryScoreRecordByUserId.do',
                data: {
                    "userId": userId
                }
            }).then(function(res) {
                if (res.rtnCode === "0000000") {
                    var dataJson = res.bizData,
                        subjectListTpl = '',
                        settingFullScore = '';
                    if ($.isEmptyObject(dataJson) !== false) {
                        localStorage.removeItem('setScoreArr');
                        localStorage.removeItem('setFullScoreArr');
                        Util.setHeadTxt('请输入个人信息', '', '.header-title');
                        var subjectShowOrHide = $('.subject-list .subject-li');
                        subjectShowOrHide.eq(6).hide();
                        subjectShowOrHide.eq(7).hide();
                        subjectShowOrHide.eq(8).hide();
                        that.scoreAnalyseDom.find('.type').click(function() {
                            var _this = $(this);
                            _this.find('b').addClass('selected').parent().siblings().find('b').removeClass('selected');
                            var subjectShowOrHide = $('.subject-list .subject-li');
                            if (_this.attr('data-type') == '1') {
                                subjectShowOrHide.eq(3).show();
                                subjectShowOrHide.eq(4).show();
                                subjectShowOrHide.eq(5).show();
                                subjectShowOrHide.eq(6).hide();
                                subjectShowOrHide.eq(7).hide();
                                subjectShowOrHide.eq(8).hide();
                                $('.setting-score-link').attr('data-type', 1);
                            } else {
                                subjectShowOrHide.eq(3).hide();
                                subjectShowOrHide.eq(4).hide();
                                subjectShowOrHide.eq(5).hide();
                                subjectShowOrHide.eq(6).show();
                                subjectShowOrHide.eq(7).show();
                                subjectShowOrHide.eq(8).show();
                                $('.setting-score-link').attr('data-type', 2);
                            }
                        });
                    } else {
                        console.info('第二次来哦');
                        Util.setHeadTxt('成绩分析', '.user-profile', '.main-section1-container');
                        $('.modify-base-info .user-from').text(dataJson.areaName + dataJson.schoolName + '考生欢迎你！');
                        $('.subject-name .type').eq(dataJson.majorType - 1).find('b').addClass('selected').parent().siblings().find('b').removeClass('selected');
                        $.each(dataJson.scores, function(k) {
                            var inputSorce = dataJson.scores[k].split('-')[0];
                            var inputFullSocre = dataJson.scores[k].split('-')[1];
                            subjectListTpl += '' +
                                '<div class="subject-li">' +
                                '<span class="subject-label-name">' + k + '</span>' +
                                '<div class="main-left">' +
                                '<input type="tel" value=' + inputSorce + ' name="input-score" maxlength="3" id=shwoLi' + k + '>' +
                                '<span class="full-mark">满分' + inputFullSocre + '</span>' +
                                '</div>' +
                                '</div>';
                        });
                        $('#subject-list').html(subjectListTpl);
                        $('.setting-score-link').attr('data-type', dataJson.majorType);
                    }
                    that.setFullScore(dataJson.scores);
                }
            });
        },
        setFullScore: function(data) {
            var settingFullScore = '';
            var that = this;
            if (data) {
                $.each(data, function(k) {
                    var inputFullSocre = data[k].split('-')[1];
                    settingFullScore += '' +
                        '<div class="full-score-li m">' +
                        '<span class="subject-full-name">' + k + '</span>' +
                        '<input type="tel" name="input-full-score" maxlength="3" value=' + inputFullSocre + '>' +
                        '</div>';
                });
                $('#setting-full-score').html(settingFullScore);
                this.scoreAnalyseDom.find('.setting-score-link').click(function() {
                    Util.setHeadTxt('设置满分', '.main-section1-container', '.main-section2-container');
                });
            } else {
                this.scoreAnalyseDom.find('.setting-score-link').click(function() {
                    Util.setHeadTxt('设置满分', '.main-section1-container', '.main-section2-container');
                    var fullScoreLi = $('#setting-full-score .full-score-li');
                    if ($(this).attr('data-type') === '1') {
                        fullScoreLi.eq(6).hide();
                        fullScoreLi.eq(7).hide();
                        fullScoreLi.eq(8).hide();
                        fullScoreLi.eq(5).show();
                        fullScoreLi.eq(4).show();
                        fullScoreLi.eq(3).show();
                    } else {
                        fullScoreLi.eq(3).hide();
                        fullScoreLi.eq(4).hide();
                        fullScoreLi.eq(5).hide();
                        fullScoreLi.eq(6).show();
                        fullScoreLi.eq(7).show();
                        fullScoreLi.eq(8).show();
                    }
                });
            }
            this.settingFullScoreDom.find('.save-full-score').click(function() {
                var subjectLi = that.settingFullScoreDom.find('[name="input-full-score"]');
                that.scoreArr = [];
                for (var i = 0; i < subjectLi.length; i++) {
                    if (subjectLi.eq(i).val().length === 0) {
                        Util.drawToast('每项都不能为空');
                        return false;
                    }
                    $('#subject-list').find('.full-mark').eq(i).text('满分' + subjectLi.eq(i).val());
                    that.scoreArr.push(parseInt(subjectLi.eq(i).val()));
                }
                if (data) {
                    localStorage.setItem('setFullScoreArr', JSON.stringify(that.scoreArr));
                } else {
                    var wScoresArr = (that.scoreArr).slice(0, 5);
                    var lScoresArr = (that.scoreArr).slice(0, 3).concat((that.scoreArr).slice(6, 9));
                    console.info('wScoresArr', wScoresArr);
                    console.info('lScoresArr', lScoresArr);
                    if ($('.setting-score-link').attr('data-type') === '1') {
                        localStorage.setItem('setFullScoreArr', JSON.stringify(wScoresArr));
                    } else {
                        localStorage.setItem('setFullScoreArr', JSON.stringify(lScoresArr));
                    }
                }
                Util.setHeadTxt('成绩分析', '.main-section2-container', '.main-section1-container');
            });
            this.settingFullScoreDom.find('.cancle-full-score').click(function() {
                Util.setHeadTxt('成绩分析', '.main-section2-container', '.main-section1-container');
            });
        },
        submitToAnalyse: function() {
            var inputSocreLi = $('.subject-li input[name="input-score"]');
            var that = this;
            that.setScoreArr = [];
            var scoresObj = {},
                typeArr = '';
            wkArr = ["语文", "数学", "外语", "政治", "历史", "地理"],
                lKArr = ["语文", "数学", "外语", "物理", "化学", "生物"],
                majorType = that.scoreAnalyseDom.find('.setting-score-link').attr('data-type'),
                fullScoresArr = JSON.parse(localStorage.getItem('setFullScoreArr'));
            if (!fullScoresArr) {
                fullScoresArr = ['150', '150', '150', '100', '100', '100'];
            }
            var fullScoreLi = '';
            if (majorType === '1') {
                typeArr = wkArr;
                for (var i = 0; i < wkArr.length; i++) {
                    fullScoreLi = inputSocreLi.eq(i).next().text();
                    if (inputSocreLi.eq(i).val() > parseInt(fullScoreLi.substring(2, fullScoreLi.length))) {
                        inputSocreLi.eq(i).parent().parent().find('.subject-label-name');
                        Util.drawToast('输入分数不能大于满分');
                        return false;
                    }
                    if (inputSocreLi.eq(i).val() === '') {
                        inputSocreLi.eq(i).parent().parent().find('.subject-label-name');
                        Util.drawToast('科目每项都不能为空');
                        return false;
                    }
                    that.setScoreArr.push(parseInt(inputSocreLi.eq(i).val()));
                }
            } else {
                typeArr = lKArr;
                for (var j = 0; j < 3; j++) {
                    fullScoreLi = inputSocreLi.eq(j).next().text();
                    if (inputSocreLi.eq(j).val() > parseInt(fullScoreLi.substring(2, fullScoreLi.length))) {
                        inputSocreLi.eq(j).parent().parent().find('.subject-label-name');
                        Util.drawToast('输入分数不能大于满分');
                        return false;
                    }
                    if (inputSocreLi.eq(j).val() === '') {
                        inputSocreLi.eq(j).parent().parent().find('.subject-label-name');
                        Util.drawToast('科目每项都不能为空');
                        return false;
                    }
                    that.setScoreArr.push(parseInt(inputSocreLi.eq(j).val()));
                }
                for (var k = 6; k < 9; k++) {
                    fullScoreLi = inputSocreLi.eq(k).next().text();
                    if (inputSocreLi.eq(k).val() > parseInt(fullScoreLi.substring(2, fullScoreLi.length))) {
                        inputSocreLi.eq(k).parent().parent().find('.subject-label-name');
                        Util.drawToast('输入分数不能大于满分');
                        return false;
                    }
                    if (inputSocreLi.eq(k).val() === '') {
                        inputSocreLi.eq(k).parent().parent().find('.subject-label-name');
                        Util.drawToast('科目每项都不能为空');
                        return false;
                    }
                    that.setScoreArr.push(parseInt(inputSocreLi.eq(k).val()));
                }
            }
            localStorage.setItem('setScoreArr', JSON.stringify(that.setScoreArr));
            var scoresArr = JSON.parse(localStorage.getItem('setScoreArr'));
            $.each(typeArr, function(i, v) {
                scoresObj[v] = scoresArr[i] + '-' + fullScoresArr[i];
            });
            $.ajax({
                url: Util.BASEURL + '/score/insertScoreRecord.do',
                type: "post",
                data: {
                    "userId": that.userId,
                    "areaId": that.areaId,
                    "majorType": majorType,
                    "scores": scoresObj
                }
            }).then(function(res) {
                if (res.rtnCode === '0000000') {
                    console.info(res);
                    window.location.href = "../results-analyse.html?recordId=" + res.bizData.recordId;
                }
            });
        }
    };
    UserBaseInfo.init();




});
