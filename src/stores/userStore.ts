import { defineStore } from "pinia";
import { ref } from "vue";
import { storage } from "@/utils/storage";
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

  const logout = () => {
    window.localStorage.clear();
  };

  return { token, getToken, getUserInfo, setUserInfo, logout, isLogin };
});

export function useUserStore() {
  return userStore(store);
}
