<template>
  <div class="comments-container">
    <div class="total">共{{ props.commentCount }}条评论</div>
    <div class="list-container">
      <div
        class="parent-comment"
        v-for="(levelOneComment, levelOneIndex) in dataList"
        :key="levelOneIndex"
      >
        <div class="comment-item">
          <div class="comment-inner-container">
            <div class="avatar">
              <img class="avatar-item" :src="levelOneComment.avatar" />
            </div>
            <div class="right">
              <div class="author-wrapper">
                <div class="author">
                  <a class="name">{{ levelOneComment.username }}</a>
                </div>
              </div>
              <div class="content">{{ levelOneComment.content }}</div>

              <div class="info">
                <div class="date">
                  <span>{{ levelOneComment.time }}</span>
                </div>
                <div class="interactions">
                  <div class="like">
                    <span
                      class="like-wrapper"
                      v-if="levelOneComment.isLike"
                      @click="likeComment(levelOneComment, -1, levelOneIndex, -1)"
                    >
                      <i
                        class="iconfont icon-follow-fill"
                        :style="{
                          width: '1em',
                          height: '1em',
                          color: levelOneComment.isLike ? 'red' : 'black',
                        }"
                        v-if="levelOneComment.isLike"
                      >
                      </i>
                      <i class="iconfont icon-follow" style="width: 1em; height: 1em" v-else></i>
                      <span class="count">{{ levelOneComment.likeCount }}</span>
                    </span>
                    <span
                      class="like-wrapper"
                      v-else
                      @click="likeComment(levelOneComment, 1, levelOneIndex, -1)"
                    >
                      <i class="iconfont icon-follow" style="width: 1em; height: 1em"></i>
                      <span class="count">{{ levelOneComment.likeCount }}</span>
                    </span>
                  </div>
                  <div class="reply" @click="saveComment(levelOneComment, levelOneIndex, 0)">
                    <span class="like-wrapper">
                      <ChatRound style="width: 1.2em; height: 1.2em" />
                      <span class="count">{{ levelOneComment.levelTwoCommentCount }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="reply-container">
          <div class="list-container">
            <div
              class="comment-item"
              v-for="(levelTwoComment, levelTwoIndex) in levelOneComment.children"
              :key="levelTwoIndex"
            >
              <div class="comment-inner-container">
                <div class="avatar">
                  <img class="avatar-item" :src="levelTwoComment.avatar" />
                </div>
                <div class="right">
                  <div class="author-wrapper">
                    <div class="author">
                      <a class="name">{{ levelTwoComment.username }}</a>
                    </div>
                  </div>
                  <div class="content">
                    回复<span style="color: rgba(61, 61, 61, 0.8)"
                      >{{ levelTwoComment.replyUsername }}: </span
                    >{{ levelTwoComment.content }}
                  </div>

                  <div class="info">
                    <div class="date">
                      <span>{{ levelTwoComment.time }}</span>
                    </div>
                    <div class="interactions">
                      <div class="like">
                        <span
                          class="like-wrapper"
                          v-if="levelTwoComment.isLike"
                          @click="likeComment(levelTwoComment, -1, levelOneIndex, levelTwoIndex)"
                        >
                          <i
                            class="iconfont icon-follow-fill"
                            :style="{
                              width: '1em',
                              height: '1em',
                              color: levelOneComment.isLike ? 'red' : 'black',
                            }"
                            v-if="levelOneComment.isLike"
                          >
                          </i>
                          <i
                            class="iconfont icon-follow"
                            style="width: 1em; height: 1em"
                            v-else
                          ></i>
                          <span class="count">{{ levelTwoComment.likeCount }}</span>
                        </span>
                        <span
                          class="like-wrapper"
                          @click="likeComment(levelTwoComment, 1, levelOneIndex, levelTwoIndex)"
                          v-else
                        >
                          <i class="iconfont icon-follow" style="width: 1em; height: 1em"></i>
                          <span class="count">{{ levelTwoComment.likeCount }}</span>
                        </span>
                      </div>
                      <div
                        class="reply"
                        @click="saveComment(levelTwoComment, levelOneIndex, levelTwoIndex)"
                      >
                        <span class="like-wrapper">
                          <ChatRound style="width: 1.2em; height: 1.2em" />
                          <span class="count">回复</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="show-more"
            v-if="
              levelOneComment.levelTwoCommentCount >=
                levelTwoCommentCountMap.get(levelOneComment.id) &&
              levelOneComment.levelTwoCommentCount > showLevelTwoCommentCount
            "
            @click="loadLevelTwoMore(levelOneComment.id, levelOneIndex)"
          >
            展开更多的回复
          </div>
          <div
            class="show-more"
            v-if="
              levelOneComment.levelTwoCommentCount <
                levelTwoCommentCountMap.get(levelOneComment.id) &&
              levelOneComment.levelTwoCommentCount > showLevelTwoCommentCount
            "
            @click="reback(levelOneComment.id, levelOneIndex)"
          >
            收起所有回复
          </div>
        </div>
      </div>
    </div>
    <div style="padding-bottom: 100px"></div>
  </div>
</template>
<script lang="ts" setup>
import { ChatRound } from "@element-plus/icons-vue";
import { ref, watch } from "vue";
import {
  getCommentWithCommentByNoteId,
  getLevelTwoCommentByLevelOneCommentId,
} from "@/apis/comment";
import { likeOrFavoriteByDTO } from "@/apis/likeOrFavorite";
import type { LikeOrFavoriteDTO } from "@/types/likeOrFavorite";
import { formateTime } from "@/utils/util";
const props = defineProps({
  nid: {
    type: Number,
    default: NaN,
  },
  replyComment: {
    type: Object,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: {},
  },
  commentCount: {
    type: Number,
    default: 0,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  seed: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["clickComment"]);

const dataList = ref<Array<any>>([]);
const levelOneIndex = ref(-1);
const levelTwoIndex = ref(-1);

const levelOnePageSize = 7;
const levelTwoPageSize = 10;
const loadedCommentCount = ref(0);
const showLevelTwoCommentCount = 3;
const commentPageMap = new Map(); // 记录每个一级评论的页数
const levelTwoCommentCountMap = new Map(); // 记录每个一级评论的二级评论数量

const likeComment = (comment: any, status: number, one: number, two: number) => {
  const data = {} as LikeOrFavoriteDTO;
  data.likeOrFavoriteId = comment.id;
  data.notifyUid = comment.uid;
  data.type = 2;
  likeOrFavoriteByDTO(data).then(() => {
    if (two === -1) {
      dataList.value[one].isLike = status == 1;
      dataList.value[one].likeCount += status;
    } else {
      dataList.value[one].children[two].isLike = status == 1;
      dataList.value[one].children[two].likeCount += status;
    }
  });
};

const saveComment = (comment: any, one: number, two: number) => {
  levelOneIndex.value = one;
  levelTwoIndex.value = two;
  emit("clickComment", comment);
};

const addComment = () => {
  //   if (props.replyComment.pid === undefined) return;

  let comment = props.replyComment;
  console.log("comment", comment);
  console.log(dataList.value);
  comment.likeCount = 0;
  comment.levelTwoCommentCount = 0;
  comment.time = formateTime(new Date().getTime());
  if (comment.pid === 0) {
    dataList.value.splice(0, 0, comment);
  } else {
    if (dataList.value[levelOneIndex.value].children == null) {
      dataList.value[levelOneIndex.value].children = [];
    }
    dataList.value[levelOneIndex.value].children.splice(levelTwoIndex.value + 1, 0, comment);
  }
};

const loadLevelTwoMore = (levelOneCommentId: number, index: number) => {
  let page = commentPageMap.get(levelOneCommentId);
  page += 1;
  console.log("loadLevelTwoMore", levelOneCommentId, page, index);
  getLevelTwoCommentByLevelOneCommentId(page, levelTwoPageSize, levelOneCommentId).then((res) => {
    const { records } = res.data;
    if (page === 1) {
      const spliceData = records.splice(showLevelTwoCommentCount, records.length);
      spliceData.forEach((item: any) => {
        item.time = formateTime(item.time);
        dataList.value[index].children.push(item);
      });
    } else {
      records.forEach((item: any) => {
        item.time = formateTime(item.time);
        dataList.value[index].children.push(item);
      });
    }
    levelTwoCommentCountMap.set(
      levelOneCommentId,
      levelTwoCommentCountMap.get(levelOneCommentId) + levelTwoPageSize
    );
    commentPageMap.set(levelOneCommentId, page);
  });
};

const loadMoreComments = () => {
  if (loadedCommentCount.value < props.commentCount) {
    getCommentData();
  }
};

const reback = (oneCommentId: string, index: number) => {
  levelTwoCommentCountMap.set(oneCommentId, 0);
  commentPageMap.set(oneCommentId, 0);
  const twoSpliceComment = dataList.value[index].children.splice(0, showLevelTwoCommentCount);
  dataList.value[index].children = twoSpliceComment;
};

const getCommentData = () => {
  getCommentWithCommentByNoteId(props.currentPage, levelOnePageSize, props.nid).then((res: any) => {
    const { records } = res.data;
    records.forEach((item: any) => {
      item.time = formateTime(item.time);
      const levelTwoComments = item.children;
      // 设置每一个一级评论的集合
      commentPageMap.set(item.id, 0);
      if (levelTwoComments != null) {
        const levelTwoData = [] as Array<any>;
        let count = 0;
        levelTwoComments.forEach((element: any) => {
          element.time = formateTime(element.time);
          levelTwoData.push(element);
          loadedCommentCount.value += 1;
          count += 1;
        });
        levelTwoCommentCountMap.set(item.id, count);
        item.children = levelTwoData;
      }
      dataList.value.push(item);
      loadedCommentCount.value += 1;
    });
  });
};

watch(
  () => [props.nid, props.seed],
  ([newNid, newSeed], [oldNid, oldSeed]) => {
    // console.log("评论功能", newNid, oldNid);
    if (newNid !== oldNid) {
      dataList.value = [];
      getCommentData();
    }
    if (newSeed !== oldSeed) {
      addComment();
    }
  }
);

watch(
  () => [props.currentPage],
  ([newPage], [oldPage]) => {
    if (newPage !== oldPage) {
      getCommentData();
    }
  }
);
</script>
<style lang="less" scoped>
.comments-container {
  padding: 16px;

  .total {
    font-size: 14px;
    color: rgba(51, 51, 51, 0.6);
    margin-left: 8px;
    margin-bottom: 12px;
  }

  .list-container {
    position: relative;

    .parent-comment {
      margin-bottom: 16px;

      .comment-item {
        position: relative;
        display: flex;
        padding: 8px;

        .comment-inner-container {
          position: relative;
          display: flex;
          z-index: 1;
          width: 100%;
          flex-shrink: 0;

          .avatar {
            flex: 0 0 auto;

            .avatar-item {
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              border-radius: 100%;
              border: 1px solid rgba(0, 0, 0, 0.08);
              object-fit: cover;
              width: 40px;
              height: 40px;
            }
          }

          .right {
            margin-left: 12px;
            display: flex;
            flex-direction: column;
            font-size: 14px;
            flex-grow: 1;

            .author-wrapper {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .author {
                display: flex;
                align-items: center;

                .name {
                  color: rgba(51, 51, 51, 0.6);
                  line-height: 18px;
                }
              }
            }

            .content {
              margin-top: 4px;
              line-height: 140%;
              color: #333;
            }

            .info {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              font-size: 12px;
              line-height: 16px;
              color: rgba(51, 51, 51, 0.6);

              .date {
                margin: 8px 0;
              }

              .interactions {
                display: flex;
                margin-left: -2px;

                .like-wrapper {
                  padding: 0 4px;
                  color: rgba(51, 51, 51, 0.8);
                  font-weight: 500;

                  position: relative;
                  cursor: pointer;
                  display: flex;
                  align-items: center;

                  .like-lottie {
                    width: 16px;
                    height: 16px;
                    left: 4px;
                  }

                  .count {
                    margin-left: 2px;
                    font-weight: 500;
                  }
                }
              }
            }
          }
        }
      }

      .reply-container {
        margin-left: 52px;

        .show-more {
          margin-left: 44px;
          height: 32px;
          line-height: 32px;
          color: #13386c;
          cursor: pointer;
          font-weight: 500;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
