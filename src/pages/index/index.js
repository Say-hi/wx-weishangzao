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
    ], // 轮播图片
    navTab: [
      {
        url: '../weishang/weishang',
        text: '我是微商',
        img: '../../images/weishang.png'
      },
      {
        url: '../map/map',
        text: '微商地图',
        img: '../../images/ditu.png'
      },
      {
        url: '../ranking/ranking',
        text: '历史排行',
        img: '../../images/haibao.png'
      },
      {
        url: '../qinghuo/qinghuo',
        text: '清货神器',
        img: '../../images/qinghuo.png'
      }
    ],
    rankNavArr: ['总影响力', '支持度最高', '担保金最多'], // rank-nav标题
    curRankNav: 0, // rank-nav当前选择项
    rankContentList: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: 'ZS钻石国际团队',
        user_id: 123123,
        yx: 199,
        zc: 112,
        td: 213
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '6rpx solid #eee;',
        user_id: 123123,
        yx: 199,
        zc: 112,
        td: 213
      }
    ]
  },
  // 底部导航url
  chooseOperation (e) {
    if (e.currentTarget.dataset.type === 'right') {
      wx.navigateTo({
        url: '../user/user'
      })
    }
  },
  // 获取当前月份
  curMonth () {
    let that = this
    this.data.rankNavArr.push((new Date()).getMonth() + 1 + '月份')
    this.setData({
      rankNavArr: that.data.rankNavArr
    })
  },
  // 获取搜索框输入内容
  searchInput (e) {
    this.setData({
      searchValue: e.detail.value
    })
  },
  // 搜索内容
  searchConfirm () {
    if (!this.data.searchValue) {
      return wx.showToast({
        title: '请输入有效的内容'
      })
    }
    // todo 获取搜索内容
  },
  // 类型选择切换
  typeChoose (e) {
    this.setData({
      curChoose: e.currentTarget.dataset.index
    })
  },
  // 导航类型选择
  rankNavChoose (e) {
    if (e.currentTarget.dataset.index * 1 === 3) return
    this.setData({
      curRankNav: e.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.curMonth()
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
