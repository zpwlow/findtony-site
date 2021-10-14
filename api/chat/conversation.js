import request from "@/utils/request";

const api_name = `/chat/conversation`

export default {
  queryTalk(userId) {
    return request({
      url: `${api_name}/queryTalk?userId=${userId}`,
      method: `get`
    })
  },
  createTalk(conversation) {
    return request({
      url: `${api_name}/createTalk`,
      method: `post`,
      data: conversation
    })
  },
  updateUnRead(sessionId){
    return request({
      url: `${api_name}/updateUnRead?sessionId=${sessionId}`,
      method: `get`,
    })
  }
}
