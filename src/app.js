/**
 * API module
 * @type {Object}
 * 用于将微信官方`API`封装为`Promise`方式
 * > 小程序支持以`CommonJS`规范组织代码结构
 */
// const wechat = require('./utils/wechat')
// const Promise = require('./utils/bluebird')
/*eslint-disable*/
const useUrl = require('./utils/service')
App({
  /**
   * Global shared
   * 可以定义任何成员，用于在整个应用中共享
   */
  data: {
    name: 'WeApp Boilerplate'
  }
  // 发起微信支付
  wxpay (obj) {
    let objs = {
      timeStamp: obj.timeStamp,
      nonceStr: obj.nonceStr,
      package: obj.package,
      signType: obj.signType || 'MD5',
      paySign: obj.paySign,
      success: obj.success || function (res) {
        console.log('未传入success回调函数', res)
      },
      fail: obj.fail || function (err) {
        console.log('未传入fail回调函数,err:', err.errMsg)
      },
      complete: obj.complete || function () {}
    }
    wx.requestPayment(objs)
  },
  // 上传媒体文件
  wxUpload (obj) {
    let s = {
      url: obj.url,
      filePath: obj.filePath,
      name: obj.name || 'file',
      header: {
        'content-type' : 'multipart/form-data'
      },
      formData: obj.formData,
      success: obj.success || function (res) {
        console.log('未传入成功回调函数', res)
      },
      fail: obj.fail || function (res) {
        console.log('为传入失败回调函数', res)
      },
      complete: obj.complete || function () {}
    }
    wx.uploadFile(s)
  },
  // 请求数据
  wxrequest (obj) {
    wx.request({
      url: obj.url || useUrl.serviceUrl.login,
      method: obj.method || 'POST',
      data: obj.data || {},
      header: {
        'content-type': obj.header || 'application/x-www-form-urlencoded'
      },
      success: obj.success || function () {
        console.log('未传入success回调函数')
      },
      fail: obj.fail || function (err) {
        console.log('未传入fail回调函数,err:' + err.errMsg)
      },
      complete: obj.complete || function () {}
    })
  },
  // 用户登陆
  wxlogin (loginSuccess, params) {
    let that = this
    // 无条件获取登陆code
    wx.login({
      success (res) {
        // console.log(res)
        let code = res.code
        // 获取用户信息
        let obj = {
          success (data) {
            wx.setStorageSync('userInfo', data.userInfo)
            let iv = data.iv
            let encryptedData = data.encryptedData
            // 获取session_key
            let objs = {
              url: useUrl.login,
              data: {
                code: code,
                iv: iv,
                encryptedData: encryptedData
              },
              success (session) {
                let session_key = 'akljgaajgoehageajnafe'
                wx.setStorageSync('session_key', session_key)
                // console.log(session)
                if (loginSuccess) {
                  loginSuccess(params)
                }
              }
            }
            that.wxrequest(objs)
          },
          fail () {
            wx.showToast({
              title: '您未授权小程序,请授权登陆'
            })
          }
        }
        that.getUserInfo(obj)
      },
      fail (err) {
        console.log('loginError' + err)
      }
    })
  },
  // 获取用户信息
  getUserInfo (obj) {
    wx.getUserInfo({
      withCredentials: obj.withCredentials || true,
      success: obj.success || function (res) {
        console.log('getUserInfoSuccess', res)
      },
      fail: obj.fail || function (res) {
        console.log('getUserInfoFail', res)
      }
    })
  },
  /**
   * 生命周期函数--监听小程序初始化
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch () {
    // console.log(' ========== Application is launched ========== ')
    this.wxlogin()
  },
  /**
   * 生命周期函数--监听小程序显示
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow () {
    // console.log(' ========== Application is showed ========== ')
  },
  /**
   * 生命周期函数--监听小程序隐藏
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide () {
    // console.log(' ========== Application is hid ========== ')
  }
})
