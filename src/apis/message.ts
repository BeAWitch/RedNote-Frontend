import type { UncheckedMessageType } from "@/types/message";
import request from "@/utils/request";
import type { Message } from "element-plus";

/**
 * 得到所有聊天的记录数量
 * @returns 聊天数量
 */
export const getUncheckedMessageCount = () => {
  return request<any>({
    url: "/web/chat/getUncheckedMessageCount",
    method: "get",
  });
};

/**
 * 获取当前用户下所有会话信息
 * @returns 会话信息
 */
export const getConversationList = () => {
  return request<any>({
    url: "/web/chat/getConversationList",
    method: "get",
  });
};

/**
 * 清除未确认消息数量
 * @param type 类型
 * @returns success
 */
export const clearUncheckedMessageCount = (type: UncheckedMessageType) => {
  return request<any>({
    url: "/web/chat/clearUncheckedMessageCount",
    method: "get",
    params: {
      type,
    }
  });
};

/**
 * 清除未读消息数量，指的是聊天信息
 * @param conversationId 会话 id
 * @returns success
 */
export const clearUnreadMessageCount = (conversationId: number) => {
  return request<any>({
    url: "/web/chat/clearUnreadMessageCount",
    method: "get",
    params: {
      conversationId,
    }
  });
};

/**
 * 获取所有的聊天记录
 * @param currentPage 分页
 * @param pageSize 分页数
 * @param conversationId 会话 id
 * @returns 聊天记录
 */
export const getMessage = (
  currentPage: number,
  pageSize: number,
  conversationId: number
) => {
  return request<any>({
    url: `/web/chat/getMessage/${currentPage}/${pageSize}`,
    method: "get",
    params: {
      conversationId,
    },
  });
};

/**
 * 发送消息
 * @param data 消息实体
 * @returns success
 */
export const sendMessage = (data: Message) => {
  return request<any>({
    url: "/web/chat/sendMessage",
    method: "post",
    data: data,
  });
};
