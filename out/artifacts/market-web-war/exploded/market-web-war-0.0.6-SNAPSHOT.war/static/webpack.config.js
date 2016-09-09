var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: {
        index: "./src/assets/js/index/index",
        vipBuy: "./src/assets/js/vip-buy/vip-buy",
        vip: "./src/assets/js/vip/vip",
        code: "./src/assets/js/code/code",
        regLogin: "./src/assets/js/reglogin/reglogin",
        modifyUserDetail: './src/assets/js/modify-user-detail/modify-user-detail',
        findPassword: './src/assets/js/reglogin/find-password',
        userDetail: './src/assets/js/user-detail/user-detail',
        order: './src/assets/js/order/order',
        policy: './src/assets/js/policy/policy',
        policyDetail: './src/assets/js/policy/policy-detail',
        schoolInfo: './src/assets/js/school-info/school-info',
        header: './src/assets/js/common/header',
        pingpp: './src/assets/js/common/pingpp',
        consumerList: './src/assets/js/consumer-list/consumer-list',
        intro: './src/assets/js/consumer-list/intro',
        vipCheck: './src/assets/js/vip-check/vipCheck',
        schedule: './src/assets/js/schedule/schedule',
        levelCalculate: './src/assets/js/level-calculate/level-calculate',
        userBullet: './src/assets/js/user-bullet/user-bullet',
        applyCash: './src/assets/js/apply-cash/apply-cash',
        searchSchool: './src/assets/js/search-school/search-school',
        schoolCalculate: './src/assets/js/school-calculate/school-calculate',
        schoolDetail: './src/assets/js/school-detail/school-detail',
        majorSearch: './src/assets/js/major-search/major-search',
        majorDetail: './src/assets/js/major-detail/major-detail',
        passingScore: './src/assets/js/passing-score/passing-score',
        vipBuyDetail: './src/assets/js/vip-buy-detail/vip-buy-detail',
        paySuccess: './src/assets/js/pay-success/pay-success',
        address: './src/assets/js/address/address'
    },
    output: {
        path: path.join(__dirname, "./dist/js"),
        filename: "[name].js"
    },
    resolve: {
        alias: {
            pgwmodal: path.join(__dirname, "./src/lib/PgwModa/pgwmodal.min"),
            commonjs: path.join(__dirname, "./src/assets/js/common/common"),
            urlConfig: path.join(__dirname, "./src/assets/js/common/url-config"),
            cookie: path.join(__dirname, "./src/assets/js/common/cookie"),
            md5: path.join(__dirname, "./src/lib/md5/jQuery.md5"),
            timeFormat: path.join(__dirname, "./src/assets/js/common/timeFormat"),
            iscroll: path.join(__dirname, "./src/lib/iscroll/iscroll-probe"),
            handlebars: path.join(__dirname, "./src/lib/handlebars/handlebars-v4.0.5"),
            jweixin: path.join(__dirname, "./src/lib/jweixin/jweixin-1.0.0.js"),
            sha1: path.join(__dirname, "./src/lib/sha1/sha1.js")
        }
    },

    plugins: [
        new CommonsChunkPlugin("commons.js",
            [
                "vipBuy",
                "vip",
                "code",
                "regLogin",
                "modifyUserDetail",
                "findPassword",
                "userDetail",
                "order",
                "policy",
                "policyDetail",
                "schoolInfo",
                "consumerList",
                "vipCheck",
                "schedule",
                "levelCalculate",
                "applyCash",
                "searchSchool",
                "schoolCalculate",
                "schoolDetail",
                "majorSearch",
                "majorDetail",
                "vipBuyDetail",
                "paySuccess",
                "address"

            ]),
        //new CommonsChunkPlugin("commons.js", ["p1", "p2", "admin-commons.js"])
    ]
};
// 在不同页面用<script>标签引入如下js:
// page1.html: commons.js, p1.js
// page2.html: commons.js, p2.js
// page3.html: p3.js
// admin-page1.html: commons.js, admin-commons.js, ap1.js
// admin-page2.html: commons.js, admin-commons.js, ap2.js



