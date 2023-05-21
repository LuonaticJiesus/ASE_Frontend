import { defineStore } from 'pinia';
import { defaultLogo } from '/@/utils/string.ts';

export const useModuleStore = defineStore('module', {
  state: () => ({
    curModuleAvatar: defaultLogo,
    curModuleName: 'QuadSSSS',
    curActiveTab: 0,
  }),
  getters: {},
  actions: {
    setModuleAvatar(avatar) {
      this.curModuleAvatar = avatar;
    },
    setModuleName(name) {
      this.curModuleName = name;
    },
    setActiveTab(tab) {
      this.curActiveTab = tab;
    },
    resetActiveTab() {
      this.curActiveTab = 0;
    },
  },
});
