import request from '@/utils/request'

export default {
  getAreaChild(code) {
    return request({
      url: `/user/region/queryChild?code=${code}`,
      method: 'get'
    })
  }
}
