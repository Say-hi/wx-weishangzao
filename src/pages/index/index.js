// 获取全局应用程序实例对象
const app = getApp()
const serviceUrl = require('../../utils/service')

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dots: false, // 轮播图是否显示点
    circular: true, // 轮播衔接
    imgUrls: [], // 轮播图片
    curChoose: 2,
    page: 1,
    // order: 'effect_num',
    navTab: [
      {
        url: '../weishang/weishang',
        text: '我是微商',
        img: '../../images/weishang.png'
      },
      {
        url: '',
        text: '微商地图',
        img: '../../images/ditu.png'
      },
      {
        url: '../ranking/ranking',
        text: '历史排行',
        img: '../../images/haibao.png'
      },
      {
        url: '../sale/sale',
        text: '清货神器',
        img: '../../images/qinghuo.png'
      }
    ],
    rankNavArr: ['总影响力', '支持度最高', '担保金最多'], // rank-nav标题
    curRankNav: 0, // rank-nav当前选择项
    rankContentList: [],
    orderArr: ['effect_num', 'support_count', 'money_count']
  },
  showMessage (e) {
    if (e.currentTarget.dataset.index * 1 === 1) {
      wx.showToast({
        title: '该功能暂未开放！'
      })
    }
  },
  // 消息跳转
  message () {
    wx.navigateTo({
      url: '../message/message'
    })
  },
  // 底部导航url
  chooseOperation (e) {
    if (e.currentTarget.dataset.type === 'right') {
      wx.redirectTo({
        url: '../user/user'
      })
    } else if (e.currentTarget.dataset.type === 'center') {
      wx.navigateTo({
        url: '../faburuler/faburuler'
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
    this.setData({
      page: 1
    })
    // todo 获取搜索内容
    this.getRank(this.data.searchValue, 1, 0)
  },
  // 类型选择切换
  typeChoose (e) {
    let rankNavArr = ['总知名度', '点赞最多', '担保金最多']
    if (e.currentTarget.dataset.index * 1 === 1) {
      rankNavArr.push(this.data.rankNavArr[3])
    } else {
      rankNavArr = ['总影响力', '支持度最高', '担保金最多']
      rankNavArr.push(this.data.rankNavArr[3])
    }
    this.setData({
      page: 1,
      rankNavArr: rankNavArr,
      curChoose: e.currentTarget.dataset.index
    })
    if (this.data.searchValue) {
      this.getRank(this.data.searchValue, 1, 0)
    } else {
      this.getRank('', 1, 0)
    }
  },
  // 导航类型选择
  rankNavChoose (e) {
    if (e.currentTarget.dataset.index * 1 === 3) return
    this.setData({
      page: 1,
      curRankNav: e.currentTarget.dataset.index
    })
    if (this.data.searchValue) {
      this.getRank(this.data.searchValue, 1, 0)
    } else {
      this.getRank('', 1, 0)
    }
  },
  // 获取轮播图
  getCarousel () {
    let that = this
    let obj = {
      url: serviceUrl.getBanners,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success (res) {
        wx.hideLoading()
        that.setData({
          imgUrls: res.data.data
        })
      }
    }
    app.wxrequest(obj)
  },
  // 获取排行榜
  getRank (keyword, page, month) {
    let that = this
    let objj = {
      url: serviceUrl.index,
      data: {
        session_key: wx.getStorageSync('session_key'),
        keyword: keyword,
        order: that.data.orderArr[that.data.curRankNav],
        type: (that.data.curChoose * 1 === 2 ? 0 : 1),
        page: page,
        month: month
      },
      success (res) {
        wx.hideLoading()
        if (res.data.data.is_next_page === 1) {
          that.setData({
            more: true
          })
        } else {
          that.setData({
            more: false
          })
        }
        // app.setMore(res.data.data, that)
        if (page * 1 === 1) {
          that.setData({
            rankContentList: []
          })
        }
        that.setData({
          rankContentList: that.data.rankContentList.concat(res.data.data.rankContentList)
        })
      }
    }
    app.wxrequest(objj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    let params = {}
    if (options.scene) {
      params['id'] = decodeURIComponent(options.scene)
    } else {
      params['id'] = options.recommend_id
    }
    console.log(params)
    this.curMonth()
    let that = this
    app.wxlogin(function () {
      that.getCarousel()
      that.getRank('', 1, 0)
      app.getMessageCount(that)
    }, params)
    // 获取位置授权
    wx.getLocation({
      type: 'gcj02',
      success (res) {
        console.log(res)
      }
    })

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
    this.setData({
      searchValue: ''
    })
    app.getMessageCount(this)
    //
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
  // 触底加载更多
  onReachBottom () {
    if (!this.data.more) return
    if (this.data.searchValue) {
      this.getRank(this.data.searchValue, ++this.data.page, 0)
    } else {
      this.getRank('', ++this.data.page, 0)
    }
  },
  onShareAppMessage () {
    return {
      title: '分享微商荣耀',
      path: 'pages/index/index'
    }
  }
})
