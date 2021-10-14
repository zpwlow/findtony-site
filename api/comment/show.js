import request from "@/utils/request";

const api_name = `/comment/show`

export default {

  // 根据id查询用户个人秀
  queryByUserId(showPageVo) {
    return request({
      url: `${api_name}/queryByUserId`,
      method: `post`,
      data: showPageVo
    })
  },
  // 创建个人秀接口
  createShow(show) {
    return request({
      url: `${api_name}/create`,
      method: `post`,
      data: show
    })
  },
}
