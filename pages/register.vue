<template>
    <v-container class="register-page">
        <v-card class="register-page__card">
            <v-card-title>注册</v-card-title>
            <v-card-text>
                <v-form
                    ref="form"
                    v-model="valid"
                    @submit.prevent="onRegister"
                >
                    <v-text-field
                        v-model="registerData.username"
                        :rules="[rules.required, rules.username]"
                        label="用户名"
                        prepend-icon="mdi-account"
                        class="register-page__input"
                        required
                    />
                    <v-text-field
                        v-model="registerData.email"
                        :rules="[rules.required, rules.email]"
                        label="邮箱"
                        prepend-icon="mdi-email"
                        class="register-page__input"
                        required
                    />
                    <v-text-field
                        v-model="registerData.password"
                        :rules="[rules.required, rules.password]"
                        label="密码"
                        type="password"
                        prepend-icon="mdi-lock"
                        class="register-page__input"
                        required
                    />
                    <v-text-field
                        v-model="registerData.confirmPassword"
                        :rules="[rules.required, v => v === registerData.password || '两次密码不一致']"
                        label="确认密码"
                        type="password"
                        prepend-icon="mdi-lock-check"
                        class="register-page__input"
                        required
                    />
                    <v-btn
                        type="submit"
                        color="primary"
                        :loading="loading"
                        class="register-page__btn"
                        block
                    >
                        注册
                    </v-btn>
                </v-form>
                <v-divider class="my-4" />
                <v-btn
                    variant="text"
                    to="/login"
                    block
                >
                    已有账号？登录
                </v-btn>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNuxtApp } from '#app'

const router = useRouter()
const { $fetch } = useNuxtApp()

const valid = ref(false)
const loading = ref(false)
const registerData = ref({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
})

const rules = {
    required: (v: string) => !!v || '必填项',
    email: (v: string) => /.+@.+\..+/.test(v) || '邮箱格式不正确',
    password: (v: string) => v.length >= 6 || '密码至少6位',
    username: (v: string) => /^[a-zA-Z0-9_-]{3,36}$/.test(v) || '用户名格式不正确',
}

async function onRegister() {
    if (!valid.value) {
        return
    }
    if (registerData.value.password !== registerData.value.confirmPassword) {
        alert('两次密码不一致')
        return
    }
    loading.value = true
    try {
        await $fetch('/api/auth/sign-up', {
            method: 'POST',
            body: {
                username: registerData.value.username,
                email: registerData.value.email,
                password: registerData.value.password,
            },
        })
        alert('注册成功，请前往邮箱验证')
        router.push('/login')
    } catch (e: any) {
        alert(e?.data?.message || '注册失败')
    } finally {
        loading.value = false
    }
}
</script>

<style lang="scss" scoped>
.register-page {
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
