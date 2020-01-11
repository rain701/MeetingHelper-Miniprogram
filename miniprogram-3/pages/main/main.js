/**
 * @file main.js
 * @author xuguixin0624@gmail.com
 * @description 主页面
 */
import API from "../../api/api.js";
var app = getApp();
Page({
  data: {
    isadmin: 0,
    user_id: 0,
    adminAccount: '',
    hiddenmodalput: true,
  },
  onLoad (){
    // 生命周期函数--监听页面加载
    console.log(app.globalData.isadmin);
    this.setData({
      isadmin: app.globalData.isadmin,
      user_id: app.globalData.user_id,
      adminAccount: app.globalData.adminAccount,
    })
    console.log(this.data);
  },
  onShow(){
    console.log(app.globalData.isadmin);
    this.setData({
      isadmin: app.globalData.isadmin,
      user_id: app.globalData.user_id,
      adminAccount: app.globalData.adminAccount,
    })
    console.log(this.data);
  },
  toMRL(){   //我的管理
    wx.navigateTo({
      url: '../MRList/MRList',
    })
  },
  toRC(){     //新建会议室
    wx.navigateTo({
      url: '../roomCreate/roomCreate',
    })
  },
  toShare(){
    var thisPage = this;
    wx.setClipboardData({
      data: thisPage.data.adminAccount,
    })
  },
  toRTL(){    //我的预约
    wx.navigateTo({     
      url: '../userRecords/userRecords',
    })
  },
  toMRV(){    //新建预约
    wx.navigateTo({
      url: '../meetReserve/meetReserve',
    })
  },
  getadmin(e){
    this.setData({
      adminAccount: e.detail.value,
    })
    console.log(this.data);
  },
  //绑定管理员
  bound: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  confirm: function () {
    var thisPage = this;
    var thisApp = app;
    wx.request({    //Request请求
      url: thisApp.globalData.url + 'user/' + thisPage.data.user_id + '/update',
      method: 'POST',
      data: {
        admin: thisPage.data.adminAccount,
      },
      success: res => {
        console.log(res.data.status);
        if (res.data.status != 'ok') {
          wx.showToast({
            title: res.data.status,
            image: '../../images/failmsg.png',
          })
          return false;
        } else {
          thisApp.globalData.adminAccount = thisPage.data.adminAccount;
          wx.showToast({
            title: '成功',
            icon: 'success',
          })
          console.log(res);
        }
        console.log('requset成功data=', res);
      }, fail: res => {
        console.log("requset失败");
        wx.showToast({
          title: 'request失败',
          image: '../../images/failmsg.png',
        })
      }
    });
    this.setData({
      hiddenmodalput: true
    })
  }
})
