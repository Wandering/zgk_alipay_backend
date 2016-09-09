webpackJsonp([29],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	$(function () {
	    var urlConfig = __webpack_require__(3);
	    var cookie = __webpack_require__(2);
	    var token = cookie.getCookieValue('token');
	    var isLogin = cookie.getCookieValue('isLogin');
	    var getTime = __webpack_require__(4);
	    $('#header-title').text('VIP');
	    $('#header-menu').show();
	    var vipActiveDate = cookie.getCookieValue('vipActiveDate');
	    var vipEndDate = cookie.getCookieValue('vipEndDate');
	    $('#startDate').text(vipActiveDate);
	    $('#endDate').text(vipEndDate);
	    $('#vip-buy').attr('href','/vip-buy?token='+token);
	});













/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	//时间戳转换
	    Date.prototype.Format = function (fmt) {
	        var o = {
	            "M+": this.getMonth() + 1, //月份
	            "d+": this.getDate(), //日
	            "h+": this.getHours(), //小时
	            "m+": this.getMinutes(), //分
	            "s+": this.getSeconds(), //秒
	            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
	            "S": this.getMilliseconds() //毫秒
	        };
	        if (/(y+)/.test(fmt))
	            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	        for (var k in o)
	            if (new RegExp("(" + k + ")").test(fmt))
	                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	        return fmt;
	    };
	    var getTime = function (timestamp,formatStr) {
	        var newDate = new Date();
	        newDate.setTime(timestamp);
	        return newDate.Format(formatStr || "yyyy-MM-dd hh:mm:ss");
	    };

	    return getTime;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
]);