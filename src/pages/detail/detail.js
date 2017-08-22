// 获取全局应用程序实例对象
const app = getApp()
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    count: 1,
    lv: '../../images/lv5.png',
    img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    name: '一脸你有梦',
    time: '2017-12-08 10:21',
    price: 152,
    money: 152,
    info: [
      {
        t: '商品',
        c: '难过恋人'
      },
      {
        t: '分类',
        c: '日用品'
      },
      {
        t: '零售价',
        c: '152'
      },
      {
        t: '数量',
        c: '152'
      },
      {
        t: '产品完整性',
        c: '50%'
      },
      {
        t: '产品描述',
        c: ''
      }
    ],
    introduce: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
    imageArr: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    nubmer: 4,
    commentArr: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '美女大大',
        reply: '照片多少钱',
        time: '2017-08-12 10:20:36'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '美女大大',
        reply: '照片多少钱',
        time: '2016-08-10 10:20:36'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '美女大大',
        reply: '照片多少钱',
        time: '2017-08-15 10:23:36'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '美女大大',
        reply: '照片多少钱',
        time: '2017-06-15 10:23:36'
      }
    ]
  },
  // 回复留言
  replyComment (e) {
    this.setData({
      reply: true,
      messageMaask: true
    })
  },
  // 支付
  pay () {
    // todo
    this.setData({
      buyMask: false
    })
  },
  // 计算数量
  countNumber (e) {
    let type = e.currentTarget.dataset.type
    if (type === 'add') {
      this.setData({
        count: ++this.data.count
      })
    } else {
      if (this.data.count * 1 === 1) {
        return
      }
      this.setData({
        count: --this.data.count
      })
    }
    this.setData({
      money: this.data.count * this.data.price
    })
  },
  // 底部操作
  bottomOp (e) {
    let type = e.currentTarget.dataset.type
    if (type === 'share') {
      this.setData({
        shareMask: true
      })
    } else if (type === 'want') {
      this.setData({
        buyMask: true
      })
    } else if (type === 'comment') {
      this.setData({
        messageMaask: true
      })
    } else if (type === 'collect') {

    }
  },
  // 去除遮罩
  delMask () {
    this.setData({
      messageMaask: false,
      shareMask: false,
      reply: false,
      buyMask: false
    })
  },
  // 文本输入
  inputValue (e) {
    this.setData({
      message: e.detail.value
    })
  },
  // 发送留言
  sendComment () {
    if (!this.data.message) {
      return wx.showToast({
        title: '请输入有效内容'
      })
    }
    // todo send
    this.setData({
      buyMask: false,
      messageMaask: false,
      reply: false
    })
  },
  // 计算相对时间
  get (time) {
    return app.moment(time)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    let that = this
    for (let i of this.data.commentArr) {
      i.time = that.get(i.time)
    }
    this.setData({
      commentArr: this.data.commentArr
    })
    // Moment.locale('zh-cn')
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
  // 转发消息
  onShareAppMessage () {
    this.setData({
      shareMask: !this.data.shareMask
    })
    return {
      title: '分享有礼',
      path: 'pages/detail/detail?id=' + this.data.id
    }
  }
})
