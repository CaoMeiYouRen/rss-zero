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
import { useNuxtApp } from '#app'

const route = useRoute()
const router = useRouter()
const { $fetch } = useNuxtApp()

const status = ref<'success' | 'error'>('success')
const message = ref('正在验证...')

onMounted(async () => {
    const token = route.query.token as string
    if (!token) {
        status.value = 'error'
        message.value = '无效的验证链接'
        return
    }
    try {
        await $fetch('/api/auth/verify-email', {
            method: 'POST',
            body: { token },
        })
        status.value = 'success'
        message.value = '邮箱验证成功，请登录'
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
