// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    noWeChat: true,
    needShare: true,
    lists: [
      // {
      //   src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   name: '测试一号',
      //   wechat_no: 'wxNubmer1',
      //   id: 1
      // },
      // {
      //   src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   name: '测试一号',
      //   wechat_no: 'wxNubmer1',
      //   id: 1
      // }
      // {
      //   src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   name: '测试2号',
      //   number: 'wxNubmer2'
      // },
      // {
      //   src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   name: '测试3号',
      //   number: 'wxNubmer3'
      // },
      // {
      //   src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   name: '测试4号',
      //   number: 'wxNubmer4'
      // }
    ]
  },
  inputValue (e) {
    this.setData({
      wechat_no: e.detail.value
    })
  },
  addhaoyou () {
    if (!this.data.copy) {
      wx.showToast({
        title: '您需要分享微商荣耀后方可添加好友'
      })
      this.setData({
        needShare: false
      })
      return
    }
    let s = ''
    this.data.lists.forEach(v => {
      s += `${v.wechat_no} `
    })
    console.log(s)
    wx.setClipboardData({
      data: s
    })
    this.hufenSuceess()
  },
  // 获取用户信息
  getUserInfo () {
    let that = this
    let s = {
      url: useUrl.userCenter,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            user: res.data.data
          })
          if (!res.data.data.wechat_no) {
            that.setData({
              noWeChat: false
            })
          }
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(s)
  },
  // 更新用户资料
  upDate () {
    let that = this
    let s = {
      url: useUrl.updateMapUser,
      data: {
        session_key: app.gs(),
        wechat_no: that.data.wechat_no
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          wx.showToast({
            title: '信息更新成功'
          })
          that.setData({
            noWeChat: true
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
      noWeChat: true
    })
  },
  getlists () {
    let that = this
    let gl = {
      url: useUrl.returnrandWeiShang,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            lists: res.data.data
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
  getImg () {
    let that = this
    let i = {
      url: useUrl.extensionErcode,
      data: {
        session_key: app.gs()
      },
      success (res) {
        that.setData({
          shareImg: res.data.data.ercodeUrl
        })
      }
    }
    app.wxrequest(i)
  },
  hufenSuceess () {
    let id = ''
    this.data.lists.forEach(v => {
      id += `${v.id},`
    })
    id = id.slice(0, (id.length - 1))
    console.log(id)
    let hf = {
      url: useUrl.updateSubscribes,
      data: {
        session_key: app.gs(),
        subscribe_user_id: id
      },
      success () {
        wx.hideLoading()
      }
    }
    app.wxrequest(hf)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getUserInfo()
    this.getlists()
    this.getImg()
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
    let that = this
    return {
      title: `您的好友${that.data.user.user_name}向您推荐微商荣耀`,
      imageUrl: that.data.shareImg,
      path: 'pages/index/index',
      success () {
        that.setData({
          copy: true
        })
      }
    }
  }
})
