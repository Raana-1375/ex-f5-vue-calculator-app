import { defineStore } from 'pinia'

export const useMemoryStore = defineStore('memory', {
  state: () => ({
    value: null,
  }),

  getters: {
    hasValue: (state) => state.value !== null,
  },

  actions: {
    save(newValue) {
      this.value = newValue
    },

    recall() {
      return this.value
    },

    clearMemory() {
      this.value = null
    },
  },
})