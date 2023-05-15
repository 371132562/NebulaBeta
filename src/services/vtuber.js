import http from './base'

//获取全部v列表
/*
* {
    "uName": "法纳瑞eternal",
    "uId": 1891854193,
    "faceUrl": "https://i1.hdslb.com/bfs/face/f4bdbc9e31693c471c385ac742c6f5c1f90b6919.jpg"
}*/
export const getAllVtuberList = (params = { simple: true }) => {
  return http.get(`/ukamnads.icu/api/v2/channels`, { params })
}

//根据uid获取直播信息
export const getChannelDetail = (params = {}) => {
  return http.get(`/ukamnads.icu/api/v2/channel`, { params })
}
