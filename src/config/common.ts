//头部菜单
import { House, SwitchFilled, Search, Warning } from '@element-plus/icons-vue'

export const menu: { name: string; icon: any; path: string }[] = [
  { name: '主页', icon: House, path: '/home' },
  { name: '查询', icon: Search, path: '/' },
  { name: '斗虫', icon: SwitchFilled, path: '/' },
  { name: '关于', icon: Warning, path: '/' }
]

//主播list

export const getVtuberUidList = () => {
  return [
    1011797664 /*鸭鸭*/, 3461578781362279 /*叶子*/, 3461582034045213 /*小纸*/,
    43156010 /*小火驴*/, 22385806 /*娜娜*/, 559863 /*鹭鹭*/,
    1823500310 /*桃子*/, 1428441528 /*阿买*/
  ]
}
