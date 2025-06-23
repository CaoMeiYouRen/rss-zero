<template>
    <v-container class="verify-email-page" fluid>
        <div class="verify-email-page__bg" />
        <v-card class="verify-email-page__card" elevation="12">
            <v-card-title class="verify-email-page__title">
                邮箱验证
            </v-card-title>
            <v-card-text>
                <v-alert :type="status === 'success' ? 'success' : 'error'" class="mb-4 verify-email-page__alert">
                    {{ message }}
                </v-alert>
                <v-btn
                    v-if="status === 'success'"
                    color="primary"
                    to="/login"
                    block
                    size="large"
                    rounded
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
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    &__bg {
        position: absolute;
        inset: 0;
        z-index: 0;
        background: linear-gradient(135deg, #e3f0ff 0%, #f9fafe 100%);
        width: 100vw;
        height: 100vh;
        pointer-events: none;
    }

    &__card {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 420px;
        padding: 40px 32px 32px 32px;
        border-radius: 24px;
        box-shadow: 0 8px 32px 0 rgba(60, 80, 180, 0.10), 0 1.5px 6px 0 rgba(60, 80, 180, 0.06);
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    &__title {
        font-size: 2rem;
        font-weight: 700;
        text-align: center;
        margin-bottom: 12px;
        letter-spacing: 1px;
        color: #234;
    }

    &__alert {
        font-size: 1.05rem;
        border-radius: 8px;
    }

    @media (max-width: 600px) {
        &__card {
            max-width: 98vw;
            padding: 28px 8vw 24px 8vw;
            border-radius: 16px;
        }
        &__title {
            font-size: 1.4rem;
        }
    }
}
</style>
