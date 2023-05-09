import pinia from '@/stores'
import { reactive } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { getChannelDetail } from '@api/vtuber'
import { getVtuberUidList } from '@/config/common'

const vtuberStore = defineStore('vtuber', () => {
  //state
  const vtuberDetailList = reactive([])

  //getters

  //actions
  const getVtuberDetail = async () => {
    if (vtuberDetailList.length === 0) {
      const vtuberUidList = getVtuberUidList()
      for (const item of vtuberUidList) {
        await getChannelDetail({ uId: item, includeExtra: true }).then(res => {
          vtuberDetailList.push(res)
        })
      }
    }
  }

  //
  return { vtuberDetailList, getVtuberDetail }
})(pinia)

export const { vtuberDetailList } = storeToRefs(vtuberStore)
export const { getVtuberDetail } = vtuberStore
