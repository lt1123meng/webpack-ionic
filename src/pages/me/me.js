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
            $scope.functionList = $initData.meMainList.LS
        } else {
            $scope.functionList = $initData.meMainList.JZ
        }
        $scope.goRecharge = function () {
            $state.go('recharge')
        }
        $scope.goRegular = function () {
            $state.go('regular')
        }
        $scope.goIntegrate = function () {
            $state.go('integrate')
        }
        $scope.goOrder = function () {
            $state.go('order')
        }
    })
    .controller('rechargeCtrl', function ($scope, $state, $rootScope, $initData, $initBaseInfo, $initIntegrate) {
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
    .controller('regularCtrl', function ($scope, $state, $rootScope, $initData, $initBaseInfo, $initIntegrate) {
        if (!$rootScope.integrade) {
            $initIntegrate.init()
        }
        if (sessionStorage.crid == 'LS') {
            $scope.privilegeList = $initData.privilegeList.LS;
        } else {
            $scope.privilegeList = $initData.privilegeList.JZ;
        }
        $scope.showBorder = function (index, length) {
            if (Math.floor(length / 3) * 3 > index) {
                return true
            } else {
                return false
            }
        }
    })
    .controller('integrateCtrl', function ($scope, $state, $rootScope, $initData, $initBaseInfo, $initIntegrate, $server) {
        if (!$rootScope.integrade) {
            $initIntegrate.init()
        }
        $scope.date = new Date().getTime();
        $scope.recordList = [];
        $scope.more = true
        var page = 1;
        getRecordList(page)
        $scope.loadMore = function () {
            page += 1;
            getRecordList(page)
        }
        $scope.goRecharge = function () {
            $state.go('recharge');
        }
        function getRecordList(page) {
            $server.getIntegrateRecord(page).then(function (data) {
                if (data.status != 200) {
                    return
                }
                data = JSON.parse(data.data)
                if (data.length == 0) $scope.more = false;
                $scope.recordList = $scope.recordList.concat(data)
            })
        }
    })
    .controller('orderCtrl', function ($scope, $state, $rootScope, $initData, $initBaseInfo, $initIntegrate, $server) {

    })