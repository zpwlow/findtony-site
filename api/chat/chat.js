import request from "@/utils/request";

const api_name = `/chat/chat`

export default {
  create(chat) {
    return request({
      url: `${api_name}/create`,
      method: `post`,
      data: chat
    })
  },
  queryAllById(sessionId) {
    return request({
      url: `${api_name}/queryAllById?sessionId=${sessionId}`,
      method: `get`
    })
  },
}
