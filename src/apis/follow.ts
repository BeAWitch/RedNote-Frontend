import request from "@/utils/request";

/**
 * 获取关注用户的所有动态
 *
 * @param lastTime 上一次的查询的最小时间戳
 * @param offset   上一次的查询中最小时间戳的个数
 * @param count    查询的数量
 */
export const getFollowTrend = (lastTime: number, offset: number, count: number) => {
  return request<any>({
    url: `/web/follow/getFollowTrend`,
    method: "get",
    params: {
      lastTime,
      offset,
      count,
    },
  });
};

/**
 * 关注用户
 * @param followId 关注用户id
 * @returns
 */
export const followById = (followId: number) => {
  return request<any>({
    url: `/web/follow/followById`,
    method: "get",
    params: {
      followId,
    },
  });
};

/**
 * 当前用户是否关注
 * @param followId 关注的用户id
 * @returns
 */
export const isFollow = (followId: number) => {
  return request<any>({
    url: `/web/follow/isFollow`,
    method: "get",
    params: {
      followId,
    },
  });
};

/**
 * 得到当前用户的最新关注信息
 * @param currentPage 当前页
 * @param pageSize 分页数
 * @returns FollowVo
 */
export const getFollowInfo = (currentPage: number, pageSize: number) => {
  return request<any>({
    url: `/web/follow/getFollowInfo/${currentPage}/${pageSize}`,
    method: "get",
  });
};
