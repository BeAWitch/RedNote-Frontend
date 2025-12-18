<template>
  <div class="container">
    <div v-if="isLogin">
      <div class style="height: 72px">
        <div class="reds-sticky">
          <div class="reds-tabs-list">
            <el-badge
              :value="messageCount.chatCount"
              :max="99"
              :hidden="isNaN(messageCount.chatCount) || messageCount.chatCount == 0"
            >
              <div
                :class="
                  type === UncheckedMessageType.CHAT
                    ? 'reds-tab-item active tab-item'
                    : 'reds-tab-item tab-item'
                "
              >
                <div class="badge-container" @click="toPage(UncheckedMessageType.CHAT)">
                  <span>我的消息</span>
                </div>
              </div>
            </el-badge>
            <el-badge
              :value="messageCount.commentCount"
              :max="99"
              :hidden="messageCount.commentCount == 0"
            >
              <div :class="type === UncheckedMessageType.COMMENT ? 'reds-tab-item active' : 'reds-tab-item'">
                <div class="badge-container" @click="toPage(UncheckedMessageType.COMMENT)">
                  <span>评论和@</span>
                </div>
              </div>
            </el-badge>
            <el-badge
              :value="messageCount.likeOrFavoriteCount"
              :max="99"
              :hidden="messageCount.likeOrFavoriteCount == 0"
            >
              <div
                :class="
                  type === UncheckedMessageType.LIKE_OR_FAVORITE
                    ? 'reds-tab-item active tab-item'
                    : 'reds-tab-item tab-item'
                "
              >
                <div class="badge-container" @click="toPage(UncheckedMessageType.LIKE_OR_FAVORITE)">
                  <span>赞和收藏</span>
                </div>
              </div>
            </el-badge>
            <el-badge
              :value="messageCount.followCount"
              :max="99"
              :hidden="messageCount.followCount == 0"
            >
              <div
                :class="
                  type === UncheckedMessageType.FOLLOW
                    ? 'reds-tab-item active tab-item'
                    : 'reds-tab-item tab-item'
                "
              >
                <div class="badge-container" @click="toPage(UncheckedMessageType.FOLLOW)">
                  <span>新增关注</span>
                </div>
              </div>
            </el-badge>
          </div>
          <div class="divider" style="margin: 16px 32px 0px"></div>
        </div>
      </div>
      <Message v-if="type == UncheckedMessageType.CHAT"></Message>
      <Comment v-if="type == UncheckedMessageType.COMMENT" @click-main="toMain"></Comment>
      <LikeFavorite v-if="type == UncheckedMessageType.LIKE_OR_FAVORITE" @click-main="toMain"></LikeFavorite>
      <Follow v-if="type == UncheckedMessageType.FOLLOW"></Follow>
      <!-- <router-view /> -->

      <Main
        v-show="mainShow"
        :nid="nid"
        :nowTime="new Date()"
        class="animate__animated animate__zoomIn animate__delay-0.5s"
        @click-main="close"
      ></Main>

      <el-backtop :bottom="80" :right="24">
        <div class="back-top">
          <Top style="width: 1.2em; height: 1.2em" color="rgba(51, 51, 51, 0.8)" />
        </div>
      </el-backtop>
    </div>
    <div v-else>
      <el-empty description="用户未登录" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Top } from "@element-plus/icons-vue";
import { ref, watchEffect } from "vue";
import Message from "@/views/message/children/message.vue";
import LikeFavorite from "@/views/message/children/like-favorite.vue";
import Follow from "@/views/message/children/follow.vue";
import Comment from "@/views/message/children/comment.vue";
import Main from "@/views/main/main.vue";
import { useMessageStore } from "@/stores/messageStore";
import { clearUncheckedMessageCount } from "@/apis/message";
import { useUserStore } from "@/stores/userStore";
import { UncheckedMessageType, type MessageCount } from "@/types/message";

const messageStore = useMessageStore();
const userStore = useUserStore();

const type = ref(UncheckedMessageType.CHAT);
const nid = ref(NaN);
const currentUid = ref(NaN);
const mainShow = ref(false);
const messageCount = ref<MessageCount>(messageStore.messageCount);
const isLogin = ref(false);

watchEffect(() => {
  messageCount.value = messageStore.messageCount;
});

const toPage = (messageType: UncheckedMessageType) => {
  const messageCount: MessageCount = messageStore.messageCount;
  switch (messageType) {
    case UncheckedMessageType.LIKE_OR_FAVORITE:
      clearUncheckedMessageCount(messageType).then(() => {
        messageCount.likeOrFavoriteCount = 0;
      });
      break;
    case UncheckedMessageType.COMMENT:
      clearUncheckedMessageCount(messageType).then(() => {
        messageCount.commentCount = 0;
      });
      break;
    case UncheckedMessageType.FOLLOW:
      clearUncheckedMessageCount(messageType).then(() => {
        messageCount.followCount = 0;
      });
      break;
    default:
      break;
  }

  messageStore.setMessageCount(messageCount);
  type.value = messageType;
};

const close = () => {
  mainShow.value = false;
};

const toMain = (val: number) => {
  nid.value = val;
  mainShow.value = true;
};

const initData = () => {
  isLogin.value = userStore.isLogin();
  if (isLogin.value) {
    currentUid.value = userStore.getUserInfo()?.id || NaN;
  }
};
initData();
</script>

<style lang="less" scoped>
.container {
  flex: 1;
  padding: 0 24px;
  padding-top: 72px;
  width: 67%;
  margin: 0 auto;

  .reds-sticky {
    top: 72px;
    position: fixed;
    z-index: 1;
    width: 40rem;
    box-sizing: border-box;
    height: 72px;
    padding-top: 16px;
    justify-content: center;
    flex-direction: column;
    background: #fff;

    .reds-tabs-list {
      justify-content: flex-start;
      display: flex;
      flex-wrap: nowrap;
      position: relative;
      font-size: 16px;
      padding: 0 32px;

      .active {
        font-weight: 600;
        color: #333;
        background-color: rgba(0, 0, 0, 0.03);
        border-radius: 20px;
        border: #333 solid 1px;
      }

      .reds-tab-item {
        padding: 0px 16px;
        margin-right: 0px;
        font-size: 16px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 40px;
        cursor: pointer;
        color: rgba(51, 51, 51, 0.8);
        white-space: nowrap;
        transition: transform 0.3s cubic-bezier(0.2, 0, 0.25, 1);
        z-index: 1;

        .badge-container {
          position: relative;
        }
      }
    }
    .reds-tabs-list {
      display: flex;
      justify-content: flex-start;
      padding: 0 32px;

      .reds-tab-item {
        padding: 0 16px;
        height: 40px;
        display: flex;
        align-items: center;
        cursor: pointer;
        color: rgba(51, 51, 51, 0.8);
        border-radius: 20px;
      }

      /* 关键：提高优先级 */
      .reds-tab-item.active {
        font-weight: 600;
        color: #333;
        background-color: rgba(0, 0, 0, 0.03);
      }
    }

    .divider {
      margin: 4px 8px;
      list-style: none;
      height: 0;
      border: solid rgba(0, 0, 0, 0.08);
      border-width: 1px 0 0;
    }

    .back-top {
      width: 40px;
      height: 40px;
      background: #fff;
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: 100px;
      color: rgba(51, 51, 51, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
      cursor: pointer;
    }
  }
}
</style>
