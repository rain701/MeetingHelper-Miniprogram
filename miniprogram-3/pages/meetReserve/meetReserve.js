/**
 * @file reserve.js
 * @author xuguixin0624@gmail.com
 * @description 常规预定
 */
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    topic: "",//会议主题
    sdate: "",//开始日期
    stime: "",//开始时间
    etime: "",//结束时间
    sttime: 0,
    edtime: 0,
    rboardroom: [],//会议室组
    source: "",
    room_id: 14,
    user_id: 10,
    manager: 'zhangyu9@qq.com',   //绑定管理员的id
    meeting_id: 0,
    rList: [],
  },
  onLoad: function (options) {
      this.setData({
        sdate: util.getDate(),
        stime: util.getTime(),
        etime: util.getTime(),
        user_id: app.globalData.user_id
      });
      this.setData({
        rboardroom: app.globalData.checkBrList
      });
    
  },
  //展示页面时调用
  onShow() {
    console.log("这不是又从onshow回来了吗");
    if (this.data.source === '') {
      this.setData({
        rboardroom: app.globalData.checkBrList,
        room_id: app.globalData.selectMR_id,
        rList: app.globalData.rtList,
      });
    }
    console.log(this.data.rList);

  },
  //退出页面时调用
  onUnload() {
    app.updateCheckBrList(this.data.rboardroom);
  },
  //隐藏页面时调用
  onHide() {
    app.updateCheckBrList(this.data.rboardroom);
  },
  checkTime: function(){
    let timeList = this.data.rList;
    let starttm = this.data.sttime;
    let endtm = this.data.edtime;
    for(var i = 0; i < timeList.length; i++){
      let tmp = timeList[i];
      if(tmp.edtime <= starttm)continue;
      if(tmp.sttime >= endtm)continue;
      return false;
    }
    return true;
  },
  checkInfo: function () { //检查输入的信息是否完整
    if (this.data.topic == "") {
      wx.showModal({
        title: '错误',
        content: '会议主题不能为空',
        showCancel: false,
      })
      return false;
    } else if (app.globalData.selectMR_id == 0) {
      wx.showModal({
        title: '错误',
        content: '请选择会议地点',
        showCancel: false,
      })
      return false;
    } else if(!this.checkTime()){
      wx.showModal({
        title: '错误',
        content: '请重新确定时间',
        showCancel: false,
      })
      return false;
    }else{
      return true;
    }
  },
  onLook(){  //查看按钮

  var selectMR = app.globalData.selectMR;
  console.log("selectMR=", selectMR);
  var selectMRID = app.globalData.selectMR_id;
  console.log("selectMRID=", selectMRID);
    let temp = Date.parse(new Date(this.data.sdate + ' ' + '0:0:0'));
    let date_temp = temp / 1000;
    if(app.globalData.selectMR_id==0){
      wx.showToast({
        title: '请选择会议室',
        image: '../../images/failmsg.png',
      })
      return;
    }
  wx.navigateTo({
    url: '../RTList/RTList?date='+date_temp,
  })
  },
  //预定按钮事件
  onReserve() {
    //获得选中会议室的id
    var roomID = parseInt(app.globalData.selectMR_id);
    var roomName = app.globalData.selectMR;
    //解析选中的时间
    let temp = Date.parse(new Date(this.data.sdate + ' ' +this.data.stime + ':0'));
    this.data.sttime = temp/1000;
    let temp2 = Date.parse(new Date(this.data.sdate + ' ' + this.data.etime + ':0'));
    this.data.edtime = temp2/1000;
    //输出调试
    console.log("选中会议室:"+roomName+'id='+roomID);
    if(!this.checkInfo()){return;};
    var thisPage = this;
    var thisApp = app;
    console.log(this.data);
    wx.request({    //Request请求
      url: thisApp.globalData.url+'meeting/create',
      method: 'POST',
      data: {
        room_id: roomID,
        sttime:thisPage.data.sttime,
        edtime:thisPage.data.edtime,
        topic: thisPage.data.topic,
        user_id:thisPage.data.user_id,
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
  },
  onChangeSdate(e) {  //修改预定日期
    this.setData({
      sdate: e.detail.value,
    });
    console.log(this.data.sdate);
  },
  onChangeStime(e) {  //修改起始时间
    this.setData({
      stime: e.detail.value,
      etime: e.detail.value
    });
    console.log(this.data.stime);
  },
  onChangeEtime(e) {  //修改终止时间
    this.setData({
      etime: e.detail.value
    });
    console.log(this.data.etime);
  },
  onSelect() {
    wx.navigateTo({
      url: "../contacts/contacts?type=reserve"
    })
  },
  onSelectBR() {
    wx.navigateTo({
      url: "../boardroom/boardroom"
    })
  },
  //删除会议室
  delBoardRoom(e) {
    var _this = this;

    wx.showModal({
      title: '提示',
      content: '是否移除该会议室',
      success: function (res) {
        if (res.confirm) {
          app.updateSelectMR("");
          app.updateSelectMRID(0);
          var checkRoom = {};//用来存储当前会议室
          _this.setData({
            rboardroom: [],
          });
        } else if (res.cancel) {
        }
      }, fail: function (res) {

      }
    })
  },
  getTopic(e) {
    this.setData({
      topic: e.detail.value
    });
    console.log("topic = ", this.data.topic);
  }
})
