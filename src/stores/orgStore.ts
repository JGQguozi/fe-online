import { defineStore } from 'pinia';

interface nodeKeyState {
  /** 滚动元素的id */
  keyId: string;
}
const useOrgStore = defineStore('orgStore', {
  state: (): nodeKeyState => ({
    keyId: '',
  }),
  getters: {
    getOrgNodeKey: (state) => state.keyId,
  },
  actions: {
    /** 设置组织列表节点key信息 */
    setOrgNodeKey(key: string) {
      this.keyId = key;
      console.log("设置组织列表节点key信息", key);
      
    },
    
  }
});
export default useOrgStore
