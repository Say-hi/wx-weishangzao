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
    sealArr: []
  },
  goRelease () {
    wx.redirectTo({
      url: '../release/release'
    })
  },
  // 获取发布产品列表
  getList (page) {
    let that = this
    let s = {
      url: serviceUrl.fabuProductBySelfLists,
      data: {
        session_key: app.gs(),
        page: page
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          app.setMore(res.data.data, that)
          that.setData({
            sealArr: that.data.sealArr.concat(res.data.data)
          })
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(s)
  },
  // 删除产品
  del (e) {
    let that = this
    let d = {
      url: serviceUrl.deleteProduct,
      data: {
        session_key: app.gs(),
        good_id: e.currentTarget.dataset.id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.data.sealArr.splice(e.currentTarget.dataset.index, 1)
          that.setData({
            sealArr: that.data.sealArr
          })
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(d)
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
    if (!this.data.more) return
    this.getList(++this.data.page)
  }
})
