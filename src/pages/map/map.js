// 获取全局应用程序实例对象
const app = getApp()
const serviceUrl = require('../../utils/service')
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
    join: 0,
    nearPeople: 0,
    show: true
  },
  // 获取地图中心
  getMapCenter () {
    let that = this
    map.getCenterLocation({
      success (res) {
        // console.log('获取当前地图中心位置', res)
        that.setData({
          cLatitude: res.latitude,
          cLongitude: res.longitude,
          markers: []
        })
        that.getNear()
      }
    })
  },
  // 视野变化
  regionchange (e) {
    // console.log(`视野变化${e.type}`)
    if (e.type === 'end') {
      this.getMapCenter()
    }
  },
  // 点击标记
  mt (e) {
    let that = this
    let id = e.markerId * 1
    for (let i of that.data.users) {
      if (i.user_id * 1 === id) {
        // console.log(id)
        // that.data.user['avatarUrl'] = i.avatar
        // that.data.user['nickName'] = i.true_name
        // that.data.user['number'] = i.wechat_no || '未填写'
        // that.data.user['sign'] = i.signature || '未填写'
        let sho = (that.data.self_id * 1 === id ? '' : 'show')
        that.setData({
          user: i,
          sho: sho
        })
        return
      }
    }
  },
  // 点击控件
  controltap () {
    wx.navigateTo({
      url: `../near/near?lat=${this.data.cLatitude}&lng=${this.data.cLongitude}`
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
    this.upDate()
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
    let value = e.detail.value
    if (type === 'number') {
      this.setData({
        wechat_no: value
      })
    } else if (type === 'sign') {
      this.setData({
        signature: value
      })
    }
  },
  // 设置marker
  setMarker (lat, lng, icon, id) {
    // let ml = this.data.markers.length
    let obj = {
      iconPath: icon || '../../images/near.png',
      id: id,
      latitude: lat,
      longitude: lng,
      // user_id: id,
      width: 50,
      height: 50
    }
    this.data.markers.push(obj)
    // this.setData({
    //   markers: this.data.markers
    // })
  },
  // 获取临时地址
  // getTemp (url, lat, lng, id) {
  //   let that = this
  //   wx.downloadFile({
  //     url: url,
  //     success (res) {
  //       that.setMarker(lat, lng, res.tempFilePath, id)
  //     },
  //     fail (res) {
  //       setTimeout(function () {
  //         that.setMarker(lat, lng, res.tempFilePath, id)
  //       }, 150)
  //     }
  //   })
  // },
  // 逆地址解析 获取用户当前位置
  reverseGeocoder () {
    let that = this
    let obj = {
      success (res) {
        that.setData({
          address: res.result.address,
          longitude: res.result.location.lng,
          cLongitude: res.result.location.lng,
          latitude: res.result.location.lat,
          cLatitude: res.result.location.lat
        })
        that.getNear()
        // that.getTemp(wx.getStorageSync('userInfo').avatarUrl, res.result.location.lat, res.result.location.lng)
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
  // getUserInfo () {
  //   this.setData({
  //     user: wx.getStorageSync('userInfo')
  //   })
  // },
  // 获取附近的人信息
  getNear () {
    let that = this
    let gn = {
      url: serviceUrl.weishangMap,
      data: {
        session_key: app.gs(),
        lat: that.data.latitude,
        lng: that.data.longitude
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          res.data.data.user_info['lat'] = that.data.cLatitude
          res.data.data.user_info['lng'] = that.data.cLongitude
          res.data.data.users.unshift(res.data.data.user_info)
          for (let i of res.data.data.users) {
            that.setMarker(i.lat, i.lng, '', i.user_id)
          }
          that.setData({
            join: res.data.data.total,
            nearPeople: res.data.data.nearby_total,
            users: res.data.data.users,
            user: res.data.data.user_info,
            self_id: res.data.data.user_info.user_id,
            markers: that.data.markers
          })
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(gn)
  },
  // 更新信息
  upDate () {
    let that = this
    let ud = {
      url: serviceUrl.updateMapUser,
      data: {
        session_key: app.gs(),
        wechat_no: that.data.wechat_no,
        signature: that.data.signature
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.data.user['wechat_no'] = that.data.wechat_no
          that.data.user['signature'] = that.data.signature
          that.setData({
            user: that.data.user,
            show: true
          })
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(ud)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // let that = this
    // this.getUserInfo()
    qqmapsdk = new QQMapWX({
      key: qqmapsdkkey
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
    this.reverseGeocoder()
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
