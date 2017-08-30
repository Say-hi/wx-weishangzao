// 获取全局应用程序实例对象
const app = getApp()
const serviceUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    agentArr: []
  },
  // 获取关联的上家
  getInfo (page) {
    let that = this
    let obj = {
      url: serviceUrl.myProxyLists,
      data: {
        session_key: wx.getStorageSync('session_key'),
        page: page
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          if (res.data.data.length === 0) return
          that.data.agentArr = that.data.agentArr.concat(res.data.data)
          that.setData({
            agentArr: that.data.agentArr
          })
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(obj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // TODO: onLoad
    this.getInfo(1)
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
  onReachBottom () {
    this.getInfo(++this.data.page)
  }
})
