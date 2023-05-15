import dayjs from 'dayjs'
import { House, SwitchFilled, Search, Warning } from '@element-plus/icons-vue'

//头部菜单
export const menu = [
  { name: '主页', icon: House, path: '/home' },
  { name: '查询', icon: Search, path: '/detail' },
  { name: '斗虫', icon: SwitchFilled, path: '/battle' },
  { name: '关于', icon: Warning, path: '/about' }
]

//主播list
export const uIdList = [
  { uId: 1011797664 /*鸭鸭*/, company: 'nb' },
  { uId: 3461578781362279 /*叶子*/, company: 'nb' },
  { uId: 3461582034045213 /*小纸*/, company: 'nb' },
  { uId: 43156010 /*小火驴*/, company: 'nb' },
  { uId: 22385806 /*娜娜*/, company: 'nb' },
  { uId: 559863 /*鹭鹭*/, company: 'nb' },
  { uId: 1823500310 /*桃子*/, company: 'nb' },
  { uId: 1428441528 /*阿买*/, company: 'nb' }
]

//日期选择器快捷选项
export const dateShortcuts = [
  {
    text: '最近7天',
    value: () => {
      const end = dayjs().valueOf()
      return [end - 3600 * 24 * 7 * 1000, end]
    }
  },
  {
    text: '最近15天',
    value: () => {
      const end = dayjs().valueOf()
      return [end - 3600 * 24 * 15 * 1000, end]
    }
  },
  {
    text: '最近30天',
    value: () => {
      const end = dayjs().valueOf()
      return [end - 3600 * 24 * 30 * 1000, end]
    }
  },
  {
    text: '最近60天',
    value: () => {
      const end = dayjs().valueOf()
      return [end - 3600 * 24 * 60 * 1000, end]
    }
  },
  {
    text: '最近90天',
    value: () => {
      const end = dayjs().valueOf()
      return [end - 3600 * 24 * 90 * 1000, end]
    }
  }
]
