import http from './base'

//根据uid获取直播信息
export const getChannelDetail = (params = {}) => {
  return http.get(`https://api.ukamnads.icu/api/v2/channel`, { params })
}