// 获取全局应用程序实例对象
const app = getApp()
// const app = getApp()
const serviceUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pLevel: ['p0', 'p1', 'p2', 'p3', 'p4', 'p5'],
    infos: [
      {
        t: '商品名称',
        c: ''
      },
      {
        t: '分类',
        c: ''
      },
      {
        t: '零售价',
        c: ''
      },
      {
        t: '清货价',
        c: ''
      },
      {
        t: '数量',
        c: ''
      },
      {
        t: '产品完整性',
        c: ''
      },
      {
        t: '产品描述',
        c: ''
      }
    ],
    sh: {},
    count: 1,
    introduce: '',
    imageArr: [],
    nubmer: 0,
    commentArr: []
  },
  // 回复留言
  replyComment (e) {
    if ((this.data.user.user_id * 1) !== (this.data.info.user_info.user_id * 1)) {
      return wx.showToast({
        title: '只有发布者可回复留言'
      })
    }
    this.setData({
      reply: true,
      user_id: e.currentTarget.dataset.userid,
      leaving_id: e.currentTarget.dataset.liuyan,
      messageMaask: true
    })
  },
  // 删除留言
  delComment () {
    let that = this
    let dc = {
      url: serviceUrl.deleteReleaseLeavingMessage,
      data: {
        session_key: app.gs(),
        id: that.data.leaving_id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          wx.showToast({
            title: '删除成功'
          })
          that.setData({
            buyMask: false,
            messageMaask: false,
            reply: false,
            page: 1,
            commentArr: []
          })
          that.getMessage(that.data.id, 1)
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(dc)
  },
  // 支付
  // pay () {
  //   // todo
  //   this.setData({
  //     buyMask: false
  //   })
  // },
  // 计算数量
  countNumber (e) {
    let type = e.currentTarget.dataset.type
    if (type === 'add') {
      if (this.data.count * 1 >= this.data.info.product_info.stock_num) return
      this.setData({
        count: ++this.data.count
      })
    } else {
      if (this.data.count * 1 === 1) return
      this.setData({
        count: --this.data.count
      })
    }
    this.setData({
      money: (this.data.count * this.data.info.product_info.clearance_price).toFixed(2)
    })
  },
  // 底部操作
  bottomOp (e) {
    let that = this
    let type = e.currentTarget.dataset.type
    if (type === 'share') {
      this.setData({
        shareMask: true
      })
    } else if (type === 'want') {
      if (this.data.is_out_time * 1 === 1) {
        return wx.showToast({
          title: '产品已过期，无法购买'
        })
      }
      this.setData({
        buyMask: true
      })
    } else if (type === 'comment') {
      this.setData({
        user_id: 0,
        leaving_id: 0,
        messageMaask: true
      })
    } else if (type === 'collect') {
      // todo collect
      let url = serviceUrl.addCollection
      if (that.data.info.product_info.is_collection) {
        // 取消收藏
        url = serviceUrl.deleteCollection
      }
      let col = {
        url: url,
        data: {
          session_key: app.gs(),
          good_id: that.data.id
        },
        success (res) {
          wx.hideLoading()
          if (res.data.code === 200) {
            that.data.info.product_info.is_collection = !that.data.info.product_info.is_collection
            that.setData({
              info: that.data.info
            })
          } else {
            wx.showToast({
              title: res.data.message
            })
          }
        }
      }
      app.wxrequest(col)
    } else if (type === 'gofabu') {
      wx.redirectTo({
        url: '../release/release'
      })
    }
  },
  // 去除遮罩
  delMask () {
    this.setData({
      messageMaask: false,
      shareMask: false,
      reply: false,
      buyMask: false
    })
  },
  // 计算相对时间
  get (time) {
    return app.moment(time)
  },
  goUserDetail (e) {
    wx.navigateTo({
      url: `../supportPage/supportPage?id=${e.currentTarget.dataset.id}`
    })
  },
  // 获取产品详情
  getDetail (id) {
    let that = this
    let gd = {
      url: serviceUrl.productDetail,
      data: {
        session_key: app.gs(),
        good_id: id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          if (res.data.data.product_info.stock_num * 1 === 0) {
            wx.showToast({
              title: '该商品无库存啦'
            })
            return setTimeout(() => {
              wx.redirectTo({
                url: '../sale/sale'
              })
            })
          }
          that.data.infos[0]['c'] = res.data.data.product_info.good_name
          that.data.infos[1]['c'] = res.data.data.product_info.category_name
          that.data.infos[2]['c'] = res.data.data.product_info.original_price
          that.data.infos[3]['c'] = res.data.data.product_info.clearance_price
          that.data.infos[4]['c'] = res.data.data.product_info.stock_num
          that.data.infos[5]['c'] = `${res.data.data.product_info.product_integrity}%`
          that.data.infos[6]['c'] = res.data.data.product_info.describe
          that.setData({
            infos: that.data.infos,
            info: res.data.data,
            is_out_time: res.data.data.product_info.is_out_time
          })
          if (res.data.data.product_info.is_out_time * 1 === 1) {
            setTimeout(() => {
              wx.showToast({
                title: '该产品已过期，无法购买'
              })
            }, 1000)
          }
        } else {
          wx.showToast({
            title: res.data.message
          })
          // setTimeout(() => {
          //   wx.showToast({
          //     title: '产品过期了'
          //   })
          // }, 100)
          // setTimeout(() => {
          //   wx.showToast({
          //     title: '产品过期了'
          //   })
          //   wx.reLaunch({
          //     url: '../sale/sale'
          //   })
          // }, 1000)
        }
      }
    }
    app.wxrequest(gd)
  },
  // 获取留言列表
  getMessage (id, page) {
    let that = this
    let gm = {
      url: serviceUrl.getLeavingMessages,
      data: {
        session_key: app.gs(),
        good_id: id,
        page: page
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          app.setMore(res.data.data.lists, that)
          for (let i of res.data.data.lists) {
            // i.add_time = that.get(i.add_time)
            i.add_time = app.moment(i.add_time)
          }
          that.setData({
            number: res.data.data.count,
            commentArr: that.data.commentArr.concat(res.data.data.lists)
          })
        }
      }
    }
    app.wxrequest(gm)
  },
  // 发布回复留言
  sendComment () {
    let that = this
    if (!this.data.message) {
      return wx.showToast({
        title: '请输入有效内容'
      })
    }
    let r = {
      url: serviceUrl.releaseLeavingMessage,
      data: {
        session_key: app.gs(),
        good_id: that.data.id,
        leaving_id: that.data.leaving_id || 0,
        user_id: that.data.user_id || 0,
        content: that.data.message
      },
      success () {
        wx.hideLoading()
        that.setData({
          buyMask: false,
          messageMaask: false,
          reply: false,
          page: 1,
          commentArr: [],
          number: ++that.data.number
        })
        that.getMessage(that.data.id, 1)
      }
    }
    app.wxrequest(r)
  },
  // 购买产品
  pay () {
    let that = this
    let p = {
      url: serviceUrl.addOrder,
      data: {
        session_key: app.gs(),
        good_id: that.data.id,
        good_num: that.data.count || 1,
        recommend_id: that.data.recommend_id || 0
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            order_id: res.data.data.order_id
          })
          that.forPay(res.data.data.order_id)
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(p)
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
        wx.hideLoading()
        // 零钱支付成功
        if (res.data.code === 200) {
          wx.showToast({
            title: '支付成功',
            mask: true
          })
          that.setData({
            buyMask: false,
            addressMask: true
          })
        } else if (res.data.code === 201) {
          // 吊起微信支付
          let obj = {
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            paySign: res.data.data.paySign,
            success (res) {
              if (res.errMsg === 'requestPayment:ok') {
                // 微信支付成功
                // console.log(res)
                that.setData({
                  buyMask: false,
                  addressMask: true
                })
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
            }
          }
          app.wxpay(obj)
        }
      }
    }
    app.wxrequest(fp)
  },
  // 提交用户位置信息
  confirm () {
    let that = this
    if (!this.data.sh.name || !this.data.sh.mobile || (this.data.sh.mobile.length * 1 !== 11) || !this.data.sh.address) {
      return wx.showToast({
        title: '请补全您的收货信息'
      })
    }
    let cf = {
      url: serviceUrl.updateOrderUserInfo,
      data: {
        session_key: app.gs(),
        order_id: that.data.order_id,
        user_name: that.data.sh.name,
        mobile: that.data.sh.mobile,
        address: that.data.sh.address,
        buyer_message: that.data.sh.liuyan || ''
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          // that.setData({
          //   addressMask: false
          // })
          wx.redirectTo({
            url: '../buy/buy'
          })
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(cf)
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
    } else {
      return this.setData({
        message: value
      })
    }
    this.setData({
      sh: this.data.sh
    })
  },
  // 获取本地化分享次数
  getShareCount () {
    if (wx.getStorageSync('shareCount')) {
      this.setData({
        shareCount: wx.getStorageSync('shareCount')
      })
    } else {
      wx.setStorageSync('shareCount', '0')
      this.setData({
        shareCount: 0
      })
    }
  },
  // 获取用户信息
  getUserInfo () {
    let that = this
    let s = {
      url: serviceUrl.userCenter,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            user: res.data.data
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    let that = this
    this.setData({
      id: params.id,
      recommend_id: params.recommend_id || 0
    })
    if (params.recommend_id) {
      // 通过他人的分享进入
      console.log(1)
      return app.wxlogin(function (params) {
        that.getDetail(params.id)
        that.getMessage(params.id, 1)
      }, params)
    }
    this.getDetail(params.id)
    this.getMessage(params.id, 1)
    this.getShareCount()
    this.getUserInfo()
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
    this.getMessage(this.data.id, ++this.data.page)
  },
  // 转发消息
  onShareAppMessage () {
    if (this.data.shareCount < 2) {
      this.setData({
        shareMask: !this.data.shareMask
      })
    }
    ++this.data.shareCount
    this.setData({
      shareCount: this.data.shareCount
    })
    wx.setStorageSync('shareCount', this.data.shareCount)
    return {
      title: '宝贝详情',
      path: `pages/detail/detail?recommend_id=${this.data.info.product_info.user_id}&id=${this.data.id}`
    }
  }
})
