//定义一套支付宝的皮肤
// http://www.cnblogs.com/ninilovebobo/articles/3940211.html
var theme = {
    // 默认色板
    // backgroundColor: 'rgba(0,0,0,1)',
    color: [
      '#408829', '#68a54a', '#a9cba2', '#86b379',
      '#397b29', '#8abb6f', '#759c6a', '#bfd3b7'
    ],

    // 图表标题
    title: {
        itemGap: 8,
        textStyle: {
            fontWeight: 'normal',
            color: '#108EE9'
        }
    },

    // 值域
    dataRange: {
        color: ['#108EE9', '#108EE9']
    },

    // 工具箱
    toolbox: {
        color: ['#408829', '#408829', '#408829', '#408829']
    },

    // 提示框
    tooltip: {
        backgroundColor: '#108EE9',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: { // 直线指示器样式设置
                color: '#108EE9',
                type: 'dashed'
            },
            crossStyle: {
                color: '#108EE9'
            },
            shadowStyle: { // 阴影指示器样式设置
                color: '#108EE9'
            }
        }
    },

    // 区域缩放控制器
    dataZoom: {
        dataBackgroundColor: '#eee', // 数据背景颜色
        fillerColor: 'rgba(64,136,41,0.2)', // 填充颜色
        handleColor: '#408829' // 手柄颜色
    },

    grid: {
        borderWidth: 0
    },

    // 类目轴
    categoryAxis: {
        axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
                color: '#108EE9'
            }
        },
        splitLine: { // 分隔线
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: ['#108EE9']
            }
        }
    },

    // 数值型坐标轴默认参数
    valueAxis: {
        axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
                color: '#108EE9'
            }
        },
        splitArea: {
            show: true,
            areaStyle: {
                color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
            }
        },
        splitLine: { // 分隔线
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: ['#f1f1f1']
            }
        }
    },

    timeline: {
        lineStyle: {
            color: '#408829'
        },
        controlStyle: {
            normal: {
                color: '#408829'
            },
            emphasis: {
                color: '#408829'
            }
        }
    },

    // K线图默认参数
    k: {
        itemStyle: {
            normal: {
                color: '#68a54a', // 阳线填充颜色
                color0: '#a9cba2', // 阴线填充颜色
                lineStyle: {
                    width: 1,
                    color: '#408829', // 阳线边框颜色
                    color0: '#86b379' // 阴线边框颜色
                }
            }
        }
    },

    map: {
        itemStyle: {
            normal: {
                areaStyle: {
                    color: '#ddd'
                },
                label: {
                    textStyle: {
                        color: '#c12e34'
                    }
                }
            },
            emphasis: { // 也是选中样式
                areaStyle: {
                    color: '#99d2dd'
                },
                label: {
                    textStyle: {
                        color: '#c12e34'
                    }
                }
            }
        }
    },

    force: {
        itemStyle: {
            normal: {
                linkStyle: {
                    strokeColor: '#408829'
                }
            }
        }
    },
    // 雷达图默认参数
    radar: {
        itemStyle: {
            normal: {
                // color: 各异,
                label: {
                    show: false
                },
                lineStyle: {
                    width: 2,
                    type: 'solid'
                }
            },
            emphasis: {
                // color: 各异,
                label: {
                    show: false
                }
            }
        },
        //symbol: null,         // 拐点图形类型
        symbolSize: 2 // 可计算特性参数，空数据拖拽提示图形大小
            //symbolRotate : null,  // 图形旋转控制
    },
    chord: {
        padding: 4,
        itemStyle: {
            normal: {
                lineStyle: {
                    width: 1,
                    color: 'rgba(128, 128, 128, 0.5)'
                },
                chordStyle: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(128, 128, 128, 0.5)'
                    }
                }
            },
            emphasis: {
                lineStyle: {
                    width: 1,
                    color: 'rgba(128, 128, 128, 0.5)'
                },
                chordStyle: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(128, 128, 128, 0.5)'
                    }
                }
            }
        }
    },

    gauge: {
        startAngle: 225,
        endAngle: -45,
        axisLine: { // 坐标轴线
            show: true, // 默认显示，属性show控制显示与否
            lineStyle: { // 属性lineStyle控制线条样式
                color: [
                    [0.2, '#86b379'],
                    [0.8, '#68a54a'],
                    [1, '#408829']
                ],
                width: 8
            }
        },
        axisTick: { // 坐标轴小标记
            splitNumber: 10, // 每份split细分多少段
            length: 12, // 属性length控制线长
            lineStyle: { // 属性lineStyle控制线条样式
                color: 'auto'
            }
        },
        axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: 'auto'
            }
        },
        splitLine: { // 分隔线
            length: 18, // 属性length控制线长
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
            }
        },
        pointer: {
            length: '90%',
            color: 'auto'
        },
        title: {
            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#333'
            }
        },
        detail: {
            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: 'auto'
            }
        }
    },

    textStyle: {
        fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
    }
};
