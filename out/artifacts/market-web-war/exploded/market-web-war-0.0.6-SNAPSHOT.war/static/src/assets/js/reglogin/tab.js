var UI ={
    $tabContent:$('.tab-content')
};

$('#header-menu').show();
$('.tab-list').on('click','.tab', function(){
    $(this).addClass('active').siblings().removeClass('active');
    $('#header-title').text($(this).text());
    var index = $(this).index();
    UI.$tabContent.removeClass('active').eq(index).addClass('active');
});
$('.tab-list .tab').eq(0).click();




