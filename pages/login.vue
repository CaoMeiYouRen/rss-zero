<template>
    <v-container class="login-page">
        <v-card class="login-page__card">
            <v-card-title>登录</v-card-title>
            <v-card-text>
                <v-form
                    ref="form"
                    v-model="valid"
                    @submit.prevent="onLogin"
                >
                    <v-text-field
                        v-model="loginData.identifier"
                        :rules="[rules.required]"
                        label="邮箱或用户名"
                        prepend-icon="mdi-account"
                        class="login-page__input"
                        required
                    />
                    <v-text-field
                        v-model="loginData.password"
                        :rules="[rules.required]"
                        label="密码"
                        type="password"
                        prepend-icon="mdi-lock"
                        class="login-page__input"
                        required
                    />
                    <v-btn
                        type="submit"
                        color="primary"
                        :loading="loading"
                        class="login-page__btn"
                        block
                    >
                        登录
                    </v-btn>
                </v-form>
                <v-divider class="my-4" />
                <v-btn
                    variant="text"
                    block
                    @click="showEmailOtp = true"
                >
                    邮箱验证码登录
                </v-btn>
                <v-btn
                    variant="text"
                    block
                    @click="showMagicLink = true"
                >
                    魔法链接登录
                </v-btn>
                <v-btn
                    variant="text"
                    to="/reset-password"
                    block
                >
                    忘记密码？
                </v-btn>
                <v-btn
                    variant="text"
                    to="/register"
                    block
                >
                    没有账号？注册
                </v-btn>
                <!-- 邮箱验证码登录弹窗 -->
                <v-dialog v-model="showEmailOtp" max-width="400">
                    <v-card>
                        <v-card-title>邮箱验证码登录</v-card-title>
                        <v-card-text>
                            <v-form
                                ref="otpForm"
                                v-model="otpValid"
                                @submit.prevent="onEmailOtpLogin"
                            >
                                <v-text-field
                                    v-model="otpData.email"
                                    :rules="[rules.required, rules.email]"
                                    label="邮箱"
                                    prepend-icon="mdi-email"
                                    required
                                />
                                <v-text-field
                                    v-model="otpData.otp"
                                    :rules="[rules.required]"
                                    label="验证码"
                                    prepend-icon="mdi-shield-key"
                                    required
                                    append-inner-icon="mdi-send"
                                    @click:append-inner="sendOtp"
                                />
                                <v-btn
                                    type="submit"
                                    color="primary"
                                    :loading="loading"
                                    block
                                >
                                    登录
                                </v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-dialog>
                <!-- 魔法链接登录弹窗 -->
                <v-dialog v-model="showMagicLink" max-width="400">
                    <v-card>
                        <v-card-title>魔法链接登录</v-card-title>
                        <v-card-text>
                            <v-form
                                ref="magicForm"
                                v-model="magicValid"
                                @submit.prevent="onMagicLinkLogin"
                            >
                                <v-text-field
                                    v-model="magicData.email"
                                    :rules="[rules.required, rules.email]"
                                    label="邮箱"
                                    prepend-icon="mdi-email"
                                    required
                                />
                                <v-btn
                                    type="submit"
                                    color="primary"
                                    :loading="loading"
                                    block
                                >
                                    发送魔法链接
                                </v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-dialog>
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
const otpValid = ref(false)
const magicValid = ref(false)
const loading = ref(false)
const showEmailOtp = ref(false)
const showMagicLink = ref(false)

const loginData = ref({ identifier: '', password: '' })
const otpData = ref({ email: '', otp: '' })
const magicData = ref({ email: '' })

const rules = {
    required: (v: string) => !!v || '必填项',
    email: (v: string) => /.+@.+\..+/.test(v) || '邮箱格式不正确',
}

async function onLogin() {
    if (!valid.value) {
        return
    }
    loading.value = true
    try {
        await $fetch('/api/auth/sign-in', {
            method: 'POST',
            body: loginData.value,
        })
        router.push('/')
    } catch (e: any) {
        alert(e?.data?.message || '登录失败')
    } finally {
        loading.value = false
    }
}

async function onEmailOtpLogin() {
    if (!otpValid.value) {
        return
    }
    loading.value = true
    try {
        await $fetch('/api/auth/sign-in/email-otp', {
            method: 'POST',
            body: otpData.value,
        })
        showEmailOtp.value = false
        router.push('/')
    } catch (e: any) {
        alert(e?.data?.message || '登录失败')
    } finally {
        loading.value = false
    }
}

async function sendOtp() {
    if (!otpData.value.email || !rules.email(otpData.value.email)) {
        return
    }
    loading.value = true
    try {
        await $fetch('/api/auth/send-otp', {
            method: 'POST',
            body: { email: otpData.value.email },
        })
        alert('验证码已发送')
    } catch (e: any) {
        alert(e?.data?.message || '发送失败')
    } finally {
        loading.value = false
    }
}

async function onMagicLinkLogin() {
    if (!magicValid.value) {
        return
    }
    loading.value = true
    try {
        await $fetch('/api/auth/send-magic-link', {
            method: 'POST',
            body: magicData.value,
        })
        alert('魔法链接已发送，请查收邮箱')
        showMagicLink.value = false
    } catch (e: any) {
        alert(e?.data?.message || '发送失败')
    } finally {
        loading.value = false
    }
}
</script>

<style lang="scss" scoped>
.login-page {
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
