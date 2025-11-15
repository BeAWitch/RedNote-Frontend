import { defineStore } from "pinia";
import { ref } from "vue";
import { storage } from "@/utils/storage";
import { refreshToken } from "@/apis/user";
import { store } from "@/stores";
import type { User } from "@/types/user";

// 使用setup模式定义
export const userStore = defineStore("userStore", () => {
  const token = ref("");

  const getToken = () => {
    return storage.get("accessToken");
  };

  const getUserInfo = (): User => {
    return storage.get("userInfo") as User;
  };

  const setUserInfo = (data: User) => {
    storage.set("userInfo", data);
  };

  const isLogin = () => {
    const user = storage.get("userInfo") as User;
    return user != null && user != undefined;
  };

  const getNewToken = (token: string) => {
    return new Promise<any>((resolve, reject) => {
      refreshToken(token)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const logout = () => {
    window.localStorage.clear();
  };

  return { token, getToken, getNewToken, getUserInfo, setUserInfo, logout, isLogin };
});

export function useUserStore() {
  return userStore(store);
}
