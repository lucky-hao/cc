/**
 * Created by 浩哥 on 2017/6/15.
 */
var app = angular.module('myApp', ['ionic','ngFileUpload','ngCordova','ionic-datepicker']);

app.factory('FinancList',function(){
    var param = {
        curpage:1,
        hasmove:false
    };
})

//对标签进行转义
app.filter('ntobr', function(){
    var filter = function(input){
        return input.replace(/\n/g,"<\/br>").replace(/ /g,"&nbsp;");
    };
    return filter;
});
//公用的方法属性
app.factory('init', function () {
    //初始化数据
    var init={
        url:'http://59.39.58.226:8080/ccq/',
        //url:'http://liboweixin.toumaps.com/ccq/',
        //imgsUrl:'http://liboweixin.toumaps.com/',
        sessionSetter: function(key, data) {
            if (data && typeof data == 'object') {
                data = JSON.stringify(data);
            }
            sessionStorage.setItem(key, data);
        },
        sessionGetter: function(key) {
            var data = sessionStorage.getItem(key);
            try {
                data = JSON.parse(data);
                return data;
            } catch (error) {
                console.log(error);
                return data;
            }
        },
        getTime : function(){
            //获取日期、时间、星期
            //var timer = null;
            //divText = document.getElementById("clock");
            //showTime();
            //timer = setInterval(showTime,1000);//绑定计时器。一秒钟调用一次函数，动态刷新时间
            //function showTime(){
                var today = new Date(); //新建一个Date对象
                var date = today.getDate();//查询当月日期
                var day = today.getDay();//查询当前星期几
                var month = today.getMonth()+1;//查询月份
                var year = today.getFullYear();//查询年份
                var hour=today.getHours();
                var min = today.getMinutes();
                var sec = today.getSeconds();
                if(date<10){date="0"+date};
                if(month<10){month="0"+month};
                if(year<10){year="0"+year};
                var week="";
                if (day==0) week='周日';
                if (day==1) week='周一';
                if (day==2) week='周二';
                if (day==3) week='周三';
                if (day==4) week='周四';
                if (day==5) week='周五';
                if (day==6) week='周六';
                return  month+"月"+date+'日'+' '+week;
           // }
        },
        localSetter: function(key, data) {
            if (data && typeof data == 'object') {
                data = JSON.stringify(data);
            }
            localStorage.setItem(key, data);
        },
        localGetter: function(key) {
            var data = localStorage.getItem(key);
            try {
                data = JSON.parse(data);
                return data;
            } catch (error) {
                console.log(error);
                return data;
            }
        },
        //序列化对象或者数组，返回字符串------适用于ng
        serializeData :function( data ) {
            // If this is not an object, defer to native stringification.
            if ( ! angular.isObject( data ) ) {
                return( ( data == null ) ? "" : data.toString() );
            }
            var buffer = [];
            // Serialize each key in the object.
            for ( var name in data ) {
                if ( ! data.hasOwnProperty( name ) ) {
                    continue;
                }
                var value = data[ name ];
                buffer.push(
                    encodeURIComponent( name ) + "=" + encodeURIComponent( ( value == null ) ? "" : value )
                );
            }
            // Serialize the buffer and clean it up for transportation.
            var source = buffer.join( "&" ).replace( /%20/g, "+" );
            return( source );
        }
    }
    return init;
})

//获取用户电话和姓名
app.factory('getPhoneUserName',function(){
    return {
        userName:sessionStorage.getItem('IdUsername'),
        phone:sessionStorage.getItem('mobile')
    }
})

//获取身份证得年月日
app.factory('$getbirthday',function (){
    var obj = {
        idNumber:sessionStorage.getItem('IdCard')||'440602197901010337',
        getbirthday: function(){
            var yesr = this.idNumber.substring(6,10);
            var months = this.idNumber.substring(10,12);
            var days = this.idNumber.substring(12,14);
            return yesr+'-'+months+'-'+days;
        },
        getGender : function (){
            if((this.idNumber.substring(this.idNumber.length-2,this.idNumber.length-1) % 2) ==0){
                return '女'
            }else{
                return '男'
            }
        }
    }
    return obj;
})

//创建服务
app.service('Tab1Service', function ($http) {
    this.getClassify = function () {
        return [
            { name: '消息', viewable: true, url: 'http://www.baidu.com', page: 1, rows: 20 },
            { name: '新闻', viewable: false, url:'http://www.baidu.com', page: 1, rows: 20 },
            { name: '公告', viewable: false, url:'http://www.baidu.com', page: 1, rows: 20 },
            { name: '专题', viewable: false, url:'http://www.baidu.com', page: 1, rows: 20 }
        ]
    }
    this.getList = function (url, page, rows) {
        return $http.post(url, { page: page, rows: rows })
    }
});

//自定义指令
app.directive('dataSelect',function(){
    return {
        restrict:'A',
        link: function(dom,container){
            alert(123);
            new DateSelector({
                input: dom,//点击触发插件的input框的id
                container: container,//插件插入的容器id
                type: 1,
                //0：不需要tab切换，自定义滑动内容，建议小于三个；
                //1：需要tab切换，【年月日】【时分】完全展示，固定死，可设置开始年份和结束年份
                param: [1, 1, 1, 1, 1],
                //设置['year','month','day','hour','minute'],1为需要，0为不需要,需要连续的1
                beginTime: [2017, 5, 7, 1, 1],//如空数组默认设置成1970年1月1日0时0分开始，如需要设置开始时间点，数组的值对应param参数的对应值。
                endTime: [2027, 5, 7, 12, 2],//如空数组默认设置成次年12月31日23时59分结束，如需要设置结束时间点，数组的值对应param参数的对应值。
                recentTime: [2017, 5, 9, 2, 2],//如不需要设置当前时间，被为空数组，如需要设置的开始的时间点，数组的值对应param参数的对应值。
                success: function (arr, arr2) {
                    alert('打开控制台查看结果');
                    console.log(arr, '--- 数字结果');
                    console.log(arr2, '--- 字符串结果');
                }//回调
            })
        }
    }
})
