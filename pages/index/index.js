// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: '课堂点名',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
Page({
  //功能：上传文件（word/excel/ppt/pdf等）到云存储

  //第一步：选择文件
  chooseFile(){
    let that = this
    wx.chooseMessageFile({
      count: 1,
      type: 'all',
      success (res) {
        const tempFilePaths = res.tempFiles
        let tempFile = tempFilePaths[0]
        that.uploadFile(tempFile.name,tempFile.path)
      }
    })
  },
  //第二步：通过uploadFile上传选中的文件
  uploadFile(fileName,tempFile){
    wx.cloud.uploadFile({
      cloudPath:fileName,
      filePath:tempFile,
    })
  .then(res=>{
    console.log("上传成功啦",res);
    wx.showToast({
      title: '文件上传成功',
      icon:"success",
      duration:2000
    })
  })
  .catch(err=>{
    console.log("上传失败啦",err);
  })
  }
})

