import request from "@/utils/request";

const api_name = `/user/shopAccount`
const api_info = `/user/shopInfo`

export default {
  login(userInfo) {
    return request({
      url: `${api_name}/login`,
      method: `post`,
      data: userInfo
    })
  },
  shopUpdate(shopUpdate) {
    return request({
      url: `${api_name}/shopUpdate`,
      method: `post`,
      data: shopUpdate
    })
  },
  shopRegister(shop){
    return request({
      url: `${api_name}/register`,
      method: `post`,
      data: shop
    })
  },
  infoCreate(info){
    return request({
      url: `${api_info}/create`,
      method: `post`,
      data: info
    })
  },
  querySearch(search) {
    return request({
      url: `${api_info}/querySearch`,
      method: 'post',
      data: search
    })
  }
}
