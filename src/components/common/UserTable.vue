<template>
<el-table :data="tableData">
    <el-table-column prop="date" label="Date" width="140" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="address" label="Address" />
</el-table>
</template>
  
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import userApi from '../../api/user'
import useOrgStore from '@/stores/orgStore'
interface ChildPropsType {
  inputVal: string;
}
const props = defineProps<ChildPropsType>()
const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const orgStore = useOrgStore()
const tableData = ref<UserTable[]>([])
interface UserTable {
  id: string
  name: string
}
// 表格查询
const getTableData = async () => {
    const data: UserTable[] = await userApi.query({orgkey: orgStore.getOrgNodeKey, select: props.inputVal})
    tableData.value = [...data.map(v => {
      return {...v, address: 'No. 189, Grove St, Los Angeles', date: '2016-05-02'}
    })]
    console.log("表格查询", data, orgStore.getOrgNodeKey, props.inputVal)
}
const antiShake =(time:number) =>{
    return setTimeout(() => {
      getTableData()
    }, time);
}
// 监听数据变化
watchEffect((onInvalidate) => {
  console.log('监听输入框和组织架构数据变化', orgStore.getOrgNodeKey, props.inputVal);
  const timer = antiShake(500)
  onInvalidate(() => clearTimeout(timer))
});
</script>

<style scoped>

</style>
  