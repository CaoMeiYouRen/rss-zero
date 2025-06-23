<template>
    <v-container class="set-password-page" fluid>
        <div class="set-password-page__bg" />
        <v-card class="set-password-page__card" elevation="12">
            <v-card-title class="set-password-page__title">
                设置新密码
            </v-card-title>
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
                        variant="outlined"
                        density="comfortable"
                        color="primary"
                        required
                    />
                    <v-text-field
                        v-model="confirmPassword"
                        :rules="[rules.required, v => v === password || '两次密码不一致']"
                        label="确认新密码"
                        type="password"
                        prepend-icon="mdi-lock-check"
                        class="set-password-page__input"
                        variant="outlined"
                        density="comfortable"
                        color="primary"
                        required
                    />
                    <v-btn
                        type="submit"
                        color="primary"
                        :loading="loading"
                        class="set-password-page__btn"
                        block
                        size="large"
                        rounded
                    >
                        设置密码
                    </v-btn>
                </v-form>
                <v-divider class="set-password-page__divider" />
                <v-btn
                    variant="text"
                    to="/login"
                    block
                    class="set-password-page__text-link"
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
import { authClient } from '@/lib/auth-client'
import { useGlobalSnackbar } from '@/composables/use-global-snackbar'

const route = useRoute()
const router = useRouter()
const { showSnackbar } = useGlobalSnackbar()

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
        showSnackbar('两次密码不一致', 'error')
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
            showSnackbar(error.message || '设置失败', 'error')
        } else {
            showSnackbar('密码设置成功，请登录', 'success')
            router.push('/login')
        }
    } catch (e: any) {
        showSnackbar(e?.message || '设置失败', 'error')
    } finally {
        loading.value = false
    }
}
</script>

<style lang="scss" scoped>
.set-password-page {
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

    &__input {
        margin-bottom: 20px;
        font-size: 1rem;
    }

    &__btn {
        margin-top: 8px;
        font-size: 1.1rem;
        font-weight: 600;
        letter-spacing: 1px;
        border-radius: 8px;
        box-shadow: 0 2px 8px 0 rgba(60, 80, 180, 0.08);
    }

    &__divider {
        margin: 28px 0 18px 0;
        border-color: #e3e8f0;
    }

    &__text-link {
        color: #8a94a6;
        font-size: 0.98rem;
        text-align: center;
        text-decoration: none;
        margin: 0 0 2px 0;
        transition: color 0.2s;
        font-weight: 500;
        &:hover {
            color: #3b5bfd;
            text-decoration: underline;
        }
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
