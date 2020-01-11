/**
 */
var app = getApp();
var util = require('../../utils/util.js');
var data = require('../../utils/data.js');
Page({
  data: {
    url: 'http://111.229.177.16:8080/room/', //url
    room_id: '0',  //房间id
    name: "",//会议室名称
    place: "", //会议室地点
    describe: "",//描述
  },
  onLoad: function (options) {  //onLoad 方法开始
  console.log(options);
  console.log("运行onLoad函数");
      this.setData({
        room_id: parseInt(options.room_id),
        name: options.name,
        place: options.location,
        describe: options.desc,
        url: app.globalData.url+'room/'
      });
    wx.setNavigationBarTitle({
      title: '查看会议室' + this.data.name,
    })
      console.log(this.data.place);
  },   //onLoad 方法结束
  onShow() {
    console.log("加载onShow函数");
    if (this.data.source === '') {
  
    }
    if (this.data.source !== 'remote') {
      
    }
  },
  onUnload() {
    console.log("加载onUnload");
  },
  onHide() {
    console.log("加载onHide");
  }, 
  checkInfo: function(){ //检查输入的信息是否完整
    if (this.data.name == "") {
      wx.showModal({
        title: '错误',
        content: '会议室名称不能为空',
        showCancel: false,
      })
      return false;
    } else if (this.data.place == "") {
      wx.showModal({
        title: '错误',
        content: '会议室地点不能为空',
        showCancel: false,
      })
      return false;
    } else{
      console.log("ret=", true);
      return true;
    }
  },
  //保存会议室按钮
  onSave() {
    console.log("调用onSave");
    var thisPage = this;
    wx.showModal({
      title: '提示',
      content: '确认更新会议室信息？',
      confirmText: '更新',
      success: function (res) {
        if (res.confirm) {  
          if(!thisPage.checkInfo()){
            console.log(thisPage.checkInfo());
            return;}  //检查输入
            console.log(thisPage.data);
          wx.request({    //Request请求
            url: thisPage.data.url + thisPage.data.room_id + '/update',
            method: 'POST',
            data: {
              name: thisPage.data.name,
              location: thisPage.data.place,
              desc: thisPage.data.describe,
            },
            success: res => {
              console.log('data=', res);
              wx.showToast({
                title: '成功',
                icon: 'success',
              })
            }
          });
        } else if (res.cancel) {
        }
      }, fail: function (res) {
      }
    });
    wx.setNavigationBarTitle({
      title: '查看会议室' + this.data.name,
    })
  },
  //删除会议室按钮
  delBoardRoom(e) {
    var _this = this;
    console.log("删除会议室");
    wx.showModal({
      title: '提示',
      content: '是否移除该会议室',
      confirmText: '删除',
      success: function (res) {
        if (res.confirm) {
          wx.request({    //Request请求
            url: _this.data.url+_this.data.room_id+'/delete',
            method: 'GET',
            success: res => {
              console.log('删除会议室返回数据 data=', res.data);
              wx.showToast({
                title: '成功',
                icon: 'success',
              })
            }
          })
        } else if (res.cancel) {
        }
      },fail: function (res) {
      }
    })
  },
  //会议室名称
  getName(e) {
    console.log("调用getTitle");
    this.setData({
      name: e.detail.value
    });
  },
  getPlace(e) {
    console.log("调用getDescribe(e)");
    this.setData({
      place: e.detail.value
    })
    console.log("输出地点" + this.data.place);
  },
  //备注
  getDescribe(e) {
    console.log("调用getDescribe(e)");
    this.setData({
      describe: e.detail.value
    })
    console.log("输出备注"+this.data.describe);
  }
})
