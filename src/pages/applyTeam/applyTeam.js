// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    upImg: '../../images/team-bg.png'
  },
  // 点击上传头像图片
  upload () {
    let teamInput = {
      name: this.data.name,
      number: this.data.number
    }
    wx.setStorageSync('teamInput', teamInput)
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        const src = res.tempFilePaths[0]
        wx.redirectTo({
          url: `../upload/upload?src=${src}`
        })
      }
    })
  },
  // 输入内容
  teamInput (e) {
    let type = e.currentTarget.dataset.type
    if (type === 'name') {
      this.setData({
        name: e.detail.value
      })
    } else if (type === 'number') {
      this.setData({
        number: e.detail.value
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    let teamInput = wx.getStorageSync('teamInput')
    let { avatar } = params
    if (avatar) {
      this.setData({
        upImg: avatar,
        hide: true
      })
    }
    if (teamInput) {
      this.setData({
        name: teamInput.name,
        number: teamInput.number
      })
    }
    // TODO: onLoad
  },
  // 提交信息
  confirm () {
    wx.removeStorage({
      key: 'teamInput'
    })
    // todo 提交信息
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
