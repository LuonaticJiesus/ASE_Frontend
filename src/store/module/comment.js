import { defineStore } from 'pinia';

export const useCommentStore = defineStore('module', {
  state: () => ({
    activeCommentId: -1, // 要显示评论输入框的一级评论的id
    replyCommentId: -1, // 要回复的评论id
    activeCommentLevel: 0,
  }),
  getters: {},
  actions: {
    setActiveCommentId(id) {
      this.activeCommentId = id;
    },
    resetActiveCommentId() {
      this.activeCommentId = -1;
    },
    setActiveCommentLevel(level) {
      this.activeCommentLevel = level;
    },
    resetActiveCommentLevel() {
      this.activeCommentLevel = 0;
    },
    setReplyCommentId(id) {
      this.replyCommentId = id;
    },
    resetReplyCommentId() {
      this.replyCommentId = -1;
    },
  },
});
