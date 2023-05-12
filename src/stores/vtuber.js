import pinia from '@/stores'
import { reactive, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { getChannelDetail } from '@/services/vtuber'
import { getVtuberUidList } from '@/config/common'

const vtuberStore = defineStore('vtuber', () => {
  /*state*/
  //已获取的vtuber数据
  const vtuberDetailList = reactive([])

  /*getters*/
  //返回当前路由的vtuber数据
  const currentVtuber = computed(uId => {
    return vtuberDetailList.find(item => item.channel.uId === uId)
  })

  /*actions*/
  //获取常量中的vtuber数据
  const getVtuberDetail = async () => {
    const vtuberUidList = getVtuberUidList()
    for (const item of vtuberUidList) {
      if (!vtuberDetailList.find(i => i.channel?.uId === item.channel?.uId)) {
        await getChannelDetail({ uId: item, includeExtra: true }).then(res => {
          vtuberDetailList.push(res)
        })
      }
    }
  }

  //根据uId获取vtuber数据，默认为当前路由的uId
  const getVtuberDetailByUId = async uId => {
    if (!vtuberDetailList.find(item => item.channel?.uId === uId)) {
      await getChannelDetail({ uId, includeExtra: true }).then(res => {
        vtuberDetailList.push(res)
      })
    }
  }

  //
  return {
    vtuberDetailList,
    currentVtuber,
    getVtuberDetail,
    getVtuberDetailByUId
  }
})(pinia)

export const { vtuberDetailList, currentVtuber } = storeToRefs(vtuberStore)
export const { getVtuberDetail, getVtuberDetailByUId } = vtuberStore
