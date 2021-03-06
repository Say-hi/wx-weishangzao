// 获取全局应用程序实例对象
const app = getApp()
const serviceUrl = require('../../utils/service')
const wxf = require('../../utils/common')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    photos: [],
    products: [],
    user: {},
    upimg: '../../images/up.png'
  },
  // 显示图片
  showImg (e) {
    let that = this
    if (e.currentTarget.dataset.type === 'img1') {
      wxf.showImg(that, e, 'photos')
    } else {
      wxf.showImg(that, e, 'products')
    }
  },
  // 删除图片
  delphoto (e) {
    let that = this
    if (e.currentTarget.dataset.type === 'img1') {
      wxf.delphoto(that, e, 'photos', function (that, coverImgArr) {
        that.setData({
          photos: coverImgArr
        })
      })
    } else {
      wxf.delphoto(that, e, 'products', function (that, coverImgArr) {
        that.setData({
          products: coverImgArr
        })
      })
    }
  },
  // 上传图片
  upPhoto (e) {
    let that = this
    if (e.currentTarget.dataset.type === 'img1') {
      wxf.upPhoto(that, 'photos', 6, function (that, coverImgArr) {
        that.setData({
          photos: coverImgArr
        })
      })
    } else {
      wxf.upPhoto(that, 'products', 5, function (that, coverImgArr) {
        that.setData({
          products: coverImgArr
        })
      })
    }
  },
  // 文字输入
  inputValue (e) {
    let type = e.currentTarget.dataset.type
    let value = e.detail.value
    let user = this.data.user
    if (type === 'truename') {
      user['true_name'] = value
    } else if (type === 'wechatno') {
      user['wechat_no'] = value
    } else if (type === 'residence') {
      user['residence'] = value
    } else if (type === 'signature') {
      user['signature'] = value
    } else if (type === 'team') {
      user['team'] = value
    } else if (type === 'lever') {
      user['lever'] = value
    } else if (type === 'weishanglu') {
      user['weishang_lu'] = value
    } else if (type === 'productname') {
      user['product_name'] = value
    }
    this.setData({
      user: this.data.user
    })
  },
  // 保存微商信息
  save () {
    let user = this.data.user
    let that = this
    let photos = ''
    let products = ''
    if (that.data.photos.length === 0) {
      photos = ''
    } else {
      photos = that.data.photos.join(',')
    }
    if (this.data.products.length === 0) {
      products = ''
    } else {
      products = that.data.products.join(',')
    }
    let obj = {
      url: serviceUrl.editeUserInfo,
      data: {
        session_key: wx.getStorageSync('session_key'),
        wechat_no: user.wechat_no || '',
        true_name: user.true_name || '',
        residence: user.residence || '',
        signature: user.signature || '',
        team: user.team || '',
        lever: user.lever || '',
        weishang_lu: user.weishang_lu || '',
        product_name: user.product_name || '',
        products: products,
        photos: photos
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          wx.showToast({
            title: '保存信息成功'
          })
          setTimeout(function () {
            // wx.navigateBack({
            //   delta: 1
            // })
            that.setData({
              hide: false
            })
          }, 1000)
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(obj)
  },
  // 获取微商信息
  getInfo () {
    let that = this
    let o = {
      url: serviceUrl.weiShangMainPage,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 400) {
          return wx.redirectTo({
            url: '../weishang/weishang'
          })
        }
        that.setData({
          user: res.data.data,
          products: res.data.data.products,
          photos: res.data.data.photos
        })
      }
    }
    app.wxrequest(o)
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
            userInfo: res.data.data
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
  del () {
    this.setData({
      hide: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getInfo()
    this.getUserInfo()
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
      title: '微商荣耀排行榜火热评选中！赶紧为您支持的微商团队 人物投上一票吧～',
      path: `pages/supportPage/supportPage?id=${this.data.userInfo.user_id}`
    }
  }
})
