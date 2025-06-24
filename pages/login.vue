<template>
    <v-container class="login-page" fluid>
        <div class="login-page__bg" />
        <v-card class="login-page__card" elevation="12">
            <v-card-title class="login-page__title">
                登录
            </v-card-title>
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
                        variant="outlined"
                        density="comfortable"
                        color="primary"
                        required
                    />
                    <v-text-field
                        v-model="loginData.password"
                        :rules="[rules.required]"
                        label="密码"
                        type="password"
                        prepend-icon="mdi-lock"
                        class="login-page__input"
                        variant="outlined"
                        density="comfortable"
                        color="primary"
                        required
                    />
                    <v-btn
                        type="submit"
                        color="primary"
                        :loading="loading"
                        class="login-page__btn"
                        block
                        size="large"
                        rounded
                    >
                        登录
                    </v-btn>
                </v-form>
                <v-divider class="login-page__divider" />
                <v-btn
                    color="primary"
                    class="login-page__magic-btn"
                    block
                    size="large"
                    rounded
                    prepend-icon="mdi-email-fast-outline"
                    @click="showMagicLink = true"
                >
                    邮箱一键登录
                </v-btn>
                <div class="login-page__links">
                    <NuxtLink to="/forget-password" class="login-page__text-link">
                        忘记密码？
                    </NuxtLink>
                    <NuxtLink to="/register" class="login-page__text-link">
                        没有账号？注册
                    </NuxtLink>
                </div>
                <!-- 一次性链接登录弹窗 -->
                <v-dialog v-model="showMagicLink" max-width="400">
                    <v-card class="login-page__magic-card">
                        <v-card-title class="login-page__magic-title">
                            邮箱一键登录
                        </v-card-title>
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
                                    variant="outlined"
                                    color="primary"
                                    class="login-page__magic-input"
                                    required
                                />
                                <v-btn
                                    type="submit"
                                    color="primary"
                                    :loading="loading"
                                    block
                                    rounded
                                    size="large"
                                    prepend-icon="mdi-send"
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
import { authClient } from '@/lib/auth-client'
import { useGlobalSnackbar } from '@/composables/use-global-snackbar'
import { isEmail } from '@/utils/validate'

const router = useRouter()
const { showSnackbar } = useGlobalSnackbar()

const valid = ref(false)
const magicValid = ref(false)
const loading = ref(false)
const showMagicLink = ref(false)

const loginData = ref({ identifier: '', password: '' })
const magicData = ref({ email: '' })

const rules = {
    required: (v: string) => !!v || '必填项',
    email: (v: string) => isEmail(v) || '邮箱格式不正确',
}

async function onLogin() {
    if (!valid.value) {
        return
    }
    loading.value = true
    try {
        let data; let error
        // if (isPhone(loginData.value.identifier)) {
        // 手机号登录（如后端支持）
        // ({ data, error } = await authClient.signIn.phone?.({
        //     phone: loginData.value.identifier,
        //     password: loginData.value.password,
        // }) || {})
        // } else
        if (isEmail(loginData.value.identifier)) {
            // 邮箱登录
            ({ data, error } = await authClient.signIn.email({
                email: loginData.value.identifier,
                password: loginData.value.password,
            }))
        } else {
            // 用户名登录
            ({ data, error } = await authClient.signIn.username({
                username: loginData.value.identifier,
                password: loginData.value.password,
            }))
        }
        if (error) {
            showSnackbar(error.message || '登录失败', 'error')
        } else {
            router.push('/')
        }
    } catch (e: any) {
        showSnackbar(e?.message || '登录失败', 'error')
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
            showSnackbar(error.message || '发送失败', 'error')
        } else {
            showSnackbar('登录链接已发送，请查收邮箱', 'success')
            showMagicLink.value = false
        }
    } catch (e: any) {
        showSnackbar(e?.message || '发送失败', 'error')
    } finally {
        loading.value = false
    }
}
</script>

<style lang="scss" scoped>
.login-page {
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
        /* 可根据品牌色调整渐变 */
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

    &__magic-btn {
        margin-bottom: 18px;
        font-weight: 600;
        letter-spacing: 1px;
        border-radius: 8px;
        background: linear-gradient(90deg, #3b5bfd 0%, #4f8cff 100%);
        color: #fff !important;
        box-shadow: 0 2px 8px 0 rgba(60, 80, 180, 0.08);
        transition: background 0.2s;

        &:hover {
            background: linear-gradient(90deg, #2a47c6 0%, #3b5bfd 100%);
        }
    }

    &__links {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        margin-top: 2px;
        margin-bottom: 2px;
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

    &__magic-card {
        border-radius: 18px;
        box-shadow: 0 4px 24px 0 rgba(60, 80, 180, 0.10);
        background: #fafdff;
    }

    &__magic-title {
        font-size: 1.2rem;
        font-weight: 600;
        color: #234;
        text-align: center;
        margin-bottom: 10px;
    }

    &__magic-input {
        background: #f3f7fd;
        border-radius: 8px;
        margin-bottom: 18px;
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
