import request from "@/utils/request";
import type { LikeOrFavoriteDTO } from "@/types/likeOrFavorite";
/**
 * 点赞或收藏
 * @param data 点赞收藏实体
 * @returns success
 */
export const likeOrFavoriteByDTO = (data: LikeOrFavoriteDTO) => {
  return request<any>({
    url: `/web/likeOrFavorite/likeOrFavoriteByDTO`,
    method: "post",
    data: data,
  });
};

/**
 * 是否点赞或收藏
 * @param data 点赞收藏实体
 * @returns
 */
export const isLikeOrFavorite = (data: LikeOrFavoriteDTO) => {
  return request<any>({
    url: `/web/likeOrFavorite/isLikeOrFavorite`,
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
export const getLikeAndFavoriteInfo = (currentPage: number, pageSize: number) => {
  return request<any>({
    url: `/web/likeOrFavorite/getLikeAndFavoriteInfo/${currentPage}/${pageSize}`,
    method: "get",
  });
};


