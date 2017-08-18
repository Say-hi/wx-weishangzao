// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nearArr: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '一帘幽梦',
        sign: '用心良苦却成空',
        wxnumber: 'asdf654'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '一帘幽梦',
        sign: '用心良苦却成空',
        wxnumber: 'asdf654'
      }
    ]
  },
  // 一键复制
  copy () {
    let data = ''
    for (let i of this.data.nearArr) {
      if (!i.wxnumber) {
        data += ' '
      } else {
        data += (i.wxnumber + ' ')
      }
    }
    wx.setClipboardData({
      data: data,
      success () {
        wx.showToast({
          title: '一键复制成功，请在微信中添加好友'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (parmas) {
    let {lat, lng} = parmas
    console.log(lat, lng)
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
  }
})
