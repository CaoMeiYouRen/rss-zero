<template>
    <v-container class="recommendations-page" fluid>
        <div class="content-wrapper">
            <!-- 推荐内容 -->
            <section id="recommendations" class="mb-8">
                <div class="recommend-header">
                    <h2 class="recommend-title">
                        推荐内容
                    </h2>
                    <div class="recommend-search-bar">
                        <div class="recommend-search-input-wrapper">
                            <input
                                type="text"
                                placeholder="搜索推荐文章..."
                                class="recommend-search-input"
                            >
                            <i class="mdi mdi-magnify recommend-search-icon" />
                        </div>
                        <button class="recommend-filter-btn">
                            <i class="mdi mdi-filter mr-1" /> 筛选
                        </button>
                    </div>
                </div>

                <!-- 关键词匹配规则 -->
                <v-card class="card mb-8 p-6 rounded-xl shadow-sm">
                    <v-card-title class="font-semibold text-lg">
                        关键词匹配规则
                    </v-card-title>
                    <v-card-text>
                        <div class="gap-6 grid grid-cols-1 md:grid-cols-2">
                            <div>
                                <label class="block font-medium mb-2 text-gray-700 text-sm">包含关键词</label>
                                <div class="flex flex-wrap gap-2">
                                    <span class="keyword-tag keyword-tag-primary">
                                        人工智能
                                        <button type="button" class="focus:outline-none inline-flex ml-1 text-primary">
                                            <i class="mdi mdi-close-circle" />
                                        </button>
                                    </span>
                                    <span class="keyword-tag keyword-tag-primary">
                                        机器学习
                                        <button type="button" class="focus:outline-none inline-flex ml-1 text-primary">
                                            <i class="mdi mdi-close-circle" />
                                        </button>
                                    </span>
                                    <span class="keyword-tag keyword-tag-primary">
                                        前端开发
                                        <button type="button" class="focus:outline-none inline-flex ml-1 text-primary">
                                            <i class="mdi mdi-close-circle" />
                                        </button>
                                    </span>
                                    <button type="button" class="keyword-tag keyword-tag-dashed">
                                        <i class="mdi mdi-plus mr-1" /> 添加
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label class="block font-medium mb-2 text-gray-700 text-sm">排除关键词</label>
                                <div class="flex flex-wrap gap-2">
                                    <span class="keyword-tag keyword-tag-gray">
                                        娱乐新闻
                                        <button type="button" class="focus:outline-none inline-flex ml-1 text-gray-500">
                                            <i class="mdi mdi-close-circle" />
                                        </button>
                                    </span>
                                    <span class="keyword-tag keyword-tag-gray">
                                        体育赛事
                                        <button type="button" class="focus:outline-none inline-flex ml-1 text-gray-500">
                                            <i class="mdi mdi-close-circle" />
                                        </button>
                                    </span>
                                    <button type="button" class="keyword-tag keyword-tag-dashed">
                                        <i class="mdi mdi-plus mr-1" /> 添加
                                    </button>
                                </div>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>

                <!-- 推荐文章列表 -->
                <div class="gap-6 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
                    <v-card class="article-card card overflow-hidden rounded-xl shadow-sm">
                        <v-card-text class="p-6">
                            <div class="flex items-center mb-3">
                                <span class="status-tag status-tag-primary">推荐</span>
                                <span class="ml-2 text-gray-500 text-xs">10分钟前</span>
                                <div class="flex items-center ml-auto">
                                    <span class="status-tag status-tag-warning">
                                        <i class="mdi mdi-star mr-1" /> 重要
                                    </span>
                                </div>
                            </div>
                            <h3 class="article-title">
                                人工智能在医疗领域的突破性应用：从诊断到治疗
                            </h3>
                            <p class="article-content">
                                最新研究表明，人工智能技术正在彻底改变医疗行业，从辅助医生进行更准确的诊断，到开发个性化的治疗方案，AI正在各个环节发挥着重要作用...
                            </p>
                            <div class="article-meta">
                                <div class="article-source">
                                    <img
                                        src="https://picsum.photos/200/200?random=1"
                                        alt="科技日报Logo"
                                        class="h-8 mr-2 rounded-full w-8"
                                    >
                                    <span class="font-medium text-gray-900 text-sm">科技日报</span>
                                </div>
                                <div class="article-actions">
                                    <button class="hover:text-primary">
                                        <i class="mdi mdi-bookmark-outline" />
                                    </button>
                                    <button class="hover:text-primary">
                                        <i class="mdi mdi-share-variant" />
                                    </button>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>

                    <v-card class="article-card card overflow-hidden rounded-xl shadow-sm">
                        <v-card-text class="p-6">
                            <div class="flex items-center mb-3">
                                <span class="status-tag status-tag-primary">推荐</span>
                                <span class="ml-2 text-gray-500 text-xs">1小时前</span>
                                <div class="flex items-center ml-auto">
                                    <span class="status-tag status-tag-success">
                                        <i class="mdi mdi-check-circle mr-1" /> 已读
                                    </span>
                                </div>
                            </div>
                            <h3 class="article-title">
                                2025年最值得关注的前端开发趋势与技术
                            </h3>
                            <p class="article-content">
                                随着Web技术的快速发展，前端开发领域也在不断演进。本文探讨了2025年将主导前端开发的关键趋势，包括Web组件、原生JavaScript框架的复兴...
                            </p>
                            <div class="article-meta">
                                <div class="article-source">
                                    <img
                                        src="https://picsum.photos/200/200?random=2"
                                        alt="开发者头条Logo"
                                        class="h-8 mr-2 rounded-full w-8"
                                    >
                                    <span class="font-medium text-gray-900 text-sm">开发者头条</span>
                                </div>
                                <div class="article-actions">
                                    <button class="hover:text-primary">
                                        <i class="mdi mdi-bookmark-outline" />
                                    </button>
                                    <button class="hover:text-primary">
                                        <i class="mdi mdi-share-variant" />
                                    </button>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>

                    <v-card class="article-card card overflow-hidden rounded-xl shadow-sm">
                        <v-card-text class="p-6">
                            <div class="flex items-center mb-3">
                                <span class="status-tag status-tag-primary">推荐</span>
                                <span class="ml-2 text-gray-500 text-xs">3小时前</span>
                                <div class="flex items-center ml-auto">
                                    <span class="status-tag status-tag-warning">
                                        <i class="mdi mdi-star mr-1" /> 重要
                                    </span>
                                </div>
                            </div>
                            <h3 class="article-title">
                                量子计算：即将到来的计算革命
                            </h3>
                            <p class="article-content">
                                量子计算领域最近取得了重大突破，研究人员成功解决了长期困扰的量子退相干问题。这一进展可能会在未来几年内彻底改变密码学和材料科学...
                            </p>
                            <div class="article-meta">
                                <div class="article-source">
                                    <img
                                        src="https://picsum.photos/200/200?random=3"
                                        alt="New Scientist Logo"
                                        class="h-8 mr-2 rounded-full w-8"
                                    >
                                    <span class="font-medium text-gray-900 text-sm">New Scientist</span>
                                </div>
                                <div class="article-actions">
                                    <button class="hover:text-primary">
                                        <i class="mdi mdi-bookmark-outline" />
                                    </button>
                                    <button class="hover:text-primary">
                                        <i class="mdi mdi-share-variant" />
                                    </button>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>

                    <v-card class="article-card card overflow-hidden rounded-xl shadow-sm">
                        <v-card-text class="p-6">
                            <div class="flex items-center mb-3">
                                <span class="status-tag status-tag-primary">推荐</span>
                                <span class="ml-2 text-gray-500 text-xs">5小时前</span>
                                <div class="flex items-center ml-auto">
                                    <span class="status-tag status-tag-gray">
                                        <i class="mdi mdi-clock-outline mr-1" /> 未读
                                    </span>
                                </div>
                            </div>
                            <h3 class="article-title">
                                全球经济展望：后疫情时代的挑战与机遇
                            </h3>
                            <p class="article-content">
                                随着全球逐步走出疫情阴影，各国经济正在经历不同速度的复苏。本文分析了后疫情时代全球经济面临的主要挑战，以及可能出现的新增长领域...
                            </p>
                            <div class="article-meta">
                                <div class="article-source">
                                    <img
                                        src="https://picsum.photos/200/200?random=4"
                                        alt="商业周刊Logo"
                                        class="h-8 mr-2 rounded-full w-8"
                                    >
                                    <span class="font-medium text-gray-900 text-sm">商业周刊</span>
                                </div>
                                <div class="article-actions">
                                    <button class="hover:text-primary">
                                        <i class="mdi mdi-bookmark-outline" />
                                    </button>
                                    <button class="hover:text-primary">
                                        <i class="mdi mdi-share-variant" />
                                    </button>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>

                    <v-card class="article-card card overflow-hidden rounded-xl shadow-sm">
                        <v-card-text class="p-6">
                            <div class="flex items-center mb-3">
                                <span class="status-tag status-tag-primary">推荐</span>
                                <span class="ml-2 text-gray-500 text-xs">昨天</span>
                                <div class="flex items-center ml-auto">
                                    <span class="status-tag status-tag-gray">
                                        <i class="mdi mdi-clock-outline mr-1" /> 未读
                                    </span>
                                </div>
                            </div>
                            <h3 class="article-title">
                                自动化测试的未来：从单元测试到端到端测试的全流程解决方案
                            </h3>
                            <p class="article-content">
                                随着软件系统日益复杂，自动化测试变得越来越重要。本文介绍了最新的自动化测试工具和框架，以及如何构建从单元测试到端到端测试的完整测试策略...
                            </p>
                            <div class="article-meta">
                                <div class="article-source">
                                    <img
                                        src="https://picsum.photos/200/200?random=5"
                                        alt="开发者头条Logo"
                                        class="h-8 mr-2 rounded-full w-8"
                                    >
                                    <span class="font-medium text-gray-900 text-sm">开发者头条</span>
                                </div>
                                <div class="article-actions">
                                    <button class="hover:text-primary">
                                        <i class="mdi mdi-bookmark-outline" />
                                    </button>
                                    <button class="hover:text-primary">
                                        <i class="mdi mdi-share-variant" />
                                    </button>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>

                    <v-card class="article-card card overflow-hidden rounded-xl shadow-sm">
                        <v-card-text class="p-6">
                            <div class="flex items-center mb-3">
                                <span class="status-tag status-tag-primary">推荐</span>
                                <span class="ml-2 text-gray-500 text-xs">2天前</span>
                                <div class="flex items-center ml-auto">
                                    <span class="status-tag status-tag-success">
                                        <i class="mdi mdi-check-circle mr-1" /> 已读
                                    </span>
                                </div>
                            </div>
                            <h3 class="article-title">
                                可持续发展技术：绿色能源的创新与突破
                            </h3>
                            <p class="article-content">
                                面对气候变化的紧迫挑战，全球正在加速向可持续能源转型。本文探讨了最近在太阳能、风能和储能技术方面的创新，以及它们如何推动绿色能源革命...
                            </p>
                            <div class="article-meta">
                                <div class="article-source">
                                    <img
                                        src="https://picsum.photos/200/200?random=6"
                                        alt="科技日报Logo"
                                        class="h-8 mr-2 rounded-full w-8"
                                    >
                                    <span class="font-medium text-gray-900 text-sm">科技日报</span>
                                </div>
                                <div class="article-actions">
                                    <button class="hover:text-primary">
                                        <i class="mdi mdi-bookmark-outline" />
                                    </button>
                                    <button class="hover:text-primary">
                                        <i class="mdi mdi-share-variant" />
                                    </button>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </div>
            </section>
        </div>
    </v-container>
</template>

<style scoped lang="scss">
/* 布局样式 */
.content-wrapper {
    max-width: 1440px;
    margin: 0 auto;
    padding: 24px;
}

/* 按钮样式 */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
}

.btn-primary {
    background-color: #1976D2;
    color: white;
}

.btn-primary:hover {
    background-color: #0d47a1;
}

.btn-light {
    background-color: #f5f5f5;
    color: #333;
}

.btn-light:hover {
    background-color: #e0e0e0;
}

/* 输入框样式 */
.input-field {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.2s ease;
}

.input-field:focus {
    outline: none;
    border-color: #1976D2;
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.2);
}

.input-wrapper {
    position: relative;
}

.input-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
}

/* 关键词标签样式 */
.keyword-tag {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 12px;
    margin-right: 8px;
    margin-bottom: 8px;
}

.keyword-tag-primary {
    background-color: rgba(25, 118, 210, 0.1);
    color: #1976D2;
}

.keyword-tag-gray {
    background-color: #f5f5f5;
    color: #666;
}

.keyword-tag-dashed {
    border: 1px dashed #ddd;
    color: #999;
}

.keyword-tag-dashed:hover {
    border-color: #1976D2;
    color: #1976D2;
}

/* 卡片样式 */
.card {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.card-content {
    padding: 24px;
}

/* 文章卡片样式 */
.article-title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
}

.article-content {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 14px;
    color: #666;
    margin-bottom: 16px;
}

.article-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.article-source {
    display: flex;
    align-items: center;
}

.article-source img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 8px;
}

.article-actions {
    display: flex;
    gap: 12px;
}

.article-actions button {
    color: #999;
    background: none;
    border: none;
    cursor: pointer;
}

.article-actions button:hover {
    color: #1976D2;
}

/* 状态标签样式 */
.status-tag {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 500;
}

.status-tag-primary {
    background-color: rgba(25, 118, 210, 0.1);
    color: #1976D2;
}

.status-tag-warning {
    background-color: rgba(255, 193, 7, 0.1);
    color: #FFC107;
}

.status-tag-success {
    background-color: rgba(76, 175, 80, 0.1);
    color: #4CAF50;
}

.status-tag-gray {
    background-color: rgba(200, 200, 200, 0.1);
    color: #999;
}

/* 网格布局 */
.grid {
    display: grid;
    gap: 24px;
}

@media (min-width: 768px) {
    .grid-cols-2 {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .grid-cols-3 {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* 响应式布局 */
.flex {
    display: flex;
}

.flex-col {
    flex-direction: column;
}

.flex-wrap {
    flex-wrap: wrap;
}

.justify-between {
    justify-content: space-between;
}

.items-center {
    align-items: center;
}

.gap-2 {
    gap: 8px;
}

.gap-4 {
    gap: 16px;
}

.mb-2 {
    margin-bottom: 8px;
}

.mb-4 {
    margin-bottom: 16px;
}

.mb-6 {
    margin-bottom: 24px;
}

.mb-8 {
    margin-bottom: 32px;
}

.ml-auto {
    margin-left: auto;
}

.text-sm {
    font-size: 14px;
}

.text-xs {
    font-size: 12px;
}

.text-gray-500 {
    color: #999;
}

.text-gray-700 {
    color: #666;
}

.text-gray-900 {
    color: #333;
}

.font-medium {
    font-weight: 500;
}

.font-semibold {
    font-weight: 600;
}

.font-bold {
    font-weight: 700;
}

.text-2xl {
    font-size: 24px;
}

.text-lg {
    font-size: 18px;
}

/* 自定义Vuetify组件样式 */
.v-text-field {
    padding: 8px 12px !important;
    border: 1px solid #ddd !important;
    border-radius: 8px !important;
    font-size: 14px !important;
    transition: all 0.2s ease !important;
}

.v-text-field:focus-within {
    outline: none !important;
    border-color: #1976D2 !important;
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.2) !important;
}

.v-btn {
    text-transform: none !important;
    border-radius: 8px !important;
}

/* 搜索区域样式 */
.search-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0;
    width: 100%;
}

.search-input-wrapper {
    flex-shrink: 0;
    min-width: 180px;
    max-width: 220px;
}

.search-input :deep(input) {
    height: 40px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
}

.search-btn {
    margin-left: 8px;
}

.recommend-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
}

.recommend-title {
    font-weight: 700;
    font-size: 24px;
}

.recommend-search-bar {
    display: flex;
    align-items: center;
    gap: 12px;
}

.recommend-search-input-wrapper {
    position: relative;
    min-width: 180px;
    max-width: 220px;
}

.recommend-search-input {
    width: 100%;
    padding: 8px 12px 8px 36px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.2s;
    outline: none;
    height: 40px;
}

.recommend-search-input:focus {
    border-color: #1976D2;
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.2);
}

.recommend-search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    font-size: 16px;
    pointer-events: none;
}

.recommend-filter-btn {
    display: flex;
    align-items: center;
    background-color: #1976D2;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0 16px;
    height: 40px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
    margin-left: 8px;
}

.recommend-filter-btn:hover {
    background-color: #1452b7;
}
</style>
