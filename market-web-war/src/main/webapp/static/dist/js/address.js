webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by kepeng on 16/3/31.
	 */
	(function () {

	    var util = __webpack_require__(1);
	    var interfaceUrl = __webpack_require__(3);
	    var cookie = __webpack_require__(2);
	    $('#header-title').text('收货地址');

	    var token = cookie.getCookieValue('token');

	    $('#header-back').show().on('click', function () {
	        var action = util.getLinkey('action');
	        var productId = util.getLinkey('productId');
	        var price = util.getLinkey('price');
	        var departmentCode = util.getLinkey('departmentCode');
	        if (action === 'user-detail') {
	            var url = '/' + action;
	            window.location.assign(url);
	        } else {
	            window.location.href = '/' + action + '?productId=' + productId + '&price=' + price + '&departmentCode=' + departmentCode;
	        }
	    });

	    //省市地区
	    var province = '';
	    var city = '';
	    var county = '';
	    var Area = {
	        data: [],
	        init: function (provinceId, cityId, countyId) {
	            var that = this;
	            util.ajaxFun(interfaceUrl.getAllRegion, 'GET', {}, function (ret) {
	                if ('0000000' === ret.rtnCode) {
	                    that.data = ret.bizData;
	                    $('#province_select').html(that.render(that.data, true));
	                    if (provinceId) {
	                        $('#province_select').val(provinceId);
	                    }
	                    var currentProvinceId = $('#province_select option:checked').val();
	                    that.changeProvince(currentProvinceId)

	                    if (cityId) {
	                        $('#city_select').val(cityId);
	                    }
	                    var currentCityId = $('#city_select option:checked').val();
	                    that.changeCity(currentCityId);

	                    if (countyId) {
	                        $('#county_select').val(countyId);
	                    }
	                }
	            });
	        },
	        render: function (data, flag) {
	            var html = [];
	            if (flag) {
	                html.push('<option value="00">省份</option>');
	            }
	            $.each(data, function (i, value) {
	                if (
	                    value.id != "150000" &&
	                    value.id != "540000" &&
	                    value.id != "630000" &&
	                    value.id != "710000" &&
	                    value.id != "810000" &&
	                    value.id != "820000"
	                ) {
	                    html.push('<option value="' + value.id + '">' + value.name + '</option>');
	                }
	            });
	            return html.join('');
	        },
	        changeProvince: function (value) {
	            var provinceId = $('#province_select').val();
	            if (value) {
	                var city = this.getCity(value);
	                if (city && city.length > 0) {
	                    $('#city_select').html(this.render(city));
	                    this.changeCity(city[0].id);
	                } else {
	                    $('#city_select').html('<option value="00">市</option>');
	                }

	                if (provinceId != "00" && !city) {
	                    $('#city_select').parent().hide();
	                    $('#county_select').parent().hide();
	                } else {
	                    $('#city_select').parent().show();
	                    $('#county_select').parent().show();
	                }
	                if (value == "00") {
	                    $('#county_select').html('<option value="00">区(县)</option>');
	                }
	            }
	        },
	        changeCity: function (value) {

	            var provinceId = $('#province_select').val();

	            if (value && provinceId) {
	                var countyList = this.getCounty(provinceId, value);
	                if (countyList && countyList.length > 0) {
	                    $('#county_select').html(this.render(countyList));
	                } else {
	                    $('#county_select').html('<option value="00">区(县)</option>');
	                }
	                if (provinceId != "00" && !countyList) {
	                    $('#county_select').parent().hide();
	                } else {
	                    $('#county_select').parent().show();
	                }

	            };
	        },
	        changeCounty: function (value) {
	        },
	        addEventForArea: function () {
	            var that = this;
	            $('#province_select').change(function (e) {
	                var value = this.value;
	                that.changeProvince(value);
	            });
	            $('#city_select').change(function (e) {
	                var value = this.value;
	                that.changeCity(value);
	            });
	            $('#county_select').change(function (e) {
	                var value = this.value;
	                that.changeCounty(value);
	            });

	        },
	        getCity: function (id) {
	            for (var i = 0, len = this.data.length; i < len; i++) {
	                if (this.data[i].id == id) {
	                    return this.data[i].cityList;
	                }
	            }
	        },
	        getCounty: function (provinceId, cityId) {
	            for (var i = 0, len = this.data.length; i < len; i++) {
	                if (this.data[i].id == provinceId) {
	                    var cityList = this.data[i].cityList;
	                    if (cityList.length <= 0) {
	                        return null;
	                    }
	                    var j = 0, jlen = cityList.length;
	                    for (; j < jlen; j++) {
	                        if (cityList[j].id == cityId) {
	                            return cityList[j].countyList;
	                        }
	                    }

	                }
	            }
	        }
	    };

	    function addAddress() {
	        var province = $('#province_select').val(),
	            city = $('#city_select').val(),
	            county = $('#county_select').val(),
	            provinceName =  $('#province_select option:selected').text(),
	            cityName = $('#city_select option:selected').text(),
	            countyName = $('#county_select option:selected').text();
	        if (!province || province == '00') {
	            util.drawToast('请选择省份');
	            return;
	        }
	        if (!city || city == '00') {
	            util.drawToast('请选择市');
	            return;
	        }
	        if (!county || county == '00') {
	            util.drawToast('请选择区(县)');
	            return;
	        }
	        var detailAddress = $('#detail_address').val();
	        if (!detailAddress) {
	            util.drawToast('详细地址不能为空');
	            return;
	        }
	        var regPost = /^[0-9][0-9]{5}$/;
	        var postalcode = $('#postalcode').val();
	        if (postalcode && !regPost.test(postalcode)) {
	            util.drawToast('邮政编码格式错误');
	            return;
	        }
	        var consignee = $('#consignee').val();
	        if (consignee.length > 20 || consignee.length <= 0) {
	            util.drawToast('收货人长度不超过20个字符,且不为空');
	            return;
	        }

	        var phone = $('#phone').val();
	        var regMobile = /^1[3|4|5|6|7|8|9][0-9]{1}[0-9]{8}$/;
	        var mobileResult = regMobile.test(phone);
	        if (mobileResult == false) {
	            util.drawToast('手机号有误,请重新输入');
	            return;
	        }

	        var address = provinceName + cityName + countyName + '&' + detailAddress;
	        util.ajaxFun(interfaceUrl.addUserGoodsAddress, 'post', {
	            receivingAddress: address,
	            contactPhone: phone,
	            contactName: consignee,
	            provinceId:province,
	            cityId:city,
	            countyId:county,
	            postCode:postalcode
	        }, function (ret) {
	            if ('0000000' === ret.rtnCode) {
	                util.drawToast('操作成功');
	                var action = util.getLinkey('action');
	                var productId = util.getLinkey('productId');
	                var price = util.getLinkey('price');
	                var departmentCode = util.getLinkey('departmentCode');
	                window.location.href = '/' + action + '?productId=' + productId + '&price=' + price + '&departmentCode=' + departmentCode;
	            }
	        });
	    }

	    $(document).ready(function () {

	        util.ajaxFun(interfaceUrl.getUserGoodsAddress, 'GET', {}, function (res) {
	            var provinceId = null;
	            var cityId = null;
	            var countyId = null;
	            if (res.rtnCode == '0000000') {
	                var bizData = res.bizData;
	                if (bizData && bizData.receivingAddress) {
	                    provinceId = bizData.provinceId;
	                    cityId = bizData.cityId;
	                    countyId = bizData.countyId;
	                    $('#postalcode').val(bizData.postCode);
	                    $('#detail_address').val(bizData.receivingAddress.split('&')[1] || '');
	                    $('#consignee').val(bizData.contactName);
	                    $('#phone').val(bizData.contactPhone);
	                }
	            }
	            Area.init(provinceId, cityId, countyId);
	        });
	        Area.addEventForArea();
	        $('.submit-btn').on('click', function() {
	            addAddress();
	        });
	    });
	})();





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

















/***/ }
]);