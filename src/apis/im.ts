import request from "@/utils/request";

/**
 * 得到所有聊天的记录数量
 * @returns 聊天数量
 */
export const getCountMessage = () => {
  return request<any>({
    url: "/web/im/chat/getCountMessage",
    method: "get",
  });
};

/**
 * 获取当前用户下所有聊天的用户信息
 * @returns 聊天的用户信息
 */
export const getChatUserList = () => {
  return request<any>({
    url: "/web/im/chat/getChatUserList",
    method: "get",
  });
};

/**
 * 清除聊天数量
 * @param sendUid 发送方的用户id
 * @param type 类型
 * @returns success
 */
export const clearMessageCount = (sendUid: number, type: number) => {
  return request<any>({
    url: "/web/im/chat/clearMessageCount",
    method: "get",
    params: {
      sendUid,
      type,
    }
  });
};

/**
 * 获取所有的聊天记录
 * @param currentPage 分页
 * @param pageSize 分页数
 * @param acceptUid 接收方的用户id
 * @returns 聊天记录
 */
export const getAllChatRecord = (
  currentPage: number,
  pageSize: number,
  acceptUid: number
) => {
  return request<any>({
    url: `/web/im/chat/getAllChatRecord/${currentPage}/${pageSize}`,
    method: "get",
    params: {
      acceptUid,
    },
  });
};

/**
 * 发送消息
 * @param data 消息实体
 * @returns success
 */
export const sendMsg = (data: any) => {
  return request<any>({
    url: "/web/im/chat/sendMsg",
    method: "post",
    data: data,
  });
};
