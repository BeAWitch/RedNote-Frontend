import { defineStore } from "pinia";
import { ref } from "vue";
import { storage } from "@/utils/storage";
import { store } from "@/stores";
import type { User } from "@/types/user";

// 使用setup模式定义
export const userStore = defineStore("userStore", () => {
  const token = ref("");

  const loginFlag = ref(false);

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
    const token = storage.get("accessToken");
    loginFlag.value = user != null && user != undefined && token != null && token != undefined;
    return loginFlag.value;
  };

  const logout = () => {
    window.localStorage.clear();
    loginFlag.value = false;
    token.value = "";
  };

  return { token, loginFlag, getToken, getUserInfo, setUserInfo, logout, isLogin };
});

export function useUserStore() {
  return userStore(store);
}
