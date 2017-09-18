// 获取全局应用程序实例对象
// const app = getApp()
const app = getApp()
const wxf = require('../../utils/common')
const serviceUrl = require('../../utils/service')
const dates = (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate()
const datess = ((new Date()).getFullYear() + 1) + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate()
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    time: '选择过期时间',
    info: {
      'good_id': 0
    },
    date: dates,
    starTime: dates,
    endTime: datess,
    index: 0,
    array: [{
      'cat_id': 'false',
      'cat_name': '选择产品分类'
    }],
    upImg: [],
    items: [
      {
        name: '已阅读并承诺遵守《清货神器说明》条例',
        value: '已阅读并承诺遵守《清货神器说明》条例',
        checked: true
      }
    ]
  },
  showDb () {
    wx.navigateTo({
      url: '../faburuler/faburuler'
    })
  },
  // 上传图片
  upImgs () {
    let that = this
    wxf.upPhoto(that, 'upImg', 6, function (that, ss) {
      that.setData({
        upImg: ss
      })
    })
  },
  // 删除图片
  delphoto (e) {
    let that = this
    wxf.delphoto(that, e, 'upImg', function (that, imgArr) {
      that.setData({
        upImg: imgArr
      })
    })
  },
  // 显示图片
  showImg (e) {
    let that = this
    wxf.showImg(that, e, 'upImg')
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
    this.data.info['exp_time'] = e.detail.value
    this.setData({
      date: e.detail.value,
      time: e.detail.value,
      info: this.data.info
    })
  },
  // 输入框文字输入
  inputValue (e) {
    let { info } = this.data
    let type = e.currentTarget.dataset.type
    let value = e.detail.value
    if (type === 'title') {
      info['good_name'] = value
    } else if (type === 'money') {
      info['original_price'] = value
    } else if (type === 'money2') {
      info['qinghuo_price'] = value
    } else if (type === 'count') {
      info['stock_num'] = value
    } else if (type === 'full') {
      info['product_integrity'] = value
    } else if (type === 'introduce') {
      info['describe'] = value
    } else if (type === 'mobile') {
      info['mobile'] = value
    }
    this.setData({
      info: info
    })
  },
  // 获取产品分类
  getCategoryLists () {
    let that = this
    let gc = {
      url: serviceUrl.getCategoryLists,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            array: that.data.array.concat(res.data.data)
          })
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(gc)
  },
  checkboxChange () {
    this.data.items[0].checked = !this.data.items[0].checked
    this.setData({
      items: this.data.items
    })
  },
  // 发布信息
  fabu () {
    let { info } = this.data
    if (!info.mobile || !info.qinghuo_price || !info.good_name || !info.original_price || !info.stock_num || !info.product_integrity || !info.describe || (this.data.upImg.length === 0) || (this.data.index === 0)) {
      return wx.showToast({
        title: '请正确补全信息再提交'
      })
    }
    if (!this.data.items[0].checked) {
      return wx.showToast({
        title: '请同意条款后再发布产品'
      })
    }
    let that = this
    let fb = {
      url: serviceUrl.releaseGoods,
      data: {
        session_key: app.gs(),
        good_id: that.data.id,
        good_name: info.good_name,
        original_price: info.original_price,
        qinghuo_price: info.qinghuo_price,
        stock_num: info.stock_num,
        exp_time: info.exp_time,
        product_integrity: info.product_integrity,
        describe: info.describe,
        mobile: info.mobile,
        product_images: that.data.upImg.join(','),
        cat_id: that.data.array[that.data.index]['cat_id']
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          wx.showToast({
            title: '发布成功',
            mask: true
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../releaseProduct/releaseProduct'
            })
          }, 1500)
        } else {
          wx.showTosat({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(fb)
  },
  // 滑动选择
  sliderchange (e) {
    this.data.info['product_integrity'] = e.detail.value
    this.setData({
      info: this.data.info
    })
  },
  // 获取发布产品的信息
  getInfo (id) {
    let that = this
    let gi = {
      url: serviceUrl.editeProduct,
      data: {
        session_key: app.gs(),
        good_id: id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            info: res.data.data,
            time: res.data.data.exp_time.slice(0, 10),
            index: res.data.data.cat_info.cat_id,
            upImg: res.data.data.product_images
          })
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(gi)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    if (params.id) {
      this.setData({
        id: params.id
      })
      this.getInfo(params.id)
    }
    this.getCategoryLists()
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
