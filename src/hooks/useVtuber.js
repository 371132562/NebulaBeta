import { ref } from 'vue'
import { getChannelDetail, getAllVtuberList } from '@/services/vtuber'
import { uIdList } from '@/config/constants'

//vtuber相关数据及方法
const useVtuber = () => {
  //已获取的vtuber数据
  const allVtuberList = ref([])
  const vtuberList = ref([])

  //获取全部vtuber简单列表
  const getVtuberSimpleList = () => {
    getAllVtuberList().then(res => {
      allVtuberList.value = res.data.map(item => {
        return {
          ...item,
          value: item.uId,
          label: item.uName
        }
      })
    })
  }

  //根据id获取vtuber数据
  const getVtuberDetailById = async uId => {
    if (!vtuberList.value.find(item => item.uId === uId)) {
      await getChannelDetail({ uId: uId, includeExtra: true }).then(res => {
        const {
          channel = {},
          extra: { fansHistory = [], guardHistory = [] },
          lives = []
        } = res.data
        let fansCount = [
          fansHistory[fansHistory.length - 2]?.follower || 0,
          fansHistory[fansHistory.length - 1]?.follower || 0
        ]
        let guardCount = [
          guardHistory[guardHistory.length - 2]?.guardNum || 0,
          guardHistory[guardHistory.length - 1]?.guardNum || 0
        ]
        vtuberList.value.push({
          uId: channel.uId,
          uName: channel.uName,
          faceUrl: channel.faceUrl,
          isLiving: channel.isLiving,
          channel,
          fansHistory,
          fansCount,
          guardHistory,
          guardCount,
          lives
        })
      })
    }
  }

  const initVtuberList = async () => {
    if (vtuberList.value.length < uIdList.length) {
      for (const item of uIdList) {
        await getVtuberDetailById(item.uId)
      }
    }
  }

  return {
    allVtuberList,
    vtuberList,
    getVtuberSimpleList,
    getVtuberDetailById,
    initVtuberList
  }
}

export const {
  allVtuberList,
  vtuberList,
  getVtuberSimpleList,
  getVtuberDetailById,
  initVtuberList
} = useVtuber()
