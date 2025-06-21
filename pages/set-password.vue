<template>
    <v-container class="set-password-page">
        <v-card class="set-password-page__card">
            <v-card-title>设置新密码</v-card-title>
            <v-card-text>
                <v-form
                    ref="form"
                    v-model="valid"
                    @submit.prevent="onSetPassword"
                >
                    <v-text-field
                        v-model="password"
                        :rules="[rules.required, rules.password]"
                        label="新密码"
                        type="password"
                        prepend-icon="mdi-lock"
                        class="set-password-page__input"
                        required
                    />
                    <v-text-field
                        v-model="confirmPassword"
                        :rules="[rules.required, v => v === password || '两次密码不一致']"
                        label="确认新密码"
                        type="password"
                        prepend-icon="mdi-lock-check"
                        class="set-password-page__input"
                        required
                    />
                    <v-btn
                        type="submit"
                        color="primary"
                        :loading="loading"
                        class="set-password-page__btn"
                        block
                    >
                        设置密码
                    </v-btn>
                </v-form>
                <v-divider class="my-4" />
                <v-btn
                    variant="text"
                    to="/login"
                    block
                >
                    返回登录
                </v-btn>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNuxtApp } from '#app'
import { authClient } from '~/lib/auth-client'

const route = useRoute()
const router = useRouter()
const { $fetch } = useNuxtApp()

const valid = ref(false)
const loading = ref(false)
const password = ref('')
const confirmPassword = ref('')

const rules = {
    required: (v: string) => !!v || '必填项',
    password: (v: string) => v.length >= 6 || '密码至少6位',
}

async function onSetPassword() {
    if (!valid.value) {
        return
    }
    if (password.value !== confirmPassword.value) {
        alert('两次密码不一致')
        return
    }
    loading.value = true
    try {
        const token = route.query.token as string
        if (!token) {
            throw new Error('无效的重置链接')
        }
        const { error } = await authClient.resetPassword({
            newPassword: password.value,
            token,
        })
        if (error) {
            alert(error.message || '设置失败')
        } else {
            alert('密码设置成功，请登录')
            router.push('/login')
        }
    } catch (e: any) {
        alert(e?.message || '设置失败')
    } finally {
        loading.value = false
    }
}
</script>

<style lang="scss" scoped>
.set-password-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;

    &__card {
        width: 100%;
        max-width: 400px;
        padding: 32px 24px;
    }

    &__input {
        margin-bottom: 16px;
    }

    &__btn {
        margin-top: 8px;
    }
}
</style>
