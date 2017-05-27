/**
 * Created by LX on 2017/5/18.
 */
import INIT from './init';
import footerLSTPL from './component/footer/footerLS.html'
import footerJZTPL from './component/footer/footerJZ.html'
import searchTPL from './component/search/search.html'
import mastTPL from './component/mast/mast.html'
import calendarTPL from './component/calendar/calendar.html'
var indexApp = require('./main');
indexApp
    .directive('dirFooterLs', function () {
        return {
            restrict: 'E',
            template: footerLSTPL,
            replace: true,
            link: function () {
                require('./component/footer/footer.less')
            }
        };
    })
    .directive('dirFooterJz', function () {
        return {
            restrict: 'E',
            template: footerJZTPL,
            replace: true,
            link: function () {
                require('./component/footer/footer.less')
            }
        };
    })
    .directive('dirSearch', function () {
        return {
            restrict: 'E',
            template: searchTPL,
            replace: true,
            link: function () {
                require('./component/search/search.less')
            }
        };
    })
    .directive('dirMast', function ($rootScope) {
        return {
            restrict: 'E',
            template: mastTPL,
            replace: true,
            link: function (scope, element, attr, rootScope) {
                require('./component/mast/mast.less')
                angular.element(element).bind('click', function () {
                    $rootScope.$apply(function () {
                        for (let key in $rootScope.Popup) {
                            $rootScope.Popup[key] = false
                        }
                    })
                })
            }
        };
    })
    .directive('dirCalendar', function ($rootScope) {
        return {
            restrict: 'E',
            template: calendarTPL,
            replace: true,
            link: function (scope, element, attr, rootScope) {
                require('./component/calendar/calendar.less')
                var moment = require('moment');
                var selectMonent;
                var currentMonent;
                var prevMonent;
                var nextMonent
                scope.weekList = ['日', '一', '二', '三', '四', '五', '六']
                scope.prevMonth = function () {
                    if (scope.calendarCurrent.month == 1) {
                        scope.calendarCurrent.year -= 1
                        scope.calendarCurrent.month = 12
                    } else {
                        scope.calendarCurrent.month -= 1
                    }
                    // selectMonent = moment(scope.calendarSelect.year + '-' + scope.calendarSelect.month, "YYYY-MM");
                    initCalendar()
                }
                scope.nextMonth = function () {
                    if (scope.calendarSelect.year == moment().year() && scope.calendarSelect.month == moment().month() + 1) {
                        return
                    }
                    if (scope.calendarCurrent.month == 12) {
                        scope.calendarCurrent.year += 1
                        scope.calendarCurrent.month = 1
                    } else {
                        scope.calendarCurrent.month += 1
                    }
                    // selectMonent = moment(scope.calendarSelect.year + '-' + scope.calendarSelect.month, "YYYY-MM");
                    initCalendar()
                }
                if (!scope.calendarSelect) {
                    selectMonent = moment();
                } else {
                    selectMonent = moment(scope.calendarSelect.year + '-' + scope.calendarSelect.month, "YYYY-MM");
                }
                scope.calendarSelect = {
                    year: selectMonent.year(),
                    month: selectMonent.month() + 1,
                    day: selectMonent.date(),
                    week: '星期' + scope.weekList[selectMonent.day()]
                };
                scope.calendarCurrent = {
                    year: moment().year(),
                    month: moment().month() + 1,
                    day: moment().date()
                };
                scope.calendarToday = {
                    year: moment().year(),
                    month: moment().month() + 1,
                    day: moment().date()
                };
                initCalendar()
                scope.chooseDay = function (day, canChoose, choosed) {
                    if (choosed) return
                    if (!canChoose) return
                    if (day == scope.calendarSelect.day) return
                    scope.calendarSelect.day = day;
                    scope.calendarSelect.month = scope.calendarCurrent.month;
                    scope.calendarSelect.year = scope.calendarCurrent.year;
                    scope.calendarSelect.week = '星期' + scope.weekList[moment(scope.calendarSelect.year + '-' + scope.calendarSelect.month + '-' + scope.calendarSelect.day, "YYYY-MM-DD").day()];
                    initCalendar();
                    for (let key in $rootScope.Popup) {
                        $rootScope.Popup[key] = false
                    }
                }
                function initCalendar() {
                    currentMonent = moment(scope.calendarCurrent.year + '-' + scope.calendarCurrent.month, "YYYY-MM");
                    prevMonent = currentMonent.clone().subtract(1, 'M')
                    nextMonent = currentMonent.clone().add(1, 'M')

                    initDays()
                }

                function initDays() {
                    debugger;
                    var daysList = [];
                    var daysInMonth = currentMonent.daysInMonth()
                    var dayStartWeek = currentMonent.date(1).day()
                    var dayEndWeek = currentMonent.date(daysInMonth).day()
                    var prevDaysInMonth = prevMonent.daysInMonth()
                    var nextDaysInMonth = nextMonent.daysInMonth()
                    for (let i = dayStartWeek; i > 0; i--) {
                        let oneDay = {};
                        oneDay.text = prevDaysInMonth - i + 1;
                        oneDay.canChoose = false;
                        oneDay.choosed = false;
                        daysList.push(oneDay)
                    }
                    for (let i = 1; i <= daysInMonth; i++) {
                        let oneDay = {};
                        if (scope.calendarToday.day == i && scope.calendarCurrent.month == scope.calendarToday.month && scope.calendarCurrent.year == scope.calendarToday.year) {
                            oneDay.text = '今天';
                        } else {
                            oneDay.text = i;
                        }
                        if (scope.calendarSelect.day == i && scope.calendarCurrent.month == scope.calendarSelect.month && scope.calendarCurrent.year == scope.calendarSelect.year) {
                            oneDay.choosed = true;
                        }
                        oneDay.canChoose = true;
                        daysList.push(oneDay)
                    }
                    for (let i = 1; i <= 6 - dayEndWeek; i++) {
                        let oneDay = {};
                        oneDay.text = i;
                        oneDay.canChoose = false;
                        oneDay.choosed = false;
                        daysList.push(oneDay)
                    }
                    scope.daysList = daysList
                }
            }
        };
    })
    .factory('$server', function ($http) {
        return {
            getUserInfo: $http.get(INIT.BASE_URI + '/user/get/' + sessionStorage.oid),
            getRole: $http.get(INIT.BASE_URI + 'user/role/' + sessionStorage.oid),
            getIntegrate: $http.get(INIT.BASE_URI + '/integral/getIngegralSum/' + sessionStorage.oid),
            getVipInfo: $http.get(INIT.BASE_VIP + 'users/' + sessionStorage.oid + '/' + sessionStorage.crid),
            getJZAllList: $http.get('../../json/jz-index.json')
        }
    })
    .factory('$initData', function () {
        return {
            homeModule: {
                LS: [{
                    title: '',
                    list: [
                        {
                            name: '成绩',
                            route: 'grade',
                            icon: 'grade.png'
                        },
                        {
                            name: '作业',
                            route: 'work',
                            icon: 'work.png'
                        },
                        {
                            name: '通知',
                            route: 'inform',
                            icon: 'inform.png'
                        },
                        {
                            name: '风采',
                            route: 'inform',
                            icon: 'mien.png'
                        },
                        {
                            name: '考勤',
                            route: 'manage',
                            icon: 'manage.png'
                        },
                        {
                            name: '投票',
                            route: 'vote',
                            icon: 'vote.png'
                        }
                    ]
                }, {
                    title: '学情',
                    list: [
                        {
                            name: '中高考分析',
                            route: 'grade',
                            icon: 'situate-exam.png'
                        },
                        {
                            name: '成绩分析',
                            route: 'work',
                            icon: 'situate-grade.png'
                        },
                        {
                            name: '学情分析',
                            route: 'inform',
                            icon: 'situate-analyse.png'
                        },
                        {
                            name: '训练分析',
                            route: 'inform',
                            icon: 'situate-train.png'
                        }
                    ],
                }, {
                    title: '其它',
                    list: [
                        {
                            name: '中高考分析',
                            route: 'grade',
                            icon: 'situate-exam.png'
                        },
                        {
                            name: '成绩分析',
                            route: 'work',
                            icon: 'situate-grade.png'
                        },
                        {
                            name: '学情分析',
                            route: 'inform',
                            icon: 'situate-analyse.png'
                        },
                        {
                            name: '训练分析',
                            route: 'inform',
                            icon: 'situate-train.png'
                        }
                    ],
                }],
                JZ: [{
                    title: '',
                    list: [
                        {
                            name: '成绩',
                            route: 'grade',
                            icon: 'grade.png'
                        },
                        {
                            name: '作业',
                            route: 'work',
                            icon: 'work.png'
                        },
                        {
                            name: '通知',
                            route: 'inform',
                            icon: 'inform.png'
                        },
                        {
                            name: '风采',
                            route: 'inform',
                            icon: 'mien.png'
                        },
                        {
                            name: '考勤',
                            route: 'manage',
                            icon: 'manage.png'
                        },
                        {
                            name: '投票',
                            route: 'vote',
                            icon: 'vote.png'
                        }
                    ]
                }, {
                    title: '学情',
                    list: [
                        {
                            name: '中高考分析',
                            route: 'grade',
                            icon: 'situate-exam.png'
                        },
                        {
                            name: '成绩分析',
                            route: 'work',
                            icon: 'situate-grade.png'
                        },
                        {
                            name: '学情分析',
                            route: 'inform',
                            icon: 'situate-analyse.png'
                        },
                        {
                            name: '训练分析',
                            route: 'inform',
                            icon: 'situate-train.png'
                        }
                    ],
                }, {
                    title: '其它',
                    list: [
                        {
                            name: '中高考分析',
                            route: 'grade',
                            icon: 'situate-exam.png'
                        },
                        {
                            name: '成绩分析',
                            route: 'work',
                            icon: 'situate-grade.png'
                        },
                        {
                            name: '学情分析',
                            route: 'inform',
                            icon: 'situate-analyse.png'
                        },
                        {
                            name: '训练分析',
                            route: 'inform',
                            icon: 'situate-train.png'
                        }
                    ],
                }]
            },
            meMainList: {
                LS: [
                    {
                        title: '',
                        list: [
                            {
                                name: '我的班级',
                                route: '',
                                icon: ''
                            }, {
                                name: '班级老师',
                                route: '',
                                icon: ''
                            }, {
                                name: '我的应用',
                                route: '',
                                icon: ''
                            }
                        ]
                    },{
                        title: '',
                        list: [
                            {
                                name: '收货地址',
                                route: '',
                                icon: ''
                            }
                        ]
                    },{
                        title: '',
                        list: [
                            {
                                name: '帮助中心',
                                route: '',
                                icon: ''
                            },
                            {
                                name: '意见反馈',
                                route: '',
                                icon: ''
                            }
                        ]
                    }
                ],
                JZ: [
                    {
                        title: '',
                        list: [
                            {
                                name: '我的孩子',
                                route: '',
                                icon: ''
                            }, {
                                name: '收货地址',
                                route: '',
                                icon: ''
                            }
                        ]
                    },{
                        title: '',
                        list: [
                            {
                                name: '帮助中心',
                                route: '',
                                icon: ''
                            }
                        ]
                    },{
                        title: '',
                        list: [
                            {
                                name: '意见反馈',
                                route: '',
                                icon: ''
                            }
                        ]
                    }
                ]
            }

        }
    })
    .factory('$initBaseInfo', function ($rootScope, $http, $server) {
        return {
            init: function (callback) {
                $rootScope.info = {}
                $server.getUserInfo.then(function (data) {
                    if (data.status != 200) {
                        return
                    }
                    data = data.data
                    if (data == '') {
                        $rootScope.info.name = "游客";
                    } else {
                        if (data.name.length > 6) {
                            $rootScope.info.name = data.name.substring(0, 6) + "...";
                        } else {
                            $rootScope.info.name = data.name
                        }
                        $rootScope.info.oidPhoto = data.userimgurl;
                    }

                    initRole();
                }).catch(function (data) {
                })
                function initRole() {
                    $server.getRole.then(function (data) {
                        if (data.status != 200) {
                            return
                        }
                        data = data.data
                        if (data.length == 0) {
                            $rootScope.info.crid = 'guest';
                            $rootScope.info.identity = '游客';
                            $rootScope.info.name = '游客';
                        } else {
                            $rootScope.info.rid = []
                            if (data.JZ) {
                                $rootScope.info.crid = 'JZ'
                                $rootScope.info.rid.push('JZ')

                            }
                            if (data.LS) {
                                $rootScope.info.crid = 'LS'
                                $rootScope.info.rid.push('LS')
                            }
                        }
                        if (sessionStorage.crid) {
                            $rootScope.info.crid = sessionStorage.crid
                        } else {
                            sessionStorage.crid = $rootScope.info.crid
                        }
                        if (callback) {
                            callback()
                        }
                    }).catch(function (data) {
                    })
                }
            }
        }
    })
    .factory('$initIntegrate', function ($rootScope, $http, $server) {
        return {
            init: function (callback) {
                $server.getIntegrate.then(function (data) {
                    if (data.status != 200) {
                        return
                    }
                    data = JSON.parse(data.data);
                    $rootScope.integradeInfo = {}
                    $rootScope.integradeInfo.level = data.level;
                    $rootScope.integradeInfo.integrate = data.point;
                }).catch(function (data) {
                })
            }
        }
    })
    .factory('$initVIPInfo', function ($rootScope, $http, $server) {
        return {
            init: function () {
                $server.getVipInfo.then(function (data) {
                    if (data.status != 200) {
                        return
                    }
                    data = data.data;
                    if (data.success) {
                        if (sessionStorage.crid == 'LS') {
                            $rootScope.LSvipInfo = {};
                            if (!data.datas) {
                                $rootScope.LSvipInfo.level = 1
                            } else {
                                $rootScope.LSvipInfo.level = parseInt(data.datas.level_teacher)
                                $rootScope.LSvipInfo.deadline = parseInt(data.datas.level_end)
                                $rootScope.LSvipInfo.startTime = parseInt(data.datas.level_start)
                                $rootScope.LSvipInfo.isTest = parseInt(data.datas.istest)
                                $rootScope.LSvipInfo.testDays = parseInt(data.datas.level_days)
                            }
                            if ($rootScope.LSvipInfo.level == 0) {
                                $rootScope.vip = 3;
                            } else {
                                $rootScope.vip = $rootScope.LSvipInfo.level;
                            }
                        } else {
                            $rootScope.JZvipInfo = []
                            $rootScope.vip = 1
                            for (var i = 0; i < data.datas.length; i++) {
                                var obj = {}
                                if (!data.datas[i].userInfo) {
                                    obj.level = 1;
                                } else {
                                    obj.level = parseInt(data.datas[i].userInfo.level_teacher) > 1 ? 2 : 1
                                    obj.deadline = parseInt(data.datas[i].userInfo.level_end)
                                    obj.startTime = parseInt(data.datas[i].userInfo.level_start)
                                }
                                obj.name = data.datas[i].studentInfo.name
                                obj.className = data.datas[i].studentInfo.className
                                obj.classId = data.datas[i].studentInfo.classid
                                obj.stuId = data.datas[i].studentInfo.id
                                $rootScope.JZvipInfo.push(obj)
                            }
                            $rootScope.$emit('JZVIP')
                        }
                    } else {
                        if (data.datas == null) {
                            $rootScope.LSvipInfo = {};
                            $rootScope.LSvipInfo.level = 1;
                            $rootScope.vip = 1;
                        }
                    }
                })
            }
        }
    })
