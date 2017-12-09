// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'qun'
  },
  save () {
    let that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.url,
      success () {
        wx.showToast({
          title: '已保存至相册'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    if (options.type === 'kf') {
      this.setData({
        s: true,
        url: '../../images/kfimg.jpg'
      })
      wx.setNavigationBarTitle({
        title: '联系客服'
      })
    } else {
      this.setData({
        url: '../../images/jlimg.jpg'
      })
    }
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
