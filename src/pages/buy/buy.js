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
    sealArr: [],
    orderStatus: ['您未付款', '商家处理中', '确认收货', '已收货', '退货', '举报']
  },
  // 获取我买到的列表
  getList (page) {
    let that = this
    let s = {
      url: serviceUrl.buyProductBySelf,
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
  // 确认收货
  confirm (e) {
    let that = this
    let type = e.currentTarget.dataset.type
    if (type === 'jubao') {
      this.setData({
        mask2: true
      })
    } else if (type === 'express') {
      this.setData({
        index: e.currentTarget.dataset.index,
        mask: true
      })
    } else if (type === 'tuihuo') {
      this.setData({
        mask2: true
      })
    } else if (type === 'confirm' && (e.currentTarget.dataset.status * 1) === 2) {
      let ce = {
        url: serviceUrl.confirmByReceipt,
        data: {
          session_key: app.gs(),
          order_id: e.currentTarget.dataset.id
        },
        success (res) {
          wx.hideLoading()
          if (res.data.code === 200) {
            // todo
            that.data.sealArr[e.currentTarget.dataset.index].order_status = 3
            that.setData({
              sealArr: that.data.sealArr
            })
            wx.showToast({
              title: '您确认收货成功'
            })
          } else {
            wx.showToast({
              title: res.data.message
            })
          }
        }
      }
      app.wxrequest(ce)
    }
  },
  // 关闭弹窗
  mOp () {
    this.setData({
      mask: false,
      mask2: false
    })
  },
  // 查看快递
  check (e) {
    // todo
    this.setData({
      mask: true
    })
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
