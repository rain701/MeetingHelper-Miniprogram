var app = getApp();
var util=require('../../utils/util.js')
import {
  BOARDROOMS
} from '../../utils/data.js';
Page({
	data: {
    searchCity: [],
    showLetter: "",
    winHeight: 0,
    boardroomList: [],
    isShowLetter: false,
    scrollTop: 0,//置顶高度
    scrollTopId: '',//置顶id
    checkBrList: [],//存储选中会议室

    adminAccount: '', //管理员账号
    selectMR: '',
    selectMR_id: 0,
  },
  onLoad () {
    // 生命周期函数--监听页面加载
    var searchCity = ['北京', '上海', '深圳', '广州'];
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
			checkBrList: app.globalData.checkBrList,
      adminAccount: thisApp.globalData.adminAccount,
		});
    if(thispage.data.adminAccount=="") {
      wx.showToast({
        title: '您尚未绑定管理员',
        icon:'none',
        duration:2000
      });
      return;
    }
    wx.request({
      url: thisApp.globalData.url+'room/'+thispage.data.adminAccount,
      method: 'GET',
      success(res) {
        console.log(res.data);
        app.globalData.adminMR = res.data.rooms;
        rooms = app.globalData.adminMR;
        for (var i = 0; i < rooms.length; i++) {
          var tmp = {};
          if (!list.includes(rooms[i].location)) {
            list.push(rooms[i].location);
            tmp.initial = rooms[i].location;
            tmp.boardroomInfo = [];
            locList.push(tmp);
          }
        }
        for (var i = 0; i < rooms.length; i++) {
          var tmp = '';
          for (var j = 0; j < locList.length; j++) {
            if (locList[j].initial == rooms[i].location){
              locList[j].boardroomInfo.push(rooms[i]);
              //locList[j].boardroomInfo.rooms[i].check = false;
              }
          }
        }
        console.log(thispage.data.boardroomList);
        console.log(locList);
        thispage.setData({
          boardroomList: locList,
        });
        //winHeight:30
        // winHeight: sysInfo.windowHeight
      }
    })
  },
  onReady () {
	// 生命周期函数--监听页面初次渲染完成
	},
	onShow () {
	// 生命周期函数--监听页面显示
	},
	onHide () {
	// 生命周期函数--监听页面隐藏
	},
	onUnload () {
	// 生命周期函数--监听页面卸载
		app.updateCheckBrList(this.data.checkBrList);
		app.updateBoardroomList(this.data.boardroomList);
    app.updateSelectMR(this.data.selectMR);
    app.updateSelectMRID(this.data.selectMR_id);
	},
	onPullDownRefresh () {
	// 页面相关事件处理函数--监听用户下拉动作
	},
	onReachBottom () {
	// 页面上拉触底事件的处理函数
	},
	clickLetter (e) {
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
	//点击会议室选中或者取消事件
	onSelectItem (e) {
		var checkRoom = {},//
			judgment = 1, //未选中为1
			arr = this.data.boardroomList,//
			_checkList = this.data.checkBrList;//
		checkRoom.name = e.currentTarget.dataset.name;
		checkRoom.room_id = e.currentTarget.dataset.id;
    console.log("选中目标",e.currentTarget);
    console.log("选中name",checkRoom.name);
    console.log("选中id",checkRoom.room_id);
    var tmp = [];
    tmp.push(checkRoom);
    console.log(tmp);
    this.setData({
      selectMR: checkRoom.name,
      selectMR_id: checkRoom.room_id,
      checkBrList: tmp,
    })
}
})
