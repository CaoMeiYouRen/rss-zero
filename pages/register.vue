<template>
    <v-container class="register-page" fluid>
        <div class="register-page__bg" />
        <v-card class="register-page__card" elevation="12">
            <v-card-title class="register-page__title">
                注册
            </v-card-title>
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
                        variant="outlined"
                        density="comfortable"
                        color="primary"
                        required
                    >
                        <v-tooltip activator="parent" location="bottom">
                            2-36个字符，仅支持字母、数字、下划线，不能为邮箱或手机号格式。用户名将用于登录。
                        </v-tooltip>
                    </v-text-field>
                    <v-text-field
                        v-model="registerData.nickname"
                        :rules="[rules.required, rules.nickname]"
                        label="昵称"
                        prepend-icon="mdi-account-circle"
                        class="register-page__input"
                        variant="outlined"
                        density="comfortable"
                        color="primary"
                        required
                    >
                        <v-tooltip activator="parent" location="bottom">
                            2-36个字符，支持中英文、数字和常用符号。昵称将用于个人资料显示。
                        </v-tooltip>
                    </v-text-field>
                    <v-text-field
                        v-model="registerData.email"
                        :rules="[rules.required, rules.email]"
                        label="邮箱"
                        prepend-icon="mdi-email"
                        class="register-page__input"
                        variant="outlined"
                        density="comfortable"
                        color="primary"
                        required
                    >
                        <v-tooltip activator="parent" location="bottom">
                            邮箱将用于接收验证邮件和密码重置链接，请确保邮箱有效。
                        </v-tooltip>
                    </v-text-field>
                    <v-text-field
                        v-model="registerData.password"
                        :rules="[rules.required, rules.password]"
                        label="密码"
                        type="password"
                        prepend-icon="mdi-lock"
                        class="register-page__input"
                        variant="outlined"
                        density="comfortable"
                        color="primary"
                        required
                    >
                        <v-tooltip activator="parent" location="bottom">
                            密码至少6位
                        </v-tooltip>
                    </v-text-field>
                    <v-text-field
                        v-model="registerData.confirmPassword"
                        :rules="[rules.required, v => v === registerData.password || '两次密码不一致']"
                        label="确认密码"
                        type="password"
                        prepend-icon="mdi-lock-check"
                        class="register-page__input"
                        variant="outlined"
                        density="comfortable"
                        color="primary"
                        required
                    >
                        <v-tooltip activator="parent" location="bottom">
                            请再次输入密码
                        </v-tooltip>
                    </v-text-field>
                    <v-btn
                        type="submit"
                        color="primary"
                        :loading="loading"
                        class="register-page__btn"
                        block
                        size="large"
                        rounded
                    >
                        注册
                        <v-tooltip activator="parent" location="bottom">
                            注册新账号
                        </v-tooltip>
                    </v-btn>
                </v-form>
                <v-divider class="register-page__divider" />
                <v-btn
                    variant="text"
                    to="/login"
                    block
                    class="register-page__text-link"
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
import { authClient } from '@/lib/auth-client'
import { useGlobalSnackbar } from '@/composables/use-global-snackbar'
import { isEmail, isPhone, isUsername } from '@/utils/validate'

const router = useRouter()
const { showSnackbar } = useGlobalSnackbar()

const valid = ref(false)
const loading = ref(false)
const registerData = ref({
    username: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
})

const rules = {
    required: (v: string) => !!v || '必填项',
    email: (v: string) => isEmail(v) || '邮箱格式不正确',
    password: (v: string) => v.length >= 6 && v.length <= 64 || '密码至少6位', // TODO: 可以添加更复杂的密码规则
    username: (v: string) => {
        if (!isUsername(v)) {
            return '用户名格式不正确'
        }
        if (isEmail(v)) {
            return '用户名不能为邮箱格式'
        }
        if (isPhone(v)) {
            return '用户名不能为手机号格式'
        }
        return true
    },
    nickname: (v: string) => v && v.length >= 2 && v.length <= 36 || '昵称需为2-36个字符',
}

async function onRegister() {
    if (!valid.value) {
        return
    }
    if (registerData.value.password !== registerData.value.confirmPassword) {
        showSnackbar('两次密码不一致', 'error')
        return
    }
    loading.value = true
    try {
        const { data, error } = await authClient.signUp.email({
            email: registerData.value.email,
            password: registerData.value.password,
            name: registerData.value.username,
            username: registerData.value.username,
            displayUsername: registerData.value.nickname, // 使用昵称作为显示用户名
        })
        if (error) {
            showSnackbar(error.message || '注册失败', 'error')
        } else {
            showSnackbar('注册成功，请前往邮箱验证', 'success')
            router.push('/login')
        }
    } catch (e: any) {
        showSnackbar(e?.message || '注册失败', 'error')
    } finally {
        loading.value = false
    }
}
</script>

<style lang="scss" scoped>
.register-page {
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

    &__field-tip {
        font-size: 0.88rem;
        color: #8a94a6;
        margin-top: -40px;
        margin-bottom: 12px;
        margin-left: 2px;
        line-height: 1.5;
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
