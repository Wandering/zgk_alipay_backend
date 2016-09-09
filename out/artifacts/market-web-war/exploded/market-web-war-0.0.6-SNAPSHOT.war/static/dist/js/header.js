/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	$(function () {
	    var util = __webpack_require__(1);
	    var cookie = __webpack_require__(2);
	    var toUrl = util.getLinkey('state');
	    var isLogin = cookie.getCookieValue('isLogin');
	    var token = cookie.getCookieValue('token');
	    var userName = cookie.getCookieValue('userName');
	    var interfaceUrl = __webpack_require__(3);
	    if (isLogin) {
	        $('#userName').text(userName);
	    }

	    $('#login-btn').attr('href','/login?state='+toUrl);



	    //var vipStatus = cookie.getCookieValue('vipStatus');
	    //if (vipStatus == "1") {
	    //    $('#vipStatus').attr('href', '/vip-check?token=' + token);
	    //} else {
	    //    $('#vipStatus').attr('href', '/vip?token=' + token);
	    //}
	    // 打开主菜单
	    $('#header-menu').on('click', function () {
	        if (isLogin) {
	            $('#menu-header').hide();
	            $('#end-login').show();
	            $('.header-close').on('click', function () {
	                $('#menu-header').show();
	                $('#end-login').hide();
	            });
	        } else {
	            $('#menu-header').hide();
	            $('#province-option').addClass('hide');
	            $('#un-login').show();
	            $('.header-close').on('click', function () {
	                $('#menu-header').show();
	                $('#un-login').hide();
	            });
	        }
	    });



	    // 切换省份
	    $('#province-text').on('click', function () {
	        $('#province-option').toggleClass('hide');
	        if (isLogin) {
	            $('#province-option').hide();
	        }
	    });
	    if (!cookie.getCookieValue('userKey')) {
	        cookie.setCookie("userKey", 'sn', 4, "/");
	        $('#province-text').text('陕西');
	    }
	    var userKey = cookie.getCookieValue('userKey');
	    var provinceTxt = $('#province-option-list a[domain="' + userKey + '"]').text();
	    $('#province-text').text(provinceTxt);
	    var paths = window.location.pathname.split('/');
	    var pagePath = paths[paths.length - 1];
	    $('#province-option-list').on('click', 'a', function () {
	        var domainProvince = $(this).attr('domain');
	        window.location.href = '/' + pagePath;
	        console.log(domainProvince);
	        if (!userKey) {
	            cookie.setCookie("userKey", 'sn', 4, "/");
	        } else {
	            cookie.setCookie("userKey", domainProvince, 4, "/");
	        }
	    });

	    var userId = cookie.getCookieValue('userId');
	    $('.invite-friend').click(function () {
	        var loginFlag = cookie.getCookieValue('isLogin');
	        if (loginFlag != 'true') {
	            window.location.href = '/login?state=code';
	            return false;
	        }
	        window.location.href = '/code?userId=' + userId;
	    });


	    // 退出
	    $('#logout-btn').attr('href','login?state=user-detail').on('click', function () {
	        cookie.deleteCookie("avatar", '');
	        cookie.deleteCookie('city', '');
	        cookie.deleteCookie('county', '');
	        cookie.deleteCookie('icon', '');
	        cookie.deleteCookie('isLogin', '');
	        cookie.deleteCookie('isReported', '');
	        cookie.deleteCookie('isSurvey', '');
	        cookie.deleteCookie('phone', '');
	        cookie.deleteCookie('province', '');
	        cookie.deleteCookie('qrcodeUrl', '');
	        cookie.deleteCookie('subjectType', '');
	        cookie.deleteCookie('token', '');
	        cookie.deleteCookie('userKey', '');
	        cookie.deleteCookie('userName', '');
	        cookie.deleteCookie('vipStatus', '');
	        cookie.deleteCookie('userId', '');
	        cookie.deleteCookie('proName', '');
	        cookie.deleteCookie('cityName', '');
	        cookie.deleteCookie('countyName', '');
	        cookie.deleteCookie('vipActiveDate', '');
	        cookie.deleteCookie('vipEndDate', '');
	        cookie.deleteCookie("flag", '');
	        cookie.deleteCookie("openId", '');
	        cookie.deleteCookie("code", '');
	        cookie.deleteCookie("sharerId", '');
	        cookie.deleteCookie("sharerType", '');
	    });







	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	var cookie = __webpack_require__(2);

	var isLogin = function () {
	    return cookie.getCookieValue('isLogin')
	};
	function ajaxFun(url, method, data, callback) {
	    if (cookie.getCookieValue('token')) {
	        data.token = cookie.getCookieValue('token');
	        //data.token = 'CG0yO9g/8r1V64iR5X0xiRx6DXdy12bW';
	    }

	    data.userKey = cookie.getCookieValue('userKey');
	    var strParameter = '';
	    for (var i in data) {
	        strParameter += "&" + i + "=" + data[i];
	    }

	    $.ajax({
	        url: url,
	        type: method,
	        data: data || {},
	        success: function(res) {
	            if(res.statusText=='error'){
	                drawToast("登录超时，请重新登录");
	                setTimeout(function(){
	                    window.location.href='/login?state=user-detail';
	                },2000);
	            }
	            if (res.rtnCode === '1000004') {
	                checkLoginTimeout();
	            } else {
	                callback(res);
	            }
	        },
	        error: function(res){
	            if(res.statusText=='error'){
	                drawToast("登录超时，请重新登录");
	                setTimeout(function(){
	                    window.location.href='/login?state=user-detail';
	                },2000);
	            }
	        }
	    });
	};

	function ajaxFunJSON(url, method, data, callback) {
	    if (cookie.getCookieValue('token')) {
	        data.token = cookie.getCookieValue('token');
	    }
	    data.userKey = cookie.getCookieValue('userKey');
	    console.log(JSON.stringify(data));
	    $.ajax({
	        url: url,
	        type: method,
	        contentType: 'application/json',
	        dataType: 'json',
	        data: JSON.stringify(data),
	        success: callback,
	        error: callback
	    });
	}


	var getLinkey = function getLinkey(name) {
	    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
	    if (reg.test(window.location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
	    return "";
	};


	var tips = function tips(obj, txt) {
	    $(obj).text(txt).fadeIn('1500');
	    setTimeout(function () {
	        $(obj).fadeOut('1500');
	    }, 1000);
	};

	function drawToast(message) {
	    var intervalCounter = null;
	    var alert = document.getElementById("toast");
	    if (!alert) {
	        var toastHTML = '<div id="toast">' + message + '</div>';
	        document.body.insertAdjacentHTML('beforeEnd', toastHTML);
	    } else {
	        alert.style.opacity = .9;
	    }
	    intervalCounter = setInterval(function () {
	        var alert = $("#toast");
	        alert.css('opacity', 0).remove();
	        clearInterval(intervalCounter);
	    }, 3000);
	}


	function layer(message, btns) {
	    var alert = document.getElementById("toast");
	    if (!alert) {
	        var toastHTML = '<div id="toast">'
	            + message;
	        if (btns) {
	            toastHTML += btns;
	        }
	        toastHTML += '</div>';
	        document.body.insertAdjacentHTML('beforeEnd', toastHTML);
	    } else {
	        alert.style.opacity = .9;
	    }
	}


	function confirmLayer(title,content) {
	    var confirmLayer = [];
	    confirmLayer.push('<div class="mask show">');
	    confirmLayer.push('<div class="modal">');
	    confirmLayer.push('<div class="modal-title">'+ title +'</div>');
	    confirmLayer.push('<div class="modal-body">');
	    confirmLayer.push(content);
	    confirmLayer.push('</div>');
	    confirmLayer.push('<div class="modal-footer">');
	    confirmLayer.push('<button id="close-modal" type="button">取消</button>');
	    confirmLayer.push('<button id="confirm-btn" type="button">确定</button>');
	    confirmLayer.push('</div>');
	    confirmLayer.push('</div>');
	    confirmLayer.push('</div>');
	    $('body').append(confirmLayer.join('')).on('click','#close-modal',function() {
	        $('.mask').remove();
	    });
	}

	function checkLoginTimeout() {
	        drawToast('登录超时');
	        setTimeout(function() {
	            window.location.href = '/login?state=user-detail';
	        }, 2000);
	        //if (cookie.getCookieValue('isLogin')) {
	        //    $('#loginTimeoutWindow').modal('show');
	        //} else {
	        //    $('#loginTimeoutWindow').modal('show');
	        //    $('#loginTimeoutWindow-jump-btn').html('登录');
	        //    $('.loginTimeoutWindow-body').attr('class', 'modal-body nologinWindow-body');
	        //}
	}



	exports.isLogin = isLogin;
	exports.ajaxFun = ajaxFun;
	exports.getLinkey = getLinkey;
	//exports.domain = domainStr;
	//exports.provinceKey = provinceKey;
	exports.tips = tips;
	exports.drawToast = drawToast;
	exports.layer = layer;
	exports.ajaxFunJSON = ajaxFunJSON;
	exports.confirmLayer = confirmLayer;

















/***/ },
/* 2 */
/***/ function(module, exports) {

	
	exports.setCookie = setCookie;
	exports.getCookieValue = getCookieValue;
	exports.deleteCookie = deleteCookie;



	//var domainStr = 'zhigaokao.cn'; // 正式
	//var domainStr = 'test.zhigaokao.cn'; // 测试
	//var domainStr = 'zhigaokao.com'; // 前端开发

	// hours为空字符串时,cookie的生存期至浏览器会话结束。
	// hours为数字0时,建立的是一个失效的cookie,这个cookie会覆盖已经建立过的同名、同path的cookie（如果这个cookie存在）。
	// 设置cookie
	function setCookie(name,value,hours,path){
	    var name = escape(name);
	    var value = escape(value);
	    var expires = new Date();
	    //expires.setTime(expires.getTime() + days*24*60*60*1000);
	    expires.setTime(expires.getTime() + hours* 365 * 24 *60*60*1000);
	    path = path == "" ? "": ";path=" + path;
	    //var domain = ";domain="+domainStr;
	    expires = (typeof hours) == "string" ? "" : ";expires=" + expires.toUTCString();
	    document.cookie = name + "=" + value + expires + path;
	}
	// 获取cookie
	function getCookieValue(name){
	    var name = escape(name);
	    //读cookie属性，这将返回文档的所有cookie
	    var allcookies = document.cookie;
	    //查找名为name的cookie的开始位置
	    name += "=";
	    var pos = allcookies.indexOf(name);
	    //如果找到了具有该名字的cookie，那么提取并使用它的值
	    if (pos != -1){                                             //如果pos值为-1则说明搜索"version="失败
	        var start = pos + name.length;                  //cookie值开始的位置
	        var end = allcookies.indexOf(";",start);        //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置
	        if (end == -1) end = allcookies.length;        //如果end值为-1说明cookie列表里只有一个cookie
	        var value = allcookies.substring(start,end);  //提取cookie的值
	        return unescape(value);                           //对它解码
	    }
	    else return "";                                             //搜索失败，返回空字符串
	}

	// 删除cookie
	function deleteCookie(name,path){
	    var name = escape(name);
	    var expires = new Date(0);
	    path = path == "" ? "" : ";path=" + path;
	    //var domain = ";domain="+domainStr;
	    document.cookie = name + "="+ ";expires=" + expires.toUTCString() + path ;
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
	 * url配置文件
	 * */
	var BASE_URL = 'http://s1.service.zhigaokao.cn/'; //正式
	//var BASE_URL = 'http://dev.service.zhigaokao.cn/';  //正式环境
	//var BASE_URL = 'http://gx.dev.zhigaokao.cn/';
	//var BASE_URL = 'http://172.16.160.73:8066/';  //测试环境
	//var BASE_URL = 'http://172.16.160.31:8080';  //小文本地
	//var BASE_URL = 'http://172.16.160.82:8085';  //小文本地
	//var BASE_URL = 'http://172.16.160.72:8089';  //左浩本地
	//var BASE_URL2 = 'http://10.254.130.33:8080';  //测试环境(智能填报)
	//var BASE_URL = 'http://10.136.56.195:8080';  //开发环境
	//var BASE_URL = 'http://172.16.180.150:8086';  //yyp
	//var BASE_URL = 'http://10.254.130.33:8085';  // 测试

	//var BASE_URL = 'http://127.0.0.1:8080';
	//var BASE_URL = '';
	var interfaceUrl = {
	    /*
	     * ==================================================
	     * new  interface
	     * ==================================================
	     * */
	    getCaptchaImg: 'user/getUserProfile',//分享二维码


	    /**
	     * 在线购买初始化
	     */
	    getBuyInfo: '/order/getBuyInfo',

	    /**
	     * 确认订单
	     */

	    commitOrder: '/order/commitOrder',
	    /**
	     * 订单支付
	     */
	    payOrder: '/pay/payOrder',
	    /**
	     * 获取订单列表
	     */
	    getUserOrderList: '/order/getUserOrderList',
	    /**
	     * 获取openId
	     */
	    getOpenId: '/pay/getOpenId',
	    /**
	     * 根据用户ID查询用户收益详情
	     */
	    queryUserIncomeDetailByUserId: '/pay/queryUserIncomeDetailByUserId',
	    /**
	     * 提现记录
	     */
	    queryWithdrawRecords: '/pay/queryWithdrawRecords',
	    /**
	     * 用户申请提现
	     */
	    applyWithdraw: '/pay/applyWithdraw',
	    /**
	     * 获取钱包剩余金额
	     */
	    getWalletBalance: '/pay/getWalletBalance',
	    /**
	     * 获取单个订单信息
	     */
	    getOrderInfo: '/order/getOrderInfo',
	    /*
	     * 高考咨询
	     * */
	    getGkTopList: BASE_URL + '/gkhot/getGkHotList.do', //头条1
	    getGkHotList: BASE_URL + '/gkhot/getGkHotList.do?type=0',//热点0
	    getGkHotInfo: BASE_URL + '/gkhot/getGkHotInfo.do',      //咨询详情


	    /*
	     * 高考日程
	     * */
	    getScheduleList: BASE_URL + '/schedule/getScheduleList.do', //  高考日程列表
	    getScheduleInfo: BASE_URL + '/schedule/getScheduleInfo.do', //  高考日程详情


	    /*
	     * 政策解读|招办电话
	     * */
	    getPolicyList: BASE_URL + '/policy/getPolicyList.do',//获取政策解读摘要列表
	    getPolicyInfo: BASE_URL + '/policy/getPolicyInfo.do',//根据主键获取政策解读详情
	    getGkTelList: BASE_URL + '/phone/getGkPhoneList.do',//获取招办电话列表

	    /*
	     * 院校信息
	     * */
	    getProvinceList: BASE_URL + '/university/getRemoteProvinceList.do',   // 省份
	    getCollegeList: BASE_URL + '/university/getRemoteDataDictList.do',   // 院校分类type=PROPERTY（院校分类）|type=EDULEVEL（学历层次）|type=FEATURE（院校特征）| type=BATCHTYPE(院校批次)
	    getSearchList: BASE_URL + '/university/getRemoteUniversityList.do',  // 院校信息(筛选)查询
	    getSchoolDetail: BASE_URL + '/university/getRemoteUniversityById.do', //院校信息详情?universityId=51
	    getOpenProfessional: BASE_URL + '/university/getRemoteUniversityMajorListByUniversityId.do',//开设专业
	    getRemoteDataDictList: BASE_URL + '/university/getRemoteDataDictList.do?type=UNIVERSITY_MAJOR_TYPE',
	    getUniversityMajorEnrollingPlanList: BASE_URL + '/university/getUniversityMajorEnrollingPlanList.do',//院校招生计划列表
	    getQueryUniversityPlanChart: BASE_URL + '/university/queryUniversityPlanChart.do',//院校招生计划图标展示(暂时只有2015年数据)
	    queryUniversityEnrollingChartList: BASE_URL + '/university/queryUniversityEnrollingChart.do',//录取情况 (院校录取详情)
	    getUniversityMajorEnrollingSituationList: BASE_URL + '/university/getUniversityMajorEnrollingSituationList.do',//录取情况 (院校专业录取详情)
	    getUniversityInfoByKeywords: BASE_URL + '/university/getUniversityInfoByKeywords.do',//通过关键字搜索学校

	    /*
	     * 收藏
	     * */
	    getUserCollectList: BASE_URL + '/userCollection/getUserCollectList.do',   // 收藏列表
	    saveUserCollect: BASE_URL + '/userCollection/saveUserCollect.do',//添加收藏
	    deleteUserCollect: BASE_URL + '/userCollection/deleteUserCollect.do',//取消收藏
	    getIsUniversityCollect: BASE_URL + '/userCollection/isUniversityCollect.do',//判断是否已收藏 1已收藏,0未收藏


	    /*
	     * 院校招生信息
	     * */
	    getAdmissionline: BASE_URL + '/admissionline/getYears.do', //院校招生年份
	    getLineList: BASE_URL + '/admissionline/getGkAdmissionLineList.do',//招生分数线

	    /*
	     * 登录|注册
	     * */
	    postLogin:  '/login/login',   // 登录
	    postRegisterLogin: BASE_URL + '/register/account.do',   // 注册
	    postConfirmAccountCode: '/register/confirmAccount',  // 确认是否注册
	    postVerificationCode: '/captcha/captcha',   // 获取手机验证码
	    postRetrievePassword: '/register/retrievePassword',   // 获取手机验证码
	    getImageCaptcha: '/captcha/imageCaptcha.do',   // 获取图像验证码

	    /**
	     * 提交个人设置中心
	     */
	    postUpdateUserInfo: BASE_URL + '/info/updateUserInfo.do',   // 获取手机验证码

	    /*
	     * 在线互动
	     * */
	    getOnlineInteractive: BASE_URL + '/question/newQuestion.do',//在线互动?startSize=0&endSize=10
	    getOnlineHot: BASE_URL + '/question/hotQuestion.do',//热门解答?startSize=0&endSize=10
	    getQuestionDetail: BASE_URL + '/question/questionDetail.do',//问题详情?id=3356

	    /*
	     * 评测
	     * */
	    postQueryApeskUrl: BASE_URL + '/apesk/queryApeskUrl.do', //专家测评


	    /*
	     * 高考学堂
	     * */
	    getTeacherLectureList: BASE_URL + '/video/getGkVideoList.do',//获取高考学堂列表?isIgnore=&page=&rows=&type=
	    getMentalityList: BASE_URL + '/video/getGkVideoList.do',//获取心理讲堂列表?isIgnore=&page=&rows=&type=
	    getVolunteerForumList: BASE_URL + '/video/getGkVideoList.do',//获取志愿讲堂列表?isIgnore=&page=&rows=&type=
	    getRecommendList: BASE_URL + '/video/getGkVideoList.do',//获取推荐学习列表?isIgnore=&page=&rows=&type=


	    /*
	     * 用户信息
	     *
	     * */
	    getAllRegion: BASE_URL + '/region/getAllRegion.do', //省市区
	    getUserInfo: BASE_URL + '/info/getUserInfo.do', //获取用户信息
	    uploadifyUserImg: '/wx/remote/exec', //微信上传用户头像


	    /*
	     * 高考学堂
	     * */
	    getVideoDetail: BASE_URL + '/video/getGkVideoInfo.do',//根据id获取视屏详情
	    postHitInCount: BASE_URL + '/video/hitInc.do', //视屏访问量?id=
	    postUserVideoCollect: BASE_URL + '/userCollection/saveUserCollect.do?type=2', //视屏收藏添加 id

	    /*
	     * 高考词条
	     * */
	    getGkEntryList: BASE_URL + '/entry/getGkEntryList.do',//获取高考词条列表page：页rows:条
	    getGkEntryInfo: BASE_URL + '/entry/getGkEntryInfo.do',//根据主键获取高考词条详情  id

	    //getMapData:'../../mock/zgk-data.json'//智高考首页map地图数据


	    /**
	     * 职业信息
	     */
	    getProfessionalList: BASE_URL + '/professional/getProfessionalList.do',//获取职业列表
	    getProfessionalInfo: BASE_URL + '/professional/getProfessionalInfo.do',//获取职业详情
	    getProfessionCategory: BASE_URL + '/professional/getProfessionCategory.do',//获取职业分类


	    /**
	     * 志愿填报
	     */
	    getPredictProbability: BASE_URL + '/predict/predictProbability.do',// 录取难易预测
	    getPredictSchoolList: BASE_URL + '/predict/predictSchoolList.do',// 录取难易预测
	    getTallyPredictProbability: BASE_URL + '/predict/tallyPredictProbability.do',// 目标定位
	    getPredictResults: BASE_URL + '/predict/predictResults.do',// 获取定位结果页


	    /**
	     * VIP
	     */
	    getFindProduct: BASE_URL + '/product/findProduct.do',// 获取商品信息
	    getCreateOrders: BASE_URL + '/orders/createOrders.do',// 创建订单
	    getAccount: BASE_URL + '/vip/getAccount.do',// 获取VIP账户
	    upgradeVipByCard: BASE_URL + '/vip/upgradeVipByCard.do', // 升级VIP


	    /**
	     * 专业信息
	     */
	    getMajoredCategory: BASE_URL + '/majored/getMajoredCategory.do',// 专业门类查询
	    getMajoredCategoryById: BASE_URL + '/majored/getCategoryMajoredList.do',// 单个门类查询
	    getMajoredInfoById: BASE_URL + '/majored/getMajoredInfoById.do',// 专业详情
	    getMajorOpenUniversityList: BASE_URL + '/majored/getMajorOpenUniversityList.do',// 开设院校
	    getMajoredByName: BASE_URL + '/majored/getMajoredByName.do',// 搜索
	    getMajoredInfoByKeywords: BASE_URL + '/majored/getMajoredInfoByKeywords.do',//通过关键词搜索专业


	    /**
	     * 用户定位
	     */
	    postAddFrecast: BASE_URL + '/forecast/addFrecast.do',// 保存定位
	    getPerformanceDetail: BASE_URL + '/forecast/getPerformanceDetail.do',// 获取当前用户的成绩明细
	    getLastoFrecast: BASE_URL + '/forecast/getLastoFrecast.do',// /forecast/getLastoFrecast.do//获取最后一次目标定位结果
	    getFormerYearsAdmission: BASE_URL + '/forecast/getFormerYearsAdmission.do',// /forecast/getLastoFrecast.do

	    /**
	     * 地区批次线
	     */
	    getGkAreaBatchInfo: BASE_URL + '/areabatch/getGkAreaBatchInfo.do',// 地区批次线


	    postModifyPassword: BASE_URL + '/info/modifyPassword.do',// 修改密码


	    /**
	     * 智能填报
	     */
	    getVolunteerReport: BASE_URL + '/report/get/batch.do', // 智能填报
	    getVolunteerSchool: BASE_URL + '/report/main.do', // 院校清单
	    getSpecialty: BASE_URL + '/report/get/specialty.do', // 获取专业信息
	    volunteerSave: BASE_URL + '/report/save.do', // 保存志愿填报
	    getVolunteerFinalInfo: BASE_URL + '/report/get/info.do', // 志愿报告结果页


	    /**
	     *
	     */

	    getSplitPriceInfo: '/getSplitPriceInfo',



	    /**
	     * 微信分享获取jsapi_ticket
	     */
	    getAccessToken : '/pay/getAccessToken',

	    /**
	     * 增加收货地址
	     */
	    addUserGoodsAddress: BASE_URL + 'userGoodsAddress/saveOrUpdateUserGoodsAddress.do',
	    /**
	     *查询收货地址
	     */
	    getUserGoodsAddress: BASE_URL + 'userGoodsAddress/getUserGoodsAddress.do',
	    getRemoveOrder: BASE_URL + '/orders/removeOrder.do' //删除订单


	};


	module.exports = interfaceUrl;


/***/ }
/******/ ]);