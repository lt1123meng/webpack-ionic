/**
 * Created by LX on 2017/5/18.
 */
require('./pre.less')
var indexApp = require('../../main');
indexApp.controller('preCtrl', function ($location, $scope, $http, $state, $rootScope,$initBaseInfo) {
    var oid = $location.search().oid;
    if (oid) {
        sessionStorage.oid = oid;
        function callback(){
            if ($rootScope.info.rid.length > 0) {
                $state.go('home')
            } else {
                location.href = 'guide.html'
            }
        }
        $initBaseInfo.init(callback)

    } else {
        $state.go('index')
    }
})
