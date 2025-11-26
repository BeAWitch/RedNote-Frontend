import request from "@/utils/request";
import type { LikeOrCollectionDTO } from "@/types/likeOrCollection";
/**
 * 点赞或收藏
 * @param data 点赞收藏实体
 * @returns success
 */
export const likeOrCollectionByDTO = (data: LikeOrCollectionDTO) => {
  return request<any>({
    url: `/web/likeOrCollection/likeOrCollectionByDTO`,
    method: "post",
    data: data,
  });
};

/**
 * 是否点赞或收藏
 * @param data 点赞收藏实体
 * @returns
 */
export const isLikeOrCollection = (data: LikeOrCollectionDTO) => {
  return request<any>({
    url: `/web/likeOrCollection/isLikeOrCollection`,
    method: "post",
    data: data,
  });
};

/**
 * 得到当前用户最新的点赞和收藏信息
 * @param currentPage 当前页
 * @param pageSize 分页数
 * @returns page
 */
export const getNoticeLikeOrCollection = (currentPage: number, pageSize: number) => {
  return request<any>({
    url: `/web/likeOrCollection/getNoticeLikeOrCollection/${currentPage}/${pageSize}`,
    method: "get",
  });
};


