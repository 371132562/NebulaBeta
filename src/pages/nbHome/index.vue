<script setup lang='ts'>
import axios from "axios"
import { vtuberList } from "@/config/common.js"

// vtuberList.forEach(async (item: number) => {
  // await axios.get(`https://api.ukamnads.icu/api/v2/channel?uId=${item}&includeExtra=true`).then(res => {
  //   console.log(res)
  // })
// })
 axios.get(`https://api.ukamnads.icu/api/v2/channel?uId=${vtuberList[0]}&includeExtra=true`).then(res => {
  console.log(res)
})
</script>

<script lang='ts'>
export default {
  name: "NbHome"
}
</script>

<template>
  <div>ssss</div>
</template>

<style scoped lang='scss'></style>
