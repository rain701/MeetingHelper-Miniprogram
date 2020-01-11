//app.js
App({
  onLaunch () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  //封装请求数据的方法
  ajax:function(url, data, callback, method) {
    var method = method ? method : "GET";
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        callback(res.data);
      },
      fail(e) {
        callback(e);
      }
    })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success () {
          wx.getUserInfo({
            success (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  updateContactData: function(arr) {
    this.globalData.contactData = arr;
  },
  updateMeetingrooms: function(arr) {
    this.globalData.meetingrooms = arr;
  },
  updateCheckList: function(arr) {
    this.globalData.checkList = arr;
  },
  updateCheckBrList: function(arr) {

    this.globalData.checkBrList = arr;
  },
  updateContactsList: function(arr) {

    this.globalData.contactsList = arr;
  },
  updateBoardroomList: function(arr) {

    this.globalData.boardroomList = arr;
  },
  updateSelectMR: function(str){
    this.globalData.selectMR = str;
  },
  updateSelectMRID: function(id){
    this.globalData.selectMR_id = id;
  },
  globalData:{
    userInfo:null,
    contactData: [],//联系人列表
    checkList:[],//选中联系人
    meetingrooms: [],//会议室列表
    checkBrList:[],//选中会议室
    contactsList: [],
    boardroomList: [],

    isadmin: 0, // 是否为管理员
    account: '',
    passwd: '',
    user_id: 0,
    adminAccount: '',
    url: 'http://111.229.177.16:8080/',  // 

    rtList: [], //
    adminMR: {},
    selectMR: '',  //选中会议室名称
    selectMR_id: 0,  //选中会议室的ID
  }
})