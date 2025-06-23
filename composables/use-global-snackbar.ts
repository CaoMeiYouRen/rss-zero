import { ref } from 'vue'

const show = ref(false)
const text = ref('')
const color = ref<'success' | 'error' | 'info' | 'warning'>('error')
const timeout = ref(4000)

export function useGlobalSnackbar() {
    function showSnackbar(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'error', time = 4000) {
        text.value = message
        color.value = type
        timeout.value = time
        show.value = false
        // 重新触发动画
        setTimeout(() => {
            show.value = true
        }, 10)
    }
    return { show, text, color, timeout, showSnackbar }
}
