<template>
  <div>
    <ul class="message-container">
      <li class="message-item" v-for="(conversation, index) in conversationList" :key="index">
        <a class="user-avatar">
          <img class="avatar-item" :src="conversation.avatar" @click="toUser(conversation.uid)" />
        </a>
        <div class="main">
          <div class="info" @click="toChat(conversation.id, index)">
            <div class="user-info">
              <a class>{{ conversation.username }}</a>
              <div class="interaction-hint">
                <span>{{ conversation.time }}</span>
              </div>
            </div>

            <div class="interaction-content">
              <template v-for="(item, i) in conversation.latestMessage.content.contents" :key="i">
                <!-- 文本 -->
                <span v-if="item.type === ConversationMessageType.TEXT">
                  {{ item.content }}
                </span>
                <!-- 图片 -->
                <span v-if="item.type === ConversationMessageType.IMAGE">
                  [图片]
                </span>
              </template>
              <div class="msg-count" v-show="conversation.unreadCount > 0">
                {{ conversation.unreadCount }}
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <Chat
      v-if="chatShow"
      :conversation="conversation"
      class="animate__animated animate__zoomIn animate__delay-0.5s"
      @click-chat="close"
    ></Chat>
  </div>
</template>

<script lang="ts" setup>
import { useMessageStore } from "@/stores/messageStore";
import { onMounted, ref, watchEffect } from "vue";
import { formateTime } from "@/utils/util";
import Chat from "@/components/Chat.vue";
import { clearUnreadMessageCount } from "@/apis/message";
import { useRouter } from "vue-router";
import { ConversationMessageType } from "@/types/message";
import type { Conversation } from "@/types/message";

const router = useRouter();
const messageStore = useMessageStore();
const conversationList = ref<Array<Conversation>>([]);
const chatShow = ref(false);
const conversation = ref<Conversation>(); // 用于与 Chat 组件通信

const toUser = (uid: number) => {
  router.push({ name: "user", query: { uid: uid } });
};

watchEffect(() => {
  conversationList.value = [];
  messageStore.conversationList.forEach((conversation: Conversation) => {
    const message = conversation.latestMessage;
    conversation.time = formateTime(message.timestamp);
    conversationList.value.push(conversation);
  });
});

onMounted(() => {
  conversationList.value = [];
  messageStore.conversationList.forEach((conversation: Conversation) => {
    const message = conversation.latestMessage;
    conversation.time = formateTime(message.timestamp);
    conversationList.value.push(conversation);
  });
});

const toChat = (conversationId: number, index: number) => {
  const messageCount = messageStore.messageCount;
  clearUnreadMessageCount(conversationId).then(() => {
    if (conversationList.value[index] == null) {
      return;
    }
    // 更新数量
    const chatCount = conversationList.value[index].unreadCount;
    conversationList.value[index].unreadCount = 0;
    messageCount.chatCount -= chatCount;
    messageStore.setMessageCount(messageCount);
    // 更新会话
    conversation.value = conversationList.value[index];
    console.log(conversation.value);
    // 打开聊天窗口
    chatShow.value = true;
  });
};

const close = (lastId: number) => {
  chatShow.value = false;
  conversation.value = undefined;
  // TODO 更新上一次确认的消息
};
</script>

<style lang="less" scoped>
.message-container {
  width: 40rem;

  .message-item {
    display: flex;
    flex-direction: row;
    padding-top: 24px;

    .user-avatar {
      margin-right: 24px;
      flex-shrink: 0;

      .avatar-item {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 100%;
        border: 1px solid rgba(0, 0, 0, 0.08);
        object-fit: cover;
      }
    }

    .main {
      flex-grow: 1;
      flex-shrink: 1;
      display: flex;
      flex-direction: row;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);

      .info {
        flex-grow: 1;
        flex-shrink: 1;
        cursor: pointer;

        .user-info {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;

          a {
            color: #333;
            font-size: 16px;
            font-weight: 600;
          }

          .interaction-hint {
            font-size: 12px;
            color: rgba(51, 51, 51, 0.6);
          }
        }

        .interaction-content {
          display: flex;
          font-size: 14px;
          color: #333;
          line-height: 140%;
          cursor: pointer;
          justify-content: flex-start;
          align-items: center;

          .msg-count {
            margin-left: auto;
            width: 20px;
            height: 20px;
            line-height: 20px;
            font-size: 13px;
            color: #fff;
            background-color: red;
            text-align: center;
            border-radius: 100%;
          }
        }
      }
    }
  }
}
</style>
