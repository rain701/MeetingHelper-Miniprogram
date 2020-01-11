var app=getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meetingRecords:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user = parseInt(app.globalData.user_id);
    var meetings=[];
    var record=[];
    var thispage=this;
    var thisapp=app;
    console.log(app.globalData.url);
    wx.request({
      url: 'http://111.229.177.16:8080/' +'meeting/'+user,
      method:'GET',
      success(res){
        console.log(res.data);
        meetings=res.data.meetings;
        for(var i=0;i<meetings.length;++i){
          var temp={};
          var time1=new Date(meetings[i].sttime*1000);
          var time2 = new Date(meetings[i].edtime * 1000);;
          temp.id=meetings[i].id;
          temp.topic=meetings[i].topic;
          temp.date = util.totime(meetings[i].sttime * 1000);
          temp.stime = (time1.getHours() < 10 ? ('0' + time1.getHours()) : (time1.getHours())) + ':' + (time1.getMinutes() < 10 ? ('0' + time1.getMinutes()) : time1.getMinutes());
          temp.etime = (time2.getHours() < 10 ? ('0' + time2.getHours()) : (time2.getHours())) + ':' + (time2.getMinutes() < 10 ? ('0' + time2.getMinutes()) : time2.getMinutes());
          temp.room_name=meetings[i].room_name;
          temp.loc=meetings[i].room_location;
          temp.desc=meetings[i].room_desc;
          record.push(temp);
        }
        thispage.setData({
          meetingRecords:record,
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var user = parseInt(app.globalData.user_id);
    var meetings = [];
    var record = [];
    var thispage = this;
    var thisapp = app;
    console.log(app.globalData.url);
    wx.request({
      url: 'http://111.229.177.16:8080/' + 'meeting/' + user,
      method: 'GET',
      success(res) {
        console.log(res.data);
        meetings = res.data.meetings;
        for (var i = 0; i < meetings.length; ++i) {
          var temp = {};
          var time1 = new Date(meetings[i].sttime * 1000);
          var time2 = new Date(meetings[i].edtime * 1000);;
          temp.id = meetings[i].id;
          temp.topic = meetings[i].topic;
          temp.date = util.totime(meetings[i].sttime * 1000);
          temp.stime = (time1.getHours() < 10 ? ('0' + time1.getHours()) : (time1.getHours())) + ':' + (time1.getMinutes() < 10 ? ('0' + time1.getMinutes()) : time1.getMinutes());
          temp.etime = (time2.getHours() < 10 ? ('0' + time2.getHours()) : (time2.getHours())) + ':' + (time2.getMinutes() < 10 ? ('0' + time2.getMinutes()) : time2.getMinutes());
          temp.room_name = meetings[i].room_name;
          temp.loc = meetings[i].room_location;
          temp.desc = meetings[i].room_desc;
          record.push(temp);
        }
        thispage.setData({
          meetingRecords: record,
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})