<template>
    <v-container class="recommendations-page" fluid>
        <div class="recommendations-page__bg" />
        <v-row justify="center">
            <v-col
                cols="12"
                lg="10"
            >
                <!-- 推荐内容 -->
                <section id="recommendations" class="mb-12">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="font-bold text-2xl">
                            推荐内容
                        </h2>
                        <div class="flex space-x-3">
                            <div class="relative">
                                <input
                                    type="text"
                                    placeholder="搜索推荐文章..."
                                    class="border border-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 pl-10 pr-4 py-2 rounded-lg"
                                >
                                <i class="-translate-y-1/2 absolute fa fa-search left-3 text-gray-400 top-1/2 transform" />
                            </div>
                            <button class="bg-primary flex hover:bg-primary/90 items-center px-4 py-2 rounded-lg text-white transition-custom">
                                <i class="fa fa-sliders mr-1" /> 筛选
                            </button>
                        </div>
                    </div>

                    <!-- 关键词规则设置 -->
                    <div class="bg-white mb-8 p-6 rounded-xl shadow-sm">
                        <h3 class="font-semibold mb-4 text-lg">
                            关键词匹配规则
                        </h3>
                        <div class="gap-4 grid grid-cols-1 mb-4 md:grid-cols-2">
                            <div>
                                <label class="block font-medium mb-1 text-gray-700 text-sm">包含关键词</label>
                                <input
                                    type="text"
                                    placeholder="AI, 机器学习, 深度学习"
                                    class="border border-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 px-4 py-2 rounded-lg w-full"
                                >
                                <p class="mt-1 text-gray-500 text-xs">
                                    多个关键词用逗号分隔
                                </p>
                            </div>
                            <div>
                                <label class="block font-medium mb-1 text-gray-700 text-sm">排除关键词</label>
                                <input
                                    type="text"
                                    placeholder="广告, 促销"
                                    class="border border-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 px-4 py-2 rounded-lg w-full"
                                >
                                <p class="mt-1 text-gray-500 text-xs">
                                    包含这些关键词的文章将不会被推荐
                                </p>
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <button class="bg-primary flex hover:bg-primary/90 items-center justify-center px-6 py-2 rounded-lg text-white transition-custom">
                                <i class="fa fa-save mr-2" /> 保存规则
                            </button>
                        </div>
                    </div>

                    <!-- 推荐文章列表 -->
                    <div class="gap-6 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
                        <!-- 推荐文章卡片 -->
                        <div class="bg-white hover:-translate-y-1 hover:shadow-md overflow-hidden rounded-xl shadow-sm transform transition-custom">
                            <div class="p-6">
                                <div class="flex items-center mb-3">
                                    <span class="bg-primary/10 font-semibold px-2.5 py-0.5 rounded text-primary text-xs">推荐</span>
                                    <span class="ml-2 text-gray-500 text-xs">10分钟前</span>
                                    <div class="flex items-center ml-auto">
                                        <span class="flex font-semibold items-center text-warning text-xs">
                                            <i class="fa fa-star mr-1" /> 重要
                                        </span>
                                    </div>
                                </div>
                                <h3 class="font-semibold line-clamp-2 mb-2 text-lg">
                                    人工智能在医疗领域的突破性应用：从诊断到治疗
                                </h3>
                                <p class="line-clamp-3 mb-4 text-gray-600 text-sm">
                                    最新研究表明，人工智能技术正在彻底改变医疗行业，从辅助医生进行更准确的诊断，到开发个性化的治疗方案，AI正在各个环节发挥着重要作用...
                                </p>
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center">
                                        <img
                                            src="https://picsum.photos/200/200?random=1"
                                            alt="科技日报Logo"
                                            class="h-8 mr-2 rounded-full w-8"
                                        >
                                        <span class="font-medium text-gray-900 text-sm">科技日报</span>
                                    </div>
                                    <div class="flex space-x-3 text-gray-500">
                                        <button class="hover:text-primary">
                                            <i class="fa fa-bookmark-o" />
                                        </button>
                                        <button class="hover:text-primary">
                                            <i class="fa fa-share-alt" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white hover:-translate-y-1 hover:shadow-md overflow-hidden rounded-xl shadow-sm transform transition-custom">
                            <div class="p-6">
                                <div class="flex items-center mb-3">
                                    <span class="bg-primary/10 font-semibold px-2.5 py-0.5 rounded text-primary text-xs">推荐</span>
                                    <span class="ml-2 text-gray-500 text-xs">1小时前</span>
                                    <div class="flex items-center ml-auto">
                                        <span class="flex font-semibold items-center text-success text-xs">
                                            <i class="fa fa-check-circle mr-1" /> 已读
                                        </span>
                                    </div>
                                </div>
                                <h3 class="font-semibold line-clamp-2 mb-2 text-lg">
                                    2025年最值得关注的前端开发趋势与技术
                                </h3>
                                <p class="line-clamp-3 mb-4 text-gray-600 text-sm">
                                    随着Web技术的快速发展，前端开发领域也在不断演进。本文探讨了2025年将主导前端开发的关键趋势，包括Web组件、原生JavaScript框架的复兴...
                                </p>
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center">
                                        <img
                                            src="https://picsum.photos/200/200?random=2"
                                            alt="开发者头条Logo"
                                            class="h-8 mr-2 rounded-full w-8"
                                        >
                                        <span class="font-medium text-gray-900 text-sm">开发者头条</span>
                                    </div>
                                    <div class="flex space-x-3 text-gray-500">
                                        <button class="hover:text-primary">
                                            <i class="fa fa-bookmark-o" />
                                        </button>
                                        <button class="hover:text-primary">
                                            <i class="fa fa-share-alt" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white hover:-translate-y-1 hover:shadow-md overflow-hidden rounded-xl shadow-sm transform transition-custom">
                            <div class="p-6">
                                <div class="flex items-center mb-3">
                                    <span class="bg-primary/10 font-semibold px-2.5 py-0.5 rounded text-primary text-xs">推荐</span>
                                    <span class="ml-2 text-gray-500 text-xs">3小时前</span>
                                    <div class="flex items-center ml-auto">
                                        <span class="flex font-semibold items-center text-warning text-xs">
                                            <i class="fa fa-star mr-1" /> 重要
                                        </span>
                                    </div>
                                </div>
                                <h3 class="font-semibold line-clamp-2 mb-2 text-lg">
                                    量子计算：即将到来的计算革命
                                </h3>
                                <p class="line-clamp-3 mb-4 text-gray-600 text-sm">
                                    量子计算领域最近取得了重大突破，研究人员成功解决了长期困扰的量子退相干问题。这一进展可能会在未来几年内彻底改变密码学和材料科学...
                                </p>
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center">
                                        <img
                                            src="https://picsum.photos/200/200?random=3"
                                            alt="New Scientist Logo"
                                            class="h-8 mr-2 rounded-full w-8"
                                        >
                                        <span class="font-medium text-gray-900 text-sm">New Scientist</span>
                                    </div>
                                    <div class="flex space-x-3 text-gray-500">
                                        <button class="hover:text-primary">
                                            <i class="fa fa-bookmark-o" />
                                        </button>
                                        <button class="hover:text-primary">
                                            <i class="fa fa-share-alt" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white hover:-translate-y-1 hover:shadow-md overflow-hidden rounded-xl shadow-sm transform transition-custom">
                            <div class="p-6">
                                <div class="flex items-center mb-3">
                                    <span class="bg-primary/10 font-semibold px-2.5 py-0.5 rounded text-primary text-xs">推荐</span>
                                    <span class="ml-2 text-gray-500 text-xs">5小时前</span>
                                    <div class="flex items-center ml-auto">
                                        <span class="flex font-semibold items-center text-gray-500 text-xs">
                                            <i class="fa fa-clock-o mr-1" /> 未读
                                        </span>
                                    </div>
                                </div>
                                <h3 class="font-semibold line-clamp-2 mb-2 text-lg">
                                    全球经济展望：后疫情时代的挑战与机遇
                                </h3>
                                <p class="line-clamp-3 mb-4 text-gray-600 text-sm">
                                    随着全球逐步走出疫情阴影，各国经济正在经历不同速度的复苏。本文分析了后疫情时代全球经济面临的主要挑战，以及可能出现的新增长领域...
                                </p>
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center">
                                        <img
                                            src="https://picsum.photos/200/200?random=4"
                                            alt="商业周刊Logo"
                                            class="h-8 mr-2 rounded-full w-8"
                                        >
                                        <span class="font-medium text-gray-900 text-sm">商业周刊</span>
                                    </div>
                                    <div class="flex space-x-3 text-gray-500">
                                        <button class="hover:text-primary">
                                            <i class="fa fa-bookmark-o" />
                                        </button>
                                        <button class="hover:text-primary">
                                            <i class="fa fa-share-alt" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white hover:-translate-y-1 hover:shadow-md overflow-hidden rounded-xl shadow-sm transform transition-custom">
                            <div class="p-6">
                                <div class="flex items-center mb-3">
                                    <span class="bg-primary/10 font-semibold px-2.5 py-0.5 rounded text-primary text-xs">推荐</span>
                                    <span class="ml-2 text-gray-500 text-xs">昨天</span>
                                    <div class="flex items-center ml-auto">
                                        <span class="flex font-semibold items-center text-gray-500 text-xs">
                                            <i class="fa fa-clock-o mr-1" /> 未读
                                        </span>
                                    </div>
                                </div>
                                <h3 class="font-semibold line-clamp-2 mb-2 text-lg">
                                    自动化测试的未来：从单元测试到端到端测试的全流程解决方案
                                </h3>
                                <p class="line-clamp-3 mb-4 text-gray-600 text-sm">
                                    随着软件系统日益复杂，自动化测试变得越来越重要。本文介绍了最新的自动化测试工具和框架，以及如何构建从单元测试到端到端测试的完整测试策略...
                                </p>
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center">
                                        <img
                                            src="https://picsum.photos/200/200?random=5"
                                            alt="开发者头条Logo"
                                            class="h-8 mr-2 rounded-full w-8"
                                        >
                                        <span class="font-medium text-gray-900 text-sm">开发者头条</span>
                                    </div>
                                    <div class="flex space-x-3 text-gray-500">
                                        <button class="hover:text-primary">
                                            <i class="fa fa-bookmark-o" />
                                        </button>
                                        <button class="hover:text-primary">
                                            <i class="fa fa-share-alt" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white hover:-translate-y-1 hover:shadow-md overflow-hidden rounded-xl shadow-sm transform transition-custom">
                            <div class="p-6">
                                <div class="flex items-center mb-3">
                                    <span class="bg-primary/10 font-semibold px-2.5 py-0.5 rounded text-primary text-xs">推荐</span>
                                    <span class="ml-2 text-gray-500 text-xs">2天前</span>
                                    <div class="flex items-center ml-auto">
                                        <span class="flex font-semibold items-center text-success text-xs">
                                            <i class="fa fa-check-circle mr-1" /> 已读
                                        </span>
                                    </div>
                                </div>
                                <h3 class="font-semibold line-clamp-2 mb-2 text-lg">
                                    可持续发展技术：绿色能源的创新与突破
                                </h3>
                                <p class="line-clamp-3 mb-4 text-gray-600 text-sm">
                                    面对气候变化的紧迫挑战，全球正在加速向可持续能源转型。本文探讨了最近在太阳能、风能和储能技术方面的创新，以及它们如何推动绿色能源革命...
                                </p>
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center">
                                        <img
                                            src="https://picsum.photos/200/200?random=6"
                                            alt="科技日报Logo"
                                            class="h-8 mr-2 rounded-full w-8"
                                        >
                                        <span class="font-medium text-gray-900 text-sm">科技日报</span>
                                    </div>
                                    <div class="flex space-x-3 text-gray-500">
                                        <button class="hover:text-primary">
                                            <i class="fa fa-bookmark-o" />
                                        </button>
                                        <button class="hover:text-primary">
                                            <i class="fa fa-share-alt" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-center mt-8">
                        <button class="bg-white border border-gray-300 flex hover:bg-gray-50 items-center px-6 py-3 rounded-lg text-gray-700 transition-custom">
                            <span>加载更多</span>
                            <i class="fa fa-refresh ml-2" />
                        </button>
                    </div>
                </section>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped lang="scss">
.recommendations-page {
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
