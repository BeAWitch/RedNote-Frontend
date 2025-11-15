// axios 基础的封装
import axios from 'axios'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'

const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// 请求拦截器
httpInstance.interceptors.request.use(config => {
  const userStore = useUserStore()
  const token = userStore.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
httpInstance.interceptors.response.use(response => {
  return response
}, error => {
  // 统一错误提示
  ElMessage({
    message: error.response.data.message,
    type: 'warning'
  })

  // 401 代表 token 失效，清除用户信息
  if (error.response.status === 401) {
    const userStore = useUserStore()
    userStore.logout()
    router.push('/login')
  }
  return Promise.reject(error)
})

export default httpInstance
