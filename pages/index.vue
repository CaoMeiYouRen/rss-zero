<template>
    <v-container
        class="welcome-page"
        fluid
        fill-height
    >
        <v-row align="center" justify="center">
            <v-col
                cols="12"
                md="8"
                class="text-center"
            >
                <v-card elevation="2" class="pa-8">
                    <v-card-title class="display-1 font-weight-bold mb-2">
                        RSS Zero
                    </v-card-title>
                    <v-card-subtitle class="mb-6">
                        一个基于 RSS 的信息流推荐工具，支持个性化推荐、多平台同步、自动发现、自定义配置、AI 大模型等功能。
                    </v-card-subtitle>
                    <v-btn
                        color="primary"
                        size="large"
                        to="/subscription"
                        class="mt-4"
                    >
                        开始使用
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { authClient } from '@/lib/auth-client'

onMounted(async () => {
    // 匿名自动登录
    const session = authClient.useSession()
    if (!session.value.data?.user?.id) {
        const user = await authClient.signIn.anonymous()
        console.log(user)
    } else {
        console.log(session.value.data?.user)
    }
})
</script>

<style scoped lang="scss">
.welcome-page {
    min-height: 100vh;
    min-width: 100vw;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 0;
    margin: 0;
}
</style>
