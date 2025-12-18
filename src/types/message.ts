export interface Message {
  sendUid: number;
  acceptUid: number;
  content: MessageContent;
  chatType: ChatType;
}

export interface MessageCount {
  uid: number;
  likeOrFavoriteCount: number;
  commentCount: number;
  followCount: number;
  chatCount: number;
  trendCount: number;
}

export interface Conversation {
  id: number;
  uid: number; // 聊天对象用户 ID
  username: string; // 聊天对象用户名
  avatar: string; // 聊天对象用户头像
  lastMessageId: Number;
  latestMessage: MessageInfo;
  unreadCount: number;
  time: string;
}

export interface MessageInfo {
  sendUid: number;
  content: MessageContent;
  chatType: ChatType;
  timestamp: number;
}

export interface ContentInfo {
  type: ConversationMessageType;
  content: string;
}

export interface MessageContent {
  contents: Array<ContentInfo>;
}

// Websocket 消息通知
export interface WSMessage {
  acceptUid: number;
  type: UncheckedMessageType;
  content: Message | number;
}

export enum UncheckedMessageType {
  LIKE_OR_FAVORITE = "LIKE_OR_FAVORITE",
  COMMENT = "COMMENT",
  FOLLOW = "FOLLOW",
  CHAT = "CHAT",
  TREND = "TREND",
}

export enum ChatType {
  PRIVATE = "PRIVATE",
  GROUP = "GROUP",
}

export enum ConversationMessageType {
  NOTIFICATION = "NOTIFICATION",
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  AUDIO = "AUDIO",
  VIDEO = "VIDEO",
  CUSTOM = "CUSTOM",
}
