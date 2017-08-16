// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sealArr: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '一脸油菜',
        price: 150,
        status: 0
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '一脸油菜',
        price: 150,
        status: 1
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '一脸油菜',
        price: 150,
        status: 2
      }
    ]
  },
  inputValue (e) {
    let type = e.currentTarget.dataset.type
    let value = e.detail.value
    if (type === 'name') {
      this.setData({
        name: value
      })
    } else if (type === 'phone') {
      this.setData({
        phone: value
      })
    } else if (type === 'address') {
      this.setData({
        address: value
      })
    } else if (type === 'express') {
      this.setData({
        express: value
      })
    } else if (type === 'expressnumber') {
      this.setData({
        expressnumber: value
      })
    }
  },
  // 发货操作
  mOp (e) {
    if (e.currentTarget.dataset.type === 'cancel') {
      this.setData({
        mask: false
      })
    } else {
      let {name, phone, address, express, expressnumber} = this.data
      if (!(name && phone && address && express && expressnumber)) {
        wx.showToast({
          title: '请补全信息'
        })
      }
        // todo
    }
  },
  // 发货
  send (e) {
    if (e.currentTarget.dataset.status * 1 !== 0) return
    this.setData({
      mask: true
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
