/**
 * Created by LX on 2017/5/18.
 */
var indexApp = require('../main');
console.log(indexApp)
require('../pages/pre/pre');
require('../pages/index/index');
require('../pages/me/me');
require('../pages/func/func');
import preTPL from '../pages/pre/pre.html';
import homeTPL from '../pages/index/index.html';
import meTPL from '../pages/me/me.html';
import rechargeTPL from '../pages/me/recharge.html';
import funcTPL from '../pages/func/func.html';
indexApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("pre");
    $stateProvider
        .state("pre", {
            url: "/pre",
            controller: "preCtrl",
            template: preTPL,
        })
        // 首页  家长消息页 老师功能页
        .state("home", {
            url: "/home",
            controller: "homeCtrl",
            template: homeTPL,
        })
        //家长功能页
        .state("func", {
            url: "/func",
            controller: "funcCtrl",
            template: funcTPL,
        })
        //我
        .state("me", {
            url: "/me",
            controller: "meCtrl",
            template: meTPL,
        })
        .state("recharge", {
            url: "/recharge",
            controller: "rechargeCtrl",
            template: rechargeTPL,
        })
})