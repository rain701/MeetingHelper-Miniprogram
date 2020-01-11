var app=getApp();
Page({
  data:{
    hiddenmodalput:true,
    adminName:'zxc',
    email:'zhangyu@qq.com',
    password:'123456',
    password2:'12345'
  },
  onLoad(){

  },
  onReady(){

  },
  onLogin2(){
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    });
  },
  inputEmail(e) {
    this.setData({
      email: e.detail.value
    });
  },
  inputPassword(e) {
    this.setData({
      password: e.detail.value
    });
  },
  inputPassword2(e) {
    this.setData({
      password2: e.detail.value
    });
  },
  cancel(){
    this.setData({
      hiddenmodalput:true
    });
  },
  onLogin(){
    var password,email,password2;
    var reg;
    reg = /^([a-zA-Z0-9_-])/; 
    password=this.data.password;
    email=this.data.email;
    password2=this.data.password2;
    this.setData({
      hiddenmodalput: true
    });
    if(email.length>15||password.length>15){
      wx.showToast({
        title: '账号或密码的长度不能超过15个字符！',
        duration:2000,
        icon:'none'
      })
      return;
    }
    if(!reg.test(email)||!reg.test(password)){
      wx.showToast({
        title: '账号密码的格式不正确，只能为字母或数字',
        icon:'none',
        duration:2000
      })
      return;
    }
   if(password!=password2){
     wx.showToast({
       title: '两次输入的密码不同',
       icon:'none',
       duration:2000,
     })
     return;
   }

    app.globalData.adminName=this.data.adminName;
    
    wx.request({
      url: 'http://111.229.177.16:8080/signup',
      method:'POST',
      data:{
        'account':email,
        'passwd': password,
        'isadmin':0
       },
       success(res){
         console.log(res.data);
         if(res.data.status=='该账号已存在'){
           wx.showToast({
             title: '该账号已经存在，注册失败',
             icon:'none',
             duration:2000

           })
           return;
         }
         if(res.data.status=='ok'){
           wx.showToast({
             title: '注册成功，返回登陆页面',
             duration:2000,
           })
           wx.navigateTo({
             url: '../index/index',
           })
         }

       }
       
    })
  },
  onSignUp(){
    var email,password,password2,reg;
    email=this.data.email;
    password=this.data.password;
    password2=this.data.password2;
    reg = /^([a-zA-Z0-9_-])/; 
    if (email.length > 15 || password.length > 15) {
      wx.showToast({
        title: '账号或密码的长度不能超过15个字符！',
        duration: 2000,
        icon: 'none'
      })
      return;
    }
    if (!reg.test(email) || !reg.test(password)) {
      wx.showToast({
        title: '账号密码的格式不正确，只能为字母或数字',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (password != password2) {
      wx.showToast({
        title: '两次输入的密码不同',
        icon: 'none',
        duration: 2000,
      })
      return;
    }
    wx.request({
      url: 'http://111.229.177.16:8080/signup',
      method: 'POST',
      data: {
        'account': email,
        'passwd': password,
        'isadmin': 1
      },
      success(res) {
        console.log(res.data);
        if (res.data.status == '该账号已存在') {
          wx.showToast({
            title: '该账号已经存在，注册失败',
            icon:'none',
            duration: 2000

          })
          return;
        }
        if (res.data.status == 'ok') {
          wx.showToast({
            title: '注册成功，返回登陆页面',
            duration: 2000,
          })
          wx.navigateTo({
            url: '../index/index',
          })
        }

      }

    })
  }

  
  
})