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
    sh: {},
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
        if (page * 1 === 1) {
          that.setData({
            sealArr: []
          })
        }
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
    } else if (type === 'confirm' && (e.currentTarget.dataset.status * 1) === 0) {
      this.setData({
        index: e.currentTarget.dataset.index
      })
      that.forPay(e.currentTarget.dataset.id)
    }
  },
  // 关闭弹窗
  mOp (e) {
    let that = this
    if (e.currentTarget.dataset.type === 'payConfirm') {
      that.upInfo()
    } else {
      this.setData({
        mask: false,
        mask2: false
      })
    }
  },
  // 提交用户位置信息
  upInfo () {
    let that = this
    if (!that.data.sh.name || !that.data.sh.mobile || !that.data.sh.address) {
      return wx.showToast({
        title: '请补全您的收货信息'
      })
    }
    let pc = {
      url: serviceUrl.updateOrderUserInfo,
      data: {
        session_key: app.gs(),
        order_id: that.data.sealArr[that.data.index].order_id,
        user_name: that.data.sh.name,
        mobile: that.data.sh.mobile,
        address: that.data.sh.address,
        buyer_message: that.data.sh.liuyan || ''
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.data.sealArr[that.data.index].order_status = 1
          that.setData({
            sealArr: that.data.sealArr,
            mask3: false
          })
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(pc)
  },
  // 查看快递
  check (e) {
    // todo
    this.setData({
      mask: true
    })
  },
  // 支付订单
  forPay (id) {
    let that = this
    let fp = {
      url: serviceUrl.payByOrder,
      data: {
        session_key: app.gs(),
        order_id: id
      },
      success (res) {
        // 零钱支付成功
        wx.hideLoading()
        if (res.data.code === 200) {
          wx.showToast({
            title: '支付成功',
            mask: true
          })
          that.setData({
            mask3: true
          })
          // that.getList(1)
        } else if (res.data.code === 201) {
          // 发起微信支付
          let obj = {
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            paySign: res.data.data.paySign,
            success (res) {
              if (res.errMsg === 'requestPayment:ok') {
                // 微信支付成功
                console.log(res)
                that.setData({
                  mask3: true
                })
                // that.getList(1)
              } else {
                // 微信支付失败
                wx.showToast({
                  title: '未完成支付'
                })
              }
            },
            fail (res) {
              // 调用支付失败
              console.log(res)
              wx.showToast({
                title: '未完成支付'
              })
              // that.setData({
              //   mask3: true
              // })
              // that.data.saleArr[that.data.index].order_status = 1
              // that.setData({
              //   saleArr: that.data.saleArr
              // })
            }
          }
          app.wxpay(obj)
        }
      }
    }
    app.wxrequest(fp)
  },
  // 收货信息录入
  inputValue (e) {
    let type = e.currentTarget.dataset.type
    let value = e.detail.value
    let sh = this.data.sh
    // console.log(e)
    if (type === 'name') {
      sh['name'] = value
    } else if (type === 'mobile') {
      sh['mobile'] = value
    } else if (type === 'address') {
      sh['address'] = value
    } else if (type === 'liuyan') {
      sh['liuyan'] = value
    }
    this.setData({
      sh: this.data.sh
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
