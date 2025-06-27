<template>
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
                        <button class="bg-primary flex hover:bg-primary/90 items-center px-4 py-2 rounded-lg text-white transition-custom">
                            <i class="fa fa-save mr-1" /> 保存设置
                        </button>
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
                                        <div class="flex items-center">
                                            <button class="bg-white border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary focus:text-primary h-8 hover:bg-gray-50 rounded-l-md text-gray-700 w-8">
                                                <i class="fa fa-minus" />
                                            </button>
                                            <input
                                                type="text"
                                                value="3"
                                                class="bg-white border-b border-gray-300 border-t focus:border-primary focus:ring-2 focus:ring-primary h-8 text-center text-gray-700 w-16"
                                                aria-label="Selected value"
                                            >
                                            <button class="bg-white border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary focus:text-primary h-8 hover:bg-gray-50 rounded-r-md text-gray-700 w-8">
                                                <i class="fa fa-plus" />
                                            </button>
                                            <span class="ml-2 text-gray-500 text-sm">段落</span>
                                        </div>
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
                                        <div class="align-middle duration-200 ease-in inline-block relative select-none transition w-12">
                                            <input
                                                id="toggle1"
                                                type="checkbox"
                                                class="absolute appearance-none bg-white block border-4 border-gray-300 checked:border-primary checked:right-0 cursor-pointer h-6 rounded-full toggle-checkbox w-6"
                                            >
                                            <label for="toggle1" class="bg-gray-300 block checked:bg-primary cursor-pointer h-6 overflow-hidden rounded-full toggle-label" />
                                        </div>
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
                                        <div class="align-middle duration-200 ease-in inline-block relative select-none transition w-12">
                                            <input
                                                id="toggle2"
                                                type="checkbox"
                                                class="absolute appearance-none bg-white block border-4 border-gray-300 checked:border-primary checked:right-0 cursor-pointer h-6 rounded-full toggle-checkbox w-6"
                                            >
                                            <label for="toggle2" class="bg-gray-300 block checked:bg-primary cursor-pointer h-6 overflow-hidden rounded-full toggle-label" />
                                        </div>
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
                                        <div class="align-middle duration-200 ease-in inline-block relative select-none transition w-12">
                                            <input
                                                id="toggle3"
                                                type="checkbox"
                                                class="absolute appearance-none bg-white block border-4 border-gray-300 checked:border-primary checked:right-0 cursor-pointer h-6 rounded-full toggle-checkbox w-6"
                                            >
                                            <label for="toggle3" class="bg-gray-300 block checked:bg-primary cursor-pointer h-6 overflow-hidden rounded-full toggle-label" />
                                        </div>
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
                                                <div class="flex items-center">
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="100"
                                                        value="60"
                                                        class="accent-primary appearance-none bg-gray-200 cursor-pointer h-2 rounded-lg w-full"
                                                    >
                                                    <span class="font-medium ml-2 text-gray-900 text-xs">60%</span>
                                                </div>
                                            </div>
                                            <div>
                                                <label class="block mb-1 text-gray-500 text-xs">来源可信度</label>
                                                <div class="flex items-center">
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="100"
                                                        value="30"
                                                        class="accent-primary appearance-none bg-gray-200 cursor-pointer h-2 rounded-lg w-full"
                                                    >
                                                    <span class="font-medium ml-2 text-gray-900 text-xs">30%</span>
                                                </div>
                                            </div>
                                            <div>
                                                <label class="block mb-1 text-gray-500 text-xs">阅读历史</label>
                                                <div class="flex items-center">
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="100"
                                                        value="10"
                                                        class="accent-primary appearance-none bg-gray-200 cursor-pointer h-2 rounded-lg w-full"
                                                    >
                                                    <span class="font-medium ml-2 text-gray-900 text-xs">10%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label class="block font-medium mb-2 text-gray-700 text-sm">重要度计算</label>
                                        <div class="space-y-2">
                                            <div class="bg-gray-50 flex items-center justify-between p-3 rounded-lg">
                                                <div class="flex items-center">
                                                    <input
                                                        id="factor1"
                                                        type="checkbox"
                                                        class="border-gray-300 focus:ring-primary h-4 rounded text-primary w-4"
                                                        checked
                                                    >
                                                    <label for="factor1" class="block ml-2 text-gray-900 text-sm">标题关键词匹配</label>
                                                </div>
                                                <div class="flex items-center">
                                                    <span class="mr-2 text-gray-500 text-xs">权重:</span>
                                                    <input
                                                        type="number"
                                                        value="40"
                                                        min="0"
                                                        max="100"
                                                        class="border border-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary h-6 rounded-md text-gray-900 text-xs w-16"
                                                    >
                                                </div>
                                            </div>

                                            <div class="bg-gray-50 flex items-center justify-between p-3 rounded-lg">
                                                <div class="flex items-center">
                                                    <input
                                                        id="factor2"
                                                        type="checkbox"
                                                        class="border-gray-300 focus:ring-primary h-4 rounded text-primary w-4"
                                                        checked
                                                    >
                                                    <label for="factor2" class="block ml-2 text-gray-900 text-sm">文章长度</label>
                                                </div>
                                                <div class="flex items-center">
                                                    <span class="mr-2 text-gray-500 text-xs">权重:</span>
                                                    <input
                                                        type="number"
                                                        value="20"
                                                        min="0"
                                                        max="100"
                                                        class="border border-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary h-6 rounded-md text-gray-900 text-xs w-16"
                                                    >
                                                </div>
                                            </div>

                                            <div class="bg-gray-50 flex items-center justify-between p-3 rounded-lg">
                                                <div class="flex items-center">
                                                    <input
                                                        id="factor3"
                                                        type="checkbox"
                                                        class="border-gray-300 focus:ring-primary h-4 rounded text-primary w-4"
                                                        checked
                                                    >
                                                    <label for="factor3" class="block ml-2 text-gray-900 text-sm">发布时间</label>
                                                </div>
                                                <div class="flex items-center">
                                                    <span class="mr-2 text-gray-500 text-xs">权重:</span>
                                                    <input
                                                        type="number"
                                                        value="30"
                                                        min="0"
                                                        max="100"
                                                        class="border border-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary h-6 rounded-md text-gray-900 text-xs w-16"
                                                    >
                                                </div>
                                            </div>

                                            <div class="bg-gray-50 flex items-center justify-between p-3 rounded-lg">
                                                <div class="flex items-center">
                                                    <input
                                                        id="factor4"
                                                        type="checkbox"
                                                        class="border-gray-300 focus:ring-primary h-4 rounded text-primary w-4"
                                                        checked
                                                    >
                                                    <label for="factor4" class="block ml-2 text-gray-900 text-sm">来源可信度</label>
                                                </div>
                                                <div class="flex items-center">
                                                    <span class="mr-2 text-gray-500 text-xs">权重:</span>
                                                    <input
                                                        type="number"
                                                        value="10"
                                                        min="0"
                                                        max="100"
                                                        class="border border-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary h-6 rounded-md text-gray-900 text-xs w-16"
                                                    >
                                                </div>
                                            </div>
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
                                    <button class="bg-white border border-gray-300 flex font-medium hover:bg-gray-50 items-center justify-center px-4 py-2 rounded-lg text-gray-700 text-sm w-full">
                                        <i class="fa fa-user-circle-o mr-2" /> 个人资料
                                    </button>
                                    <button class="bg-white border border-gray-300 flex font-medium hover:bg-gray-50 items-center justify-center px-4 py-2 rounded-lg text-gray-700 text-sm w-full">
                                        <i class="fa fa-key mr-2" /> 更改密码
                                    </button>
                                    <button class="bg-white border border-gray-300 flex font-medium hover:bg-gray-50 items-center justify-center px-4 py-2 rounded-lg text-gray-700 text-sm w-full">
                                        <i class="fa fa-bell-o mr-2" /> 通知设置
                                    </button>
                                    <button class="bg-danger flex font-medium hover:bg-danger/90 items-center justify-center px-4 py-2 rounded-lg text-sm text-white w-full">
                                        <i class="fa fa-sign-out mr-2" /> 退出登录
                                    </button>
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
                                <button class="bg-white border border-gray-300 flex font-medium hover:bg-gray-50 items-center justify-center mt-4 px-4 py-2 rounded-lg text-gray-700 text-sm w-full">
                                    <i class="fa fa-refresh mr-2" /> 检查更新
                                </button>
                            </div>

                            <!-- 帮助与支持 -->
                            <div class="bg-white p-6 rounded-xl shadow-sm">
                                <h3 class="font-semibold mb-4 text-lg">
                                    帮助与支持
                                </h3>
                                <div class="space-y-3">
                                    <a href="#" class="bg-gray-50 flex font-medium hover:bg-gray-100 items-center px-4 py-2 rounded-lg text-gray-700 text-sm w-full">
                                        <i class="fa fa-question-circle-o mr-2" /> 帮助中心
                                    </a>
                                    <a href="#" class="bg-gray-50 flex font-medium hover:bg-gray-100 items-center px-4 py-2 rounded-lg text-gray-700 text-sm w-full">
                                        <i class="fa fa-book mr-2" /> 使用教程
                                    </a>
                                    <a href="#" class="bg-gray-50 flex font-medium hover:bg-gray-100 items-center px-4 py-2 rounded-lg text-gray-700 text-sm w-full">
                                        <i class="fa fa-file-text-o mr-2" /> 隐私政策
                                    </a>
                                    <a href="#" class="bg-gray-50 flex font-medium hover:bg-gray-100 items-center px-4 py-2 rounded-lg text-gray-700 text-sm w-full">
                                        <i class="fa fa-envelope-o mr-2" /> 联系我们
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
    // 切换开关样式
    const toggles = document.querySelectorAll('.toggle-checkbox')
    toggles.forEach((toggle) => {
        toggle.addEventListener('change', function(this: HTMLInputElement) {
            const label = this.nextElementSibling as HTMLLabelElement
            if (this.checked) {
                label.classList.add('bg-primary')
                this.classList.add('border-primary')
            } else {
                label.classList.remove('bg-primary')
                this.classList.remove('border-primary')
            }
        })
    })
})
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
