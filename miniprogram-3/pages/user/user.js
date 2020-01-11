/**
 * @file user.js
 * @author xuguixin0624@gmail.com
 * @description 个人中心
 */
var app = getApp();
Page({
data:{
  account: '',
  user_id: 0,
  isAdmin: '',
  admin: '',

},
onLoad(){
  console.log(app.globalData);
  var isadmin_tmp = '';
  if(app.globalData.isadmin==0){
    isadmin_tmp = '否';
  }else{
    isadmin_tmp = '是';
  }
  this.setData({
    account: app.globalData.account,
    user_id: app.globalData.user_id,
    isAdmin: isadmin_tmp,
    admin: app.globalData.adminAccount,
  })
},
onShow(){
  console.log(app.globalData);
  var isadmin_tmp = '';
  if (app.globalData.isadmin == 0) {
    isadmin_tmp = '否';
  } else {
    isadmin_tmp = '是';
  }
  this.setData({
    account: app.globalData.account,
    user_id: app.globalData.user_id,
    isAdmin: isadmin_tmp,
    admin: app.globalData.adminAccount,
  })
},

	loginOut () {
		wx.showModal({
		  title: '提示',
		  content: '是否退出当前账号',
		  success: function(res) {
		    if (res.confirm) {
		    	wx.clearStorageSync();
				wx.redirectTo({
		      		url: "../index/index"
		    	});
		    } else if (res.cancel) {
		      console.log('用户点击取消')
		    }
		  }
		})
	}
})
