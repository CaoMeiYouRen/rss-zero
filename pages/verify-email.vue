<template>
    <v-container class="verify-email-page">
        <v-card class="verify-email-page__card">
            <v-card-title>邮箱验证</v-card-title>
            <v-card-text>
                <v-alert :type="status === 'success' ? 'success' : 'error'" class="mb-4">
                    {{ message }}
                </v-alert>
                <v-btn
                    v-if="status === 'success'"
                    color="primary"
                    to="/login"
                    block
                >
                    去登录
                </v-btn>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authClient } from '@/lib/auth-client'

const route = useRoute()
const router = useRouter()

const status = ref<'success' | 'error'>('success')
const message = ref('正在验证...')

onMounted(async () => {
    // 假设 email 和 otp 通过 URL 查询参数传递
    const email = route.query.email as string
    const otp = route.query.otp as string
    if (!email || !otp) {
        status.value = 'error'
        message.value = '无效的验证链接'
        return
    }
    try {
        // 使用 verifyEmail 方法进行验证
        const { data, error } = await authClient.emailOtp.verifyEmail({
            email,
            otp,
        })
        if (error) {
            status.value = 'error'
            message.value = error.message || '邮箱验证失败'
        } else {
            status.value = 'success'
            message.value = '邮箱验证成功，请登录'
        }
    } catch (e: any) {
        status.value = 'error'
        message.value = e?.data?.message || '邮箱验证失败'
    }
})
</script>

<style lang="scss" scoped>
.verify-email-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;

    &__card {
        width: 100%;
        max-width: 400px;
        padding: 32px 24px;
    }
}
</style>
