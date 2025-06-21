<template>
    <v-container class="reset-password-page">
        <v-card class="reset-password-page__card">
            <v-card-title>重置密码</v-card-title>
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
                        required
                    />
                    <v-btn
                        type="submit"
                        color="primary"
                        :loading="loading"
                        class="reset-password-page__btn"
                        block
                    >
                        发送重置邮件
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
import { useNuxtApp } from '#app'
import { authClient } from '~/lib/auth-client'

const { $fetch } = useNuxtApp()
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
            redirectTo: '/set-password',
        })
        if (error) {
            alert(error.message || '发送失败')
        } else {
            alert('重置邮件已发送，请查收邮箱')
        }
    } catch (e: any) {
        alert(e?.message || '发送失败')
    } finally {
        loading.value = false
    }
}
</script>

<style lang="scss" scoped>
.reset-password-page {
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
