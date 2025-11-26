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
 * @param deptId
 * @param file
 * @returns
 */
export function importFile(deptId: number, file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return request({
    url: "/api/v1/users/_import",
    method: "post",
    params: { deptId: deptId },
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

/**
 *
 * @param accessToken
 * @returns
 */
export const getUserInfoByToken = (accessToken: string) => {
  return request<any>({
    url: "/web/auth/getUserInfoByToken",
    method: "get",
    params: {
      accessToken,
    },
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
    data,
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

