import { defineStore, storeToRefs } from 'pinia'
import { getChannelDetail } from '@/api/vtuber'
import { getVtuberUidList } from '@/config/common'

const vtuberStore = defineStore('vtuber', {
  state: () => ({ vtuberDetailList: [] }),
  getters: {},
  actions: {
    async getVtuberDetail() {
      if (this.vtuberDetailList.length === 0) {
        const vtuberUidList = getVtuberUidList()
        for (const item of vtuberUidList) {
          await getChannelDetail({ uId: item, includeExtra: true }).then(
            res => {
              this.vtuberDetailList.push(res)
            }
          )
        }
      }
    }
  }
})()
const { vtuberDetailList } = storeToRefs(vtuberStore)
const { getVtuberDetail } = vtuberStore

export { vtuberDetailList, getVtuberDetail }
