// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    agentArr: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '东北小伙',
        sign: ',世间事除了生死哪一件事不是闲事世间事除了生死哪一件事不是闲事世间事除了生死哪一件事不是闲事世间事除了生死哪一件事不是闲事',
        id: 123123
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '东北小伙',
        sign: ',世间事除了生死哪一件事不是闲事世间事除了生死哪一件事不是闲事世间事除了生死哪一件事不是闲事世间事除了生死哪一件事不是闲事',
        id: 123123
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '东北小伙',
        sign: ',世间事除了生死哪一件事不是闲事世间事除了生死哪一件事不是闲事世间事除了生死哪一件事不是闲事世间事除了生死哪一件事不是闲事',
        id: 123123
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '东北小伙',
        sign: ',世间事除了生死哪一件事不是闲事世间事除了生死哪一件事不是闲事世间事除了生死哪一件事不是闲事世间事除了生死哪一件事不是闲事',
        id: 123123
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '东北小伙',
        sign: '世间事除了生死哪一件事不是闲事',
        id: 23452345
      }
    ]
  },
  // 删除代理
  del (e) {
    this.data.agentArr.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      agentArr: this.data.agentArr
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
