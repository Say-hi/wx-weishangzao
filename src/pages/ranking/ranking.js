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
    value: [], // picker值
    months: [], // 可选月份值
    rankNavArr: ['总影响力', '支持度最高', '保证金最多'], // rank-nav标题
    curRankNav: 0, // rank-nav当前选择项
    curChoose: 2,
    page: 1,
    rankContentArr: [],
    orderArr: ['effect_num', 'support_count', 'money_count']
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
    let rankNavArr = ['知名度', '点赞最多', '担保金最多']
    if (e.currentTarget.dataset.index * 1 === 1) {
      rankNavArr.push(this.data.rankNavArr[3])
    } else {
      rankNavArr = ['总影响力', '支持度最高', '担保金最多']
      rankNavArr.push(this.data.rankNavArr[3])
    }
    console.log(rankNavArr)
    this.setData({
      page: 1,
      rankNavArr: rankNavArr,
      curChoose: e.currentTarget.dataset.index
    })
    this.getRank('', 1, (this.data.value[0] * 1 + 1))
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
      page: 1,
      curRankNav: e.currentTarget.dataset.index
    })
    this.getRank('', 1, (this.data.value[0] * 1 + 1))
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
      page: 1,
      maskShow: false
    })
    this.getRank('', 1, (this.data.value[0] * 1 + 1))
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
        if (page * 1 === 1) {
          that.setData({
            rankContentArr: []
          })
        }
        that.setData({
          rankContentArr: that.data.rankContentArr.concat(res.data.data.rankContentList)
        })
      }
    }
    app.wxrequest(objj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.curMonth()
    this.getRank('', 1, 0)
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
  },
  onReachBottom () {
    if (!this.data.more) return
    this.getRank('', ++this.data.page, (this.data.value[0] * 1 + 1))
  }
})
