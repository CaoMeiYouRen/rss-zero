<template>
    <v-container class="welcome-page" fluid>
        <div class="welcome-page__bg" />
        <v-row
            align="center"
            justify="center"
            class="welcome-page__row"
            no-gutters
        >
            <v-col
                cols="12"
                md="8"
                lg="6"
                class="welcome-page__col"
            >
                <v-card class="welcome-page__card" elevation="12">
                    <v-card-title class="welcome-page__title">
                        RSS Zero
                    </v-card-title>
                    <v-card-text class="welcome-page__subtitle">
                        一个基于 RSS 的信息流推荐工具，支持个性化推荐、多平台同步、自动发现、自定义配置、AI 大模型等功能。
                    </v-card-text>
                    <v-btn
                        color="primary"
                        size="large"
                        to="/feed"
                        class="welcome-page__btn"
                        rounded
                    >
                        开始使用
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { authClient } from '@/lib/auth-client'

const session = authClient.useSession()

watch(
    () => session.value.isPending || session.value.isRefetching,
    async (status) => {
        if (status) { // 如果 session 正在加载中，则不执行后续逻辑
            return
        }
        // session 加载完成后再判断
        if (!session.value.data?.user?.id) { // 如果用户未登录，则执行匿名登录
            const user = await authClient.signIn.anonymous()
            console.log(user)
            return
        }
        console.log(session.value.data?.user)
    },
    { immediate: true }, // 立即执行
)
</script>

<style scoped lang="scss">
.welcome-page__col {
    display: flex;
    align-items: center;
    justify-content: center;
}

.welcome-page {
    position: relative;
    min-height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 0;
    margin: auto;

    &__bg {
        position: absolute;
        inset: 0;
        z-index: 0;
        background: linear-gradient(135deg, #e3f0ff 0%, #f9fafe 100%);
        width: 100vw;
        height: 100vh;
        pointer-events: none;
    }

    &__row {
        min-height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__card {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 640px;
        padding: 48px 32px 40px 32px;
        border-radius: 24px;
        box-shadow: 0 8px 32px 0 rgba(60, 80, 180, 0.10), 0 1.5px 6px 0 rgba(60, 80, 180, 0.06);
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    &__title {
        font-size: 2.2rem;
        font-weight: 700;
        text-align: center;
        margin-bottom: 18px;
        letter-spacing: 1px;
        color: #234;
        width: 100%;
    }

    &__subtitle {
        font-size: 1.1rem;
        color: #6b7685;
        margin-bottom: 32px;
        text-align: center;
        line-height: 1.6;
        width: 100%;
        word-break: break-all;
    }

    &__btn {
        font-size: 1.1rem;
        font-weight: 600;
        letter-spacing: 1px;
        border-radius: 8px;
        box-shadow: 0 2px 8px 0 rgba(60, 80, 180, 0.08);
        min-width: 160px;
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

        &__subtitle {
            font-size: 0.98rem;
        }
    }
}
</style>
