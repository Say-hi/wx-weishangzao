// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    user: {
      img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      name: '国际团队',
      number: 'awxasdf',
      influence: 234,
      agency: 123,
      support: 1232,
      address: '温州',
      sign: '人一定要有梦想',
      team: '团队asdf',
      level: 'zaasdf',
      experience: '阿斯兰的房间爱死了打开房间爱死爱死了打开房间爱死爱死了打开房间爱死了贷款',
      product: '阿斯顿减肥拉萨的费阿斯顿减肥拉萨的费阿斯顿减肥拉萨的费阿斯顿减肥拉萨的费',
      imageArr: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      ]
    }
  },
  // 预览图片
  previewImg (e) {
    let that = this
    wx.previewImage({
      current: that.data.user.imageArr[e.currentTarget.dataset.index], // 当前显示图片的http链接
      urls: that.data.user.imageArr // 需要预览的图片http链接列表
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
      data: that.data.user.number,
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
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
