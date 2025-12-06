import request from "@/utils/request";
import type { CommentDTO } from "@/types/comment";

/**
 * 得到所有的一级评论并携带二级评论
 * @param currentPage 当前页
 * @param pageSize 分页数
 * @param noteId 笔记id
 * @returns 评论结果集
 */
export const getCommentWithCommentByNoteId = (
  currentPage: number,
  pageSize: number,
  noteId: number
) => {
  return request<any>({
    url: `/web/comment/getCommentWithCommentByNoteId/${currentPage}/${pageSize}`,
    method: "get",
    params: {
      noteId,
    },
  });
};

/**
 * 保存评论
 * @param data 评论实体
 * @returns 增加后的评论实体
 */
export const saveCommentByDTO = (data: CommentDTO) => {
  return request<any>({
    url: `/web/comment/saveCommentByDTO`,
    method: "post",
    data: data,
  });
};

/**
 * 根据一级评论id获取所有的二级评论
 * @param currentPage 当前页
 * @param pageSize 分页数
 * @param levelOneCommentId 一级评论id
 * @returns 评论结果集
 */
export const getLevelTwoCommentByLevelOneCommentId = (
  currentPage: number,
  pageSize: number,
  levelOneCommentId: number
) => {
  return request<any>({
    url: `/web/comment/getLevelTwoCommentByLevelOneCommentId/${currentPage}/${pageSize}`,
    method: "get",
    params: {
      levelOneCommentId,
    },
  });
};

/**
 * 获取当前用户通知的评论集
 * @param currentPage 当前页
 * @param pageSize 分页数
 * @returns 评论结果集
 */
export const getCommentInfo = (
  currentPage: number,
  pageSize: number,
) => {
  return request<any>({
    url: `/web/comment/getCommentInfo/${currentPage}/${pageSize}`,
    method: "get",
  });
};
