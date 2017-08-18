// 获取全局应用程序实例对象
// const app = getApp()
const QQMapWX = require('../../utils/qmapsdk')
const qqmapsdkkey = 'R4BBZ-5BO3P-M5ND5-VW5ZJ-YJEF5-BOFI2'
let qqmapsdk
const map = wx.createMapContext('map')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    controls: [{
      id: 1,
      iconPath: '../../images/near.png',
      position: {
        left: 270,
        top: 100,
        width: 90,
        height: 30
      },
      clickable: true
    }],
    join: 123,
    nearPeople: 12,
    show: true
  },
  // 获取地图中心
  getMapCenter () {
    let that = this
    map.getCenterLocation({
      success (res) {
        console.log('获取当前地图中心位置', res)
        let obj = {
          iconPath: '/resources/others.png',
          id: that.data.markers.length,
          latitude: res.latitude,
          longitude: res.longitude,
          width: 50,
          height: 50
        }
        that.data.markers.push(obj)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: that.data.markers
        })
      }
    })
  },
  // 视野变化
  regionchange (e) {
    // console.log(`视野变化${e.type}`)
    if (e.type === 'end') {
      // this.getMapCenter()
    }
  },
  // 点击标记
  markertap (e) {
    console.log(`点击标记${e.markerId}`)
  },
  // 点击控件
  controltap () {
    wx.navigateTo({
      url: '../near/near?lat=' + this.data.latitude + '&lng=' + this.data.longitude
    })
  },
  // 编辑信息
  edit () {
    this.setData({
      show: false
    })
  },
  // 编辑内容确认
  confirm () {
    // todo 上传数据
    this.setData({
      show: true
    })
  },
  // 取消编辑
  cancel () {
    this.setData({
      show: true
    })
  },
  // 获取输入内容
  inputValue (e) {
    let type = e.currentTarget.dataset.type
    if (type === 'number') {
      this.setData({
        number: e.detail.value
      })
    } else if (type === 'sign') {
      this.setData({
        sign: e.detail.value
      })
    }
  },
  // 设置marker
  setMarker (lat, lng, icon) {
    let ml = this.data.markers.length
    // console.log(`icon:${icon}lat:${lat}lng:${lng}ml:${ml}`)
    let obj = {
      iconPath: icon,
      id: ml,
      latitude: lat,
      longitude: lng,
      width: 50,
      height: 50
    }
    this.data.markers.push(obj)
    this.setData({
      markers: this.data.markers
    })
  },
  // 获取临时地址
  getTemp (url, lat, lng) {
    // console.log(`url:${url}lat:${lat}lng:${lng}`)
    let that = this
    wx.downloadFile({
      url: url,
      success (res) {
        that.setMarker(lat, lng, res.tempFilePath)
      }
    })
  },
  // 逆地址解析 获取用户当前位置
  reverseGeocoder () {
    let that = this
    let obj = {
      success (res) {
        that.setData({
          address: res.result.address,
          longitude: res.result.location.lng,
          latitude: res.result.location.lat
        })
        that.getTemp(wx.getStorageSync('userInfo').avatarUrl, res.result.location.lat, res.result.location.lng)
      },
      fail () {
        wx.showToast({
          title: '请允许获取您的位置信息'
        })
        setTimeout(function () {
          let settingObj = {
            success (res) {
              // 授权失败
              if (!res.authSetting['scope.userLocation']) {
                wx.showToast({
                  title: '请允许获取您的地理位置信息',
                  mask: true
                })
                setTimeout(function () {
                  return that.reverseGeocoder()
                }, 1000)
              } else {
                // 授权成功
                return that.reverseGeocoder()
              }
            },
            fail (res) {
              console.log(res)
            }
          }
          wx.openSetting(settingObj)
        }, 1000)
      }
    }
    qqmapsdk.reverseGeocoder(obj)
  },
  // 获取微信用户信息
  getUserInfo () {
    this.setData({
      user: wx.getStorageSync('userInfo')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // let that = this
    this.getUserInfo()
    qqmapsdk = new QQMapWX({
      key: qqmapsdkkey
    })
    this.reverseGeocoder()

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
