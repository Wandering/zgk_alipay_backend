var BASEURL = 'http://10.136.13.245:8084';
//获取urlQuery
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r !== null) {
        return unescape(r[2]);
    }
    return null;
}
//时间戳转换
Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
var getTime = function(timestamp, formatStr) {
    var newDate = new Date();
    newDate.setTime(timestamp);
    return newDate.Format(formatStr || "yyyy-MM-dd hh:mm:ss");
};
$(function() {
    var UI = {
        analyseBaseInfo: $('.analyse-base-info'),
        scoreAccount: $('#score-account')
    };
    // 根据recoredId拉取用户基础信息
    var recordId = getQueryString('recordId');
    var provinceId = 210000;
    var subjectType = null; //科目类型
    var totalScore = null; //总分
    var promiseGetBaseInfo = $.ajax({
        url: BASEURL + '/score/queryInfoByRecordId.do',
        data: {
            recordId: recordId
        }
    });
    promiseGetBaseInfo.then(function(res) {
        if (res.rtnCode === '0000000') {
            var schoolListJson = res.bizData,
                majorType = '',
                scoresListTpl = '';
            totalScore = schoolListJson.totalScore;
            subjectType = schoolListJson.majorType;
            subjectType === 1 ? majorType = '文科' : majorType = '理科';
            UI.analyseBaseInfo.find('.subject-type').text(majorType);
            UI.analyseBaseInfo.find('.img-total-score').html(totalScore + "<i>分</i>");
            UI.analyseBaseInfo.find('.score').text(schoolListJson.totalScore);
            UI.analyseBaseInfo.find('.rank-num-text').text(schoolListJson.proviceRank + '位');
            UI.analyseBaseInfo.find('.over-percent').text(schoolListJson.proviceRankPro);
            UI.analyseBaseInfo.find('.over-num').text(schoolListJson.stuNum + '人');
            var scoreNickName = [
                './img/analyse-0.png',
                './img/analyse-1.png',
                './img/analyse-2.png',
                './img/analyse-3.png',
                './img/analyse-4.png',
            ];
            UI.analyseBaseInfo.find('.analyse-legend').attr('src', scoreNickName[schoolListJson.scoreRank]);
            for (var i in schoolListJson.scores) {
                scoresListTpl += '' +
                    '<div class="col-1">' +
                    '<span class="list-subjct">' + i + '</span>：<span class="list-score">' + schoolListJson.scores[i].split('-')[0] + '</span>' +
                    '</div>';
            }
            UI.analyseBaseInfo.find('.anlyse-subject').html(scoresListTpl);

        }
    });
    //成绩统计:根据用户Id和用户来源查询用户所有的提交记录
    var userId = getQueryString('userId');
    $.ajax({
        url: BASEURL + '/score/queryAllRecordByUserId.do',
        data: {
            userId: 3
        }
    }).then(function(res) {
        if (res.rtnCode === '0000000') {
            var dataJson = res.bizData;
            var nowScore = dataJson[0].totalScore;
            var forcastRank = dataJson[0].proviceRank;
            var lineChartData = {
                scores: [],
                time: []
            };


            $('#new-score').text(nowScore);
            $('#forcast-Rank').text(forcastRank);


            for (var i in dataJson) {
                lineChartData.scores.push(dataJson[i].totalScore);
                lineChartData.time.push(getTime(dataJson[i].cdate, "MM月dd日 hh:mm"));
            }
            // /*
            //  *chartJs图标渲染 。
            //  *1、折线图
            //  *2、雷达图
            //  */
            // var config = {
            //     type: 'line',
            //     options: {
            //         responsive: true,
            //         title: {
            //             display: false,
            //             text: 'Chart.js Line Chart'
            //         },
            //         tooltips: {},
            //         hover: {
            //             mode: 'dataset'
            //         },
            //         scales: {
            //             xAxes: [{
            //                 display: true,
            //                 scaleLabel: {
            //                     display: true,
            //                     labelString: '时间'
            //                 }
            //             }],
            //             yAxes: [{
            //                 display: true,
            //                 scaleLabel: {
            //                     display: true,
            //                     labelString: '分数'
            //                 },
            //                 ticks: {
            //                     suggestedMin: 0,
            //                     suggestedMax: 250,
            //                 }
            //             }]
            //         }
            //     }
            // };
            // config.data = {
            //     labels: lineChartData.time,
            //     datasets: [{
            //         label: '当前分数',
            //         data: lineChartData.scores,
            //         backgroundColor: [
            //             'rgba(203,233,255,1)'
            //         ],
            //         borderColor: [
            //             'rgba(56,179,248,1)'
            //         ],
            //         borderWidth: 2
            //     }]
            // };
            // console.info(lineChartData);
            // var ctx = document.getElementById("myChart").getContext("2d");
            // new Chart(ctx, config);
            //=======================================================================
            // /*
            //  *chartJs图标渲染 。
            //  *1、折线图
            //  */
            //定义一套绿色的皮肤
            var myLineChart = echarts.init(document.getElementById('myLineChart'), theme);
            option = {
                title: {
                    text: '成绩统计',
                    subtext: '趋势'
                },
                tooltip: {
                    trigger: 'axis',
                    // formatter: function(params, ticket, callback) {
                    //     console.log(params)
                    //     var res = "班级" + ' : ' + params[0].name + "班<br/>";
                    //     for (var i = 0, l = params.length; i < l; i++) {
                    //         res += '<br/>' + params[i].seriesName + ' : ' + params[i].value + "<%=ViewState["
                    //         unit "]%>"; //鼠标悬浮显示的字符串内容
                    //     }
                    //     setTimeout(function() {
                    //         // 仅为了模拟异步回调
                    //         callback(ticket, res);
                    //     }, 1000)
                    //     return 'loading...';
                    // }
                },
                legend: {
                    data: ['意向'],

                },
                toolbox: {
                    show: false,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar', 'stack', 'tiled']
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: lineChartData.time
                }],
                yAxis: [{
                    type: 'value'
                }],
                series: [{
                    name: '成交',
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: 'default',
                                color: '#108EE9'
                            },
                            lineStyle: {
                                color: '#108EE9'
                            }
                        }
                    },
                    data: lineChartData.scores
                }]
            };
            myLineChart.setOption(option);









        }
    });

    //推荐院校table
    $.ajax({
        url: BASEURL + '/score/recommendSchool.do',
        data: {
            "totalScore": "500",
            "areaId": provinceId,
            "majorType": 1,
        }
    }).then(function(res) {
        if (res.rtnCode === '0000000') {
            var rSchoolData = res.bizData,
                rSchoolTableTpl = '',
                rIconStr = '';
            for (var i in rSchoolData) {
                var rIcon = '';
                rIcon = rSchoolData[i].gapSchool;
                if (rIcon < 0) {
                    rIconStr = '<i class="icon-type-0"></i><span class="type-0">' + Math.abs(rIcon) + '</span>';
                } else if (rIcon === 0) {
                    rIconStr = '<i class="icon-type-1"></i><span class="type-1"></span>';
                } else {
                    rIconStr = '<i class="icon-type-2"></i><span class="type-2">' + rIcon + '</span>';
                }
                rSchoolTableTpl += '' +
                    '<tr>' +
                    '<td>' + rSchoolData[i].schoolName + '</td>' +
                    '<td>' + rSchoolData[i].batch + '</td>' +
                    '<td>' + rSchoolData[i].stuNum + '</td>' +
                    '<td>' + rSchoolData[i].averageScore + '</td>' +
                    '<td>' + rIconStr + '</td>' +
                    '</tr>';
            }
            $('#r-school-list').html(rSchoolTableTpl);
        }
    });

    /*
     * ========================================
     * 梦想距离
     * 1、院校模糊匹配 2、根据省份动态拉取批次
     * ========================================
     */
    //拉取院校信息
    var provinceSchoolList = $.ajax({
        url: BASEURL + '/university/getUniversityInfoByKeywords.do',
        data: {
            "keywords": '北京'
        }
    }).then(function(res) {
        if (res.rtnCode === '0000000') {
            console.info(res);
            var onInput = '';
            for(var i in res.bizData){
              console.info(i)
            }
        }
    });


    //拉取批次接口
    promiseGetBaseInfo.then(function() {
        $.ajax({
            url: BASEURL + '/score/queryBatchLineByAreaId.do',
            data: {
                "totalScore": totalScore,
                "areaId": provinceId,
                "majorType": subjectType,
            }
        }).then(function(res) {
            if (res.rtnCode === '0000000') {
                console.info(res);
            }
        });
    });


    // 查询学校相关情况
    //用户来源  0：智高考用户 1：支付宝用户
    $.ajax({
        url: BASEURL + '/score/queryGapBySchoolIdAndBatch.do',
        type: "post",
        data: {
            "recordId": 1,
            "schoolId": 1,
            "batch": 1,
            "userId": 1,
            "source": 1
        }
    }).then(function(res) {
        if (res.rtnCode === '0000000') {
            var dataJson = res.bizData,
                batchListTpl = '';
            for (var i in dataJson.bottom)

                $('#select-batch').html()
        }
    });









});
