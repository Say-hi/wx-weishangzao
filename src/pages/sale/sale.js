// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dots: false, // 轮播图是否显示点
    circular: true, // 轮播衔接
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    products: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '一帘幽梦',
        time: '2017-12-05 12:58:20',
        price: 150,
        photos: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        comment_count: 4,
        introduce: '测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '一帘幽梦',
        time: '2017-12-05 12:58:20',
        price: 150,
        photos: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        comment_count: 4,
        introduce: '测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍'
      }
    ]
  },
  chooseOperation (e) {
    if (e.currentTarget.dataset.type === 'right') {
      wx.navigateTo({
        url: '../user/user'
      })
    } else if (e.currentTarget.dataset.type === 'center') {
      wx.navigateTo({
        url: '../faburuler/faburuler'
      })
    }
  },
  // 类型选择切换
  typeChoose (e) {
    this.setData({
      curChoose: e.currentTarget.dataset.index
    })
  },
  // 搜索输入框搜索
  search (e) {
    this.setData({
      searchValue: e.detail.value
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
