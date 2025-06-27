<template>
    <v-container class="dashboard-page" fluid>
        <div class="dashboard-page__bg" />
        <v-row justify="center">
            <v-col cols="12" lg="10">
                <!-- 数据看板 -->
                <section id="dashboard" class="mb-12">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="font-bold text-2xl">
                            数据看板
                        </h2>
                        <div class="flex space-x-2">
                            <button class="bg-light hover:bg-gray-200 px-3 py-1 rounded-md text-dark transition-custom">
                                <i class="fa fa-calendar mr-1" /> 本周
                            </button>
                            <button
                                class="bg-primary hover:bg-primary/90 px-3 py-1 rounded-md text-white transition-custom"
                            >
                                <i class="fa fa-download mr-1" /> 导出报告
                            </button>
                        </div>
                    </div>

                    <!-- 统计卡片 -->
                    <div class="gap-6 grid grid-cols-1 lg:grid-cols-4 mb-8 md:grid-cols-2">
                        <div class="bg-white border-l-4 border-primary p-6 rounded-xl shadow-sm">
                            <div class="flex items-start justify-between">
                                <div>
                                    <p class="text-gray-500 text-sm">
                                        总订阅源
                                    </p>
                                    <h3 class="font-bold mt-1 text-3xl">
                                        24
                                    </h3>
                                    <p class="mt-2 text-sm text-success">
                                        <i class="fa fa-arrow-up" /> 3 个新增 (本周)
                                    </p>
                                </div>
                                <div class="bg-primary/10 p-3 rounded-lg">
                                    <i class="fa fa-rss text-primary text-xl" />
                                </div>
                            </div>
                        </div>

                        <div class="bg-white border-l-4 border-secondary p-6 rounded-xl shadow-sm">
                            <div class="flex items-start justify-between">
                                <div>
                                    <p class="text-gray-500 text-sm">
                                        今日文章
                                    </p>
                                    <h3 class="font-bold mt-1 text-3xl">
                                        128
                                    </h3>
                                    <p class="mt-2 text-danger text-sm">
                                        <i class="fa fa-arrow-down" /> 8 篇减少 (昨日)
                                    </p>
                                </div>
                                <div class="bg-secondary/10 p-3 rounded-lg">
                                    <i class="fa fa-newspaper-o text-secondary text-xl" />
                                </div>
                            </div>
                        </div>

                        <div class="bg-white border-l-4 border-success p-6 rounded-xl shadow-sm">
                            <div class="flex items-start justify-between">
                                <div>
                                    <p class="text-gray-500 text-sm">
                                        阅读完成
                                    </p>
                                    <h3 class="font-bold mt-1 text-3xl">
                                        42%
                                    </h3>
                                    <p class="mt-2 text-sm text-success">
                                        <i class="fa fa-arrow-up" /> 5% 增长 (本周)
                                    </p>
                                </div>
                                <div class="bg-success/10 p-3 rounded-lg">
                                    <i class="fa fa-check-circle text-success text-xl" />
                                </div>
                            </div>
                        </div>

                        <div class="bg-white border-l-4 border-warning p-6 rounded-xl shadow-sm">
                            <div class="flex items-start justify-between">
                                <div>
                                    <p class="text-gray-500 text-sm">
                                        推荐准确率
                                    </p>
                                    <h3 class="font-bold mt-1 text-3xl">
                                        87%
                                    </h3>
                                    <p class="mt-2 text-sm text-warning">
                                        <i class="fa fa-minus" /> 与上周持平
                                    </p>
                                </div>
                                <div class="bg-warning/10 p-3 rounded-lg">
                                    <i class="fa fa-star text-warning text-xl" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 图表区域 -->
                    <div class="gap-6 grid grid-cols-1 lg:grid-cols-3">
                        <div class="bg-white lg:col-span-2 p-6 rounded-xl shadow-sm">
                            <h3 class="font-semibold mb-4 text-lg">
                                订阅源活跃度
                            </h3>
                            <div class="h-80">
                                <canvas id="activityChart" />
                            </div>
                        </div>

                        <div class="bg-white p-6 rounded-xl shadow-sm">
                            <h3 class="font-semibold mb-4 text-lg">
                                阅读偏好
                            </h3>
                            <div class="h-80">
                                <canvas id="preferenceChart" />
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
// eslint-disable-next-line import/no-named-as-default
import Chart from 'chart.js/auto'

onMounted(() => {
    // 活跃度图表
    const activityCtx = document.getElementById('activityChart') as HTMLCanvasElement
    if (activityCtx) {
        const ctx = activityCtx.getContext('2d')
        if (ctx) {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    datasets: [
                        {
                            label: '科技日报',
                            data: [12, 19, 15, 22, 18, 14, 20],
                            borderColor: '#165DFF',
                            backgroundColor: 'rgba(22, 93, 255, 0.1)',
                            tension: 0.4,
                            fill: true,
                        },
                        {
                            label: '开发者头条',
                            data: [8, 12, 10, 15, 14, 9, 11],
                            borderColor: '#7B61FF',
                            backgroundColor: 'rgba(123, 97, 255, 0.1)',
                            tension: 0.4,
                            fill: true,
                        },
                        {
                            label: 'New Scientist',
                            data: [5, 7, 4, 6, 5, 3, 4],
                            borderColor: '#00B42A',
                            backgroundColor: 'rgba(0, 180, 42, 0.1)',
                            tension: 0.4,
                            fill: true,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: '文章数量',
                            },
                        },
                    },
                },
            })
        }
    }

    // 阅读偏好图表
    const preferenceCtx = document.getElementById('preferenceChart') as HTMLCanvasElement
    if (preferenceCtx) {
        const ctx = preferenceCtx.getContext('2d')
        if (ctx) {
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['科技', '开发', '科学', '商业', '其他'],
                    datasets: [{
                        data: [45, 30, 10, 10, 5],
                        backgroundColor: [
                            '#165DFF',
                            '#7B61FF',
                            '#00B42A',
                            '#FF7D00',
                            '#F53F3F',
                        ],
                        borderWidth: 0,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                    },
                    cutout: '70%',
                },
            })
        }
    }
})
</script>

<style scoped lang="scss">
.dashboard-page {
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
