// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'posterOne',
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    one: '../../images/team-bg.png',
    two: '../../images/team-bg.png',
    mode: 'aspectFill',
    // mode: 'aspectFit',
    scaleOne: 1,
    scaleTwo: 1,
    oldDistance: 0
  },
  touchStart (e) {
    if (e.touches.length === 1) {
      this.setData({
        lock: false
      })
    } else if (e.touches.length >= 2) {
      let xMove = e.touches[1].clientX - e.touches[0].clientX
      let yMove = e.touches[1].clientY - e.touches[0].clientY
      let distance = Math.sqrt(xMove * xMove + yMove * yMove)
      this.setData({
        lock: true,
        oldDistance: distance
      })
    }
  },
  touchMove (e) {
    let that = this
    let type = e.currentTarget.dataset.type
    let { oldDistance } = this.data
    let distanceDiff
    let newScale
    let scale
    if (type === 'one') {
      scale = this.data.scaleOne
    } else if (type === 'two') {
      scale = this.data.scaleTwo
    }
    if (e.touches.length >= 2) {
      let xMove = e.touches[1].clientX - e.touches[0].clientX
      let yMove = e.touches[1].clientY - e.touches[0].clientY
      let newDistance = Math.sqrt(xMove * xMove + yMove * yMove)
      distanceDiff = (newDistance - oldDistance)
      newScale = scale + 0.005 * distanceDiff
      if (type === 'one') {
        that.setData({
          scaleOne: newScale,
          oldDistance: newDistance
        })
      } else if (type === 'two') {
        that.setData({
          scaleTwo: newScale,
          oldDistance: newDistance
        })
      }
    }
    // distanceDiff =(newDistance - oldDistance)
    // newScale = oldScale + 0.005 * distanceDiff
  },
  touchEnd (e) {

  },
  changePic (e) {
    let type = e.currentTarget.dataset.type
    if (this.data.lock) return
    let that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        const src = res.tempFilePaths[0]
        if (type === 'one') {
          that.setData({
            one: `${src}`
          })
        } else if (type === 'two') {
          that.setData({
            two: `${src}`
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // let {name, src} = params
    // if (name === 'one') {
    //   console.log('onload in')
    //   this.setData({
    //     one: src
    //   })
    // }
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
