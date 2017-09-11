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
    page: 1,
    products: [
      // {
      //   img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   name: '一帘幽梦',
      //   time: '2017-12-05 12:58:20',
      //   price: 150,
      //   photos: [
      //     'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //     'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      //     'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      //   ],
      //   comment_count: 4,
      //   introduce: '测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍'
      // },
      // {
      //   img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   name: '一帘幽梦',
      //   time: '2017-12-05 12:58:20',
      //   price: 150,
      //   photos: [
      //     'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //     'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      //     'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      //   ],
      //   comment_count: 4,
      //   introduce: '测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍'
      // }
    ]
  },
  goDetail (e) {
    wx.navigateTo({
      url: `../detail/detail?id=${e.currentTarget.dataset.id}`
    })
  },
  // 取消收藏
  cancel (e) {
    let that = this
    let cs = {
      url: serviceUrl.deleteCollection,
      data: {
        session_key: app.gs(),
        good_id: e.currentTarget.dataset.id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.data.products.splice(e.currentTarget.dataset.index, 1)
          that.setData({
            products: that.data.products
          })
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(cs)
  },
  // 获取收藏列表
  getCollect (page) {
    let that = this
    let s = {
      url: serviceUrl.collectionLists,
      data: {
        session_key: app.gs(),
        page: page
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          app.setMore(res.data.data, that)
          that.setData({
            products: res.data.data
          })
        } else {
          wx.showTosat({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(s)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getCollect(1)
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
