// 获取全局应用程序实例对象
// const app = getApp()
const app = getApp()
const serviceUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    teamArr: []
  },
  // 获取我关联的团队
  getInfo (page) {
    let that = this
    let t = {
      url: serviceUrl.getMySubscribeTeams,
      data: {
        session_key: app.gs(),
        page: page
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.data.teamArr = that.data.teamArr.concat(res.data.data)
          that.setData({
            teamArr: that.data.teamArr
          })
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(t)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getInfo(1)
    // TODO: onLoad
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
