var util = require('../../utils/util.js')
var boardroom = require('../../utils/boardroomArr.js');
var app = getApp();
import {
  MRList
} from '../../utils/data.js';
Page({
  data: {
    searchCity: [],//侧栏浮动选项
    boardroomList: [], //会议室列表
    showLetter: "",//字母
    winHeight: 0,
    isShowLetter: false,
    scrollTop: 0,//置顶高度
    scrollTopId: '',//置顶id
    manager: '', //管理员
  },
  onLoad: function(options){
    // 生命周期函数--监听页面加载
    var searchCity = ["北京", "上海", "深圳", "广州"];
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    var itemH = winHeight / searchCity.length;
    var tempObj = [];
    var locList=[];
    var list=[];
    var rooms=[];
    var thispage=this;
    var thisApp = app;
    for (var i = 0; i < searchCity.length; i++) {
      var temp = {};
      temp.name = searchCity[i];
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;
      tempObj.push(temp);
    }

    this.setData({
      winHeight: winHeight,
      itemH: itemH,
      searchCity: tempObj,
    });
    wx.request({
      url: thisApp.globalData.url + 'room/' + thisApp.globalData.account,
      method:'GET',
      success(res){
        console.log(res.data);
        app.globalData.adminMR=res.data.rooms;
        rooms=app.globalData.adminMR;
        for(var i=0;i<rooms.length;i++){
          var tmp={};
          if(!list.includes(rooms[i].location)){
            list.push(rooms[i].location);
            tmp.loc=rooms[i].location;
            tmp.roomInfo=[];
            locList.push(tmp);
          }
        }
        for(var i=0;i<rooms.length;i++){
          for(var j=0;j<locList.length;j++){
            if(locList[j].loc==rooms[i].location) 
              locList[j].roomInfo.push(rooms[i]);
          }
        }
        console.log(locList);
        thispage.setData({
          boardroomList: locList,
        });
        //winHeight:30
        // winHeight: sysInfo.windowHeight
      }
    })
    console.log(this.data.boardroomList);
  },
  onReady() {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow() {
    // 生命周期函数--监听页面显示
    // 生命周期函数--监听页面加载
    var searchCity = ["北京", "上海", "深圳", "广州"];
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    var itemH = winHeight / searchCity.length;
    var tempObj = [];
    var locList = [];
    var list = [];
    var rooms = [];
    var thispage = this;
    var thisApp = app;
    for (var i = 0; i < searchCity.length; i++) {
      var temp = {};
      temp.name = searchCity[i];
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;
      tempObj.push(temp);
    }

    this.setData({
      winHeight: winHeight,
      itemH: itemH,
      searchCity: tempObj,
    });
    console.log(thisApp.globalData);
    wx.request({
      url: thisApp.globalData.url+'room/'+thisApp.globalData.account,
      method: 'GET',
      success(res) {
        console.log(res.data);
        app.globalData.adminMR = res.data.rooms;
        rooms = app.globalData.adminMR;
        for (var i = 0; i < rooms.length; i++) {
          var tmp = {};
          if (!list.includes(rooms[i].location)) {
            list.push(rooms[i].location);
            tmp.loc = rooms[i].location;
            tmp.roomInfo = [];
            locList.push(tmp);
          }
        }
        for (var i = 0; i < rooms.length; i++) {
          for (var j = 0; j < locList.length; j++) {
            if (locList[j].loc == rooms[i].location)
              locList[j].roomInfo.push(rooms[i]);
          }
        }
        console.log(locList);
        thispage.setData({
          boardroomList: locList,
        });
        //winHeight:30
        // winHeight: sysInfo.windowHeight
      }
    })
    console.log(this.data.boardroomList);
  },
  onHide() {
    console.log("这是从onHide离开的");
    // 生命周期函数--监听页面隐藏
  },
  onUnload() {
    console.log("这是从onUnload离开的");
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh() {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom() {
    // 页面上拉触底事件的处理函数
  },
  clickLetter(e) {
    //点击侧栏城市
    var showLetter = e.currentTarget.dataset.letter;

    this.setData({
      showLetter: showLetter,
      isShowLetter: true,
      scrollTopId: showLetter,
    })

    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 1000)
  },
  onSelectItem(e) {
    console.log(e.currentTarget.dataset);
    // 选中会议室需要传递会议室编号id,u_id=1代表从列表入口进来
    var params = "room_id=" + e.currentTarget.dataset.id + "&desc=" + e.currentTarget.dataset.desc + "&location=" + e.currentTarget.dataset.location + "&name=" + e.currentTarget.dataset.name;
    wx.navigateTo({
      url: "../roomnew/roomnew?" + params
    })
  }
})
