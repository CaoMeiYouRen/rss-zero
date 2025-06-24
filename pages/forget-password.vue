<template>
    <v-container class="reset-password-page" fluid>
        <div class="reset-password-page__bg" />
        <v-card class="reset-password-page__card" elevation="12">
            <v-card-title class="reset-password-page__title">
                重置密码
            </v-card-title>
            <v-card-text>
                <v-form
                    ref="form"
                    v-model="valid"
                    @submit.prevent="onReset"
                >
                    <v-text-field
                        v-model="email"
                        :rules="[rules.required, rules.email]"
                        label="邮箱"
                        prepend-icon="mdi-email"
                        class="reset-password-page__input"
                        variant="outlined"
                        density="comfortable"
                        color="primary"
                        required
                    >
                        <v-tooltip activator="parent" location="bottom">
                            请输入注册时使用的邮箱
                        </v-tooltip>
                    </v-text-field>
                    <v-btn
                        type="submit"
                        color="primary"
                        :loading="loading"
                        class="reset-password-page__btn"
                        block
                        size="large"
                        rounded
                    >
                        发送重置邮件
                        <v-tooltip activator="parent" location="bottom">
                            向邮箱发送重置密码链接
                        </v-tooltip>
                    </v-btn>
                </v-form>
                <v-divider class="reset-password-page__divider" />
                <v-btn
                    variant="text"
                    to="/login"
                    block
                    class="reset-password-page__text-link"
                >
                    返回登录
                </v-btn>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { authClient } from '@/lib/auth-client'
import { useGlobalSnackbar } from '@/composables/use-global-snackbar'

const { showSnackbar } = useGlobalSnackbar()
const valid = ref(false)
const loading = ref(false)
const email = ref('')

const rules = {
    required: (v: string) => !!v || '必填项',
    email: (v: string) => /.+@.+\..+/.test(v) || '邮箱格式不正确',
}

async function onReset() {
    if (!valid.value) {
        return
    }
    loading.value = true
    try {
        const { error } = await authClient.forgetPassword({
            email: email.value,
            redirectTo: '/reset-password',
        })
        if (error) {
            showSnackbar(error.message || '发送失败', 'error')
        } else {
            showSnackbar('重置邮件已发送，请查收邮箱', 'success')
        }
    } catch (e: any) {
        showSnackbar(e?.message || '发送失败', 'error')
    } finally {
        loading.value = false
    }
}
</script>

<style lang="scss" scoped>
.reset-password-page {
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
