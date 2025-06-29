<template>
    <div class="settings-page-container">
        <v-container class="settings-page" fluid>
            <div class="settings-page__bg" />
            <v-row justify="center">
                <v-col
                    cols="12"
                    lg="10"
                >
                    <!-- 设置 -->
                    <section id="settings" class="mb-12">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="font-bold text-2xl">
                                设置
                            </h2>
                            <v-btn color="primary" class="transition-custom">
                                <v-icon left>
                                    mdi-save
                                </v-icon> 保存设置
                            </v-btn>
                        </div>

                        <div class="gap-8 grid grid-cols-1 lg:grid-cols-3">
                            <div class="lg:col-span-2 space-y-6">
                                <!-- 阅读设置 -->
                                <div class="bg-white p-6 rounded-xl shadow-sm">
                                    <h3 class="font-semibold mb-4 text-lg">
                                        阅读设置
                                    </h3>
                                    <div class="space-y-4">
                                        <div class="flex items-center justify-between">
                                            <div>
                                                <h4 class="font-medium text-gray-900 text-sm">
                                                    文章摘要长度
                                                </h4>
                                                <p class="text-gray-500 text-xs">
                                                    控制文章摘要的显示长度
                                                </p>
                                            </div>
                                            <v-number-input
                                                v-model="summaryLength"
                                                :min="1"
                                                :max="10"
                                                class="w-32"
                                                controls
                                                label="段落"
                                            />
                                        </div>

                                        <div class="flex items-center justify-between">
                                            <div>
                                                <h4 class="font-medium text-gray-900 text-sm">
                                                    自动翻译
                                                </h4>
                                                <p class="text-gray-500 text-xs">
                                                    自动翻译非母语文章
                                                </p>
                                            </div>
                                            <v-switch
                                                id="toggle1"
                                                v-model="autoTranslate"
                                                color="primary"
                                                hide-details
                                            />
                                        </div>

                                        <div class="flex items-center justify-between">
                                            <div>
                                                <h4 class="font-medium text-gray-900 text-sm">
                                                    暗色模式
                                                </h4>
                                                <p class="text-gray-500 text-xs">
                                                    切换界面主题
                                                </p>
                                            </div>
                                            <v-switch
                                                id="toggle2"
                                                v-model="darkMode"
                                                color="primary"
                                                hide-details
                                            />
                                        </div>

                                        <div class="flex items-center justify-between">
                                            <div>
                                                <h4 class="font-medium text-gray-900 text-sm">
                                                    自动加载更多
                                                </h4>
                                                <p class="text-gray-500 text-xs">
                                                    滚动到底部时自动加载更多文章
                                                </p>
                                            </div>
                                            <v-switch
                                                id="toggle3"
                                                v-model="autoLoadMore"
                                                color="primary"
                                                hide-details
                                            />
                                        </div>
                                    </div>
                                </div>

                                <!-- 推荐算法设置 -->
                                <div class="bg-white p-6 rounded-xl shadow-sm">
                                    <h3 class="font-semibold mb-4 text-lg">
                                        推荐算法设置
                                    </h3>
                                    <div class="space-y-4">
                                        <div>
                                            <label class="block font-medium mb-1 text-gray-700 text-sm">推荐权重</label>
                                            <div class="gap-4 grid grid-cols-1 md:grid-cols-3">
                                                <div>
                                                    <label class="block mb-1 text-gray-500 text-xs">关键词匹配</label>
                                                    <v-slider
                                                        v-model="keywordWeight"
                                                        :min="0"
                                                        :max="100"
                                                        class="w-full"
                                                        hide-details
                                                        label="关键词匹配"
                                                        ticks="always"
                                                    >
                                                        <template #append>
                                                            <span class="font-medium text-gray-900 text-xs">{{ keywordWeight }}%</span>
                                                        </template>
                                                    </v-slider>
                                                </div>
                                                <div>
                                                    <label class="block mb-1 text-gray-500 text-xs">来源可信度</label>
                                                    <v-slider
                                                        v-model="sourceWeight"
                                                        :min="0"
                                                        :max="100"
                                                        class="w-full"
                                                        hide-details
                                                        label="来源可信度"
                                                        ticks="always"
                                                    >
                                                        <template #append>
                                                            <span class="font-medium text-gray-900 text-xs">{{ sourceWeight }}%</span>
                                                        </template>
                                                    </v-slider>
                                                </div>
                                                <div>
                                                    <label class="block mb-1 text-gray-500 text-xs">阅读历史</label>
                                                    <v-slider
                                                        v-model="historyWeight"
                                                        :min="0"
                                                        :max="100"
                                                        class="w-full"
                                                        hide-details
                                                        label="阅读历史"
                                                        ticks="always"
                                                    >
                                                        <template #append>
                                                            <span class="font-medium text-gray-900 text-xs">{{ historyWeight }}%</span>
                                                        </template>
                                                    </v-slider>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label class="block font-medium mb-2 text-gray-700 text-sm">重要度计算</label>
                                            <div class="space-y-2">
                                                <v-card class="bg-gray-50 p-3">
                                                    <v-row align="center" justify="space-between">
                                                        <v-checkbox
                                                            id="factor1"
                                                            v-model="factors[0].checked"
                                                            label="标题关键词匹配"
                                                            color="primary"
                                                            hide-details
                                                            class="text-sm"
                                                        />
                                                        <v-number-input
                                                            v-model="factors[0].weight"
                                                            :min="0"
                                                            :max="100"
                                                            class="w-24"
                                                            hide-details
                                                            label="权重"
                                                            density="compact"
                                                        />
                                                    </v-row>
                                                </v-card>

                                                <v-card class="bg-gray-50 p-3">
                                                    <v-row align="center" justify="space-between">
                                                        <v-checkbox
                                                            id="factor2"
                                                            v-model="factors[1].checked"
                                                            label="文章长度"
                                                            color="primary"
                                                            hide-details
                                                            class="text-sm"
                                                        />
                                                        <v-number-input
                                                            v-model="factors[1].weight"
                                                            :min="0"
                                                            :max="100"
                                                            class="w-24"
                                                            hide-details
                                                            label="权重"
                                                            density="compact"
                                                        />
                                                    </v-row>
                                                </v-card>

                                                <v-card class="bg-gray-50 p-3">
                                                    <v-row align="center" justify="space-between">
                                                        <v-checkbox
                                                            id="factor3"
                                                            v-model="factors[2].checked"
                                                            label="发布时间"
                                                            color="primary"
                                                            hide-details
                                                            class="text-sm"
                                                        />
                                                        <v-number-input
                                                            v-model="factors[2].weight"
                                                            :min="0"
                                                            :max="100"
                                                            class="w-24"
                                                            hide-details
                                                            label="权重"
                                                            density="compact"
                                                        />
                                                    </v-row>
                                                </v-card>

                                                <v-card class="bg-gray-50 p-3">
                                                    <v-row align="center" justify="space-between">
                                                        <v-checkbox
                                                            id="factor4"
                                                            v-model="factors[3].checked"
                                                            label="来源可信度"
                                                            color="primary"
                                                            hide-details
                                                            class="text-sm"
                                                        />
                                                        <v-number-input
                                                            v-model="factors[3].weight"
                                                            :min="0"
                                                            :max="100"
                                                            class="w-24"
                                                            hide-details
                                                            label="权重"
                                                            density="compact"
                                                        />
                                                    </v-row>
                                                </v-card>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 右侧栏 -->
                            <div class="space-y-6">
                                <!-- 用户信息 -->
                                <div class="bg-white p-6 rounded-xl shadow-sm">
                                    <div class="flex items-center mb-4">
                                        <img
                                            src="https://picsum.photos/200/200?random=user"
                                            alt="用户头像"
                                            class="h-12 mr-4 rounded-full w-12"
                                        >
                                        <div>
                                            <h3 class="font-semibold text-gray-900 text-sm">
                                                张三
                                            </h3>
                                            <p class="text-gray-500 text-xs">
                                                zhangsan@example.com
                                            </p>
                                        </div>
                                    </div>
                                    <div class="space-y-3">
                                        <v-btn
                                            variant="outlined"
                                            class="justify-start w-full"
                                            icon="mdi-account-circle"
                                        >
                                            个人资料
                                        </v-btn>
                                        <v-btn
                                            variant="outlined"
                                            class="justify-start w-full"
                                            icon="mdi-lock"
                                        >
                                            更改密码
                                        </v-btn>
                                        <v-btn
                                            variant="outlined"
                                            class="justify-start w-full"
                                            icon="mdi-bell"
                                        >
                                            通知设置
                                        </v-btn>
                                        <v-btn
                                            color="error"
                                            class="justify-start w-full"
                                            icon="mdi-logout"
                                        >
                                            退出登录
                                        </v-btn>
                                    </div>
                                </div>

                                <!-- 应用信息 -->
                                <div class="bg-white p-6 rounded-xl shadow-sm">
                                    <h3 class="font-semibold mb-4 text-lg">
                                        应用信息
                                    </h3>
                                    <div class="space-y-3">
                                        <div class="flex items-center justify-between">
                                            <span class="text-gray-600 text-sm">版本</span>
                                            <span class="font-medium text-gray-900 text-sm">1.0.0</span>
                                        </div>

                                        <div class="flex items-center justify-between">
                                            <span class="text-gray-600 text-sm">上次更新</span>
                                            <span class="font-medium text-gray-900 text-sm">2025-06-15</span>
                                        </div>

                                        <div class="flex items-center justify-between">
                                            <span class="text-gray-600 text-sm">存储空间</span>
                                            <span class="font-medium text-gray-900 text-sm">128MB / 512MB</span>
                                        </div>

                                        <div class="bg-gray-200 h-2 mt-2 rounded-full w-full">
                                            <div class="bg-primary h-2 rounded-full" style="width: 25%" />
                                        </div>
                                    </div>
                                    <v-btn
                                        variant="outlined"
                                        class="justify-start mt-4 w-full"
                                        icon="mdi-refresh"
                                    >
                                        检查更新
                                    </v-btn>
                                </div>

                                <!-- 帮助与支持 -->
                                <div class="bg-white p-6 rounded-xl shadow-sm">
                                    <h3 class="font-semibold mb-4 text-lg">
                                        帮助与支持
                                    </h3>
                                    <div class="space-y-3">
                                        <v-btn
                                            variant="text"
                                            class="bg-gray-50 hover:bg-gray-100 justify-start w-full"
                                            icon="mdi-help-circle"
                                        >
                                            帮助中心
                                        </v-btn>
                                        <v-btn
                                            variant="text"
                                            class="bg-gray-50 hover:bg-gray-100 justify-start w-full"
                                            icon="mdi-book"
                                        >
                                            使用教程
                                        </v-btn>
                                        <v-btn
                                            variant="text"
                                            class="bg-gray-50 hover:bg-gray-100 justify-start w-full"
                                            icon="mdi-file-document"
                                        >
                                            隐私政策
                                        </v-btn>
                                        <v-btn
                                            variant="text"
                                            class="bg-gray-50 hover:bg-gray-100 justify-start w-full"
                                            icon="mdi-email"
                                        >
                                            联系我们
                                        </v-btn>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 阅读设置
const summaryLength = ref(3)
const autoTranslate = ref(false)
const darkMode = ref(false)
const autoLoadMore = ref(false)

// 推荐算法设置
const keywordWeight = ref(60)
const sourceWeight = ref(30)
const historyWeight = ref(10)

const factors = ref([
  { id: 'factor1', name: '标题关键词匹配', checked: true, weight: 40 },
  { id: 'factor2', name: '文章长度', checked: true, weight: 20 },
  { id: 'factor3', name: '发布时间', checked: true, weight: 30 },
  { id: 'factor4', name: '来源可信度', checked: true, weight: 10 },
])
</script>

<style scoped lang="scss">
.settings-page {
    position: relative;
    min-height: 100vh;
    padding: 20px 0;

    // &__bg {
    //     position: absolute;
    //     inset: 0;
    //     z-index: 0;
    //     background: linear-gradient(135deg, #e3f0ff 0%, #f9fafe 100%);
    //     width: 100vw;
    //     height: 100vh;
    //     pointer-events: none;
    // }
}
</style>
