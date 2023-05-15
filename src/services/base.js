import axios from 'axios'
import { ElNotification } from 'element-plus'

// axios实例
const http = axios.create({
  //   baseURL: '',
  timeout: 30000,
  withCredentials: true
})

http.interceptors.response.use(
  response => {
    const { data } = response
    if (data.code === 200) {
      return data
    }
    return response
  },
  error => {
    ElNotification({
      title: `${error.code}`,
      message: `${error.config.url}`,
      type: 'error'
    })
    console.log(error)
    return Promise.reject(error)
  }
)

export default http
