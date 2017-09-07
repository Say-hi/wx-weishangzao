// 获取全局应用程序实例对象
const app = getApp()
const serviceUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lists: [],
    page: 1
  },
  getList (page) {
    let that = this
    let gl = {
      url: serviceUrl.getShareMoneyLists,
      data: {
        session_key: app.gs(),
        page: page
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          app.setMore(res.data.data, that)
          if (page * 1 === 1) {
            that.setData({
              lists: []
            })
          }
          that.setData({
            lists: that.data.lists.concat(res.data.data)
          })
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(gl)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getList(1)
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
    this.getList(++this.data.page)
  }
})
