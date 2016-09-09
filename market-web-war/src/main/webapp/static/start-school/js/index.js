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
$("#user-sub-box").width(pwidth);
$("#user-sub-box").height(pheight);
var musobj = document.getElementById("bgMusic");

var hbLoading = {};

var txtNum = 0;

hbLoading.isArray = function (o) {
    return Object.prototype.toString.call(o) === '[object Array]';
};

//var test = [1,2,3,4,5];

hbLoading.fixPagesHeight = function (objArr) {
    var _width = $(window).width();
    var _height = $(window).height();
    if (hbLoading.isArray(objArr)) {
        $.each(objArr, function (k, v) {
            v.height(_height);
        })
    } else {
        objArr.height(_height);
    }
};

hbLoading.loadImage = function (url, callback) {
    var img = new Image();
    img.src = url;
    if (img.complete) {
        callback.call(img);
        return;
    }
    ;
    img.onload = function () {
        callback.call(img);
    };
};
hbLoading.imgLoad = function (srcs, callback) {
    var srcs = srcs || [];
    var len = srcs.length;
    if (len < 1) return;
    var loadNum = 0;
    var loading_p = 0;
    var loading = function () {
        if (loadNum < len) {
            loading_p = Math.ceil(100 * loadNum / len);
            var _src = srcs[loadNum];
            hbLoading.loadImage(_src, function (img) {
                loadNum++;
                loading();
            });
        } else {
            loading_p = '100';
        };
        callback && callback(loading_p);
    }
    loading();
};

/**_obj:要显示的页面主体对象
 callback:图片加载完成以后只需的函数
 ***/
hbLoading.loadFun = function (_obj, callback) {
    var _img = _obj.find('img');
    var imgArr = [];
    _img.length > 0 && _img.each(function (i, v) {
        var _src = $(v).attr('src');
        _src && imgArr.push(_src);
    });
    console.log(imgArr)

    var loadingTXT = function (n) {
        return n
    };
    hbLoading.imgLoad(imgArr, function (n) {
        if (n < 100) {
            var _loading = loadingTXT(n);
            $('#load-main .load-cont .bfb').text(_loading + '%');
            return;
        }
        ;
        $('#load-main').hide();
        //clearInterval(_interval)
        _obj.find('img').attr('src', function () {
            return $(this).attr('src');
        });
        callback && callback();
    });
};

/**创建loading DOM**/
hbLoading.creatLoad = function () {
    var loadHtml = '<div class="load-main" id="load-main">';
    loadHtml += '<img src="http://n.sinaimg.cn/hb/lyay/h5/pagebg.jpg" class="bgimg">';
    loadHtml += '<div class="load-cont">';
    loadHtml += '<p class="txt1"><img src="http://n.sinaimg.cn/hb/lyay/h5/ayloading.gif"></p>';
    loadHtml += '<p class="bfb">0%</p>';
    loadHtml += '</div>';
    loadHtml += '</div>';
    $('body').append(loadHtml);
}

hbLoading.txtMove = function () {
    if (txtNum > 8) {
        txtNum = 0;
        $("#load-main .loadtxt").fadeOut(500);
        $("#load-main .loadtxt").eq(txtNum).show();
    } else {
        $("#load-main .loadtxt").eq(txtNum).fadeIn(500);
        txtNum++;
    }

};

hbLoading.creatLoad();


var WEBpage = {};
WEBpage.mainPageChane = function (options, callback) {
    var swiper;
    if (typeof(options) == 'undefined') {
        options = {};
    }
    if (typeof(options.mode) == 'undefined') {
        options.mode = 'vertical';
    }
    if (typeof(options.loop) == 'undefined') {
        options.loop = false;
    }
    if (typeof(options.play) == 'undefined') {
        options.play = 0;
    }
    if (typeof(options.container) == 'undefined') {
        options.container = 'page-main';
    }
    if (typeof(options.onlyExt) == 'undefined') {
        options.onlyExt = false;
    }
    if (typeof(options.noSiwpe) == 'undefined') {
        options.noSiwpe = false;
    }
    if (typeof(callback) == 'undefined') {
        callback = '';
    }
    swiper = $('#' + options.container).swiper({
        mode: options.mode,
        loop: options.loop,
        autoplay: options.play,
        onlyExternal: options.onlyExt,
        noSwiping: options.noSiwpe,
        onSlideChangeEnd: function () {
            if (typeof callback == 'function') {
                callback && callback();
            }
        }
    });

    return swiper;
};


$("#play").click(function(){
    if(musobj.paused){
        musobj.play();
        $(this).find('img').css('animation-play-state', 'running').css('-webkit-animation-play-state','running');
    }else{
        musobj.pause();
        $(this).find('img').css('animation-play-state', 'paused').css('-webkit-animation-play-state','paused');
    }
});






$('#page-main').turn({
    width: pwidth,
    height: pheight,
    elevation: 50,
    display: 'single',
    gradients: true,
    autoCenter: true,
    when: {
        turning: function (event, page, view) {
            //alert("dddd");

        },
        turned: function (event, page, view) {
            if (page == 4) {
                $('#user-sub-box').show();
            }
            if (page == 5) {
                $('.hb-page').hide();
            }

        }
        //missing: function (e, pages){
        //alert('aaaa');
        //}
    }
});


$(function () {



    hbLoading.loadFun($('#page-main'), function () {
        $('.hb-page').show();
        $("#play").show();
        musobj.play();

    });


    var subflag = false;

    $("#user-sub-btn").click(function () {
        if (subflag) {
            return false;
        }
        ;
        var name = $("#user-sub-input").val();
        if (name == '') {
            alert('请输入爆料的名字');
            return false;
        }
        if (!/^[\u4e00-\u9fa5]+$/i.test(name)) {
            alert('请输入中文名字');
            return false;
        }
        if (name.length > 4) {
            alert('请不要超过4个中文字符');
            return false;
        }
        subflag = true;
        window.location.href = "http://zgkser.zhigaokao.cn/static/start-school/result.html?name=" + name;

    });


});