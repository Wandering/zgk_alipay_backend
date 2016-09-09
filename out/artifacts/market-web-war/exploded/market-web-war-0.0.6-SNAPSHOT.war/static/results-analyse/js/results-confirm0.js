// 接口地址：http://wiki.qtonecloud.cn/pages/viewpage.action?pageId=42960811
// 1.首次进入访问携带三个参数（用户名，用户类型，省份）
// 2.根据省份信息匹配拉取市和区，所在学校年级，所在班级
// 3.点击分析提交所有数据
var BASEURL = 'http://10.136.13.245:8084';
var postDataObj = {};

//获取urlQuery
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r !== null) {
        return unescape(r[2]);
    }
    return null;
}
//设置header文字
function setHeadTxt(name) {
    $('#header-title').text(name);
}

//toast提示
function drawToast(message) {
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
$(function() {
    /*
     * ====================
     * 首次进入：根据省份code获取地市
     * 所在院校、所在年级、所在班级
     * ====================
     */
    var UI = {
        userProfileDom: $('.user-profile'), //基本信息输入
        settingFullScoreDom: $('.main-setion2-container'), //满分设置
        scoreAnalyse: $('.main-section1-container'), //分析
    };
    // 首次进入
    setHeadTxt('请输入个人信息');
    //通过url获取省份id=610000
    var promiseGetArea = $.ajax('http://zj.zhigaokao.cn/region/getAllRegion.do');
    promiseGetArea.then(function(res) {
        if (res.rtnCode === '0000000') {
            //省市区三级联动
            var selectArea = null;
            var dataJson = res.bizData,
                provinceOptionTpl = '<option value="00">省</option>',
                cityOptionTpl = '<option value="00">市</option>',
                areaOptionTpl = '<option value="00">区</option>';
            //省
            for (var i in dataJson) {
                provinceOptionTpl += '<option value="' + dataJson[i].id + '" province-index=' + i + '>' + dataJson[i].name + '</option>';
            }
            UI.userProfileDom.find('.province').html(provinceOptionTpl);
            //市
            var provinceIndex = null;
            UI.userProfileDom.find('.province').change(function() {
                cityOptionTpl = '';
                provinceIndex = $(this).children('option:selected').attr('province-index');
                var promiseGetArea = dataJson[provinceIndex].cityList;
                for (var j in promiseGetArea) {
                    cityOptionTpl += '<option value="' + promiseGetArea[j].id + '" city-index=' + j + '>' + promiseGetArea[j].name + '</option>';
                }
                UI.userProfileDom.find('.city').html(cityOptionTpl);
                //联动区
                var cityIndex = UI.userProfileDom.find('.city').children('option:selected').attr('city-index');
                var areaListArray = dataJson[provinceIndex].cityList[cityIndex].countyList;
                for (var m in areaListArray) {
                    areaOptionTpl = '';
                    areaOptionTpl += '<option value="' + areaListArray[m].id + '" area-index=' + m + '>' + areaListArray[m].name + '</option>';
                }
                UI.userProfileDom.find('.area').html(areaOptionTpl);
                selectArea = UI.userProfileDom.find('.area').children('option:selected').attr('value');
                getSudentInfo(selectArea);
            });
            //区
            UI.userProfileDom.find('.city').change(function() {

                var cityIndex = $(this).children('option:selected').attr('city-index');
                var areaListArray = dataJson[provinceIndex].cityList[cityIndex].countyList;
                areaOptionTpl = '';
                for (var k in areaListArray) {
                    areaOptionTpl += '<option value="' + areaListArray[k].id + '" area-index=' + k + '>' + areaListArray[k].name + '</option>';
                }
                UI.userProfileDom.find('.area').html(areaOptionTpl);
                // 获取当前选择的区
                selectArea = UI.userProfileDom.find('.area').children('option:selected').attr('value');
                getSudentInfo(selectArea);
            });
            //区
            UI.userProfileDom.find('.area').change(function() {
                selectArea = UI.userProfileDom.find('.area').children('option:selected').attr('value');
                postDataObj.areaId = selectArea;
                getSudentInfo(selectArea);
            });
        }
    });

    //根据区获取院校、班级、年级信息
    function getSudentInfo(areaId) {
        var promiseGetStudentInfo = $.ajax({
            url: BASEURL + '/score/queryHighSchoolByCountyId.do',
            data: {
                countyId: areaId,
                userId: 1,
                schoolName: ''
            }
        });
        promiseGetStudentInfo.then(function(res) {
            if (res.rtnCode === '0000000') {
                var schoolListJson = res.bizData,
                    schoolOptionTpl = '';
                if (schoolListJson.length !== 0) {
                    for (var l in schoolListJson) {
                        schoolOptionTpl += '<option value="' + schoolListJson[l].schoolCode + '">' + schoolListJson[l].schoolName + '</option>';
                    }
                    console.info(schoolOptionTpl);
                    $('#school').html(schoolOptionTpl);
                } else {
                    schoolOptionTpl = '<option>暂无收录</option>';
                    $('#school').html(schoolOptionTpl);
                }
            }
        });
    }
    /*
     * ====================
     * 个人信息录入
     * 设置各科满分
     * 保存、取消
     * ====================
     */
    // 保存个人信息验证
    postDataObj.toggleSwitch = false;
    postDataObj.firstBaseData = {};
    UI.userProfileDom.find('.btn-complete').click(function() {
        postDataObj.firstBaseData.selectProvinceValue = UI.userProfileDom.find('.province').children('option:selected').attr('value');
        postDataObj.firstBaseData.selectProvinceKey = UI.userProfileDom.find('.province').children('option:selected').text();
        postDataObj.firstBaseData.selectCityValue = UI.userProfileDom.find('.city').children('option:selected').attr('value');
        postDataObj.firstBaseData.selectAreaValue = UI.userProfileDom.find('.area').children('option:selected').attr('value');
        postDataObj.firstBaseData.selectSchoolValue = $('#school').children('option:selected').attr('value');
        postDataObj.firstBaseData.selectSchoolKey = $('#school').children('option:selected').text();
        postDataObj.firstBaseData.gradeValue = $.trim($('#grade').val());
        postDataObj.firstBaseData.classValue = $.trim($('#class').val());
        // if (
        //     postDataObj.firstBaseData.selectProvinceValue === '00' ||
        //     postDataObj.firstBaseData.selectCityValue === '00' ||
        //     postDataObj.firstBaseData.selectAreaValue === '00' ||
        //     postDataObj.firstBaseData.selectSchoolValue === '00' ||
        //     postDataObj.firstBaseData.gradeValue.length === 0 ||
        //     postDataObj.firstBaseData.classValue.length === 0
        // ) {
        //     drawToast('信息输入不完整');
        //     return false;
        // }
        $.ajax({
            url: BASEURL + '/score/insertUserInfo.do',
            type: 'post',
            data: {
                "userId": 1,
                "provinceId": postDataObj.firstBaseData.selectProvinceValue,
                "cityId": postDataObj.firstBaseData.selectCityValue,
                "countyId": postDataObj.firstBaseData.selectAreaValue,
                "schoolCode": postDataObj.firstBaseData.selectSchoolValue,
                "schoolName": postDataObj.firstBaseData.selectSchoolKey,
                "gradeInfo": postDataObj.firstBaseData.gradeValue,
                "classInfo": postDataObj.firstBaseData.classValue
            }
        });
        $(this).parent().hide();
        UI.scoreAnalyse.show();
        setHeadTxt('成绩分析');
        //展示省份和院校
        $('.modify-base-info .user-from').text(postDataObj.firstBaseData.selectProvinceKey + ',' + postDataObj.firstBaseData.selectSchoolKey + '考生欢迎您！');
    });
    /*
     * =============================
     * 1、判断用户是否是第一次
     * 2、获取所有科目信息
     * type说明 1:文科  2:理科
     * =============================
     */
    $.ajax({
        url: BASEURL + '/score/queryScoreRecordByUserId.do',
        data: {
            "userId": 1
        }
    }).then(function(res) {
        if (res.rtnCode === "0000000") {
            var dataJson = res.bizData,
                subjectListTpl = '',
                settingFullScore = '';
            //用户首次进入bizData返回为空
            if ($.isEmptyObject(dataJson) === false) {
                //第二次进入
                UI.userProfileDom.hide();
                UI.scoreAnalyse.show();
                setHeadTxt('成绩分析');
                $('.subject-name .type').eq(dataJson.majorType - 1).find('b').addClass('selected');
                $('.modify-base-info .user-from').text(dataJson.areaName + ',' + dataJson.schoolName + '考生欢迎您！');
                $.each(dataJson.scores, function(k) {
                    // for (var k in dataJson.scores) {
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
                    settingFullScore += '' +
                        '<div class="full-score-li m">' +
                        '<span class="subject-full-name">' + k + '</span>' +
                        '<input type="tel" name="input-full-score" maxlength="3" value=' + inputFullSocre + ' id=setLi' + k + '>' +
                        '</div>';
                });
                $('#subject-list').html(subjectListTpl);
                $('#setting-full-score').html(settingFullScore);
            } else {
                //首次次进入
                console.info('我是第一次来');
                postDataObj.toggleSwitch = true;
            }
        }
    });

    /*
     * =============================
     * 修改用户基本信息
     * =============================
     */
    $('.modify-base-info').find('.modify-btn').click(function() {
        setHeadTxt('请输入个人信息');
        UI.scoreAnalyse.hide();
        UI.userProfileDom.show();
        promiseGetArea.then(function() {
            $.ajax({
                url: BASEURL + '/score/queryUserInfo.do',
                data: {
                    "userId": 1
                }
            }).then(function(res) {
                if (res.rtnCode === '0000000') {
                    var dataJson = res.bizData;
                    UI.userProfileDom.find('.province').children("option[value='" + dataJson.provinceId + "']").attr('selected', true);
                    UI.userProfileDom.find('.province').change();
                    UI.userProfileDom.find('.city').children("option[value='" + dataJson.cityId + "']").attr('selected', true);
                    UI.userProfileDom.find('.city').change();
                    UI.userProfileDom.find('.area').children("option[value='" + dataJson.countyId + "']").attr('selected', true);
                    UI.userProfileDom.find('.area').change();
                    $('#school').children("option[value='" + dataJson.schoolCode + "']").attr('selected', true);
                    $('#grade').val(dataJson.gradeInfo);
                    $('#class').val(dataJson.classInfo);
                }
            });
        });
    });


    /*
     * =====================================
     * 满分设置 1.保存（ocalstorage） 2.取消
     * =====================================
     */
    UI.scoreAnalyse.find('.setting-score-link').click(function() {
        $(this).parent().hide();
        UI.settingFullScoreDom.show();
        setHeadTxt('设置各科满分');
    });
    //保存写入localstorage
    UI.settingFullScoreDom.find('.save-full-score').click(function() {

    });
    UI.settingFullScoreDom.find('.cancle-full-score').click(function() {
        UI.settingFullScoreDom.hide();
        UI.scoreAnalyse.show();
        setHeadTxt('成绩分析');
    });

    //文理切换
    var subjectShowOrHide = $('.subject-list .subject-li');
    subjectShowOrHide.eq(6).hide();
    subjectShowOrHide.eq(7).hide();
    subjectShowOrHide.eq(8).hide();
    UI.scoreAnalyse.find('.type').click(function() {
        var _this = $(this);
        if (postDataObj.toggleSwitch === true) {
            _this.find('b').addClass('selected').parent().siblings().find('b').removeClass('selected');
        }
        if (_this.attr('data-type') == '1') {
            subjectShowOrHide.eq(3).show();
            subjectShowOrHide.eq(4).show();
            subjectShowOrHide.eq(5).show();
            subjectShowOrHide.eq(6).hide();
            subjectShowOrHide.eq(7).hide();
            subjectShowOrHide.eq(8).hide();
        } else {
            subjectShowOrHide.eq(3).hide();
            subjectShowOrHide.eq(4).hide();
            subjectShowOrHide.eq(5).hide();
            subjectShowOrHide.eq(6).show();
            subjectShowOrHide.eq(7).show();
            subjectShowOrHide.eq(8).show();
        }
    });
    //提交所有信息进行分析
    UI.scoreAnalyse.find('.btn-score-analyse').click(function() {
        var inputSocreLi = $('.subject-li input[name="input-score"]');
        for (var i = 0; i < inputSocreLi.length; i++) {
            var fullScoreLi = inputSocreLi.eq(i).next().text();
            if (inputSocreLi.eq(i).val() > parseInt(fullScoreLi.substring(2, fullScoreLi.length))) {
                inputSocreLi.eq(i).parent().parent().find('.subject-label-name');
                drawToast('输入分数不能大于满分');
                return false;
            }
            if (inputSocreLi.eq(i).val() === '') {
                inputSocreLi.eq(i).parent().parent().find('.subject-label-name');
                drawToast('科目每项都不能为空');
                return false;
            }
        }
        var localSubject = {
            "语文": "90-150",
            "数学": "90-150",
            "外语": "90-150",
            "地理": "90-100",
            "政治": "90-100",
            "历史": "90-100"
        };
        $.ajax({
            url: BASEURL + '/score/insertScoreRecord.do',
            type: "post",
            data: {
                "userId": 3,
                "areaId": "610000",
                "majorType": 1,
                "scores": localSubject
            }
        }).then(function(res) {
            if (res.rtnCode === '0000000') {
                window.location.href = "../results-analyse.html?recordId="+res.bizData.recordId;

            }
        });

    });




});
