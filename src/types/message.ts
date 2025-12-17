export interface Message {
    sendUid: number,
    acceptUid: number,
    content: string,
    msgType: ConversationMessageType,
    chatType: ChatType,
}

export interface MessageCount {
  uid: number,
  likeOrFavoriteCount: number,
  commentCount: number,
  followCount: number,
  chatCount: number,
}

export interface Conversation {
  id: number,
  uid: number, // 聊天对象用户 ID
  username: string, // 聊天对象用户名
  avatar: string, // 聊天对象用户头像
  lastMessageId: Number,
  latestMessage: MessageInfo,
  unreadCount: number,
  time: string,
}

export interface MessageInfo {
  sendUid: number,
  content: string,
  msgType: number,
  chatType: number,
  timestamp: number,
}

export enum MessageType {
  LIKE_OR_FAVORITE = 0,
  COMMENT = 1,
  FOLLOW = 2,
  CHAT = 3,
}

export enum ChatType {
  PRIVATE = 0,
  GROUP = 1,
}

export enum ConversationMessageType {
  NOTIFICATION = 0,
  TEXT = 1,
  IMAGE = 2,
  AUDIO = 3,
  VIDEO = 4,
  CUSTOM = 5,
}
