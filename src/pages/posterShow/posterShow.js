// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tempArr: [
      {
        w: 'w1',
        p: 'p1',
        t: '正能量'
      },
      {
        w: 'w2',
        p: 'p2',
        t: '产品描述'
      },
      {
        w: 'w3',
        p: 'p3',
        t: '招商'
      },
      {
        w: 'w4',
        p: 'p4',
        t: '讲师/课程'
      },
      {
        w: 'w5',
        p: 'p5',
        t: '早安/晚安'
      },
      {
        w: 'w6',
        p: 'p6',
        t: '节日'
      }
    ],
    p1: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 1,
        code: 1234567
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 0,
        code: 7654321
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 0,
        code: 7654321
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 0,
        code: 7654321
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 0,
        code: 7654321
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 0,
        code: 7654321
      }
    ],
    p2: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 1,
        code: 1234567
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 0,
        code: 7654321
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 0,
        code: 7654321
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 0,
        code: 7654321
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 0,
        code: 7654321
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 0,
        code: 7654321
      }
    ],
    p3: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 1,
        code: 1234567
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 0,
        code: 7654321
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 0,
        code: 7654321
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 0,
        code: 7654321
      }
    ],
    p4: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 1,
        code: 1234567
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 0,
        code: 7654321
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 0,
        code: 7654321
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 0,
        code: 7654321
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 0,
        code: 7654321
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 0,
        code: 7654321
      }
    ],
    p5: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 1,
        code: 1234567
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 0,
        code: 7654321
      }
    ],
    p6: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 1,
        code: 1234567
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 0,
        code: 7654321
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 0,
        code: 7654321
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 0,
        code: 7654321
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 0,
        code: 7654321
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        collect: 0,
        code: 7654321
      }
    ]
  },
  // 内容宽度计算
  caculateWidth (arr, width) {
    const d = Math.ceil(arr.length / 3)
    let w = d * 100 + '%'
    if (width === 'p1') {
      this.setData({
        w1: w
      })
    } else if (width === 'p2') {
      this.setData({
        w2: w
      })
    } else if (width === 'p3') {
      this.setData({
        w3: w
      })
    } else if (width === 'p4') {
      this.setData({
        w4: w
      })
    } else if (width === 'p5') {
      this.setData({
        w5: w
      })
    } else if (width === 'p6') {
      this.setData({
        w6: w
      })
    }
  },
// 类型选择切换
  typeChoose (e) {
    this.setData({
      curChoose: e.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    let that = this
    for (let j = 1; j < 7; j++) {
      this.caculateWidth(this.data['p' + j], ('p' + j))
    }
    for (let i = 0; i < 6; i++) {
      that.data.tempArr[i].w = this.data['w' + (i * 1 + 1)]
      that.data.tempArr[i].p = this.data['p' + (i * 1 + 1)]
    }
    this.setData({
      tempArr: this.data.tempArr
    })
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
