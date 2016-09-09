//屏蔽ios下上下弹性
$(window).bind('scroll.elasticity', function (e) {
    e.preventDefault();
}).bind('touchmove.elasticity', function (e) {
    e.preventDefault();
});
var pwidth = $(window).width();
if ($(window).width() > 640) {
    pwidth = 640;
}
var pheight = $(window).height();
$("#load-main").height(pheight);
$("#page-main").width(pwidth);
$("#page-main").height(pheight);
alert(pheight)
function GetLocationParam(param) {
    var request = {
        QueryString: function (val) {
            var uri = window.location.search;
            var re = new RegExp("" + val + "=([^&?]*)", "ig");
            return ((uri.match(re)) ? (decodeURI(uri.match(re)[0].substr(val.length + 1))) : '');
        }
    };
    return request.QueryString(param);
}
var introImg = [
    'img/06.jpg',
    'img/07.jpg',
    'img/08.jpg'
];
function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}
var num = GetRandomNum(0, 2);
$(function () {
    $('#result-img').attr('src', introImg[num]).show();
    $('#user-name').text(GetLocationParam('name'));
    $('#share-btn').on('click',function(){
        $('#share').show();
    });
    /***************************自定义二维码*************************************/
    var timestamp = parseInt(new Date().getTime() / 1000);

    var noncestr = 'U5iQqjfV123NT5du';

    var  urls = 'http://zgkser.zhigaokao.cn/static/start-school/index.html';

    function getSign() {
        $.ajaxSettings.async = false;
        var signStr = '';
        $.getJSON('http://zgkser.zhigaokao.cn/pay/getAccessToken', function (res) {
            if (res.rtnCode == "0000000") {
                console.log(res)
                var ticket = res.bizData.ticket;
                var string1 = "jsapi_ticket=" + ticket + "&noncestr=" + noncestr + "&timestamp=" + timestamp + "&url="+window.location.href;

                //alert(string1)

                var sign = CryptoJS.SHA1(string1);
                signStr = sign.toString();
                //alert(signStr)
            }
        });
        $.ajaxSettings.async = true;
        return signStr;
    }
    getSign()
    wx.config({
        debug: false,
        appId: 'wx552f3800df25e964',
        timestamp: timestamp,
        nonceStr: noncestr,
        signature: getSign(),
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
        ]
    });
    wx.ready(function () {
        //document.querySelector('#checkJsApi').onclick = function () {
        //
        //};

        wx.checkJsApi({
            jsApiList: [
                'getNetworkType',
                'previewImage'
            ],
            success: function (res) {
                //alert(JSON.stringify(res));
            }
        });
        var title = '【特刊】开学季不得不看的几大新闻';
        var desc = '开学季，你家遇到这些事儿了吗？';
        var logo = 'http://zgkser.zhigaokao.cn/static/start-school/img/start-icon.jpg';
        wx.onMenuShareAppMessage({
            title: title,
            desc: desc,
            //link: window.location.href,//分享链接
            link: urls,//分享链接
            imgUrl: logo, // 分享图标
            trigger: function (res) {
                //alert('用户点击发送给朋友');
            },
            success: function (res) {
                //alert('已分享');
                $('#share').hide();
            },
            cancel: function (res) {
                //alert('已取消');
            },
            fail: function (res) {
                //alert(JSON.stringify(res));
            }
        });

        wx.onMenuShareTimeline({
            title: title,
            desc: desc,
            //link: window.location.href,//分享链接
            link: urls,//分享链接
            imgUrl: logo, // 分享图标
            trigger: function (res) {
                //alert('用户点击分享到朋友圈');
            },
            success: function (res) {
                //alert('已分享');
                $('#share').hide();
            },
            cancel: function (res) {
                //alert('已取消');
            },
            fail: function (res) {
                //alert(JSON.stringify(res));
            }
        });

        //document.querySelector('#onMenuShareAppMessage').onclick = function () {
        //
        //    alert('已注册获取“发送给朋友”状态事件');
        //};
        //
        //
        //// 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
        //document.querySelector('#onMenuShareTimeline').onclick = function () {
        //
        //    alert('已注册获取“分享到朋友圈”状态事件');
        //};
    });

    wx.error(function (res) {
        //alert(res.errMsg);
    });

});