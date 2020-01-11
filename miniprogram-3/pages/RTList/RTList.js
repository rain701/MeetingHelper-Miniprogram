var app=getApp();
var util = require('../../utils/util.js');
Page({
  data:{
    reserveTime:[],
    count:0
  },
  onLoad: function(options){
    var timeoutList=[];
    var timeList=[];
    console.log(options);
    var date = parseInt(options.date);
   // var date=0;
    var room_id = parseInt(app.globalData.selectMR_id);
    var thispage=this;
    var thisApp = app;
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    var count=-1;
    this.setData({
      winHeight: winHeight,
    });
    
    if(date!=0){
      var temp={};
      temp.date = util.totime(date * 1000);;
      temp.time=[];
      timeList.push(temp);
      console.log(room_id+ '   ' +date);
      console.log(thisApp.globalData.url + 'query_time');
      wx.request({
        url: thisApp.globalData.url+'query_time',
        method:"POST",
        data:{
          'room_id':room_id,
          'date':date
        },
        success(res){
          console.log(res.data);
          timeoutList=res.data.intervals;
          for(var i=0;i<timeoutList.length;++i){
            var time1=new Date(timeoutList[i].sttime*1000);
            var time2=new Date(timeoutList[i].edtime*1000);
            var stime = (time1.getHours() < 10 ? ('0' + time1.getHours()) : (time1.getHours())) + ':' + (time1.getMinutes() < 10 ? ('0' + time1.getMinutes()) : time1.getMinutes());
            var etime = (time2.getHours() < 10 ? ('0' + time2.getHours()) : (time2.getHours())) + ':' + (time2.getMinutes() < 10 ? ('0' + time2.getMinutes()) : time2.getMinutes());
            var obj={};
            obj.stime=stime;
            obj.etime=etime;
            timeList[0].time.push(obj);
          }
          if(timeList.length>0)
          console.log(timeList[0].time);
          thisApp.globalData.rtList = timeoutList;
          thispage.setData({
              reserveTime:timeList
          });
          console.log(thispage.data.reserveTime);
        }
      })
    }
    else {
      var start = 
        new Date(new Date().toLocaleDateString()).getTime();
      date=start/1000;
      console.log(date);
     for(var k=0;k<3;++k){
       var temp = {};
       var val = start + k * 24 * 60 * 60 * 1000;
       temp.date = util.totime(val);
       temp.time = [];
       timeList.push(temp);
     }
     console.log(timeList);
      for(var i=0;i<3;++i){
      
        wx.request({
          url: 'http://111.229.177.16:8080/query_time',
          method: "POST",
          data: {
            'room_id': room_id,
            'date': date+i*24*60*60
          },
          success(res) {
            console.log(res.data);
            console.log(i);
            count=count+1;
            timeoutList = res.data.intervals;
            for (var j = 0; j < timeoutList.length; ++j) {
              var time1 = new Date(timeoutList[j].sttime*1000);
              var time2 = new Date(timeoutList[j].edtime*1000);
              var stime = (time1.getHours() < 10? ('0' + time1.getHours()) : (time1.getHours())) + ':' + (time1.getMinutes() < 10 ? ('0' + time1.getMinutes()): time1.getMinutes());
              var etime = (time2.getHours() < 10 ? ('0' + time2.getHours()) : (time2.getHours())) + ':' + (time2.getMinutes() < 10 ? ('0' + time2.getMinutes()) : time2.getMinutes());
              var obj={};
              obj.stime = stime;
              obj.etime = etime;
              timeList[count].time.push(obj);
            }
            if(i==3){
              thispage.setData({
              reserveTime: timeList
              });
            }
            //console.log(thispage.data.reserveTime);
          }
        })
      }
    }
  }
})