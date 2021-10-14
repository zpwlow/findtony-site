import request from "@/utils/request";

const api_name = `/user/useraccount`
const api_info = `/user/userinfo`

export default {
  login(userInfo) {
    return request({
      url: `${api_name}/login`,
      method: `post`,
      data: userInfo
    })
  },
  userUpdate(userUpdate) {
    return request({
      url: `${api_name}/userUpdate`,
      method: `post`,
      data: userUpdate
    })
  },
  userRegister(user) {
    return request({
      url: `${api_name}/register`,
      method: `post`,
      data: user
    })
  },
  infoCreate(info) {
    return request({
      url: `${api_info}/create`,
      method: `post`,
      data: info
    })
  }
}
