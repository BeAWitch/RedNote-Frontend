import request from "@/utils/request";
import type { UserLogin } from "@/types/user";

/**
 *
 * @param data
 * @returns
 */
export const login = (data: any) => {
  return request<any>({
    url: "/web/auth/login",
    method: "post",
    data,
  });
};

/**
 *
 * @param data
 * @returns
 */
export const loginByCode = (data: UserLogin) => {
  return request<any>({
    url: "/web/auth/loginByCode",
    method: "post",
    data,
  });
};

/**
 *
 * @param currentPage
 * @param pageSize
 * @param userId
 * @param type
 * @returns
 */
export const getTrendByUser = (currentPage: number, pageSize: number, userId: number, type:number) => {
  return request<any>({
    url: `/web/user/getTrendByUser/${currentPage}/${pageSize}`,
    method: "get",
    params: {
      userId,
      type
    },
  });
};

/**
 *
 * @param userId
 * @returns
 */
export const getUserById = (userId: number) => {
  return request<any>({
    url: `/web/user/getUserById`,
    method: "get",
    params: {
      userId
    },
  });
};

/**
 *
 * @param userId
 * @returns
 */
export const logout = (accessToken:string) => {
  return request<any>({
    url: `/web/auth/logout/${accessToken}`,
    method: "get"
  });
};

export const updateUser = (data: any) => {
  return request<any>({
    url: "/web/user/updateUser",
    method: "post",
    data: data,
  });
};

export const getUserByKeyword = (currentPage: number, pageSize: number, keyword: string) => {
  return request<any>({
    url: `/web/user/getUserByKeyword/${currentPage}/${pageSize}`,
    method: "get",
    params: {
      keyword
    },
  });
};

