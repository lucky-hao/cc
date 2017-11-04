/**
 * Created by 浩哥 on 2017/5/12.
 */

app.controller('myIndex',['$scope','$state','$timeout','$ionicLoading','$rootScope','$http','init',function($scope,$state,$timeout,$ionicLoading,$rootScope,$http,init){
    $scope.isshow="indetab3";

    getHttp('caa85cbd5fce4b759a3cb53b3ba49ef7',3);
    //var sindetab2=null;
    //var sindetab3=null;
    var sindetab4=null;
    $scope.Show = function(tab){
        $scope.isshow = tab;
        if(tab =='indetab4'){
            if(!sindetab4){
                getHttp('0e7f74915e1b4730acaa377b5df8b208',4);
                sindetab4 =4;
            }
        }
    }

    function getHttp(type,num){
        $http.
            get(init.url+'newsInfo!getList?type='+type+'&page=1&rows=5&sdate=2017-09-01')
            .success(function(d){
                num ==1?$scope.list1 = d.data.list:num ==2?$scope.list2 = d.data.list:num ==3?$scope.list3 = d.data.list:$scope.list4 = d.data.list;
            }).error(function(d){
                console.log(d);
            })
    }
    $scope.dates = init.getTime();
}])

//新闻详情
app.controller('service-detail',['$scope','$http','$ionicLoading','$stateParams','init',function($scope,$http,$ionicLoading,$stateParams,init){
    var id = $stateParams.id;

    $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner>'
    });

    $http.
        get(init.url+'newsInfo!getInfo?id='+id)
        .success(function(d){
            $scope.title = d.title;
            $scope.content = d.content;
            $ionicLoading.hide();
        }).error(function(d){
            console.log(d);
        })
}])

//个人中心
app.controller('selfCtrl',['$scope','$state','$http','init',function($scope,$state,$http,init){
    var IDNumber=sessionStorage.getItem('IdCard');
    //IDNumber =440603199302233016;
    $scope.imgsUrl ='./imgs/img_user.png';
    $http.
        get(init.url+'citizenInfo!getCitizenInfoByIDNumber?IDNumber='+IDNumber)
        .success(function(d){
            $scope.imgsUrl = d.data.headImgUrl||'./imgs/img_user.png';
        }).error(function(d){
            console.log(d);
        })


    $scope.goManage = function(){
        $state.go("myManage",{id:2},{reload:true});
    }
    
    $scope.geSelfNumber = function () {
        $state.go("self_number",{reload:true});
    }
}])

//0跳
//onLineManage 在线办理
app.controller('onLineManage',['$scope','Upload','$stateParams','$http','$ionicPopup','$state','$ionicLoading','$timeout','init','$getbirthday','$rootScope','$filter','ionicDatePicker',function($scope,Upload,$stateParams,$http,$ionicPopup,$state,$ionicLoading,$timeout,init,$getbirthday,$rootScope,$filter,ionicDatePicker){
    var images_list = [];
    var imgNamess = [];
    $scope.vaildataTime = new Date();
    $scope.hasTables = false;
    $scope.hasTable = false;
    $scope.list2 = [];
    $scope.list3 = [];
    var dom = document.getElementsByClassName('imgClass');
    $scope.submit = '提交';
    $scope.idCard=sessionStorage.getItem('IdCard')||'440602197901010337';
    $scope.userName =sessionStorage.getItem('IdUsername');
    $scope.newValue = 0;
    $rootScope.tableUrl = '';

    //日期插件
    var datePickerObj = {
        //选择日期后的回掉
        callback: function (val) {
            if (typeof (val) === 'undefined') {
            } else {
                $scope.validedTime = $filter('date')(new Date(val), 'yyyy-MM-dd');
                datePickerObj.inputDate = new Date(val); //更新日期弹框上的日期
                if($stateParams.itemId ==21){
                    $scope.table.marrData = $scope.validedTime;
                    $scope.marrData = $scope.validedTime;
                }

                if($stateParams.itemId ==15){
                    $scope.table.marrData = $scope.validedTime;
                    $scope.marrData = $scope.validedTime;
                }
            }
        },
        disabledDates: [
            new Date(2016, 2, 16),
            new Date(2015, 3, 16),
            new Date(2015, 4, 16),
            new Date(2015, 5, 16),
            new Date('Wednesday, August 12, 2015'),
            new Date("2016-08-16"),
            new Date(1439676000000)
        ],
        from: new Date(2010, 1, 1),
        to: new Date(2038, 10, 30),
        inputDate: new Date(),
        mondayFirst: true,
        disableWeekdays: [], //设置不能选中
        closeOnSelect: false,
        dateFormat: 'yyyy-MM-dd',
        templateType: 'popup',
    };
    $scope.openDatePicker = function () {
        ionicDatePicker.openDatePicker(datePickerObj);
    };



    $scope.d = {
        Row: '',
        len:'',
        imgslen:'',
        checkbox1:'',
        checkbox2:'',
        checkbox3:'',
        Row1: '',
        Row2: '',
        Row3: '',
        isval2:""
     }
    $scope.addr = {
        recipients: '',
        recipientsMobile:'',
        recipientsAddress:''
    }
    $scope.table = {
        securityNumber:'',
        register:'',
        postalCode:'',
        contactCode:'',
        securityAddress:'',
        registerTypes:'',
        provides1:'',
        provides2:'',
        provides3:'',
        treatment:'',
        unemployment:'',
        outBack:'',
        oldsecurity:'',
        oldsecurityInd:'',
        newsecurity:'',
        oldsecurityAddr:'',
        oldsecurityPostcode:'',
        newsecurityName:'',
        textcontent:'',
        //6
        spouseUser:'',
        marriage:'',
        marrData:'',
        marrmanage:'',
        marrPhone:'',
        childUserName:'',
        marriagegirl:'',
        marrchildrenData:'',
        marriageyes:"",

        childUserName2:'',
        marriagegirl2:'',
        marrchildrenData2:'',
        marriageyes2:"",

        gender:'',
        spouse:'',
        /*7*/
        cappedCode:'',
        marrPhone1:'',
        menony:'',
        WorkName:'',
        Workmoney:'',
        handicappeds:'',
        handicappedClass:'',
        age:'',
        relation:'',
        health:'',
        workjob:'',
        monthmoney:'',
        issame:'',
        bankAccount:'',
        Openingbank:'',
        /*计划生育证明*/
        user:'',
        letOut:'',
        letOutName:'',
        employer:'',
        employerPhone:'',
        isyes:'',
        pregnancy:'',
        marrnumber:'',
        birthAddr:'',
        Duedata:'',
        dueResults:'',
        operation:'',
        outAddr:'',
        methods:'',
        duecontrol:'',
        outmmphAddr:'',
        marrchildrenDatas:'',
        /*计划生育情况审核*/
        oldsecurity1:'',
        inflows:'',
        sameTo:'',
        oldsecurity2:'',
        handing:'',
        household:'',
        registeradds1:'',
        registeradds2:'',
        marrChildName:'',
        /*独生子女*/
        IDNumber1:'',
        IDNumber2:'',

        /*免费培训*/
        items:''
    }

    /*多级联调*/
    $scope.$watch('d.Row1',function(old,newValue){
        /*if($scope.d.Row1 != ''){
            $http.
                get(init.url+'adminMatters!getAttributions')
                .success(function(d){
                    $scope.list2=[];
                    angular.forEach(d.data,function(elm){
                        if(elm.PARENT == $scope.d.Row1){
                            $scope.list2.push(elm);
                            console.log(elm)
                            $scope.isShow2 = true
                        }
                    })
                }).error(function(d){
                    console.log(d);
                })

            $scope.Row1 = $scope.d.Row1
        }else{
            $scope.list2=[];
            $scope.list3=[];
            $scope.isShow2 = false
        }*/
        $scope.Row1 = $scope.d.Row1;
    })
    /*$scope.$watch('d.Row2',function(old,newValue){
        if($scope.d.Row2){
            $http.
                get(init.url+'adminMatters!getAttributions')
                .success(function(d){
                    $scope.list3=[];
                    angular.forEach(d.data,function(elm){
                        if(elm.PARENT == $scope.d.Row2){
                            $scope.list3.push(elm);
                            $scope.isShow3 = true
                        }
                    })
                }).error(function(d){
                    console.log(d);
                })
            $scope.Row2 = $scope.d.Row2
        }else{
            $scope.list3=[];
            $scope.isShow3 = false
        }
    })
    $scope.$watch('d.Row3',function(old,newValue){
        $scope.Row3 = $scope.d.Row3
    })*/
    $scope.$watch('d.Row',function(old,newValue){
        $scope.newValue =$scope.d.Row;
    })
    $scope.$watch('d.checkbox1',function(old,newValue){
        if($scope.d.checkbox1){$scope.newcheckbox1 =1}else{$scope.newcheckbox1 =0}
    })
    $scope.ispepers = true;
    $scope.$watch('d.checkbox2',function(old,newValue){
        if($scope.d.checkbox2){$scope.newcheckbox2 =1}else{$scope.newcheckbox2 =0}
        if($scope.d.checkbox2){
            if($stateParams.itemId == '4'){
                $scope.ispepers = false;
                $scope.showfonts = true;
            }else{
                $scope.ispepers = true;
            }

        }else{
            if($stateParams.itemId == '4'){
                $scope.showfonts = false;
            }
            $scope.ispepers = false;
        }
    })
    /*$scope.ispepers2 = true;
    $scope.$watch('d.checkbox3',function(old,newValue){
        if($scope.d.checkbox3){$scope.newcheckbox3 =1}else{$scope.newcheckbox3 =0}
        if($scope.d.checkbox3){
            $scope.ispepers2 = true;
        }else{
            $scope.ispepers2 = false;
        }
    })*/

    /*领取养老金证明*/
    $scope.$watch('table.textcontent',function(){
        $scope.textcontent = $scope.table.textcontent;
    })
    /*社保关系转出*/
    $scope.$watch('table.register',function(old,newValue){
        $scope.register =$scope.table.register;
    })
    $scope.$watch('table.postalCode',function(old,newValue){
        $scope.postalCode =$scope.table.postalCode;
    })
    $scope.$watch('table.contactCode',function(old,newValue){
        $scope.contactCode =$scope.table.contactCode;
    })
    $scope.$watch('table.securityAddress',function(old,newValue){
        $scope.securityAddress =$scope.table.securityAddress;
    })
    $scope.$watch('table.registerTypes',function(old,newValue){
        $scope.registerTypes =$scope.table.registerTypes;
    })

    $scope.$watch('table.provides1',function(old,newValue){
        if($scope.table.provides1){$scope.newprovides1 =1}else{$scope.newprovides1 =0}
    })
    $scope.$watch('table.provides2',function(old,newValue){
        if($scope.table.provides2){$scope.newprovides2 =1}else{$scope.newprovides2 =0}
    })
    $scope.$watch('table.provides3',function(old,newValue){
        if($scope.table.provides3){$scope.newprovides3 =1}else{$scope.newprovides3 =0}
    })
    

    $scope.$watch('table.newsecurity',function(old,newValue){
        $scope.newsecurity =$scope.table.newsecurity;
    })
    $scope.$watch('table.oldsecurityAddr',function(old,newValue){
        $scope.oldsecurityAddr =$scope.table.oldsecurityAddr;
    })
    $scope.$watch('table.oldsecurityPostcode',function(old,newValue){
        $scope.oldsecurityPostcode =$scope.table.oldsecurityPostcode;
    })

    $scope.$watch('table.newsecurityName',function(old,newValue){
        $scope.newsecurityName =$scope.table.newsecurityName;
    })

    $scope.$watch('table.oldsecurity',function(){
        if($scope.table.oldsecurity){
            $scope.oldsecurity = $scope.table.oldsecurity.organizationName;//名称
            $scope.acceptOrgCode = $scope.table.oldsecurity.acceptOrgCode; //code
            $scope.MMP = $scope.table.oldsecurity.id;
        }
        console.log($scope.table.oldsecurity);
        if($scope.oldsecurity){
            $http({
                method:'GET',
                url:init.url+'common!getById?id='+$scope.table.oldsecurity.id
            }).then(function success(data) {
                $scope.table.newsecurity = data.data.data.districtCode;
                $scope.newsecurity = data.data.data.districtCode;

                $scope.table.oldsecurityAddr = data.data.data.address;
                $scope.oldsecurityAddr = data.data.data.address;

                $scope.table.oldsecurityPostcode = data.data.data.postalCode;
                $scope.oldsecurityPostcode = data.data.data.postalCode;

            },function err(data){
                console.log(data);
            })
        }

    },true)

    /*婚姻关系*/
    $scope.$watch('table.spouseUser',function(){
        $scope.spouseUser =$scope.table.spouseUser;
    })
    $scope.$watch('table.marriage',function(){
        $scope.marriage =$scope.table.marriage;
    })
    $scope.$watch('table.marrData',function(){
        console.log($scope.table.marrData)
        $scope.marrData =$scope.table.marrData;
    })
    $scope.$watch('table.marrmanage',function(){
        $scope.marrmanage =$scope.table.marrmanage;
    })
    $scope.$watch('table.marrPhone',function(){
        $scope.marrPhone =$scope.table.marrPhone;
    })
    $scope.$watch('table.marrPhone1',function(){
        $scope.marrPhone1 =$scope.table.marrPhone1;
    })
    $scope.$watch('table.childUserName',function(){
        $scope.childUserName =$scope.table.childUserName;
    })
    $scope.$watch('table.marriagepeple',function(){
        $scope.marriagepeple =$scope.table.marriagepeple;
    })
    $scope.$watch('table.marrchildrenData',function(){
        $scope.marrchildrenData =$scope.table.marrchildrenData;
    })
    $scope.$watch('table.marrchildrenDatas',function(){
        $scope.marrchildrenDatas =$scope.table.marrchildrenDatas;
    })
    $scope.$watch('table.marriageyes',function(){
        $scope.marriageyes =$scope.table.marriageyes;
    })

    $scope.$watch('table.childUserName2',function(){
        $scope.childUserName2 =$scope.table.childUserName2;
    })
    $scope.$watch('table.marriagepeple2',function(){
        $scope.marriagepeple2 =$scope.table.marriagepeple2;
    })
    $scope.$watch('table.marrchildrenData2',function(){
        $scope.marrchildrenData2 =$scope.table.marrchildrenData2;
    })
    $scope.$watch('table.marriageyes2',function(){
        $scope.marriageyes2 =$scope.table.marriageyes2;
    })

    $scope.$watch('table.gender',function(){
        $scope.gender = $scope.table.gender;
    })
    $scope.$watch('table.spouse',function(){
        $scope.spouse = $scope.table.spouse;
    })
    /*残疾人*/
    $scope.$watch('table.cappedCode',function(){
        $scope.cappedCode = $scope.table.cappedCode;
    })
    $scope.$watch('table.WorkName',function(){
        $scope.WorkName = $scope.table.WorkName;
    })
    $scope.$watch('table.Workmoney',function(){
        $scope.Workmoney = $scope.table.Workmoney;
    })
    $scope.$watch('table.handicappedClass',function(){
        $scope.handicappedClass = $scope.table.handicappedClass;

        if($scope.handicappedClass == '一级'){
            $scope.table.menony = '150元'
        }
        else if($scope.handicappedClass == '二级'){
            $scope.table.menony = '100元'
        }
        else if($scope.handicappedClass == '三级'){
            $scope.table.menony = '80元'
        }
        else if($scope.handicappedClass == '四级'){
            $scope.table.menony = '50元'
        }else{

        }
    })
    $scope.$watch('table.cappedCode',function(){
        $scope.cappedCode = $scope.table.cappedCode;
    })
    $scope.$watch('table.age',function(){
        $scope.age = $scope.table.age;
    })
    $scope.$watch('table.relation',function(){
        $scope.relation = $scope.table.relation;
    })
    $scope.$watch('table.health',function(){
        $scope.health = $scope.table.health;
    })
    $scope.$watch('table.workjob',function(){
        $scope.workjob = $scope.table.workjob;
    })
    $scope.$watch('table.monthmoney',function(){
        $scope.monthmoney = $scope.table.monthmoney;
    })
    $scope.$watch('table.handicappeds',function(){
        $scope.handicappeds = $scope.table.handicappeds;
    })
    $scope.$watch('table.issame',function(){
        $scope.issame = $scope.table.issame;
    })
    /*计划生育情况审核*/
    $scope.$watch('table.user',function(){
        $scope.user = $scope.table.user;
    })
    $scope.$watch('table.Openingbank',function(){
        $scope.Openingbank = $scope.table.Openingbank;
    })
    $scope.$watch('table.bankAccount',function(){
        $scope.bankAccount = $scope.table.bankAccount;
    })
    $scope.$watch('table.letOut',function(){
        $scope.letOut = $scope.table.letOut;
    })
    $scope.$watch('table.letOutName',function(){
        $scope.letOutName = $scope.table.letOutName;
    })
    $scope.$watch('table.employer',function(){
        $scope.employer = $scope.table.employer;
    })
    $scope.$watch('table.employerPhone',function(){
        $scope.employerPhone = $scope.table.employerPhone;
    })
    $scope.$watch('table.isyes',function(){
        $scope.isyes = $scope.table.isyes;
    })
    $scope.$watch('table.pregnancy',function(){
        $scope.pregnancy = $scope.table.pregnancy;
    })
    $scope.$watch('table.marrnumber',function(){
        $scope.marrnumber = $scope.table.marrnumber;
    })
    $scope.$watch('table.birthAddr',function(){
        $scope.birthAddr = $scope.table.birthAddr;
    })
    $scope.$watch('table.Duedata',function(){
        $scope.Duedata = $scope.table.Duedata;
    })
    $scope.$watch('table.dueResults',function(){
        $scope.dueResults = $scope.table.dueResults;
    })
    $scope.$watch('table.operation',function(){
        $scope.operation = $scope.table.operation;
    })
    $scope.$watch('table.outAddr',function(){
        $scope.outAddr = $scope.table.outAddr;
    })
    $scope.$watch('table.methods',function(){
        $scope.methods = $scope.table.methods;
    })
    $scope.$watch('table.duecontrol',function(){
        $scope.duecontrol = $scope.table.duecontrol;
    })
    $scope.$watch('table.outmmphAddr',function(){
        $scope.outmmphAddr = $scope.table.outmmphAddr;
    })
    $scope.$watch('table.inflows',function(){
        $scope.inflows = $scope.table.inflows;
    })
    $scope.$watch('table.sameTo',function(){
        $scope.sameTo = $scope.table.sameTo;
    })
    /*计划生育情况审核*/
    $scope.$watch('table.oldsecurity1',function(){
        $scope.oldsecurity1 = $scope.table.oldsecurity1;
    })
    $scope.$watch('table.oldsecurity2',function(){
        $scope.oldsecurity2 = $scope.table.oldsecurity2;
    })
    $scope.$watch('table.handing',function(){
        $scope.handing = $scope.table.handing;
    })
    $scope.$watch('table.household',function(){
        $scope.household = $scope.table.household;
    })
    $scope.$watch('table.registeradds1',function(){
        $scope.registeradds1 = $scope.table.registeradds1;
    })
    $scope.$watch('table.registeradds2',function(){
        $scope.registeradds2 = $scope.table.registeradds2;
    })
    $scope.$watch('table.marrChildName',function(){
        $scope.marrChildName = $scope.table.marrChildName;
    })

    $scope.$watch('table.IDNumber1',function(){
        $scope.IDNumber1 = $scope.table.IDNumber1;
    })
    $scope.$watch('table.IDNumber2',function(){
        $scope.IDNumber2 = $scope.table.IDNumber2;
    })

    $scope.$watch('table.items',function(){
        $scope.items = $scope.table.items;
    })
    //是否包含情景
    function isScenario(){
        //$scope.idCard = '440602197901010337';
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
        if($stateParams.sceneId == null){$stateParams.sceneId = ''}
        $http.
            get(init.url+'adminMatters!getCertificateInfoAndUpload?isIncludeScene='+$stateParams.isIncludeScene+'&itemId='+$stateParams.itemId+'&sceneId='+$stateParams.sceneId+"&IDNumber="+$scope.idCard)
            .success(function(d){
                $scope.textCont = d.data.memo;
                $scope.id = $stateParams.itemId;
                d.data.certificatelist.length == 0? $scope.obj = 0:$scope.obj=d.data.certificatelist;
                $scope.itemName = $stateParams.itemName;

                $scope.d.len =d.data.certificatelist.length;

                //获取到所需要的已有本事项所需影像的影像  类型综合
                $scope.imgTypes =d.data.imgTypes;
                $scope.mimeTypes = d.data.mimeTypes;
                //这是个人数字资产中已有本事项所需影像的  几个
                $scope.imgTypeNum = d.data.imgTypeNum;

                //户籍地址
                $scope.table.register= d.data.address;
                $scope.register= d.data.address;

                //是否包含结果物
                $scope.isIncludeRe = d.data.isIncludeResult;

                $scope.isElectronic = d.data.isElectronic;//是否包含电子档
                $scope.isPaper = d.data.isPaper;//是否包含纸质
                $scope.isCertificate = d.data.isCertificate;//是否包含证件

                $scope.mattersOrgLevel = d.data.mattersOrgLevel;//判断是否弹框
                d.data.mattersOrgLevel == 0 ? $scope.admissible = true : console.log();//判断显示

                $scope.newcheckbox1 = $scope.isElectronic;
                $scope.isElectronic ==1? $scope.d.checkbox1 = true : $scope.d.checkbox1 = false

                $scope.newcheckbox2 = $scope.isPaper;
                $scope.isPaper ==1? $scope.d.checkbox2 = true : $scope.d.checkbox2 = false


                $scope.newcheckbox3 = $scope.isCertificate;
                $scope.isCertificate ==1? $scope.d.checkbox3 = true : $scope.d.checkbox3 = false


                security();
                isResult();
                //获取通过身份证获取用户信息
                getUserMangage();
                var certificatelist = d.data.certificatelist;
                angular.forEach(certificatelist,function(elm){
                    imgNamess.push(elm.certificateName);
                })
                $scope.imgNamess = imgNamess;

                if($scope.imgTypeNum  == 0){
                    $scope.isHas = false;
                }else{
                    $scope.isHas = true;
                }


                //获取事项详情拿到图片和资料
                if ($stateParams.status == 2) {
                    $timeout(function(){
                        getManageDetail();

                        $ionicLoading.hide();
                    },1000)
                }else{
                    $ionicLoading.hide();
                }
            })
            .error(function(d){
                console.warn(d);
            })

        if($stateParams.itemId == 19){
            $http({
                method:'GET',
                url:init.url+'freeCourse!getFreeCourseList'
            }).then(function success(res){
                $scope.arrs = res.data.data;
            },function error(err){
                console.log(err)
            })
        }
    }
    isScenario();
    //获取表的数据
    function getTable(tableData){
        var t =JSON.parse(tableData);
        //console.log(tableData);
        if($stateParams.itemId == 21) {
            $scope.oldsecurityAddr = t.address||'';
            $scope.cappedCode = t.disabilityCertificateNumber||'';
            $scope.handicappeds = t.disabilityType||'';
            $scope.health = t.education||'';
            $scope.workjob = t.employmentIntention||'';
            $scope.marrPhone = t.mobile||'';
            $scope.newsecurityName = t.other||'';
            $scope.items = t.project||'';
            $scope.textcontent = t.remarks||'';
            $scope.gender = t.sex||'';
            $scope.relation = t.skills||'';
            $scope.letOut = t.street||'';
            $scope.spouseUser = t.username||'';
            $scope.WorkName = t.workExperience||'';
            $scope.issame = t.workTime||'';
            $scope.marrData = t.yearAndMonth||'';

            $scope.table.oldsecurityAddr = t.address||'';
            $scope.table.cappedCode = t.disabilityCertificateNumber||'';
            $scope.table.handicappeds = t.disabilityType||'';
            $scope.table.health = t.education||'';
            $scope.table.workjob = t.employmentIntention||'';
            $scope.table.marrPhone = t.mobile||'';
            $scope.table.newsecurityName = t.other||'';
            $scope.table.items = t.project||'';
            $scope.table.textcontent = t.remarks||'';
            $scope.table.gender = t.sex||'';
            $scope.table.relation = t.skills||'';
            $scope.table.letOut = t.street||'';
            $scope.table.spouseUser = t.username||'';
            $scope.table.WorkName = t.workExperience||'';
            $scope.table.issame = t.workTime||'';
            $scope.table.marrData = t.yearAndMonth||'';
        }
        if($stateParams.itemId == 15) {
            $scope.methods = t.contraceptives||'';
            $scope.handing = t.disciplinaryTreatment||'';
            $scope.registeradds1 = t.manAddress||'';
            $scope.oldsecurity1 = t.manMaritalStatus||'';
            $scope.securityAddress = t.manNowAddress||'';
            $scope.WorkName = t.manWorkplace||'';
            $scope.marrData = t.manYearAndMonth||'';
            $scope.user = t.manName||'';
            $scope.employerPhone = t.mobile||'';
            $scope.textcontent = t.cause||'';
            $scope.health = t.socialCompensationFee||'';
            $scope.marriageyes = t.child[0].birthByPolicy||'';
            $scope.newsecurityName = t.child[0].childAddress||'';
            $scope.marrChildName = t.child[0].childName||'';
            $scope.issame = t.child[0].childSex||'';
            $scope.marrchildrenDatas = t.child[0].childYearAndMonth||'';
            $scope.household = t.child[0].isEnteredTheFamily||'';
            $scope.registeradds2 = t.womanAddress||'';
            $scope.oldsecurity2 = t.womanMaritalStatus||'';
            $scope.childUserName = t.womanName||'';
            $scope.oldsecurityAddr = t.womanNowAddress||'';
            $scope.workjob = t.womanWorkplace||'';
            $scope.marrchildrenData = t.womanYearAndMonth||'';

            $scope.table.methods = t.contraceptives||'';
            $scope.table.handing = t.disciplinaryTreatment||'';
            $scope.table.registeradds1 = t.manAddress||'';
            $scope.table.oldsecurity1 = t.manMaritalStatus||'';
            $scope.table.securityAddress = t.manNowAddress||'';
            $scope.table.WorkName = t.manWorkplace||'';
            $scope.table.marrData = t.manYearAndMonth||'';
            $scope.table.user = t.manName||'';
            $scope.table.employerPhone = t.mobile||'';
            $scope.table.textcontent = t.cause||'';
            $scope.table.health = t.socialCompensationFee||'';

            $scope.table.marriageyes = t.child[0].birthByPolicy||'';
            $scope.table.newsecurityName = t.child[0].childAddress||'';
            $scope.table.marrChildName = t.child[0].childName||'';
            $scope.table.issame = t.child[0].childSex||'';
            $scope.table.marrchildrenDatas = t.child[0].childYearAndMonth||'';
            $scope.table.household = t.child[0].isEnteredTheFamily||'';

            $scope.table.registeradds2 = t.womanAddress||'';
            $scope.table.oldsecurity2 = t.womanMaritalStatus||'';
            $scope.table.childUserName = t.womanName||'';
            $scope.table.oldsecurityAddr = t.womanNowAddress||'';
            $scope.table.workjob = t.womanWorkplace||'';
            $scope.table.marrchildrenData = t.womanYearAndMonth||'';
        }
        if($stateParams.itemId == 11) {
            $scope.idCard = t.IDNumber||'';
            //$scope.userName = t.username||'';
            $scope.textcontent = t.cause||'';
            $scope.marrPhone = t.mobile||'';

            $scope.table.idCard = t.IDNumber||'';
            //$scope.userName = t.username||'';
            $scope.table.textcontent = t.cause||'';
            $scope.table.marrPhone = t.mobile||'';


        }
        if($stateParams.itemId == 6) {
            $scope.spouse = t.address||'';
            $scope.birthAddr = t.child[0].birthPlace||'';
            $scope.marrchildrenDatas = t.child[0].birthday||'';
            $scope.marrnumber = t.child[0].marriageCertificateNum||'';
            $scope.childUserName = t.child[0].name||'';
            $scope.marriagepeple = t.child[0].sex||'';
            $scope.marriageyes = t.child[0].withinPolicyAbroad||'';
            $scope.employer = t.employer||'';
            $scope.employerPhone = t.employerCall||'';
            $scope.inflows = t.inflowTime||'';
            $scope.sameTo = t.isComeTogether||'';
            $scope.marriage = t.maritalStatus||'';
            $scope.methods = t.pregnancy[0].contraception||'';
            $scope.duecontrol = t.pregnancy[0].contraceptiveDate||'';
            $scope.outmmphAddr = t.pregnancy[0].contraceptiveSite||'';
            $scope.outAddr = t.pregnancy[0].operationSite||'';
            $scope.operation = t.pregnancy[0].operationTime||'';
            $scope.marriageyes = t.pregnancy[0].policyInsideAndOutside||'';
            $scope.Duedata = t.pregnancy[0].predicted||'';
            $scope.dueResults = t.pregnancy[0].pregnancyResults||'';
            $scope.pregnancy = t.pregnancy[0].pregnancyTime||'';
            $scope.letOut = t.rentalAddress||'';
            $scope.marrPhone = t.rentalPhone||'';
            $scope.issame = t.sex||'';
            $scope.oldsecurityAddr = t.socialCompensationFee||'';
            $scope.age = t.spouseAge||'';
            $scope.spouseUser = t.spouseName||'';
            $scope.user = t.username||'';
            $scope.marrData = t.weddingTime||'';
            $scope.WorkName = t.workAddress||'';
            $scope.marrchildrenData = t.yearAndMonth||'';

            $scope.table.spouse = t.address||'';
            $scope.table.birthAddr = t.child[0].birthPlace||'';
            $scope.table.marrchildrenDatas = t.child[0].birthday||'';
            $scope.table.marrnumber = t.child[0].marriageCertificateNum||'';
            $scope.table.childUserName = t.child[0].name||'';
            $scope.table.marriagepeple = t.child[0].sex||'';
            $scope.table.marriageyes = t.child[0].withinPolicyAbroad||'';
            $scope.table.employer = t.employer||'';
            $scope.table.employerPhone = t.employerCall||'';
            $scope.table.inflows = t.inflowTime||'';
            $scope.table.sameTo = t.isComeTogether||'';
            $scope.table.marriage = t.maritalStatus||'';
            $scope.table.methods = t.pregnancy[0].contraception||'';
            $scope.table.duecontrol = t.pregnancy[0].contraceptiveDate||'';
            $scope.table.outmmphAddr = t.pregnancy[0].contraceptiveSite||'';
            $scope.table.outAddr = t.pregnancy[0].operationSite||'';
            $scope.table.operation = t.pregnancy[0].operationTime||'';
            $scope.table.marriageyes = t.pregnancy[0].policyInsideAndOutside||'';
            $scope.table.Duedata = t.pregnancy[0].predicted||'';
            $scope.table.dueResults = t.pregnancy[0].pregnancyResults||'';
            $scope.table.pregnancy = t.pregnancy[0].pregnancyTime||'';
            $scope.table.letOut = t.rentalAddress||'';
            $scope.table.marrPhone = t.rentalPhone||'';
            $scope.table.issame = t.sex||'';
            $scope.table.oldsecurityAddr = t.socialCompensationFee||'';
            $scope.table.age = t.spouseAge||'';
            $scope.table.spouseUser = t.spouseName||'';
            $scope.table.user = t.username||'';
            $scope.table.marrData = t.weddingTime||'';
            $scope.table.WorkName = t.workAddress||'';
            $scope.table.marrchildrenData = t.yearAndMonth||'';
        }
        if($stateParams.itemId == 12||$stateParams.itemId == 13||$stateParams.itemId == 14) {
            $scope.newprovides1 = t.medicalInsurance||'';
            $scope.newprovides2 = t.agedInsurance||'';
            $scope.newprovides3 = t.unemploymentInsurance||'';
            $scope.securityAddress = t.contactAddress||'';
            $scope.register = t.houseAddress||'';
            $scope.registerTypes = t.houseType||'';
            $scope.oldsecurityAddr = t.oldInstitutionsAddress||'';
            $scope.newsecurity = t.oldInstitutionsCode||'';
            $scope.oldsecurity = t.oldInsuredInstitutionsName||'';
            $scope.oldsecurityPostcode = t.oldInstitutionsPostalCode||'';
            $scope.newsecurityName = t.nowInstitutionsAddress||'';
            $scope.postalCode = t.postalCode1||'';
            $scope.contactCode = t.postalCode2||'';
            $scope.outBack = t.processingMethod||'';

            t.medicalInsurance ==1?$scope.newprovides111 = true:$scope.newprovides111 ='';
            t.agedInsurance ==1?$scope.newprovides222 = true:$scope.newprovides222 ='';
            t.unemploymentInsurance ==1?$scope.newprovides333 = true:$scope.newprovides333 ='';
            $scope.table.securityAddress = t.contactAddress||'';
            $scope.table.register = t.houseAddress||'';
            $scope.table.registerTypes = t.houseType||'';
            $scope.table.oldsecurityAddr = t.oldInstitutionsAddress||'';
            $scope.table.newsecurity = t.oldInstitutionsCode||'';
            //$scope.oldInsuredInstitutionsName111 = t.oldInsuredInstitutionsName||'';
            $scope.table.oldsecurity= t.MMP||3;
            /*if(t.oldInsuredInstitutionsName ==''){

            }else if(t.oldInsuredInstitutionsName ==''){

            }else{

            }*/
            $scope.table.oldsecurityPostcode = t.oldInstitutionsPostalCode||'';
            $scope.table.newsecurityName = t.nowInstitutionsAddress||'';
            $scope.table.postalCode = t.postalCode1||'';
            $scope.table.contactCode = t.postalCode2||'';
            $scope.table.outBack = t.processingMethod||'';
        }
        if($stateParams.itemId == 7) {
            $scope.securityAddress = t.address||'';
            $scope.table.menony = t.allowance||'';
            $scope.marrData = t.dateOfIssue||'';
            $scope.cappedCode = t.disabilityCertificateNum||'';
            $scope.handicappeds = t.disabilityLevel||'';
            $scope.handicappedClass = t.disabilityType||'';
            $scope.age = t.family[0].age||'';
            $scope.health = t.family[0].health||'';
            $scope.issame = t.family[0].isSameAccount||'';
            $scope.monthmoney = t.family[0].monthlyIncome||'';
            $scope.childUserName = t.family[0].name||'';
            $scope.marrPhone1 = t.family[0].phone||'';
            $scope.relation = t.family[0].relationship||'';
            $scope.workjob = t.family[0].work||'';
            $scope.marriagepeple = t.sex||'';
            $scope.Workmoney = t.monthlyIncome||'';
            $scope.marrPhone = t.mobile||'';
            $scope.table.WorkName = t.workplace||'';

            $scope.table.securityAddress = t.address||'';
            $scope.table.menony = t.allowance||'';
            $scope.table.marrData = t.dateOfIssue||'';
            $scope.table.cappedCode = t.disabilityCertificateNum||'';
            $scope.table.handicappeds = t.disabilityLevel||'';
            $scope.table.handicappedClass = t.disabilityType||'';

            $scope.table.age = t.family[0].age||'';
            $scope.table.health = t.family[0].health||'';
            $scope.table.issame = t.family[0].isSameAccount||'';
            $scope.table.monthmoney = t.family[0].monthlyIncome||'';
            $scope.table.childUserName = t.family[0].name||'';
            $scope.table.marrPhone1 = t.family[0].phone||'';
            $scope.table.relation = t.family[0].relationship||'';
            $scope.table.workjob = t.family[0].work||'';

            $scope.table.marriagepeple = t.sex||'';
            $scope.table.Workmoney = t.monthlyIncome||'';
            $scope.table.marrPhone = t.mobile||'';
            $scope.table.WorkName = t.workplace||'';
        }
        if($stateParams.itemId == 18) {
            $scope.marrPhone = t.mobile||'';
            $scope.contactCode = t.postalCode||'';
            $scope.securityAddress = t.nowAddress||'';
            $scope.marriagepeple = t.sex||'';
            $scope.marrchildrenDatas = t.yearAndMonth||'';

            $scope.table.marrPhone = t.mobile||'';
            $scope.table.contactCode = t.postalCode||'';
            $scope.table.securityAddress = t.nowAddress||'';
            $scope.table.marriagepeple = t.sex||'';
            $scope.table.marrchildrenDatas = t.yearAndMonth||'';
        }
        if($stateParams.itemId == 9) {
            $scope.marrChildName = t.childName||'';
            $scope.issame = t.childSex||'';
            $scope.marrchildrenDatas = t.childYearAndMonth||'';
            $scope.registeradds1 = t.manAddress||'';
            $scope.IDNumber1 = t.manIDNumber||'';
            $scope.securityAddress = t.manNowAddress||'';
            $scope.methods = t.manPoliticalOutlook||'';
            $scope.user = t.manUsername||'';
            $scope.WorkName = t.manWorkplace||'';
            $scope.cappedCode = t.marriageCertificateNumber||'';
            $scope.marrData = t.weddingTime||'';
            $scope.registeradds2 = t.womanAddress||'';
            $scope.IDNumber2 = t.womanIDNumber||'';
            $scope.oldsecurityAddr = t.womanNowAddress||'';
            $scope.handing = t.womanPoliticalOutlook||'';
            $scope.childUserName = t.womanUsername||'';
            $scope.workjob = t.womanWorkplace||'';

            $scope.table.marrChildName = t.childName||'';
            $scope.table.issame = t.childSex||'';
            $scope.table.marrchildrenDatas = t.childYearAndMonth||'';
            $scope.table.registeradds1 = t.manAddress||'';
            $scope.table.IDNumber1 = t.manIDNumber||'';
            $scope.table.securityAddress = t.manNowAddress||'';
            $scope.table.methods = t.manPoliticalOutlook||'';
            $scope.table.user = t.manUsername||'';
            $scope.table.WorkName = t.manWorkplace||'';
            $scope.table.cappedCode = t.marriageCertificateNumber||'';
            $scope.table.marrData = t.weddingTime||'';
            $scope.table.registeradds2 = t.womanAddress||'';
            $scope.table.IDNumber2 = t.womanIDNumber||'';
            $scope.table.oldsecurityAddr = t.womanNowAddress||'';
            $scope.table.handing = t.womanPoliticalOutlook||'';
            $scope.table.childUserName = t.womanUsername||'';
            $scope.table.workjob = t.womanWorkplace||'';
        }
        if($stateParams.itemId == 19) {
            $scope.items = t.id||'';
            $scope.table.items = t.id||'';
        }
    }
    //获取事项详情拿到图片和资料
    function getManageDetail() {
        $http.get(init.url+'adminMatters!getItemRecordById?id='+$stateParams.listId)
            .success(function(d){
                //$scope.status = d.data.status;
                $scope.tableData = d.data.tableData;
                angular.forEach(dom,function(elm){
                    angular.forEach(d.data.list,function(elms){
                        if(angular.element(elm).attr('data_type') ==elms.imgType){
                            angular.element(elm).attr('src',elms.materialImgUrl);

                            if(angular.element(elm).attr('data_mineType') != 'application/pdf'){
                                angular.element(elm).attr('data_imgUrls',elms.materialImgUrl);
                            }
                            angular.element(elm).attr('data_imgName',elms.materialName);
                            angular.element(elm).attr('data_type',elms.imgType);
                            angular.element(elm).attr('data_mineType',elms.mimeType);
                            angular.element(elm).attr('data_uploadtypes',elms.materialSource);

                        }
                    })
                })
                //获取表的数据
                getTable(d.data.tableData);
            })
            .error(function(d){
                console.warn(d);
            })
    }
    //获取通过身份证获取用户信息
    function getUserMangage(){
        $http.
            get(init.url+'citizenInfo!getCitizenInfoByIDNumber?&IDNumber='+$scope.idCard)
            .success(function(d){
                console.log(d.data);
                $scope.usernames = d.data.name;
                $scope.birthDates = d.data.birthDate;//生日
                $scope.useraddress = d.data.address;
                $scope.sexs = d.data.sex;
                $scope.usermobile = d.data.mobile;
                $scope.iDNumber = d.data.iDNumber;
                if($stateParams.itemId ==18){
                    $scope.table.marrchildrenDatas = $getbirthday.getbirthday();
                    $scope.marrchildrenDatas = $getbirthday.getbirthday();

                    $scope.table.marriagepeple = $getbirthday.getGender();
                    $scope.marriagepeple = $getbirthday.getGender();

                    $scope.marrPhone = d.data.mobile;
                    $scope.table.marrPhone = d.data.mobile;
                }
                if($stateParams.itemId == 7){
                    $scope.securityAddress = d.data.address;
                    $scope.table.securityAddress = d.data.address;

                    $scope.table.marrPhone = d.data.mobile;
                    $scope.marrPhone = d.data.mobile;

                    $scope.table.marrPhone1 = d.data.mobile;
                    $scope.marrPhone1 = d.data.mobile;

                    if(d.data.sex){
                        $scope.table.marriagepeple = '男';
                        $scope.marriagepeple = '男';
                    }else{
                        $scope.table.marriagepeple = '女';
                        $scope.marriagepeple = '女';
                    }
                }
                if($stateParams.itemId == 21){
                    $scope.table.spouseUser = $scope.usernames;
                    $scope.spouseUser = $scope.usernames;
                    if(d.data.sex){
                        $scope.table.gender = '男';
                        $scope.gender = '男';
                    }else{
                        $scope.table.gender = '女';
                        $scope.gender = '女';
                    }
                    $scope.table.marrData = $scope.birthDates;
                    $scope.marrData = $scope.birthDates

                    $scope.table.oldsecurityAddr = $scope.useraddress;
                    $scope.oldsecurityAddr = $scope.useraddress;
                    
                    $scope.table.marrPhone = d.data.mobile;
                    $scope.marrPhone = d.data.mobile;
                }
                if($stateParams.itemId == 6){
                    $scope.table.user = $scope.usernames;
                    $scope.user = $scope.usernames;

                    if(d.data.sex){
                        $scope.table.issame = '男';
                        $scope.issame = '男';
                    }else{
                        $scope.table.issame = '女';
                        $scope.issame = '女';
                    }
                    $scope.table.marrchildrenData = $scope.birthDates;
                    $scope.marrchildrenData = $scope.birthDates

                    $scope.table.spouse = $scope.useraddress;
                    $scope.spouse = $scope.useraddress;

                    $scope.table.marrPhone = d.data.mobile;
                    $scope.marrPhone = d.data.mobile;
                }
                if($stateParams.itemId == 9){
                    if(d.data.sex){
                        $scope.table.user = $scope.usernames;
                        $scope.user = $scope.usernames;
                        $scope.table.IDNumber1 = $scope.iDNumber;
                        $scope.IDNumber1 = $scope.iDNumber;
                        $scope.registeradds1 = $scope.useraddress;
                        $scope.table.registeradds1 = $scope.useraddress;

                        $scope.table.securityAddress = $scope.useraddress;
                        $scope.securityAddress = $scope.useraddress;
                    }else{
                        $scope.table.childUserName = $scope.usernames;
                        $scope.childUserName = $scope.usernames;
                        $scope.table.IDNumber2 = $scope.iDNumber;
                        $scope.IDNumber2 = $scope.iDNumber;
                        $scope.registeradds2 = $scope.useraddress;
                        $scope.table.registeradds2 = $scope.useraddress;
                        $scope.table.oldsecurityAddr = $scope.useraddress;
                        $scope.oldsecurityAddr = $scope.useraddress;
                    }

                }
                if($stateParams.itemId == 15){
                    if(d.data.sex){
                        $scope.table.user = $scope.usernames;
                        $scope.user = $scope.usernames;
                        $scope.table.marrData = $scope.birthDates;
                        $scope.marrData = $scope.birthDates
                        $scope.table.employerPhone = d.data.mobile;
                        $scope.employerPhone = d.data.mobile;
                        $scope.registeradds1 = $scope.useraddress;
                        $scope.table.registeradds1 = $scope.useraddress;
                        $scope.table.securityAddress = $scope.useraddress;
                        $scope.securityAddress = $scope.useraddress;
                    }else{
                        $scope.table.childUserName = $scope.usernames;
                        $scope.childUserName = $scope.usernames;
                        $scope.table.marrchildrenData = $scope.birthDates;
                        $scope.marrchildrenData = $scope.birthDates;
                        $scope.table.employerPhone = d.data.mobile;
                        $scope.employerPhone = d.data.mobile;
                        $scope.registeradds2 = $scope.useraddress;
                        $scope.table.registeradds2 = $scope.useraddress;
                        $scope.table.oldsecurityAddr = $scope.useraddress;
                        $scope.oldsecurityAddr = $scope.useraddress;
                    }
                }
            })
            .error(function(d){
                console.warn(d);
            })
    }
    //是否包含结果物
    function isResult(){
        if($stateParams.isIncludeResult == 1){
            var userss = 1;
            var userphone = 2;
            var userAddress = 3;
            /*收货人===*/
            $scope.$watch('addr.recipients',function(old,news){
                if(userss ==1){
                    $scope.addr.recipients =sessionStorage.getItem('IdUsername');
                    userss=null;
                }
                $scope.recipients = $scope.addr.recipients;
            })
            $scope.$watch('addr.recipientsMobile',function(){
                if(userphone ==2){
                    $scope.addr.recipientsMobile =sessionStorage.getItem('mobile');
                    userphone=null;
                }
                $scope.recipientsMobile = $scope.addr.recipientsMobile;
            })

            $scope.$watch('addr.recipientsAddress',function(){
                if(userAddress ==3){
                    $scope.addr.recipientsAddress =$scope.register;
                    userAddress=null;
                }
                $scope.recipientsAddress = $scope.addr.recipientsAddress;
            })

        }
    }

    /*社会保险关系转移接续*/
    function security(){
        $scope.table.outBack = '转出';
        $scope.outBack = '转出';
        $scope.security = true;
        $scope.table.postalCode = '528000';
        $scope.postalCode = '528000';
        $scope.table.contactCode = '528000';
        $scope.postalCode = '528000';
        $scope.table.securityAddress = $scope.table.register;
        $scope.securityAddress = $scope.table.register;


        $scope.table.user = sessionStorage.getItem('IdUsername');
        $scope.user = sessionStorage.getItem('IdUsername');

        if($stateParams.itemId == 12||$stateParams.itemId == 13||$stateParams.itemId == 14||$stateParams.itemId == 18){
            $http({
                method: 'GET',
                url: init.url + 'common!getSsbName'
            }).then(function successCallback(response) {
                console.log(response.data.data);
                $scope.objs = response.data.data;
                $scope.table.oldsecurity = $scope.objs[1];
            }, function errorCallback(response) {
                console.log(response)
            })
        }
    }

    //授权获取图片
    $scope.getMattersImg = function () {
        var alertPopup = $ionicPopup.confirm({
            title: '提示',
            template: '您的个人数据空间内存储的材料原件无遗失、信息变更且在有效期内，如需获取办事项所需材料，请点击确认。',
            okText:'确认',
            cancelText: "取消",
            cancelType: "button-default"
        });
        alertPopup.then(function(res) {
            if (res) {
                $ionicLoading.show({
                    template: "<ion-spinner icon='android'></ion-spinner><div style='text-align: center'>获取影像中，请稍候...</div>"
                });
                $http.
                    get(init.url+'adminMatters!getMattersImg?imgTypes='+$scope.imgTypes+'&mimeTypes='+$scope.mimeTypes+"&IDNumber="+$scope.idCard)
                    .success(function(d){
                        angular.forEach(dom,function(elm){

                            angular.forEach(d.data,function(elms){
                                if(angular.element(elm).attr('data_type') ==elms.imgType){
                                    angular.element(elm).attr('src',elms.imgUrl);

                                    if(angular.element(elm).attr('data_mineType') != 'application/pdf'){
                                        angular.element(elm).attr('data_imgUrls',elms.imgUrl);
                                    }
                                    angular.element(elm).attr('data_imgName',elms.imgName);
                                    angular.element(elm).attr('data_type',elms.imgType);
                                    angular.element(elm).attr('data_mineType',elms.mineType);
                                    angular.element(elm).attr('data_uploadtypes',elms.uploadType);

                                }
                            })
                        })
                        $ionicLoading.hide();
                    })
                    .error(function(d){
                        console.warn(d);
                    })
            } else {
                return;
            }
        });
    }

	//样例图
	$scope.showImg = function(imgs){
		console.log(imgs);
		$scope.imgSrc = imgs;
		$scope.isshow = true;
	}
	$scope.isShow = function(){
		$scope.isshow = false;
	}

    $scope.uploadFiles = function(files,errFiles,elm,inde){
        var headerImage =document.getElementsByClassName('headerImage')[inde];
        console.log(inde);
        $scope.files = files;
        $scope.errFiles = errFiles;
        function test(){
            if(files[0].size == 0){
                headerImage.src ='./imgs/img1.jpg';
                $ionicLoading.show({
                    template: '图片上传中，请稍候...'
                });
                $timeout(function(){
                    if(files[0].size != 0){
                        $ionicLoading.hide();
                        delay();
                    }else{
                        test();
                    }
                },1000)
            }
            else{
                delay();
            }
        }
        test();
        function delay(){
            angular.forEach(files, function(file) {
                if(files[0].size){
                    $ionicLoading.show({
                        template: '图片上传中，请稍候...'
                    });

                    Upload.upload({
                        //服务端接收
                        url: init.url+'upload!fileUpload',
                        //上传的同时带的参数
                        data: {'myfile': file}

                    }).success(function (data, status, headers, config) {
                        //上传成功
                        $timeout(function () {
                            $scope.url = data.imgUrl;
                            images_list.push(data.imgUrl);
                            $ionicLoading.hide();
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: '上传成功！',
                                okText:'确定'
                            });
                            alertPopup.then(function(res) {
                                return false;
                            });
                        });

                        headerImage.src =data.imgUrl;
                        if(angular.element(headerImage).attr('data_mineType') != 'application/pdf'){
                            angular.element(headerImage).attr('data_imgUrls',data.imgUrl);
                        }
                        angular.element(headerImage).attr('data_uploadtypes',data.uploadType);
                        angular.element(headerImage).attr('data_imgName',data.imgName);
                        angular.element(headerImage).attr('data_mineType',data.mineType);

                        return;
                    }).error(function (data, status, headers, config) {
                        //上传失败
                        console.log('error status: ' + status);
                        //alert('请选择小于9M的图片！');
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '请选择小于9M的图片！',
                            okText:'确定'
                        });
                        alertPopup.then(function(res) {
                            return false;
                        });
                        $ionicLoading.hide();
                    });

                }

            });
        }

    };

    var IDNumber=$scope.idCard;
    var userName = $scope.userName;

    var mobile =sessionStorage.getItem('mobile');
    $scope.mobile = mobile;

    $scope.datas = {
        hasPhone:'',
        newPhone:'',
        residenceAddress:'',
        liveAddress:'',//现住
        birthday:'',
        tell:'',
        objId:'',
        imgNames:''
    };

    $scope.$watch('datas.residenceAddress',function(){
        $scope.newAddress = $scope.datas.residenceAddress;
    })

    $scope.$watch('datas.tell',function(){
        $scope.tell = $scope.datas.tell;
    })
    $scope.$watch('datas.birthday',function(){
        $scope.birthday = $scope.datas.birthday;
    })

    $scope.$watch('datas.liveAddress',function(){
        $scope.liveAddress = $scope.datas.liveAddress;
    })

    $scope.$watch('datas.sex',function(){
        $scope.sex = $scope.datas.sex;
    })

    console.log($stateParams.itemId);

    if($stateParams.itemId == 10){
        $scope.TMD = true;
    }
    /*判断是哪一个表*/
    switch ($stateParams.itemId){
        case 3 : $scope._itemId = '3';
            break;
        case 6 :$scope._itemId = '6';
            break;
        case 12 :$scope._itemId = '12';
            break;
        case 13 :$scope._itemId = '12';
            break;
        case 14 :$scope._itemId = '12';
            break;
        case 7 :$scope._itemId = '7';
            break;
        case 11:$scope._itemId = '11';$scope.hasTables = true;//显示手写板
            break;
        case 15:$scope._itemId = '15';
            break;
        case 18:$scope._itemId = '18';
            break;
        case 9:$scope._itemId = '9';
            break;
        case 19:$scope._itemId = '19';
            break;
        case 5:$scope._itemId = '5';$scope.hasTable = true;
            break;
        case 21:$scope._itemId = '21';
            break;
        case 1:$scope._itemId = '1';$scope.hasTable = true;
            break;
        default : $scope.hasTable = true;//没有表的情况
    }

    if($stateParams.objId == null){
        $stateParams.objId = '';
    }
    //提交(不包含表的)
    $scope.getUp = function(){
        getHttp();
    }

    /*残疾人技能培训21*/
    $scope.disabilitiesr = function () {
        if($scope.gender ==''){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: "请选择性别！",
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;
        }
        if($scope.marrData == ''){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: "请选择核出生年月！",
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;
        }
        if($scope.handicappeds == ''){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: "请选择残疾类别！",
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;
        }
        if($scope.issame == ''){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: "请选择参加班别！",
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;
        }
        if($scope.items == ''){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: "请选择培训项目！",
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;
        }

        var table={
            "address": $scope.oldsecurityAddr,
            "disabilityCertificateNumber": $scope.cappedCode,
            "disabilityType": $scope.handicappeds,
            "education": $scope.health,
            "employmentIntention": $scope.workjob,
            "mobile": $scope.marrPhone,
            "other": $scope.newsecurityName,
            "project": $scope.items,
            "remarks": $scope.textcontent,
            "sex": $scope.gender,
            "skills": $scope.relation,
            "street": $scope.letOut,
            "username": $scope.spouseUser,
            "workExperience": $scope.WorkName,
            "workTime": $scope.issame,
            "yearAndMonth": $scope.marrData
        }
        table = JSON.stringify(table);

        getHttp(table);
    }

    /*计划生育情况审核*/ /* 15 */
    $scope.familyPlanning = function(){
        if($scope.oldsecurity1 == ''||$scope.oldsecurity2==''){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '请选择婚姻状态！',
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;
        }
        if($scope.marrchildrenData == ''&&$scope.marrData==''){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '请选择(男方)或者(女方)的出生日期！',
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;
        }
        if($scope.issame == ''){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '请选择性别！',
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;
        }
         var table={
             'contraceptives':$scope.methods,
             "disciplinaryTreatment":$scope.handing,
             "manAddress":$scope.registeradds1,
             'manMaritalStatus':$scope.oldsecurity1,
             'manNowAddress':$scope.securityAddress,
             'manWorkplace':$scope.WorkName,
             'manYearAndMonth':$scope.marrData,
             "manName": $scope.user,
             "mobile": $scope.employerPhone,
             'cause':$scope.textcontent,//原因
             'socialCompensationFee':$scope.health,
             "child": [
                 {
                     "birthByPolicy": $scope.marriageyes,
                     "childAddress": $scope.newsecurityName,
                     "childName": $scope.marrChildName,
                     "childSex": $scope.issame,
                     "childYearAndMonth":$scope.marrchildrenDatas,
                     "isEnteredTheFamily":$scope.household
                 }
             ],
             "womanAddress": $scope.registeradds2,
             'womanMaritalStatus':$scope.oldsecurity2,
             'womanName':$scope.childUserName,
             'womanNowAddress':$scope.oldsecurityAddr,
             'womanWorkplace':$scope.workjob,
             'womanYearAndMonth':$scope.marrchildrenData
         }
        table = JSON.stringify(table);

        getHttp(table);
    }
    //养老证明填表11
    $scope.endowment = function(){
        if($rootScope.tableUrl == undefined||$rootScope.tableUrl == ''){
            /*var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: "请进行手写签名！",
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;*/
            if(browser.versions().android){
                window.jsObj.openSignActivity();
                return false;
            }
        }
        var table={
            "IDNumber": $scope.idCard,
            "username": sessionStorage.getItem('IdUsername'),
            'cause':$scope.textcontent,//原因
            "mobile": sessionStorage.getItem('mobile'),
            "signature":$rootScope.tableUrl
        }
        table = JSON.stringify(table);

        getHttp(table);
    }

    /*出具个人参保证明 (无表)*/
    $scope.submitUserProve = function () {
        getHttp();
    }

    //(现在的表 itemid-6)流动人口
    $scope.fertility = function () {
        if($scope.issame ==''){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: "请选择性别！",
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;
        }
        if($scope.marrchildrenData ==''){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: "请选择出生日期！",
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;
        }
        if($scope.marriage ==''){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: "请选择婚姻状况！",
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;
        }

        if(!($scope.marriage == '未婚')){
            if($scope.spouseUser ==''){
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: "请输入配偶姓名！",
                    okText:'确定'
                });
                alertPopup.then(function(res) {
                    return false;
                });
                return false;
            }
            if($scope.age == ''){
                var alertPopup = $ionicPopup.alert({
                 title: '提示',
                 template: "请输入配偶年龄！",
                 okText:'确定'
                 });
                 alertPopup.then(function(res) {
                 return false;
                 });
                 return false;
             }

            if($scope.marrData == ''){
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: "请选择结婚日期！",
                    okText:'确定'
                });
                alertPopup.then(function(res) {
                    return false;
                });
                return false;
            }
        }
        var table={
            "IDNumber": sessionStorage.getItem('IdCard'),
            "address": $scope.spouse,
            "child":[{
                "birthPlace":$scope.birthAddr,
                "birthday": $scope.marrchildrenDatas,
                "marriageCertificateNum": $scope.marrnumber,
                "name": $scope.childUserName,
                "sex":$scope.marriagepeple,
                "withinPolicyAbroad":$scope.marriageyes
            }],
            "employer": $scope.employer,
            "employerCall": $scope.employerPhone,
            "inflowTime": $scope.inflows,
            "isComeTogether": $scope.sameTo,
            "maritalStatus": $scope.marriage,
            "pregnancy": [
                {
                    "contraception": $scope.methods,
                    "contraceptiveDate": $scope.duecontrol,
                    "contraceptiveSite": $scope.outmmphAddr,
                    "operationSite": $scope.outAddr,
                    "operationTime": $scope.operation,
                    "policyInsideAndOutside": $scope.marriageyes,
                    "predicted": $scope.Duedata,
                    "pregnancyResults": $scope.dueResults,
                    "pregnancyTime": $scope.pregnancy
                }
            ],
            "rentalAddress":$scope.letOut,
            "rentalPhone": $scope.marrPhone,
            "sex":$scope.issame,
            "socialCompensationFee": $scope.oldsecurityAddr,
            "spouseAge": $scope.age,
            "spouseName": $scope.spouseUser,
            "username": $scope.user,
            "weddingTime": $scope.marrData,
            "workAddress": $scope.WorkName,
            "workTelephone": "",
            "yearAndMonth": $scope.marrchildrenData
        }
        table = JSON.stringify(table);
        getHttp(table);
    }

    /*社保转出*/
    $scope.socialOut = function () {
        if($scope.newprovides1 ==''&&$scope.newprovides2 ==''&&$scope.newprovides3 ==''){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: "必须至少选择一种保险！",
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;
        }
        if($scope.registerTypes ==''){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: "请选择户籍类型！",
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;
        }
        if($scope.oldsecurity ==''||$scope.oldsecurity ==undefined){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: "请选择原参保地经办机构！",
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;
        }
        var table={
            "IDNumber": sessionStorage.getItem('IdCard'),
            "medicalInsurance": $scope.newprovides1,
            "agedInsurance": $scope.newprovides2,
            "unemploymentInsurance":$scope.newprovides3,
            "contactAddress": $scope.securityAddress,
            "houseAddress": $scope.register,
            "houseType": $scope.registerTypes,
            "oldInstitutionsAddress": $scope.oldsecurityAddr,
            "oldInstitutionsCode": $scope.newsecurity,
            "oldInsuredInstitutionsName": $scope.oldsecurity,
            "oldInstitutionsPostalCode": $scope.oldsecurityPostcode,
            "nowInstitutionsAddress": $scope.newsecurityName,
            "postalCode1": $scope.postalCode,
            "postalCode2": $scope.contactCode,
            "processingMethod": $scope.outBack,
            "username": sessionStorage.getItem('IdUsername'),
            "mobile": sessionStorage.getItem('mobile'),
            "MMP":$scope.MMP
        }
        table = JSON.stringify(table);

        getHttp(table);
    }

    /*残疾人证明7*/
    $scope.handicapped = function () {
        if($scope.handicappeds ==''){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: "请选择残疾类别！",
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;
        }
        if($scope.handicappedClass ==''){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: "请选择残疾级别！",
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;
        }
        if($scope.marrData == ''){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: "请选择核发残疾人证日期！",
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;
        }
        var table={
            "IDNumber": sessionStorage.getItem('IdCard'),
            "address": $scope.securityAddress,
            'allowance':$scope.table.menony,
            "birthday": $getbirthday.getbirthday(),
            "dateOfIssue": $scope.marrData,
            "disabilityCertificateNum": $scope.cappedCode,
            "disabilityLevel": $scope.handicappeds,
            "disabilityType": $scope.handicappedClass,
            "family": [{
                "age": $scope.age,
                "health": $scope.health,
                "isSameAccount": $scope.issame,
                "monthlyIncome": $scope.monthmoney,
                "name": $scope.childUserName,
                "phone": $scope.marrPhone1,
                "relationship": $scope.relation,
                "work": $scope.workjob
            }],
            "sex":$scope.marriagepeple,
            "monthlyIncome": $scope.Workmoney,
            "mobile": $scope.marrPhone,
            "username": sessionStorage.getItem('IdUsername'),
            'workplace':$scope.table.WorkName
        }
        table = JSON.stringify(table);

        getHttp(table);
    }

    /*工伤保险长期待遇人员资格验证18*/
    $scope.Inductrial = function(){
        if($scope.marriagepeple ==''){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: "请选择性别！",
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;
        }
        if($scope.marrchildrenDatas ==''){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: "请选择出生日期！",
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;
        }
        if($scope.oldsecurity ==''||$scope.oldsecurity ==undefined){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: "请选择原参保地经办机构！",
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;
        }

        var table={
            "IDNumber": IDNumber,
            "username": userName,
            "mobile": $scope.marrPhone,
            "postalCode":$scope.contactCode,
            "nowAddress":$scope.securityAddress,
            "sex":$scope.marriagepeple,
            "yearAndMonth":$scope.marrchildrenDatas
        }
        table = JSON.stringify(table);

        getHttp(table);
    }

    /*独生子女父母光荣证*/ /* 9 */
    $scope.singleton = function (){
        if($scope.issame == ''){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '请选择性别！',
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;
        }
        var table={
            "childName": $scope.marrChildName,
            "childSex": $scope.issame,
            "childYearAndMonth": $scope.marrchildrenDatas,
            "manAddress": $scope.registeradds1,
            "manIDNumber": $scope.IDNumber1,
            "manNowAddress": $scope.securityAddress,
            "manPoliticalOutlook": $scope.methods,
            "manUsername": $scope.user,
            "manWorkplace": $scope.WorkName,
            "marriageCertificateNumber": $scope.cappedCode,
            "weddingTime": $scope.marrData,
            "womanAddress": $scope.registeradds2,
            "womanIDNumber": $scope.IDNumber2,
            "womanNowAddress": $scope.oldsecurityAddr,
            "womanPoliticalOutlook": $scope.handing,
            "womanUsername": $scope.childUserName,
            "womanWorkplace": $scope.workjob
        }
        table = JSON.stringify(table);

        getHttp(table);
    }

    /*独生子女父母光荣证*/ /* 19 */
    $scope.toBeLaidOff = function (){
        if($scope.items == ''){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '请选择课程！',
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;
        }
        var table={
            "id": $scope.items,
            "IDNumber": $scope.idCard,
            "username": sessionStorage.getItem('IdUsername')
        }
        table = JSON.stringify(table);
        getHttp(table);
    }

    //请求提交接口
    function getHttp(table){
        var date = new Date;
        var month = date.getMonth()+1;

        var json = {
            "bankOfAccounts": $scope.Openingbank,
            "bankAccount": $scope.bankAccount
        }
        json = JSON.stringify(json);
        //是否有结果物
        if($scope.isIncludeRe) {
            $scope.hasResult = true;
        }else{
            $scope.hasResult = false;
        }
        console.log($scope.hasResult)

        if($scope.newcheckbox1 == 0 && $scope.newcheckbox2 == 0 && $scope.newcheckbox3 == 0 && $scope.hasResult){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '必须至少选择一种结果物类型！',
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;
        }
        if(!($stateParams.itemId == 3)||!($stateParams.itemId == 21)){
            var src = [];
            var data_imgName = [];
            var data_type = [];
            var classCode = [];
            var data_mineType = [];
            var data_uploadtypes = [];
            angular.forEach(dom,function(elms){
                src.push(angular.element(elms).attr('data_imgUrls'));
                data_imgName.push(angular.element(elms).attr('data_imgName'));
                data_type.push(angular.element(elms).attr('data_type'));
                data_mineType.push(angular.element(elms).attr('data_mineType'));
                data_uploadtypes.push(angular.element(elms).attr('data_uploadtypes'));
                classCode.push(angular.element(elms).attr('classCode'));
            })
            for(var i=0 ;i<data_imgName.length;i++){
                if(data_imgName[i]== ''){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: "请上传所有证件照片！",
                        okText:'确定'
                    });
                    alertPopup.then(function(res) {
                        return false;
                    });
                    return false;
                }
            }
        }
        if($scope.mattersOrgLevel ==0 && $scope.Row1 ==''){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: "请选择受理机构！",
                okText:'确定'
            });
            alertPopup.then(function(res) {
                return false;
            });
            return false;
        }
        var alertPopup1 = $ionicPopup.confirm({
            title: '提示',
            template: '<span style="text-align: center;color:red;font-weight: bold">请核对确认信息真实准确后提交，否则申请人承担相应法律后果！</span>',
            okText:'确定',
            cancelText: "取消",
            cancelType: "button-default"
        });
        alertPopup1.then(function(res) {
            if (res) {
                $ionicLoading.show({
                    template: '<ion-spinner icon="android"></ion-spinner><div style="text-align: center">正在提交，请稍候...</div>'
                });
                if(!($stateParams.itemId == 3)){
                    $http({
                        method:'post',
                        url:init.url+'adminMatters!submitItemRecord',
                        data:{
                            "IDNumber":$scope.idCard,
                            'itemId':$stateParams.itemId,
                            "username":sessionStorage.getItem('IdUsername'),
                            "certificateNames":$scope.imgNamess,
                            'sex':$scope.sexs,
                            'birthday':$scope.birthDates,
                            'mobile':$scope.usermobile,
                            'phone':$scope.usermobile,
                            "residenceAddress":$scope.useraddress,
                            'liveAddress':$scope.useraddress,
                            'objId':$stateParams.objId,
                            'imgNames':data_imgName.join(','),
                            'classCode':classCode.join(','),
                            'certificateSampleImgUrl':src.join(','),
                            'imgTypes':data_type.join(','),
                            'mimeTypes':data_mineType.join(','),
                            'uploadTypes':data_uploadtypes.join(','),
                            'isERecordResult':$scope.newcheckbox1||'0', //电子
                            'isPaperResult':$scope.newcheckbox2||'0',  //纸质版
                            'isCertificateResult':$scope.newcheckbox3||'0',  //证件版
                            'recipients':$scope.recipients||userName,//收件人
                            'recipientsMobile':$scope.recipientsMobile||mobile,//收件人手机号码
                            'recipientsAddress':$scope.recipientsAddress,//收件人地址
                            'sceneId':$stateParams.sceneId,
                            'data' :table||'',
                            "attributionId":$scope.Row1||$scope.acceptOrgCode||'',

                            "certificateData":json||''
                        },
                        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                        transformRequest: function (data) {
                            return init.serializeData(data)
                        }
                    }).then(function successCallback(d) {
                        if(d.data.code == -1){
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: d.data.msg,
                                okText:'确定'
                            });
                            alertPopup.then(function(res) {
                                return false;
                            });
                            $ionicLoading.hide();
                        }
                        else{
                            $scope.submit = '系统正在提交您的资料，请稍候...';
                            $ionicLoading.hide();
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: d.data.msg,
                                okText:'确定'
                            });
                            alertPopup.then(function(res) {
                                $ionicLoading.show({
                                    template: '<ion-spinner icon="android"></ion-spinner>'
                                });
                                $state.go('publicService',{id:2},{reload:true});
                                //$scope.submit ='提交';
                                $ionicLoading.hide();
                            });
                        }
                    }, function errorCallback(response) {
                        $scope.showAlert = function() {
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: '网络连接失败，请稍后重试！'
                            });
                            alertPopup.then(function(res) {
                                console.log('Thank you for not eating my delicious ice cream cone');
                            });
                        };
                    });
                }else{
                    $http({
                        method:'post',
                        url:init.url+'adminMatters!submitItemRecord',
                        data:{
                            "IDNumber":$scope.idCard,
                            'itemId':$stateParams.itemId,
                            "username":sessionStorage.getItem('IdUsername'),
                            'sex':$scope.sexs,
                            'birthday':$scope.birthDates,
                            'mobile':sessionStorage.getItem('mobile'),
                            'phone':sessionStorage.getItem('mobile'),
                            "residenceAddress":$scope.useraddress,
                            'liveAddress':$scope.useraddress,
                            'objId':$stateParams.objId,
                            'isERecordResult':$scope.newcheckbox1||'0', //电子
                            'isPaperResult':$scope.newcheckbox2||'0',  //纸质版
                            'isCertificateResult':$scope.newcheckbox3||'0',  //证件版
                            'recipients':$scope.recipients||userName,//收件人
                            'recipientsMobile':$scope.recipientsMobile||mobile,//收件人手机号码
                            'recipientsAddress':$scope.recipientsAddress,//收件人地址
                            'sceneId':$stateParams.sceneId,
                            /*"bankOfAccounts": $scope.Openingbank||'',
                            "bankAccount": $scope.bankAccount||'',*/

                            "certificateData":json||'',

                            "attributionId":$scope.Row1||''
                        },
                        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                        transformRequest: function (data) {
                            return init.serializeData(data)
                        }
                    }).then(function successCallback(d) {
                        if(d.data.code == -1){
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: d.data.msg,
                                okText:'确定'
                            });
                            alertPopup.then(function(res) {
                                return false;
                            });
                            $ionicLoading.hide();
                        }
                        else{
                            $scope.submit = '系统正在提交您的资料，请稍候...';
                            $ionicLoading.hide();
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: d.data.msg,
                                okText:'确定'
                            });
                            alertPopup.then(function(res) {
                                $ionicLoading.show({
                                    template: '<ion-spinner icon="android"></ion-spinner>'
                                });
                                $state.go('publicService',{id:2},{reload:true});
                                //$scope.submit ='提交';
                                $ionicLoading.hide();
                            });
                        }
                    }, function errorCallback(response) {
                        $scope.showAlert = function() {
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: '网络连接失败，请稍后重试！'
                            });
                            alertPopup.then(function(res) {
                                console.log('Thank you for not eating my delicious ice cream cone');
                            });
                        };
                    });
                }
            } else {
                console.log('You are not sure');
            }
        });


    }

}])
//1跳
app.controller('objClass',['$scope','$stateParams','$http','$state','init',function($scope,$stateParams,$http,$state,init){

	$scope.d={
		radios:''
	}
    $scope.$watch('d.radios',function(newValue,oldValue){
        $scope.newObjid = $scope.d.radios;
    })
	$http.
		get(init.url+'adminMatters!getSceneListByItemId?itemId='+$stateParams.itemId)
		.success(function(d){
			$scope.list = d.data;
		})
		.error(function(err){
			console.log(err);
		})

		$scope.jump =function(){
			$state.go('onLineManage',{isIncludeScene:1,itemId:$stateParams.itemId,sceneId:$scope.d.radios,itemName:$stateParams.itemName,affairId:$stateParams.affairId,objId:$scope.newObjid,isIncludeResult:$stateParams.isIncludeResult},{reload:true});
		}

}])

//列表指南的详情
app.controller('applyDetail', function ($scope, Tab1Service,$ionicSlideBoxDelegate, $ionicTabsDelegate,$stateParams,$http,$state,$timeout,init,$ionicLoading,$rootScope) {
    $scope.isclick = true;
    $scope.isSelect = true;

    $http.get(init.url + 'adminMatters!getAdminMattersById?id=' + $stateParams.id)
        .success(function (d) {
            var d = d.data;
            $scope.acceptanceConditions = d.acceptanceConditions;
            $scope.acceptedAddress = d.acceptedAddress;
            $scope.applyMaterial = d.applyMaterial;
            $scope.consultingInquiry = d.consultingInquiry;
            $scope.departmentId = d.departmentId;
            $scope.feeBasis = d.feeBasis;
            $scope.feeScale = d.feeScale;
            $scope.handleMode = d.handleMode;
            $scope.policyBasis = d.policyBasis;
            $scope.procedure = d.procedure;
            $scope.specialExplanation = d.specialExplanation;
            $scope.timeLimit = d.timeLimit;
            $scope.itemName = d.itemName;
            $scope.isIncludeScene = d.isIncludeScene;
            $scope.itemId = d.id;
            $scope.affairId = d.affairId;
            $scope.objId = d.objId;
            $scope.isIncludeResult = d.isIncludeResult;
        })
        .error(function (d) {
            console.warn(d);
        });

            $scope.ishow = true;
            //$scope.isheight = true;
            $scope.showAll = '查看完整版';
            $scope.downUp = function(){
                window.scroll(0,0);
                $scope.ishow =! $scope.ishow;

                if($scope.ishow){
                    $scope.showAll = '查看完整版';
                    //$scope.isheight= ! $scope.isheight;
                }else{
                    $scope.showAll = '返回简版';
                    //$scope.isheight = !$scope.isheight;
                }
            }

            $scope.jump = function(){
                var Service=(sessionStorage.getItem("Service"))||'';
                $rootScope.detailId = $scope.itemId;

                if((browser.versions().android&&(!Service))){
                    if(!$scope.isclick&&(!$scope.isSelect)){
                        $ionicLoading.show({
                            template: '操作太频繁了，请稍等！'
                        });
                        $timeout(function(){
                            $ionicLoading.hide();
                        },2000)
                    }
                    if(browser.versions().android&&$scope.isSelect){
                        $scope.isclick = false;
                        window.jsObj.thirdOpenLogin();
                        $scope.isSelect = false;
                    }
                    $timeout(function(){
                        $scope.isSelect = true;
                    },4000)
                }else{
                    if($scope.isIncludeScene ==0){ //跳到上传
                        $state.go('onLineManage',{isIncludeScene:0,itemId:$scope.itemId,itemName:$scope.itemName,affairId:$scope.affairId,objId:$scope.objId,isIncludeResult:$scope.isIncludeResult},{reload:true});
                    }
                    if($scope.isIncludeScene ==1){
                        $state.go('objClass',{itemId:$scope.itemId,itemName:$scope.itemName,affairId:$scope.affairId,objId:$scope.objId,isIncludeResult:$scope.isIncludeResult});
                    }
                }
            }

})

//事项列表
app.controller('publicServiceCtrl',['$scope','$http','$stateParams','$state','init','$rootScope','$timeout','$ionicLoading','$ionicPopup',
    function($scope,$http,$stateParams,$state,init,$rootScope,$timeout,$ionicLoading,$ionicPopup) {
        $scope.isclick = true;
        $scope.isSelect = true;

        if(browser.versions().android){
            $scope.openUrls = function(url){
                window.jsObj.openTaxUrl(url);
            }
        }

        $http
            .get(init.url+'adminMatters!getBusiAdminMattersList?page=1&rows=20')
            .success(function (data) {
                $scope.lists=data.data.list;
                $scope.load = true;

            }).error(function(err){
                console.warn(err);
            })

        /*直接跳到申请页面*/
        $scope.jumpDetail = function(id,isIncludeResult){
            var Service=(sessionStorage.getItem("Service"))||'';
            $rootScope.detailId = id;
            if((browser.versions().android&&(!Service))){
                if(!$scope.isclick&&(!$scope.isSelect)){
                    $ionicLoading.show({
                        template: '操作太频繁了，请稍等！'
                    });
                    $timeout(function(){
                        $ionicLoading.hide();
                    },2000)
                }
                if(browser.versions().android&&$scope.isSelect){
                    $scope.isclick = false;
                    window.jsObj.thirdOpenLogin();
                    $scope.isSelect = false;
                }
                $timeout(function(){
                    $scope.isSelect = true;
                },4000)
            }else{
                //认证成功直接跳
                $http.
                    get(init.url+'adminMatters!getAdminMattersById?id='+id)
                    .success(function(d){
                        var d = d.data;
                        var date = new Date;
                        var month = date.getMonth()+1;

                        $scope.itemName = d.itemName;
                        $scope.isIncludeScene = d.isIncludeScene;
                        $scope.itemId =d.id;
                        $scope.affairId =d.AFFAIRID;
                        $scope.objId = d.objId;

                        if($scope.itemId == 2){
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
                        if ($scope.itemId == 18){
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
                        if($scope.isIncludeScene ==0){ //跳到上传
                            $state.go('onLineManage',{isIncludeScene:0,itemId:$scope.itemId,itemName:$scope.itemName,affairId:$scope.affairId,objId:$scope.objId,isIncludeResult:isIncludeResult},{reload:true});
                        }
                        if($scope.isIncludeScene ==1){
                            $state.go('objClass',{itemId:$scope.itemId,itemName:$scope.itemName,affairId:$scope.affairId,objId:$scope.objId,isIncludeResult:isIncludeResult},{reload:true});
                        }
                    })
                    .error(function(d){
                        console.warn(d);
                    })
            }
           // sessionStorage.setItem("isService",'yes');
        }


    }
])

//搜索
app.controller('searchCtrl',['$scope','$http','init','$state',function($scope , $http,init,$state){
    $scope.obj={
        isDisable:'',
        num :false
    }
    $scope.goBacks = function(){
        $state.go('publicService',{id:2});
    }
    $scope.$watch('obj.isDisable',function(){
        $scope.strge=$scope.obj.isDisable;
        if($scope.strge != ''){
            getData();
        }
    })
    $scope.jump = function(){
         getData();
    }
    function getData(){
        $http
            .get(init.url+'adminMatters!getBusiAdminMattersList?page=1&rows=20&itemName='+$scope.strge)
            .success(function (data) {
                $scope.lists=data.data.list;
                if(data.data.list.length ==0){
                    $scope.isList = true;
                    $scope.SearchContent = $scope.strge;
                    $scope.obj.num = false;

                    $scope.myObj = {
                        "background-color" : "#fff"
                    }
                }else{
                    $scope.obj.num = true;
                    $scope.isList = false;
                    $scope.numbers = data.data.list.length;

                    $scope.myObj = {
                        "background-color" : "#cacaca"
                    }
                }
                console.table(data.data.list);
            }).error(function(err){
                console.warn(err);
            })
    }
}])

app.controller('serviceCtrl', function ($scope, Tab1Service,  $ionicSlideBoxDelegate, $ionicTabsDelegate,init) {
        var items = Tab1Service.getClassify()
        $scope.slides = items;
        $scope.tabs = items;

        var slideIndex = 0;

        $scope.slideChanged = function (index) {
            $ionicTabsDelegate.select(index);
        };
        $scope.$on('$ionicView.afterEnter', function () {
            $ionicTabsDelegate._instances[1].select($ionicSlideBoxDelegate.currentIndex());

        });
        $scope.selectedTab = function (index) {
            //滑动的索引和速度
            $ionicSlideBoxDelegate.slide(index)
        }
})
//我的事项
app.controller('myManage',['$scope','$http','$ionicLoading','init','$timeout',function($scope,$http,$ionicLoading,init,$timeout){
    var IDNumber = sessionStorage.getItem('IdCard')||'440602197901010337';
    //var IDNumber = '440923199312251957';
    //var IDNumber = '440602197901010337';

    $scope.iShow='tab1';

    $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner>'
    });

    getAjax(0);
    getAjax(1);
    getAjax(2);
    function getAjax(num){
        $http.get(init.url+'adminMatters!getMyItemRecordList?IDNumber='+IDNumber+'&status='+num+'&page=1'+'&rows=10')
            .success(function(d){
                if(num ==0){
                    $scope.list0=d.data.list;
                    $scope.status0 = d.data.totalNum
                }
                else if(num ==1){
                    $scope.list1=d.data.list;
                    $scope.status1 = d.data.totalNum
                }
                else{
                    $scope.list2=d.data.list;
                    $scope.status2 = d.data.totalNum
                }

                $ionicLoading.hide();
            })
            .error(function(d){
                console.warn(d);
            })
    }
    //下拉刷新
    $scope.param = {
        upCurpage:1,
        downCurpage1:1,
        hasmove1:true,
        isMove1:false,

        downCurpage2:1,
        hasmove2:true,
        isMove2:false,

        downCurpage3:1,
        hasmove3:true,
        isMove3:false
    };

    $scope.doRefresh = function(num){
        $scope.param.downCurpage = 1;
        if(num ==0){
            $scope.param.hasmove1 = true;
            $scope.isMove1 = false;
            $scope.param.downCurpage1 = 3;
        }
        else if(num == 1){
            $scope.param.hasmove2 = true;
            $scope.isMove2 = false;
            $scope.param.downCurpage2 = 3;
        }else{
            $scope.param.hasmove3 = true;
            $scope.isMove3 = false;
            $scope.param.downCurpage3 = 3;
        }

        $http.get(init.url+'adminMatters!getMyItemRecordList?IDNumber='+IDNumber+'&status='+num+'&page='+$scope.param.upCurpage+'&rows=10')
            .success(function(d){
                if(num ==0){
                    $scope.list0=d.data.list;
                }
                else if(num ==1){
                    $scope.list1=d.data.list;
                }
                else{
                    $scope.list2=d.data.list;

                }
                $scope.$broadcast('scroll.refreshComplete');
            })
            .error(function(d){
                console.warn(d);
            })
    }
    //上拉加载更多
    $scope.loadMore = function(num) {
        $timeout(function(){
            if (!$scope.param.hasmove1&&num ==0) {
                $scope.$broadcast('scroll.infiniteScrollComplete');
                return;
            }
            if (!$scope.param.hasmove2&&num ==1) {
                $scope.$broadcast('scroll.infiniteScrollComplete');
                return;
            }
            if (!$scope.param.hasmove3&&num ==2) {
                $scope.$broadcast('scroll.infiniteScrollComplete');
                return;
            }
            if(num ==0){
                $http.get(init.url+'adminMatters!getMyItemRecordList?IDNumber='+IDNumber+'&status='+num+'&page='+$scope.param.downCurpage1+'&rows=5')
                    .success(function(d){
                        if(d.data.list.length ==0){
                            $scope.isMove1 = true;
                            $scope.param.hasmove1 = false;
                        }
                        angular.forEach(d.data.list,function(item){
                            $scope.list0.push(item);
                        })
                        console.log($scope.param.downCurpage1);

                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $scope.param.downCurpage1++;//下一页
                    })
                    .error(function(d){
                        console.warn(d);
                    })
            }
            else if(num == 1){
                $http.get(init.url+'adminMatters!getMyItemRecordList?IDNumber='+IDNumber+'&status='+num+'&page='+$scope.param.downCurpage2+'&rows=5')
                    .success(function(d){
                        if(d.data.list.length ==0){
                            $scope.isMove2 = true;
                            $scope.param.hasmove2 = false;
                        }
                        angular.forEach(d.data.list,function(item){
                            $scope.list1.push(item);
                        })
                        console.log($scope.param.downCurpage2);

                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $scope.param.downCurpage2++;//下一页
                    })
                    .error(function(d){
                        console.warn(d);
                    })
            }else{
                $http.get(init.url+'adminMatters!getMyItemRecordList?IDNumber='+IDNumber+'&status='+num+'&page='+$scope.param.downCurpage3+'&rows=5')
                    .success(function(d){
                        if(d.data.list.length ==0){
                            $scope.isMove3 = true;
                            $scope.param.hasmove3 = false;
                        }
                        angular.forEach(d.data.list,function(item){
                            $scope.list2.push(item);
                        })
                        console.log($scope.param.downCurpage3);

                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $scope.param.downCurpage3++;//下一页
                    })
                    .error(function(d){
                        console.warn(d);
                    })
            }
        },1500);
    };

    $scope.moreDataCanBeLoaded1 = function(){
        return $scope.param.hasmove1;
    }
    $scope.moreDataCanBeLoaded2 = function(){
        return $scope.param.hasmove2;
    }
    $scope.moreDataCanBeLoaded3 = function(){
        return $scope.param.hasmove3;
    }

}])

//我的事项详情
app.controller('myManageDetail',['$scope','$http','$stateParams','$state','$ionicLoading','init',function($scope,$http,$stateParams,$state,$ionicLoading,init){
    var ids=$stateParams.id;
    //var phone =18602006444;
    $scope.imgsPrefix = init.imgsUrl;
    $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner>'
    });
    //展开全部、隐藏
    $scope.showall = '显示全部 ';
    $scope.isdowns = true;
    $scope.rootDownUp = function(){
        $scope.isdowns =!$scope.isdowns;
        if(!$scope.isdowns){
            $scope.thisHeights={'height':'inherit'}
            $scope.showall = '收起'
            $timeout(function(){
                window.scroll(0,0);
            },1000)
        }else{
            $scope.thisHeights={'height':'250px'}
            $scope.showall = '显示全部 '
        }
    }
    $http.get(init.url+'adminMatters!getItemRecordById?id='+ids)
        .success(function(d){
            $scope.mobile = d.data.mobile;
            $scope.idCard = d.data.iDNumber;
            $scope.itemName = d.data.itemName;
            $scope.statusDesc = d.data.statusDesc;
            $scope.status = d.data.status;
            $scope.feedbackTime = d.data.feedbackTime;
            $scope.mailNum = d.data.mailNum;
            $scope.records =d.data.records;
            $scope.affairId = d.data.affairId;
            $scope.objId = d.data.objId;

            if(d.data.feedbackTime == undefined||''){
                $scope.isfeedbackTime = false;
            }

            $scope.submitTime = d.data.submitTime;

            $scope.list = d.data.list;

            $scope.eRecordResultUrl = d.data.eRecordResultUrl;

            $scope.remark = d.data.remark;


            $scope.itemId = d.data.itemId;

            $scope.sceneId = d.data.sceneId;

            if(d.data.mailNum){
                //物流
                $http.get(init.url+'ems!getByMailCode?mailCode='+d.data.mailNum)
                    .success(function(d){
                        if(d.data[0].steps){
                            $scope.datas=d.data[0].steps;
                        }

                        $ionicLoading.hide();
                    })
                    .error(function(d){
                        console.warn(d);
                    })
            }

            $ionicLoading.hide();
        })
        .error(function(d){
            console.warn(d);
        })

	/*$scope.back = function(){
		$state.go("myManage",{id:2},{reload:true});
	}*/
    //打开pdf
    if(browser.versions().android){
        $scope.openPdfUrl = function(url) {
            //window.jsObj.openPdfFile('http://59.39.58.226:8080'+url);
            window.jsObj.thirdOpenPdfFile('http://59.39.58.226:8080'+url);
        }
    }

    //重新提交
    /*直接跳到申请页面*/
    $scope.detailJumpDetail = function(){
        /*$http.
            get(init.url+'adminMatters!getAdminMattersById?id='+id)
            .success(function(d){
                var d = d.data;*/
                //$scope.itemName = d.itemName;
                //d.sceneId !=undefined? $scope.sceneId = d.sceneId: $scope.sceneId='';

                /*$scope.isIncludeScene = d.isIncludeScene;
                $scope.itemId =d.id;
                $scope.affairId =d.AFFAIRID;
                $scope.objId = d.objId;*/
                //if(isIncludeResult =='') { //跳到上传
                $state.go('onLineManage',{isIncludeScene:0,itemId:$scope.itemId,itemName:$scope.itemName,sceneId:$scope.sceneId,affairId:$scope.affairId,objId:$scope.objId,isIncludeResult:$scope.sceneId,status:$scope.status,listId:ids},{reload:true});
                //
                /*}else {
                    $state.go('objClass',{itemId:$scope.itemId,itemName:$scope.itemName,affairId:$scope.affairId,objId:$scope.objId,isIncludeResult:isIncludeResult,status:$scope.status,listId:ids},{reload:true});
                }*/
            /*})
            .error(function(d){
                console.warn(d);
            })*/
    }
}])

//个人数字资产
app.controller('self_numberCtrl',['$scope','$http','$ionicLoading','init',function($scope,$http,$ionicLoading,init){
    //初始化
}])

//个人数字资产二级分类
app.controller('self_numberClassCtrl',['$scope','$http','$stateParams','init','$state','$ionicLoading',function($scope,$http,$stateParams,init,$state,$ionicLoading){
    var ClassCode = $stateParams.ClassCode;
    if(ClassCode ==002){
        $scope.materials=false;
        $scope.title='结果物'
    }else{
        $scope.title='材料';
        $scope.materials=true;
    }
    /*$ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner>'
    });
    $http.get(init.url+'materialClass!getMaterialList?clazz='+ClassCode)
        .success(function(d){
            $scope.list = d.data;
            $ionicLoading.hide();
        })
        .error(function(d){
            console.warn(d);
        })*/
    $scope.getClassName = function(className,classCode){
        $state.go("self_numberClassDetail",{classCode:classCode,className:$scope.title+'('+className+')'},{reload:true});
    }
}])
//个人数字资产三级分类

app.controller('self_numberClassDetail',['$scope','$http','$stateParams','init','$state','$ionicLoading',function($scope,$http,$stateParams,init,$state,$ionicLoading){

    $scope.title = $stateParams.className;
    var numberID = sessionStorage.getItem('IdCard');
    //var numberID = '441702199404151716';
    $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner>'
    });
    $http.get(init.url+'materialClass!getListByCode?clazz='+$stateParams.classCode+'&IDNumber='+numberID)
        .success(function(d){
            $scope.lists = d.data;
            $ionicLoading.hide();

            if(d.data.length ==0){
                $scope.isList = true;
                $scope.myObj = {
                    "background-color" : "#fff"
                }
                $scope.SearchContent = $stateParams.className;
            }
        })
        .error(function(d){
            console.warn(d);
        })
    //点击放大图片
    $scope.getIDIMG = function(img,name,data){
        $scope.showImg = true;
        $scope.bigSRC = img;
        $scope.lfName = name;
        $scope.rtdata = data;
    }
    $scope.hideImg = function(){
        $scope.showImg = false;
    }
}])
//上传头像
app.controller('myfile',['$scope','$http','Upload','$ionicLoading','$timeout','$ionicPopup','init',function($scope,$http,Upload,$ionicLoading,$timeout,$ionicPopup,init){

    var headerImage =document.getElementsByClassName('rt')[0];

    $scope.uploadFiles = function(files,errFiles,inde){
        $scope.files = files;
        $scope.errFiles = errFiles;
        function test(){
            if(files[0].size == 0){
                $ionicLoading.show({
                    template: '图片上传中，请稍候...'
                });
                $timeout(function(){
                    if(files[0].size != 0){
                        $ionicLoading.hide();
                        delay();
                    }else{
                        test();
                    }
                },1000)
            }
            else{
                delay();
            }
        }
        test();
        function delay(){
            angular.forEach(files, function(file) {
                if(files[0].size){
                    $ionicLoading.show({
                        template: '图片上传中，请稍候...'
                    });

                    Upload.upload({
                        //服务端接收
                        url: init.url+'upload!fileUpload',
                        //上传的同时带的参数
                        data: {'myfile': file}

                    }).success(function (data, status, headers, config) {
                        //上传成功
                        $timeout(function () {
                            $ionicLoading.hide();
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: '上传成功！',
                                okText:'确定'
                            });
                            alertPopup.then(function(res) {
                                return false;
                            });
                        });

                        headerImage.src = data.imgUrl;
                        $scope.newUrl = data.imgUrl;

                        getNewHeader();
                    }).error(function (data, status, headers, config) {
                        //上传失败
                        console.log('error status: ' + status);
                        //alert('请选择小于9M的图片！');
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '请选择小于9M的图片！',
                            okText:'确定'
                        });
                        alertPopup.then(function(res) {
                            return false;
                        });
                        $ionicLoading.hide();
                    });

                }

            });
        }
        //修改头像
        function getNewHeader(){
            $http.
                get(init.url+'citizenInfo!headImgUpload?headImgUrl='+$scope.newUrl)
                .success(function(d){
                    console.log(d);
                })
                .error(function(d){
                    console.log(d);
                })
        }

    };
}])

app.controller('userAgreementCtrl',['$scope','$timeout','$state','init','$ionicLoading',function($scope,$timeout,$state,init,$ionicLoading){
    //展开全部、隐藏
    $ionicLoading.hide();
    $scope.isdowns = true;
    $scope.showall = '显示全部';
    $scope.rootDownUp = function(){
        $scope.isdowns =!$scope.isdowns;
        if(!$scope.isdowns){
            $scope.thisHeights={'height':'inherit'}
            $scope.showall = '收起'
            $timeout(function(){
                window.scroll(0,0);
            },1000)
        }else{
            $scope.thisHeights={'height':'465px'}
            $scope.showall = '显示全部'
        }
    }
    $scope.rootjump = function(){
        /*if(sessionStorage.getItem("isMyself")){
            $state.go('self');
        }
        if(sessionStorage.getItem("isService")){
            $state.go('publicService',{id:2})
        }*/
        $state.go('index');
    }
}])

//在线咨询
app.controller('OnlineCtrl',['$scope','$stateParams','getPhoneUserName','$sce','$ionicHistory','$ionicPopup',function($scope,$stateParams,getPhoneUserName,$sce,$ionicHistory,$ionicPopup){
    $scope.specialHtml = $sce.trustAs($sce.RESOURCE_URL,"http://59.39.58.185:8181/kf/vclient/chat/?websiteid=125&nickname="+getPhoneUserName.phone+"&telephone="+getPhoneUserName.userName);

    $scope.back = function(){
        var alertPopup = $ionicPopup.confirm({
            title: '提示',
            template: '<span style="text-align: center">确定要离开该页面吗？返回后聊天连接断开，历史消息会丢失！</span>',
            okText:'确定',
            cancelText: "取消",
            cancelType: "button-default"
        });
        alertPopup.then(function(res) {
            if (res) {
                $ionicHistory.goBack();
            } else {
                console.log('You are not sure');
            }
        });

    }
}])

app.controller('volunteers',['$scope','$sce',function($scope,$sce){
    $scope.specialHtml = $sce.trustAs($sce.RESOURCE_URL,"http://wxcs.gdzyz.cn/citiesService.do?cityid=440000");
}])
