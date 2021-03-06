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
    pLevel: ['p0', 'p1', 'p2', 'p3', 'p4', 'p5']
  },
  // 预览图片
  previewImg (e) {
    let that = this
    wx.previewImage({
      current: that.data.user.products[e.currentTarget.dataset.index], // 当前显示图片的http链接
      urls: that.data.user.products // 需要预览的图片http链接列表
    })
  },
  // mask取消按钮
  cancel () {
    this.setData({
      mask: false
    })
  },
  // mask显示
  showMask () {
    this.setData({
      mask: true,
      maskShowAni: 'animated zoomIn'
    })
  },
  // mask确认操作
  confirm () {
    // todo 需要执行的行为
    let that = this
    wx.setClipboardData({
      data: that.data.user.wechat_no,
      success (res) {
        // console.log(res)
        wx.showToast({
          title: `请到微信中添加好友，输入框内长按粘贴`,
          mask: true
        })
      },
      fail (err) {
        wx.showToast({
          title: `错误信息:${err.errMsg}`
        })
      },
      complete () {
        that.setData({
          mask: false
        })
      }
    })
  },
  // 获取个人信息
  getInfo (id) {
    let that = this
    let obj = {
      url: serviceUrl.userDetail,
      data: {
        session_key: wx.getStorageSync('session_key'),
        user_id: id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            user: res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.message,
            mask: true
          })
          setTimeout(function () {
            wx.reLaunc({
              url: '../index/idnex'
            })
          }, 1000)
        }
      }
    }
    app.wxrequest(obj)
  },
  // 微商关联
  follow (e) {
    let that = this
    let type = e.currentTarget.dataset.type
    let f = {
      url: serviceUrl.userAddOrCancelRelation,
      data: {
        session_key: app.gs(),
        user_id: that.data.id,
        type: type
      },
      success (res) {
        // console.log(res)
        wx.hideLoading()
        if (res.data.code === 200) {
          that.getInfo(that.data.id)
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(f)
  },
  // 团队支持
  support () {
    let that = this
    let s = {
      url: serviceUrl.addUserSupport,
      data: {
        session_key: app.gs(),
        user_id: that.data.id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.getInfo(that.data.id)
          // setTimeout(() => {
          that.setData({
            showTips: true
          })
          // }, 300)
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(s)
  },
  maskO (e) {
    if (e.currentTarget.dataset.type === 'cancel') {
      this.setData({
        showTips: false
      })
    } else {
      wx.redirectTo({
        url: '../qun/qun'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    this.setData({
      id: params.id
    })
    // this.getInfo(params.id)
    app.wxlogin(this.getInfo, params.id)
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
  onShareAppMessage () {
    return {
      title: `微商荣耀排行榜火热评选中！赶紧为您支持的微商团队 人物投上一票吧～`,
      path: `pages/supportPage/supportPage?id=${this.data.id}`
    }
  }
})
