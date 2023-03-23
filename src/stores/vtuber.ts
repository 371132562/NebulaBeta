import { defineStore } from 'pinia'
import { getChannelDetail } from '@/api/vtuber'
import { getVtuberUidList } from '@/config/common'

export const useVtuberStore = defineStore('vtuber', {
  state: () => ({ vtuberDetailList: [] }),
  getters: {},
  actions: {
    async getVtuberDetail() {
      const vtuberUidList = getVtuberUidList()
      for (const item of vtuberUidList) {
        await getChannelDetail({ uId: item, includeExtra: true }).then(res => {
          this.vtuberDetailList.push(res)
        })
      }
    }
  }
})
