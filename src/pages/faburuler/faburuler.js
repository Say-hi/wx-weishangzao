// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {
        name: '已阅读并承诺遵守《清货神器说明》条例',
        value: '已阅读并承诺遵守《清货神器说明》条例',
        checked: true
      }
    ]
  },
  checkboxChange () {
    this.data.items[0].checked = !this.data.items[0].checked
    this.setData({
      items: this.data.items
    })
  },
  go () {
    if (!this.data.items[0].checked) {
      return wx.showToast({
        title: '请勾选同意本平台发布规则'
      })
    } else {
      wx.setStorageSync('fabu', 'true')
      wx.redirectTo({
        url: '../release/release'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    if (wx.getStorageSync('fabu')) {
      wx.redirectTo({
        url: '../release/release'
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
