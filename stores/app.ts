import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        isDarkMode: false,
        isMobile: false,
        isReady: false,
        isLoading: false,
    }),
})
