import request from "@/utils/request";

const api_name = `/chat/collection`

export default {

  // 用户关注时调用
  createCollection(collection) {
    return request({
      url: `${api_name}/createCollection`,
      method: `post`,
      data: collection
    })
  },
  // 用户取消关注时调用
  deleteCollection(collection) {
    return request({
      url: `${api_name}/deleteCollection`,
      method: `post`,
      data: collection
    })
  },
  // 获取关注的用户列表
  getUserList(userId) {
    return request({
      url: `${api_name}/getUserList?userId=${userId}`,
      method: `get`,
    })
  },
  // 获取关注的店铺列表
  getShopList(userId) {
    return request({
      url: `${api_name}/getShopList?userId=${userId}`,
      method: `get`,
    })
  },
  getCollectionNumber(userId) {
    return request({
      url: `${api_name}/getCollectionNumber?userId=${userId}`,
      method: `get`,
    })
  },
  getFansNumber(userId) {
    return request({
      url: `${api_name}/getFansNumber?userId=${userId}`,
      method: `get`,
    })
  },

}
