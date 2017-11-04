/**
 * Created by 浩哥 on 2017/8/28.
 */
//设置路由状态
app.config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider,ionicDatePickerProvider) {
    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.backButton.text('');

    var datePickerObj = {
        inputDate: new Date(),
        titleLabel: '选择日期',
        setLabel: '确定',
        todayLabel: '今天',
        closeLabel: '关闭',
        mondayFirst: false,
        weeksList: ["日", "一", "二", "三", "四", "五", "六"],
        monthsList: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        templateType: 'popup',
        from: new Date(2012, 8, 1),
        to: new Date(2028, 8, 1),
        showTodayButton: true,
        dateFormat: 'yyyy-MM-dd',
        closeOnSelect: false,
        disableWeekdays: []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);

    $stateProvider
        .state('index', {
            templateUrl: 'tpl/index.html',
            url: '/myIndex',//地址的名称
            controller:'myIndex',
            //cache:false//强行刷新
        })
        //用户使用协议
        .state('userAgreement', {
            templateUrl: 'tpl/userAgreement.html',
            url: '/userAgreement',
            controller:'userAgreementCtrl'
        })
        .state('indexTpl', {
            templateUrl: 'tpl/indexTpl.html',
            url: '/IndexTpl',//地址的名称
            controller:'IndexTpl'
        })
        .state('login', {
            templateUrl: 'tpl/login.html',
            url: '/login',
            controller:'login'
        })
        .state('publicService', {
            templateUrl: 'tpl/public-service.html',
            url: '/publicService/:id',
            controller: 'publicServiceCtrl'
        })
        .state('peopleService', {
            templateUrl: 'tpl/peopleService.html',
            url: '/peopleService',
            //controller: 'peopleServiceCtrl'
        })
        .state('collection', {
            templateUrl: 'tpl/collection.html',
            url: '/collection/:id',
            //controller: 'collectionCtrl'
        })
        //条件体检
        .state('condition', {
            templateUrl: 'tpl/condition.html',
            url: '/condition/:id',
            //controller: 'conditionCtrl'
        })

        .state('self', {
            templateUrl: 'tpl/self.html',
            url: '/self',
            cache:false,
            controller: 'selfCtrl'
        })
        .state('self_number', {
            templateUrl: 'tpl/self_number.html',
            url: '/self_number',
            controller: 'self_numberCtrl'
        })
        .state('self_numberClass', {
            templateUrl: 'tpl/self_numberClass.html',
            url: '/self_numberClass/:ClassCode',
            controller: 'self_numberClassCtrl'
        })
        .state('self_numberClassDetail', {
            templateUrl: 'tpl/self_numberClassDetail.html',
            url: '/self_numberClassDetail',
            params:{'classCode':null,'className':null},
            controller: 'self_numberClassDetail',
            cache:false
        })
        //服务推送
        .state('service', {
            templateUrl: 'tpl/service.html',
            url: '/service',
            controller: 'serviceCtrl'
        })
        .state('scoreDetail', {
            templateUrl: 'tpl/scoreDetail.html',
            url: '/scoreDetail/:id'
        })
        .state('service-detail', {
            templateUrl: 'tpl/service-detail.html',
            url: '/service-detail/:id',
            controller: 'service-detail'
        })
        .state('youCan', {
            templateUrl: 'tpl/youCan.html',
            url: '/youCan/:id'
        })
        .state('msgAppointment', {
            templateUrl: 'tpl/msgAppointment.html',
            url: '/msgAppointment/:name'
        })
        .state('ideas', {
            templateUrl: 'tpl/ideas.html',
            url: '/ideas/:id'
        })
        .state('about', {
            templateUrl: 'tpl/about.html',
            url: '/about'
        })
        .state('bannerTitle', {
            templateUrl: 'tpl/bannerTitle.html',
            url: '/bannerTitle'
        })
        .state('myfile', {
            templateUrl: 'tpl/myfile.html',
            url: '/myfile',
            controller:'myfile'
        })
        .state('updataPwd', {
            templateUrl: 'tpl/updataPwd.html',
            url: '/updataPwd'
        })
        .state('On-line', {
            templateUrl: 'tpl/On-line.html',
            url: '/On-line',
            controller:'OnlineCtrl'
        })
        .state('applyDetail', {
            templateUrl: 'tpl/applyDetail.html',
            url: '/applyDetail/:id',
            controller: 'applyDetail'
        })
        .state('onLineManage', {
            params:{'isIncludeScene':null,'itemId':null,'itemName':null,'sceneId':null,'affairId':null,'objId':null,'isIncludeResult':null,'status':null,'listId':null},
            templateUrl: 'tpl/onLineManage.html',
            url: '/onLineManage',
            cache:false,//强行刷新
            controller:'onLineManage'
        })
        .state('search', {
            templateUrl: 'tpl/search.html',
            url: '/search',
            controller:'searchCtrl'
        })
        .state('register', {
            templateUrl: 'tpl/register.html',
            url: '/register'
        })
        /*民生服务*/
        .state('cat', {
            templateUrl: 'tpl/cat.html',
            url: '/cat'
        })
        .state('social', {
            templateUrl: 'tpl/social.html',
            url: '/social'
        })
        .state('roadCondition', {
            templateUrl: 'tpl/roadCondition.html',
            url: '/roadCondition'
        })
        //我的办事事项
        .state('myManage', {
            templateUrl: 'tpl/myManage.html',
            url: '/myManage/:id',
            //cache:false,
            controller:'myManage'
        })
        //详情
        .state('myManageDetail', {
            templateUrl: 'tpl/myManageDetail.html',
            url: '/myManageDetail/:id',
            controller:'myManageDetail'
        })
        .state('objClass', {
            params:{'itemId':null,'itemName':null,'affairId':null,'objId':null,'isIncludeResult':null,'status':null,'listId':null},
            templateUrl: 'tpl/objClass.html',
            url: '/objClass',
            controller:'objClass'
        })
        .state('volunteers', {
            templateUrl: 'tpl/volunteers.html',
            url: '/volunteers',
            controller:'volunteers'
        })
        .state('revenue', {
            templateUrl: 'tpl/revenue.html',
            url: '/revenue'
        })
    $urlRouterProvider.otherwise('/myIndex');
})
//全局作用域
app.run(['$rootScope','$state','$ionicHistory','$ionicTabsDelegate','$ionicPopup','$http','init','$timeout','$ionicLoading','$ionicPlatform',
    function($rootScope,$state,$ionicHistory,$ionicTabsDelegate,$ionicPopup,$http,init,$timeout,$ionicLoading,$ionicPlatform){
        console.log(browser.versions().android);

        $ionicPlatform.ready(function() {
            //if(cordova.platformId === 'ios' && window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
            //    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                //cordova.plugins.Keyboard.disableScroll(true);
            //}
            if(window.StatusBar) {
                //StatusBar.styleDefault 状态栏默认样式，也就是电池信号黑色；
                //StatusBar.styleLightContent 状态栏内容浅色，貌似就是白色，适合深色背景；
                //StatusBar.styleBlackTranslucent 状态栏黑色半透明，电池时间都是白色的，适合深色背景；
                //StatusBar.styleBlackOpaque 状态栏黑色不透明，还是白色的，适合深色背景；
                //StatusBar.hide 状态栏隐藏；
                //StatusBar.show 状态栏显示；
                StatusBar.styleLightContent();
            }
        });

        $rootScope.isclick = true;
        $rootScope.isSelect = true;
        //设置需要推送的用户ID
        if(browser.versions().android){
            window.jsObj.setUserId(1);
        }

        $rootScope.toIndex = function(){
            $state.go('index');
        }

        //公共服务
        $rootScope.toPublicService = function() {
            $state.go('publicService',{id:2});//跳转
        }
/*        $rootScope.toPeopleService = function(){
            $state.go('peopleService');
        }*/

        //个人中心
        $rootScope.toMySelf = function(){
            //打开数字认证登录
            var self=(sessionStorage.getItem("self"))||'';
            if((browser.versions().android&&(!self))){
                if(!$rootScope.isclick&&(!$rootScope.isSelect)){
                    $ionicLoading.show({
                        template: '操作太频繁了，请稍等！'
                    });
                    $timeout(function(){
                        $ionicLoading.hide();
                    },2000)
                }
                if(browser.versions().android&&$rootScope.isSelect){
                    $rootScope.isclick = false;
                    $rootScope.isSelect = false;
                    window.jsObj.thirdOpenLogin();
                    sessionStorage.removeItem("isMyself");
                }
                $timeout(function(){
                    $rootScope.isSelect = true;
                },4000)
            }
            else{
                $state.go('self');
            }
            sessionStorage.setItem("isMyself",'yes');
        }

        // 直接调用这个 getState方法也是可以的
        window.getState =function (username,IdCard){
            var date = new Date;
            var month = date.getMonth()+1;
            $ionicLoading.show({
                template: '<ion-spinner icon="android"></ion-spinner>'
            });
            $rootScope.userName =username;
            $http.
                get(init.url+'citizenInfo!getCitizenInfoByIDNumber?IDNumber='+IdCard)
                .success(function(d){
                    if(d.data.loginCount == 1){
                        $state.go('userAgreement');
                    }
                    else if(sessionStorage.getItem("isMyself")){
                        $state.go('self');
                    }
                    else{
                        $http.
                            get(init.url+'adminMatters!getAdminMattersById?id='+$rootScope.detailId)
                            .success(function(d){
                                if(d.data.id == 2){
                                    if(month<4||month>6){
                                        var alertPopup = $ionicPopup.alert({
                                            title: '提示',
                                            template: '此事项的认证时段为每年的4月—6月,逾期7月停发，请依时申请！',
                                            okText:'确定'
                                        });
                                        alertPopup.then(function(res) {
                                            return false;
                                        });
                                        return;
                                    }
                                }
                                if (d.data.id == 18){
                                    if(month!=1&&month!=7){
                                        var alertPopup = $ionicPopup.alert({
                                            title: '提示',
                                            template: '此事项的认证时段为每年的1月和7月，请依时申请！',
                                            okText:'确定'
                                        });
                                        alertPopup.then(function(res) {
                                            return false;
                                        });
                                        return ;
                                    }
                                }
                                if(d.data.isIncludeScene ==0){ //跳到上传
                                    $state.go('onLineManage',{isIncludeScene:0,itemId:d.data.id,itemName:d.data.itemName,affairId:d.data.affairId,objId: d.data.objId||'',isIncludeResult:d.data.isIncludeResult},{reload:true});
                                }
                                if(d.data.isIncludeScene ==1){
                                    $state.go('objClass',{itemId:d.data.id,itemName:d.data.itemName,affairId:d.data.affairId,objId: d.data.objId||'',isIncludeResult: d.data.isIncludeResult},{reload:true});
                                }
                            })
                            .error(function(d){
                                console.warn(d);
                            })
                    }
                    $ionicLoading.hide();
                }).error(function(d){
                    console.warn(d);
                })
        }

        $rootScope.showWeather = false;

        //传递url
        window.getImgUrl = function(url) {
            $rootScope.tableUrl = url;
        }
    }
]);
//浏览器的检测
var browser={
    versions:function(){
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            weixin: u.indexOf('MicroMessenger') > -1 //是否微信 （2015-01-22新增）
        };
    },
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}
var thirdOpenLoginCallBack = function(username,mobile,IdCard,status){
    if(status == 0){
        getState(username,IdCard);
        sessionStorage.setItem('IdCard',IdCard);
        sessionStorage.setItem('mobile',mobile);
        sessionStorage.setItem('IdUsername',username);
        sessionStorage.setItem("Service", 123);
        sessionStorage.setItem("self", 123);
    }else{
        alert('认证失败！');
        sessionStorage.removeItem("Service");
    }
}
var getTabletsUrl = function(url) {
    getImgUrl(url);
}
