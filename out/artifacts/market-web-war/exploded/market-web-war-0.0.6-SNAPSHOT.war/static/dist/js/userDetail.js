webpackJsonp([25],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	$(function(){
	    var md5=__webpack_require__(7);
	    var interfaceUrl = __webpack_require__(3);
	    var cookie = __webpack_require__(2);
	    var util = __webpack_require__(1);
	    var token = cookie.getCookieValue('token');
	    var toUrl = util.getLinkey('state');
	    var isLogin = cookie.getCookieValue('isLogin');
	    var menuV = util.getLinkey('menu');
	    $('#header-title').text('个人信息');
	    $('#header-menu').show();

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

	    function getOpenId(code) {

	        $.get(interfaceUrl.getOpenId,{code: code},function(res){
	            //alert(JSON.stringify(res))
	            if (res.rtnCode == '0000000') {
	                cookie.setCookie("openId", res.bizData.openId, 4, "/");
	            }
	        });
	    }
	    function isWeiXin() {
	        var ua = window.navigator.userAgent.toLowerCase();
	        if (ua.indexOf('micromessenger') > -1) {
	            return true;
	        } else {
	            return false;
	        }
	    }
	    var openId = cookie.getCookieValue('openId');


	    if(toUrl=='user-detail'){
	        if(!isLogin){
	            window.location.href='/login?state=user-detail';
	        }else{
	            if(menuV=="1"){
	                cookie.setCookie("flag", "0", 4, "/");
	            }
	            var flag = cookie.getCookieValue('flag');
	            if(flag=="0"){
	                cookie.setCookie("flag", "1", 4, "/");
	                window.location.href='/user-detail?state=user-detail&token=' + token + "&code="+getQueryObject(window.location.href).code;
	            }
	            if(flag=="1"){
	                if (isWeiXin()) {
	                    if(!openId){
	                        var obj = getQueryObject(window.location.href);
	                        cookie.setCookie("code", obj.code, 4, "/");
	                        //alert(getQueryObject(window.location.href).code)
	                        getOpenId(obj.code);
	                    }
	                }
	            }
	        }
	    }







	    function initUserInfo() {
	        var avatar = cookie.getCookieValue('avatar');
	        if (!avatar) avatar = '/static/dist/img/icons/avatar.png';
	        $('#avatar-img').attr('src', avatar);

	        var userName = cookie.getCookieValue('userName');
	        $('#header-user-name').text(userName || '');

	        var phone = cookie.getCookieValue('phone');
	        $('#number').text('账号：' + (phone || ''));

	        var schoolName = cookie.getCookieValue('schoolName');
	        $('#school-name').text(schoolName || '');


	        var province = cookie.getCookieValue('proName');
	        $('#province').text(province || '');

	        var city = cookie.getCookieValue('countyName');
	        $('#city').text(city || '');

	        var email = cookie.getCookieValue('email');
	        $('#email').text(email || '');

	        var qrcodeUrl = cookie.getCookieValue('qrcodeUrl');
	        if(!qrcodeUrl){
	            $('#code-item').hide();
	        }
	        $('#qrcodeUrl').attr('src', qrcodeUrl || '/static/dist/img/icons/code.png');
	    }

	    util.ajaxFun(interfaceUrl.getUserInfo, 'GET', {}, function (res) {
	        console.log(res)
	        if (res.rtnCode == '0000000') {
	            var personListData = res.bizData;
	            $('#header-user-name').text(personListData.name);
	            $('#school-name').text(personListData.schoolName);
	            $('#email').text(personListData.mail);
	            $('#avatar-img').attr('src',personListData.icon);
	            var sexTxt = personListData.sex;
	            if(typeof sexTxt == 'number'){
	                sexTxt == "0" ? $('#sex').text('女生') : $('#sex').text('男生');
	            }else{
	                $('#sex').text('');
	            }
	            var subjectTypeTxt = personListData.subjectType;
	            if(typeof subjectTypeTxt == 'number'){
	                subjectTypeTxt == "0" ? $('#subject').text('文科') : $('#subject').text('理科');
	            }else{
	                $('#subject').text('');
	            }
	        }
	    });

	    util.ajaxFun(interfaceUrl.getUserGoodsAddress, 'GET', {}, function (res) {
	        if (res.rtnCode == '0000000') {
	            var bizData = res.bizData;
	            if (bizData && bizData.receivingAddress) {
	                $('#address').html(bizData.receivingAddress.replace('&', '') + '&nbsp;&nbsp;&nbsp;&nbsp;(' + bizData.contactName + '收)&nbsp;&nbsp;&nbsp;&nbsp;' +  bizData.contactPhone);
	            } else {
	                $('.update-address').hide();
	                $('#address').html('<span style="color: #D70C18">添加收货地址</span>');
	                $('#address').css('text-align', 'center');
	            }
	        }
	    });











	    initUserInfo();
	    $('.modify-btn').on('click', function () {
	        window.location.href = '/modify-user-detail?token='+token;
	    });
	    $('.change-password-btn').on('click', function () {
	        var subHtml = ''
	            + '<input id="current-psd" type="password" placeholder="当前密码">'
	            + '<input id="new-psd" type="password" placeholder="新密码">'
	            + '<input id="confirm-psd" type="password" placeholder="确认新密码">'
	        util.confirmLayer('修改密码', subHtml);

	    });

	    $('body').on('click', '#close-modal', function () {
	        $(this).removeClass('show');
	    });

	    $('.update-address, #address').on('click', function() {
	        window.location.href = '/address?action=user-detail';
	    });

	    var userId = cookie.getCookieValue('userId');
	    $('#share-links').attr('href', '/code?userId=' + userId+'&uc=1')

	    $('body').on('click', '#confirm-btn', function () {
	        var currentPsd = $.trim($('#current-psd').val());
	        var newPsd = $.trim($('#new-psd').val());
	        var confirmPsd = $.trim($('#confirm-psd').val());
	        if (currentPsd == '') {
	            util.drawToast('当前密码不能为空');
	            return false;
	        }
	        if (currentPsd.length > 16 && currentPsd.length < 6) {
	            util.drawToast('密码输入有误，6-16位');
	            return false;
	        }
	        if (newPsd == '') {
	            util.drawToast('新密码不能为空');
	            return false;
	        }
	        if (newPsd.length > 16 && newPsd.length < 6) {
	            util.drawToast('新密码输入有误，6-16位');
	            return false;
	        }
	        if (confirmPsd == '') {
	            util.drawToast('确认密码不能为空');
	            return false;
	        }
	        if (newPsd != confirmPsd) {
	            util.drawToast('两次密码输入不一致');
	            return false;
	        }
	        util.ajaxFun(interfaceUrl.postModifyPassword, 'POST', {
	            oldPassword: currentPsd,//旧密码
	            password: newPsd//新密码'
	        }, function (res) {
	            console.log(res)
	            if (res.rtnCode == '0000000') {
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
	                window.location.href = '/login?state=user-detail';
	            } else {
	                util.drawToast(res.msg);
	            }
	        });
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
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports) {

		/**
		 * jQuery MD5 hash algorithm function
		 * 
		 * 	<code>
		 * 		Calculate the md5 hash of a String 
		 * 		String $.md5 ( String str )
		 * 	</code>
		 * 
		 * Calculates the MD5 hash of str using the » RSA Data Security, Inc. MD5 Message-Digest Algorithm, and returns that hash. 
		 * MD5 (Message-Digest algorithm 5) is a widely-used cryptographic hash function with a 128-bit hash value. MD5 has been employed in a wide variety of security applications, and is also commonly used to check the integrity of data. The generated hash is also non-reversable. Data cannot be retrieved from the message digest, the digest uniquely identifies the data.
		 * MD5 was developed by Professor Ronald L. Rivest in 1994. Its 128 bit (16 byte) message digest makes it a faster implementation than SHA-1.
		 * This script is used to process a variable length message into a fixed-length output of 128 bits using the MD5 algorithm. It is fully compatible with UTF-8 encoding. It is very useful when u want to transfer encrypted passwords over the internet. If you plan using UTF-8 encoding in your project don't forget to set the page encoding to UTF-8 (Content-Type meta tag). 
		 * This function orginally get from the WebToolkit and rewrite for using as the jQuery plugin.
		 * 
		 * Example
		 * 	Code
		 * 		<code>
		 * 			$.md5("I'm Persian."); 
		 * 		</code>
		 * 	Result
		 * 		<code>
		 * 			"b8c901d0f02223f9761016cfff9d68df"
		 * 		</code>
		 * 
		 * @alias Muhammad Hussein Fattahizadeh < muhammad [AT] semnanweb [DOT] com >
		 * @link http://www.semnanweb.com/jquery-plugin/md5.html
		 * @see http://www.webtoolkit.info/
		 * @license http://www.gnu.org/licenses/gpl.html [GNU General Public License]
		 * @param {jQuery} {md5:function(string))
		 * @return string
		 */
		(function($){
			var rotateLeft = function(lValue, iShiftBits) {
				return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
			}
			var addUnsigned = function(lX, lY) {
				var lX4, lY4, lX8, lY8, lResult;
				lX8 = (lX & 0x80000000);
				lY8 = (lY & 0x80000000);
				lX4 = (lX & 0x40000000);
				lY4 = (lY & 0x40000000);
				lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
				if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
				if (lX4 | lY4) {
					if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
					else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
				} else {
					return (lResult ^ lX8 ^ lY8);
				}
			}
			var F = function(x, y, z) {
				return (x & y) | ((~ x) & z);
			}
			var G = function(x, y, z) {
				return (x & z) | (y & (~ z));
			}
			var H = function(x, y, z) {
				return (x ^ y ^ z);
			}
			var I = function(x, y, z) {
				return (y ^ (x | (~ z)));
			}
			var FF = function(a, b, c, d, x, s, ac) {
				a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
				return addUnsigned(rotateLeft(a, s), b);
			};
			var GG = function(a, b, c, d, x, s, ac) {
				a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
				return addUnsigned(rotateLeft(a, s), b);
			};
			var HH = function(a, b, c, d, x, s, ac) {
				a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
				return addUnsigned(rotateLeft(a, s), b);
			};
			var II = function(a, b, c, d, x, s, ac) {
				a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
				return addUnsigned(rotateLeft(a, s), b);
			};
			var convertToWordArray = function(string) {
				var lWordCount;
				var lMessageLength = string.length;
				var lNumberOfWordsTempOne = lMessageLength + 8;
				var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
				var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
				var lWordArray = Array(lNumberOfWords - 1);
				var lBytePosition = 0;
				var lByteCount = 0;
				while (lByteCount < lMessageLength) {
					lWordCount = (lByteCount - (lByteCount % 4)) / 4;
					lBytePosition = (lByteCount % 4) * 8;
					lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
					lByteCount++;
				}
				lWordCount = (lByteCount - (lByteCount % 4)) / 4;
				lBytePosition = (lByteCount % 4) * 8;
				lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
				lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
				lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
				return lWordArray;
			};
			var wordToHex = function(lValue) {
				var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
				for (lCount = 0; lCount <= 3; lCount++) {
					lByte = (lValue >>> (lCount * 8)) & 255;
					WordToHexValueTemp = "0" + lByte.toString(16);
					WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
				}
				return WordToHexValue;
			};
			var uTF8Encode = function(string) {
				string = string.replace(/\x0d\x0a/g, "\x0a");
				var output = "";
				for (var n = 0; n < string.length; n++) {
					var c = string.charCodeAt(n);
					if (c < 128) {
						output += String.fromCharCode(c);
					} else if ((c > 127) && (c < 2048)) {
						output += String.fromCharCode((c >> 6) | 192);
						output += String.fromCharCode((c & 63) | 128);
					} else {
						output += String.fromCharCode((c >> 12) | 224);
						output += String.fromCharCode(((c >> 6) & 63) | 128);
						output += String.fromCharCode((c & 63) | 128);
					}
				}
				return output;
			};
			$.extend({
				md5: function(string) {
					var x = Array();
					var k, AA, BB, CC, DD, a, b, c, d;
					var S11=7, S12=12, S13=17, S14=22;
					var S21=5, S22=9 , S23=14, S24=20;
					var S31=4, S32=11, S33=16, S34=23;
					var S41=6, S42=10, S43=15, S44=21;
					string = uTF8Encode(string);
					x = convertToWordArray(string);
					a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
					for (k = 0; k < x.length; k += 16) {
						AA = a; BB = b; CC = c; DD = d;
						a = FF(a, b, c, d, x[k+0],  S11, 0xD76AA478);
						d = FF(d, a, b, c, x[k+1],  S12, 0xE8C7B756);
						c = FF(c, d, a, b, x[k+2],  S13, 0x242070DB);
						b = FF(b, c, d, a, x[k+3],  S14, 0xC1BDCEEE);
						a = FF(a, b, c, d, x[k+4],  S11, 0xF57C0FAF);
						d = FF(d, a, b, c, x[k+5],  S12, 0x4787C62A);
						c = FF(c, d, a, b, x[k+6],  S13, 0xA8304613);
						b = FF(b, c, d, a, x[k+7],  S14, 0xFD469501);
						a = FF(a, b, c, d, x[k+8],  S11, 0x698098D8);
						d = FF(d, a, b, c, x[k+9],  S12, 0x8B44F7AF);
						c = FF(c, d, a, b, x[k+10], S13, 0xFFFF5BB1);
						b = FF(b, c, d, a, x[k+11], S14, 0x895CD7BE);
						a = FF(a, b, c, d, x[k+12], S11, 0x6B901122);
						d = FF(d, a, b, c, x[k+13], S12, 0xFD987193);
						c = FF(c, d, a, b, x[k+14], S13, 0xA679438E);
						b = FF(b, c, d, a, x[k+15], S14, 0x49B40821);
						a = GG(a, b, c, d, x[k+1],  S21, 0xF61E2562);
						d = GG(d, a, b, c, x[k+6],  S22, 0xC040B340);
						c = GG(c, d, a, b, x[k+11], S23, 0x265E5A51);
						b = GG(b, c, d, a, x[k+0],  S24, 0xE9B6C7AA);
						a = GG(a, b, c, d, x[k+5],  S21, 0xD62F105D);
						d = GG(d, a, b, c, x[k+10], S22, 0x2441453);
						c = GG(c, d, a, b, x[k+15], S23, 0xD8A1E681);
						b = GG(b, c, d, a, x[k+4],  S24, 0xE7D3FBC8);
						a = GG(a, b, c, d, x[k+9],  S21, 0x21E1CDE6);
						d = GG(d, a, b, c, x[k+14], S22, 0xC33707D6);
						c = GG(c, d, a, b, x[k+3],  S23, 0xF4D50D87);
						b = GG(b, c, d, a, x[k+8],  S24, 0x455A14ED);
						a = GG(a, b, c, d, x[k+13], S21, 0xA9E3E905);
						d = GG(d, a, b, c, x[k+2],  S22, 0xFCEFA3F8);
						c = GG(c, d, a, b, x[k+7],  S23, 0x676F02D9);
						b = GG(b, c, d, a, x[k+12], S24, 0x8D2A4C8A);
						a = HH(a, b, c, d, x[k+5],  S31, 0xFFFA3942);
						d = HH(d, a, b, c, x[k+8],  S32, 0x8771F681);
						c = HH(c, d, a, b, x[k+11], S33, 0x6D9D6122);
						b = HH(b, c, d, a, x[k+14], S34, 0xFDE5380C);
						a = HH(a, b, c, d, x[k+1],  S31, 0xA4BEEA44);
						d = HH(d, a, b, c, x[k+4],  S32, 0x4BDECFA9);
						c = HH(c, d, a, b, x[k+7],  S33, 0xF6BB4B60);
						b = HH(b, c, d, a, x[k+10], S34, 0xBEBFBC70);
						a = HH(a, b, c, d, x[k+13], S31, 0x289B7EC6);
						d = HH(d, a, b, c, x[k+0],  S32, 0xEAA127FA);
						c = HH(c, d, a, b, x[k+3],  S33, 0xD4EF3085);
						b = HH(b, c, d, a, x[k+6],  S34, 0x4881D05);
						a = HH(a, b, c, d, x[k+9],  S31, 0xD9D4D039);
						d = HH(d, a, b, c, x[k+12], S32, 0xE6DB99E5);
						c = HH(c, d, a, b, x[k+15], S33, 0x1FA27CF8);
						b = HH(b, c, d, a, x[k+2],  S34, 0xC4AC5665);
						a = II(a, b, c, d, x[k+0],  S41, 0xF4292244);
						d = II(d, a, b, c, x[k+7],  S42, 0x432AFF97);
						c = II(c, d, a, b, x[k+14], S43, 0xAB9423A7);
						b = II(b, c, d, a, x[k+5],  S44, 0xFC93A039);
						a = II(a, b, c, d, x[k+12], S41, 0x655B59C3);
						d = II(d, a, b, c, x[k+3],  S42, 0x8F0CCC92);
						c = II(c, d, a, b, x[k+10], S43, 0xFFEFF47D);
						b = II(b, c, d, a, x[k+1],  S44, 0x85845DD1);
						a = II(a, b, c, d, x[k+8],  S41, 0x6FA87E4F);
						d = II(d, a, b, c, x[k+15], S42, 0xFE2CE6E0);
						c = II(c, d, a, b, x[k+6],  S43, 0xA3014314);
						b = II(b, c, d, a, x[k+13], S44, 0x4E0811A1);
						a = II(a, b, c, d, x[k+4],  S41, 0xF7537E82);
						d = II(d, a, b, c, x[k+11], S42, 0xBD3AF235);
						c = II(c, d, a, b, x[k+2],  S43, 0x2AD7D2BB);
						b = II(b, c, d, a, x[k+9],  S44, 0xEB86D391);
						a = addUnsigned(a, AA);
						b = addUnsigned(b, BB);
						c = addUnsigned(c, CC);
						d = addUnsigned(d, DD);
					}
					var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
					return tempValue.toLowerCase();
				}
			});
		})(jQuery);


/***/ }
]);