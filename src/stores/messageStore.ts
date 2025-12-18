import { defineStore } from "pinia";
import { ref } from "vue";
import { store } from "@/stores";
import type { Conversation, MessageCount, Message } from "@/types/message";
import { useUserStore } from "./userStore";

// 使用setup模式定义
export const messageStore = defineStore("messageStore", () => {
  const conversationList = ref<Array<Conversation>>([]);

  const message = ref<Message>();

  const userStore = useUserStore();
  const messageCount = ref<MessageCount>({
    uid: userStore.getUserInfo()?.id,
    likeOrFavoriteCount: 0,
    commentCount: 0,
    followCount: 0,
    chatCount: 0,
    trendCount: 0,
  });

  const setConversationList = (data: Array<Conversation>) => {
    conversationList.value = data;
  };

  const setMessageCount = (data: MessageCount) => {
    messageCount.value = data;
  };

  const setMessage = (data: Message) => {
    message.value = data;
  };

  return { conversationList, messageCount, message, setConversationList, setMessageCount, setMessage };
});

export function useMessageStore() {
  return messageStore(store);
}
