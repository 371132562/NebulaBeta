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
        vtuberList.value.push({
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
