/**
 * Created by LX on 2017/5/18.
 */
require('./index.less')
var indexApp = require('../../main');
indexApp.controller('homeCtrl', function ($scope, $http, $state, $rootScope, $initData, $initBaseInfo, $server, $initVIPInfo) {
    if (!$rootScope.info) {
        $initBaseInfo.init()
    }
    if (!$rootScope.LSvipInfo || !$rootScope.JZvipInfo) {
        $initVIPInfo.init()
    }else{
        initJZData()
    }
    $scope.currentStudentIndex = 0;
    $scope.currentStudentDetail;
    $scope.moduleList = $initData.homeModule.LS;
    $scope.userClick = function () {
        $rootScope.Popup = {
            mast: true,
            changeRole: true,
        }
    }
    $scope.calenderClick = function () {
        $rootScope.Popup = {
            mast: true,
            chooseCalender: true,
        }
    }
    $scope.chooseRole = function (role) {
        event.stopPropagation();
        for (let key in $rootScope.Popup) {
            $rootScope.Popup[key] = false
        }
        if (role == $rootScope.info.crid) return;
        $rootScope.info.crid = role;
        sessionStorage.crid = role
        if (!$rootScope[role + 'vipInfo']) {
            $initVIPInfo.init()
        }
        if (role != 'LS') {
            initJZData()
        }
    }
    $scope.chooseStu = function () {
        $rootScope.Popup = {
            mast: true,
            chooseStu: true,
        }
    }
    $scope.chooseThisStu = function (index) {
        event.stopPropagation();
        for (let key in $rootScope.Popup) {
            $rootScope.Popup[key] = false
        }
        $scope.currentStudentIndex = index
        $scope.currentStudentDetail = $rootScope.JZvipInfo[$scope.currentStudentIndex]
    }
    $rootScope.$on('JZVIP', function () {
        initJZData();
        $scope.currentStudentDetail = $rootScope.JZvipInfo[$scope.currentStudentIndex]
    })
    function initJZData() {
        $server.getJZAllList().then(function (data) {
            if (data.status != 200) {
                return
            }
            data = data.data
            $scope.indexList = data;
        })
    }
})