// 获取全局应用程序实例对象
// const app = getApp()
const dates = (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate()
const datess = ((new Date()).getFullYear() + 1) + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate()
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'release',
    time: '',
    date: dates,
    starTime: dates,
    endTime: datess,
    index: 0,
    array: ['选择分类', '美妆护肤', '母婴用品', '服饰鞋子', '保健养生', '内衣首饰', '数码产品', '零食玩具', '护眼用品', '生活用品'],
    upImg: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ]
  },
  // 分类选择
  bindPickerChange (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 日期选择
  bindDateChange (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      time: e.detail.value
    })
  },
  // 输入框文字输入
  inputValue (e) {
    let type = e.currentTarget.dataset.type
    let value = e.detail.value
    if (type === 'title') {
      this.setData({
        title: value
      })
    } else if (type === 'money') {
      this.setData({
        money: value
      })
    } else if (type === 'count') {
      this.setData({
        count: value
      })
    } else if (type === 'time') {
      this.setData({
        time: value
      })
    } else if (type === 'full') {
      this.setData({
        full: value
      })
    } else if (type === 'introduce') {
      this.setData({
        introduce: value
      })
    } else if (type === 'allMoney') {
      this.setData({
        allMoney: value
      })
    }
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
