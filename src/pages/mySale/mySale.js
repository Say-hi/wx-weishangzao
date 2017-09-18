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
    orderStatus: ['用户未付款', '点击确认发货', '待客户签收', '用户已收货', '退货', '举报']
  },
  // 快递信息录入
  inputValue (e) {
    let type = e.currentTarget.dataset.type
    let value = e.detail.value
    if (type === 'name') {
      this.setData({
        name: value
      })
    } else if (type === 'phone') {
      this.setData({
        phone: value
      })
    } else if (type === 'address') {
      this.setData({
        address: value
      })
    } else if (type === 'express') {
      this.setData({
        express: value
      })
    } else if (type === 'expressnumber') {
      this.setData({
        expressnumber: value
      })
    } else if (type === 'liuyan') {
      this.setData({

      })
    }
  },
  // 发货操作
  mOp (e) {
    let that = this
    if (e.currentTarget.dataset.type === 'cancel') {
      this.setData({
        mask: false
      })
    } else {
      let {express, expressnumber} = this.data
      if (!(express && expressnumber)) {
        wx.showToast({
          title: '请补全信息'
        })
      } else {
        let cd = {
          url: serviceUrl.confirmDelivery,
          data: {
            session_key: app.gs(),
            order_id: that.data.id,
            user_name: that.data.sealArr[that.data.index].shipping_info.user_name || '',
            mobile: that.data.sealArr[that.data.index].shipping_info.mobile || '',
            address: that.data.sealArr[that.data.index].shipping_info.address || '',
            shipping_name: that.data.express,
            shipping_no: that.data.expressnumber
          },
          success (res) {
            wx.hideLoading()
            if (res.data.code === 200) {
              wx.showToast({
                title: '发货信息录入成功'
              })
              that.data.sealArr[that.data.index].order_status = 2
              that.setData({
                mask: false,
                sealArr: that.data.sealArr
              })
            } else {
              console.log(res)
              wx.showToast({
                title: '发货错误，请联系客服'
              })
            }
          }
        }
        app.wxrequest(cd)
      }
    }
  },
  // 发货
  send (e) {
    if (e.currentTarget.dataset.status * 1 === 1 || e.currentTarget.dataset.status * 1 === 2) {
      this.setData({
        id: e.currentTarget.dataset.id,
        index: e.currentTarget.dataset.index,
        mask: true
      })
    }
  },
  // 获取卖出列表
  getSale (page) {
    let that = this
    let s = {
      url: serviceUrl.buyProductByTa,
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
        }
      }
    }
    app.wxrequest(s)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getSale(1)
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
    this.getSale(++this.data.page)
  }
})
