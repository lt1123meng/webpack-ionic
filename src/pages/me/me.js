/**
 * Created by LX on 2017/5/23.
 */
require('./me.less')
var indexApp = require('../../main');
indexApp
    .controller('meCtrl', function ($scope, $http, $state, $rootScope, $initData, $initBaseInfo, $initIntegrate) {
        if (!$rootScope.info) {
            $initBaseInfo.init()
        }
        if (!$rootScope.integrade) {
            $initIntegrate.init()
        }
        if (sessionStorage.crid == 'LS') {
            $scope.functionList=$initData.meMainList.LS
        }else{
            $scope.functionList=$initData.meMainList.JZ
        }
        $scope.goRecharge = function () {
            $state.go('recharge')
        }
    })
    .controller('rechargeCtrl', function ($scope, $http, $state, $rootScope, $initData, $initBaseInfo, $initIntegrate) {
        if (!$rootScope.integrade) {
            $initIntegrate.init()
        }
        $scope.back = function () {
            window.history.go(-1);
        }
        $scope.choosePackage = function (index, money) {
            $scope.packageIndex = index;
            $scope.packageMoney = money;
        }
        $scope.choosePackage('0', '10')
        $scope.protocolCheck = true
        $scope.chooseProtocol = function () {
            $scope.protocolCheck = !$scope.protocolCheck
        }
    })