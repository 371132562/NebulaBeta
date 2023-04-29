import axios from 'axios'
// axios实例
const http = axios.create({
  //   baseURL: '',
  timeout: 30000
  //   withCredentials: true
})

http.interceptors.response.use(
  response => {
    const { data } = response
    if (data.code === 200) {
      return data.data
    }
    return response
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default http
