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
                        label="邮箱"
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
                    @click="showMagicLink = true"
                >
                    邮箱一键登录
                </v-btn>
                <v-btn
                    variant="text"
                    to="/forget-password"
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
                <!-- 一次性链接登录弹窗 -->
                <v-dialog v-model="showMagicLink" max-width="400">
                    <v-card>
                        <v-card-title>邮箱一键登录</v-card-title>
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
                                    发送登录链接
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
import { authClient } from '~/lib/auth-client'

const router = useRouter()
const { $fetch } = useNuxtApp()

const valid = ref(false)
const magicValid = ref(false)
const loading = ref(false)
const showMagicLink = ref(false)

const loginData = ref({ identifier: '', password: '' })
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
        const { data, error } = await authClient.signIn.email({
            email: loginData.value.identifier,
            password: loginData.value.password,
        })
        if (error) {
            alert(error.message || '登录失败')
        } else {
            router.push('/')
        }
    } catch (e: any) {
        alert(e?.message || '登录失败')
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
        const { error } = await authClient.signIn.magicLink({
            email: magicData.value.email,
        })
        if (error) {
            alert(error.message || '发送失败')
        } else {
            alert('登录链接已发送，请查收邮箱')
            showMagicLink.value = false
        }
    } catch (e: any) {
        alert(e?.message || '发送失败')
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
