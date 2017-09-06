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
    dots: false, // 轮播图是否显示点
    circular: true, // 轮播衔接
    page: 1,
    pLevel: ['p0', 'p1', 'p2', 'p3', 'p4', 'p5'],
    imgUrls: [],
    index: 0,
    array: [{
      'cat_id': 0,
      'cat_name': '选择分类'
    }],
    products: [],
    curChoose: 2,
    searchValue: ''
  },
  // 分类选择
  bindPickerChange (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 消息跳转
  message () {
    wx.navigateTo({
      url: '../message/message'
    })
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
  // 获取产品分类
  getCategoryLists () {
    let that = this
    let gc = {
      url: serviceUrl.getCategoryLists,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            array: that.data.array.concat(res.data.data)
          })
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(gc)
  },
  // 类型选择切换
  typeChoose (e) {
    this.setData({
      page: 1,
      curChoose: e.currentTarget.dataset.index
    })
    if (e.currentTarget.dataset.index * 1 === 2) {
      this.getList(this.data.searchValue, 1, '')
    } else {
      this.getList(this.data.searchValue, 1, 'guarantee')
    }
  },
  // 搜索输入框搜索
  search (e) {
    this.setData({
      page: 1,
      searchValue: e.detail.value
    })
    if (this.data.curChoose * 1 === 1) {
      this.getList(this.data.searchValue, 1, '')
    } else {
      this.getList(this.data.searchValue, 1, 'guarantee')
    }
  },
  // 获取轮播图
  // getCarousel () {
  //   let that = this
  //   let obj = {
  //     url: serviceUrl.getBanners,
  //     data: {
  //       session_key: wx.getStorageSync('session_key')
  //     },
  //     success (res) {
  //       that.setData({
  //         imgUrls: res.data.data
  //       })
  //     }
  //   }
  //   app.wxrequest(obj)
  // },
  // 获取产品列表
  getList (keyword, page, sort) {
    let that = this
    let p = {
      url: serviceUrl.productLists,
      data: {
        session_key: app.gs(),
        page: page,
        keyword: keyword,
        sort: sort,
        cat_id: that.data.array[that.data.index].cat_id
      },
      success (res) {
        wx.hideLoading()
        if (page === 1) {
          that.setData({
            products: []
          })
        }
        if (res.data.code === 200) {
          app.setMore(res.data.data, that)
          that.setData({
            products: that.data.products.concat(res.data.data)
          })
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(p)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // this.getCarousel()
    this.getCategoryLists()
    this.getList('', 1, '')

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
    app.getMessageCount(this)
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
    if (this.data.curChoose * 1 === 2) {
      this.getList(this.data.searchValue, ++this.data.page, '')
    } else {
      this.getList(this.data.searchValue, ++this.data.page, 'guarantee')
    }
  }
})
