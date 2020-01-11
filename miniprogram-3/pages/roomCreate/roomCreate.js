/**
 */
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    name: "",//会议主题
    describe: "",//描述
    place: "", //会议室地点
    user_id: 9, //
    room_id: 0,  //用于记录返回房间id
  },
  onLoad: function (options) {
      this.setData({
        user_id: app.globalData.user_id, //接收上个页面传过来的用户id
      });
      console.log("user_id=", this.data.user_id);
  },
  onShow() {
  },
  onUnload() {
    this.setData({
      name: "",
      describe: "",
      place: "",
      room_id: 9,    //清零数据
    })
  },
  onHide() {
    this.setData({
      name: "",
      describe: "",
      place: "",
      room_id: 9,    //清零数据
    })
  },
  checkInfo: function () { //检查输入的信息是否完整
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
    } else {
      console.log("ret=", true);
      return true;
    }
  },
  //预定按钮事件
  onCreate() {
    console.log('thisdataroom_id', this.data.room_id);
    console.log("调用onCreate");
    var thisPage = this;
    wx.showModal({
      title: '提示',
      content: '确认添加会议室',
      confirmText: '确认',
      success: function (res) {
        if (res.confirm) {
          if (!thisPage.checkInfo()) {
            console.log(thisPage.checkInfo());
            return;
          }  //检查输入
          console.log(thisPage.data);
          wx.request({    //Request请求
            url: 'http://111.229.177.16:8080/room/create',
            method: 'POST',
            data: {
              name: thisPage.data.name,
              location: thisPage.data.place,
              desc: thisPage.data.describe,
              user_id: thisPage.data.user_id,
            },
            success: res => {
              console.log(res.data.status);
              if(res.data.status != 'ok'){
                wx.showToast({
                  title: res.data.status,
                  image: '../../images/failmsg.png',
                })
                return false;
              }else{
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                })
                thisPage.setData({
                  room_id: res.data.room_id,
                })
                console.log(thisPage.data.user_id);
              }
              console.log('requset成功data=', res.data);
            },fail:res=>{
              console.log("requset失败");
              wx.showToast({
                title: 'request失败',
                image: '../../images/failmsg.png',
              })
            }
          });
        } else if (res.cancel) {
        }
      }, fail: function (res) {
      }
    });   
  },
  getName(e) {
    this.setData({
      name: e.detail.value
    });
  },
  getDescribe(e) {
    this.setData({
      describe: e.detail.value
    })
  },
  getPlace(e){
    this.setData({
      place: e.detail.value
    })
    console.log("地点更新为" + this.data.place)
  }
})
