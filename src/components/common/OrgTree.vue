<template>
      <el-aside width="200px">
        <el-scrollbar>
          <el-tree
            :props="props"
            :load="loadNode"
            lazy
            :current-node-key="currentNodeKey"
            @node-click="nodeClick"
          />
        </el-scrollbar>
      </el-aside>
  </template>
  
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import orgApi from '../../api/org'
import type Node from 'element-plus/es/components/tree/src/model/node'
import useOrgStore from '@/stores/orgStore'
interface Tree {
  name: string
  leaf?: boolean
  id: string
}

const props = {
  label: 'name',
  children: 'zones',
  isLeaf: 'leaf',
}
// 获取菜单数据
const getMenuData = async (): Org[] => {
  let menuData: Org[] = await orgApi.query({})
  return menuData
}
const loadNode = async (node: Node, resolve: (data: Tree[]) => void) => {
  if (node.level === 0) {
    return resolve([{ name: 'region', id: '11111' }])
  }
  if (node.level === 1) return resolve([
    {
      name: 'leaf',
      leaf: true,
      id: '2222222'
    },
    {
      name: 'zone',
      id: '333333'
    },
  ])
  if (node.level > 3) return resolve([])

  const data: Tree[] = await getMenuData()
  resolve(data)
}
const orgStore = useOrgStore()
const currentNodeKey = ref<string>(null)
const nodeClick = (target, node) => {
  const { id } = target
  currentNodeKey.value = id
  console.log("nodeClick", target)
  // 记录到pinia
  orgStore.setOrgNodeKey(id)

}
</script>

<style scoped>

</style>
  