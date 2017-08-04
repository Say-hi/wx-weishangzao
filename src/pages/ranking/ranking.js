// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: [], // picker值
    months: [], // 可选月份值
    rankNavArr: ['总影响力', '支持度最高', '代理最多'], // rank-nav标题
    curRankNav: 0, // rank-nav当前选择项
    rankContentArr: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '美颜高级团队1',
        number: 1000
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '美颜高级团队2',
        number: 200
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '美颜高级团队3',
        number: 300
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '美颜高级团队4',
        number: 400
      }
    ]
  },
  // 获取当前月份
  curMonth () {
    let that = this
    let month = (new Date()).getMonth() + 1
    for (let i = 1; i <= month; i++) {
      that.data.months.push(i)
    }
    this.data.rankNavArr.push(month + '月份▼')
    this.data.value.push((month - 1))
    this.setData({
      months: that.data.months,
      value: that.data.value,
      rankNavArr: that.data.rankNavArr
    })
  },
  // 类型选择切换
  typeChoose (e) {
    this.setData({
      curChoose: e.currentTarget.dataset.index
    })
  },
  // 月份选择
  bindChange (e) {
    let that = this
    this.data.value[0] = e.detail.value[0]
    this.data.rankNavArr[3] = e.detail.value[0] * 1 + 1 + '月份▼'
    this.setData({
      value: that.data.value,
      rankNavArr: that.data.rankNavArr
    })
  },
  // 导航类型选择
  rankNavChoose (e) {
    if (e.currentTarget.dataset.index * 1 === 3) {
      return this.setData({
        maskShow: true
      })
    }
    this.setData({
      curRankNav: e.currentTarget.dataset.index
    })
  },
  // 去除遮罩
  noMask () {
    this.setData({
      maskShow: false
    })
  },
  // 月份确认
  confirm () {
    // todo
    this.setData({
      maskShow: false
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
