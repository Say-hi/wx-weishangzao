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
    agentArr: [],
    page: 1
  },
  // 删除代理
  del (e) {
    let that = this
    let s = {
      url: serviceUrl.deleteProxy,
      data: {
        session_key: app.gs(),
        user_id: e.currentTarget.dataset.id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.getInfo(1)
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(s)
    this.setData({
      agentArr: this.data.agentArr
    })
  },
  // 获取关联我的代理
  getInfo (page) {
    let that = this
    let a = {
      url: serviceUrl.getProxyByMy,
      data: {
        session_key: app.gs(),
        page: page
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          if (res.data.data.length === 0) {
            that.setData({
              more: false
            })
          } else {
            that.setData({
              more: true
            })
          }
          if (page * 1 === 1) {
            that.setData({
              agentArr: []
            })
          }
          that.setData({
            agentArr: that.data.agentArr.concat(res.data.data)
          })
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(a)
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
    if (!this.data.more) return
    this.getInfo(++this.data.page)
  }
})
