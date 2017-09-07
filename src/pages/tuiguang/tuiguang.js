// 获取全局应用程序实例对象
const app = getApp()
const serviceUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'tuiguang'
  },
  golists () {
    wx.navigateTo({
      url: '../tuiGuangList/tuiGuangList'
    })
  },
  // 获取分享的二维码
  getCode () {
    let that = this
    let gc = {
      url: serviceUrl.extensionErcode,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            info: res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(gc)
  },
  // 保存图片到本地相册
  saveImg () {
    let that = this
    wx.downloadFile({
      url: that.data.src,
      success (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath
        })
      }
    })
    // wx.saveImageToPhotosAlbum({
    //   filePath:
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    this.setData({
      name: params.name,
      user_id: params.user_id
    })
    this.getCode()
    // TODO: onLoad
    // let that = this
    // wx.request({
    //   url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxda895d991635fb1e&secret=dc4dae759323bac2d4b7524cf4d3b03a',
    //   method: 'GET',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success (res) {
    //     wx.request({
    //       url: `https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=${res.data.access_token}`,
    //       data: {
    //         'path': `/pages/index/index?recommend_id=${that.data.user_id}`,
    //         'width': 430
    //       },
    //       method: 'POST',
    //       header: {
    //         'content-type': 'application/json'
    //       },
    //       success (res) {
    //         console.log(res.data)
    //       },
    //       fail (res) {
    //         console.log('isFail')
    //       }
    //     })
    //   }
    // })
    // wx.request({
    //   url: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token='+,
    //   data: {'path': "/pages/index/index?uid=1",'width': 430},
    //   success: function(res) {
    //     console.log(res.data)
    //   },
    //   fail:function(res) {
    //     console.log('isFail')
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // TODO: onReady
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // TODO: onShow
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // TODO: onHide
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  },
  onShareAppMessage () {
    return {
      title: `您的好友${this.data.name}向您推荐微商荣耀`,
      path: `pages/index/index?recommend_id=${this.data.user_id}`
    }
  }
})
