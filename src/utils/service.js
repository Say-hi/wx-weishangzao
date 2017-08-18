/**
 * Created by Administrator on 2017/6/2.
 */
let baseDomain = 'http://wsz.lanzhangxiu.cn'
let serviceUrl = {
  login: baseDomain + '/api/public/login',
  getBanners: baseDomain + '/api/index/getBanners',
  index: baseDomain + '/api/index/index',
  uploadPhotos: baseDomain + '/api/public/uploadPhotos',
  teamAddOrCancelRelation: baseDomain + '/api/team/addOrCancelRelation',
  teamDetail: baseDomain + '/api/team/teamDetail',
  addSupport: baseDomain + '/api/team/addSupport',
  addTeam: baseDomain + '/api/team/addTeam',
  editeUserInfo: baseDomain + '/api/user/editeUserInfo',
  getProxyByMy: baseDomain + '/api/user/getProxyByMy',
  deleteProxy: baseDomain + '/api/user/deleteProxy',
  kaitongWeishang: baseDomain + '/api/user/kaitongWeishang',
  userDetail: baseDomain + '/api/user/userDetail',
  myProxyLists: baseDomain + '/api/user/myProxyLists',
  getMySubscribeTeams: baseDomain + '/api/user/getMySubscribeTeams',
  weiShangMainPage: baseDomain + '/api/user/weiShangMainPage',
  updateLocation: baseDomain + '/api/user/updateLocation',
  userCenter: baseDomain + '/api/user/userCenter',
  userAddOrCancelRelation: baseDomain + '/api/user/addOrCancelRelation'
}
module.exports = serviceUrl
