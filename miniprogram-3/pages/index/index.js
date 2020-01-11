/**
 * @file index.js
 * @author xuguixin0624@gmail.com
 * @description 登录页面
 */
var app = getApp();
Page({
  data: {
    email: 'kgq',//邮箱
    password: '123',//密码
    isAgree: true//记住账号密码凭证
  },
  onLoad(){
    wx.cloud.init()
  },
  onLogin () {
    var email ,password;
    var reg; 
    var thisApp = app;
    email = this.data.email;
    password = this.data.password;
    reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
    if(email === '') {
      wx.showToast({
        title: '邮箱不能为空',
        image: '../../images/failmsg.png',
        duration: 2000
      });
      return;
    };
  //   if(!reg.test(email)) {
  //    wx.showToast({
  //       title: '邮箱格式不正确',
  //      image: '../../images/failmsg.png',
  //       duration: 2000
  //     });
  //     return;
  //  };
    if(password == '') {
      wx.showToast({
        title: '密码不能为空',
        image: '../../images/failmsg.png',
        duration: 2000
      });
      return;
    };
   // wx.switchTab({
    //  url: '../main/main'
   //});
   wx.request({
     url: 'http://111.229.177.16:8080/login',
     method:'POST',
     data:{
       'account':email,
       'passwd':password,
     },
     success(res){
       console.log(res.data);
       if(res.data.status=='账号不存在'){
         wx.showToast({
           title: '账号不存在',
           duration:2000
         })
         return;
       }
       if(res.data.status=='密码错误'){
         wx.showToast({
           title: '密码错误',
           duration: 2000
         })
         return;
       }
       wx.showToast({
         title: '登陆成功',
         duration:2000,
       })
       //更新全局变量值
       thisApp.globalData.account = email;
       thisApp.globalData.passwd = password;
       thisApp.globalData.isadmin = res.data.user.isadmin;
       thisApp.globalData.adminAccount = res.data.user.admin;
       thisApp.globalData.user_id = res.data.user.id;
       console.log(thisApp.globalData);
       wx.switchTab({
         url: '../main/main'
       });
     }   
   })
  },
  onSignUp(){
    wx.navigateTo({
      url: '../signUp/signUp',
    })
  },
  inputEmail (e) {
    this.setData({
        email: e.detail.value
      });
  },
  inputPassword (e) {
    this.setData({
        password: e.detail.value
      });
  },
  bindAgreeChange (e) {
    this.setData({
        isAgree: !!e.detail.value.length
    });
  }
})