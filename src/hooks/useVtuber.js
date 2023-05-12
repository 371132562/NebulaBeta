import { reactive } from 'vue'
import { getChannelDetail } from '@/services/vtuber'
import { uIdList } from '@/config/constants'

//vtuber相关数据及方法
const useVtuber = () => {
  //已获取的vtuber数据
  const vtuberList = reactive([])

  //根据id获取vtuber数据
  const getVtuberDetailById = async uId => {
    if (!vtuberList.find(item => item.uId === uId)) {
      await getChannelDetail({ uId: uId, includeExtra: true }).then(res => {
        const {
          channel = {},
          extra: { fansHistory = [], guardHistory = [] },
          lives = []
        } = res
        vtuberList.push({
          uId: channel.uId,
          channel,
          fansHistory,
          guardHistory,
          lives
        })
      })
    }
  }

  const initVtuberList = async () => {
    if (vtuberList.length < uIdList.length) {
      for (const item of uIdList) {
        await getVtuberDetailById(item.uId)
      }
    }
  }

  return {
    vtuberList,
    getVtuberDetailById,
    initVtuberList
  }
}

export const { vtuberList, getVtuberDetailById, initVtuberList } = useVtuber()
