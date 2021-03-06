
var cookie = require('cookie');

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
    var alet = document.getElementById("toast");
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















