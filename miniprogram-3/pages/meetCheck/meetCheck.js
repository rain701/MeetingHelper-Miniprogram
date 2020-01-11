// pages/meetCheck/meetCheck.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic: '吃饭',
    room: '2303',
    date: '',
    location: '',
    desc: '注意卫生',
    time: '',
    meeting_id: 42,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.topic!=undefined){
    let topic_tmp = options.topic;
    let room_tmp = options.room_name;
    let date_tmp = options.date;
    let sttime_tmp = options.sttime;
    let edtime_tmp = options.edtime;
    let loc_tmp = options.loc;
    let desc_tmp = options.room_desc;
    let id_tmp = options.id;
    let time_tmp = sttime_tmp+'--'+edtime_tmp;
    this.setData({
      topic: topic_tmp,
      room: room_tmp,
      desc: desc_tmp,
      date: date_tmp,
      time: time_tmp,
      location: loc_tmp,
      meeting_id: id_tmp,
    })}
    console.log(this.data);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onDelMeet: function(){
    console.log("删除会议室");
    //获得选中会议室的id
    var thisPage = this;
    var url = 'http://111.229.177.16:8080/meeting/' + this.data.meeting_id +'/delete';
    wx.request({    //Request请求
      url: url,
      method: 'GET',
      success: res => {
          wx.showToast({
            title: '成功',
            icon: 'success',
          })
          console.log(res.data);
        console.log('requset成功data=', res.data);
      }, fail: res => {
        console.log("requset失败");
        wx.showToast({
          title: 'request失败',
          image: '../../images/failmsg.png',
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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