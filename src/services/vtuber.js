import http from './base'

//根据uid获取直播信息
export const getChannelDetail = (params = {}) => {
  return http.get(`/api.ukamnads.icu/api/v2/channel`, { params })
}
