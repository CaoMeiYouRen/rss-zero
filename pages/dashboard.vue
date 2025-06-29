<template>
    <div class="container-wrapper page-bg">
        <!-- 数据看板 -->
        <div class="toolbar">
            <h2 class="page-title">
                数据看板
            </h2>
            <div class="toolbar-actions">
                <button class="btn btn-outline">
                    <i class="mdi mdi-calendar mr-1" /> 本周
                </button>
                <button class="btn btn-primary">
                    <i class="mdi mdi-download mr-1" /> 导出报告
                </button>
            </div>
        </div>

        <!-- 统计卡片 -->
        <div class="stat-cards-flex">
            <div class="card stat-card stat-card-primary">
                <div class="flex items-start justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">
                            总订阅源
                        </p>
                        <div class="stat-value">
                            24
                        </div>
                        <p class="stat-change success">
                            <i class="mdi mdi-arrow-up" /> 3 个新增 (本周)
                        </p>
                    </div>
                    <div class="stat-icon stat-icon-primary">
                        <i class="mdi mdi-rss text-xl" />
                    </div>
                </div>
            </div>

            <div class="card stat-card stat-card-secondary">
                <div class="flex items-start justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">
                            今日文章
                        </p>
                        <div class="stat-value">
                            128
                        </div>
                        <p class="danger stat-change">
                            <i class="mdi mdi-arrow-down" /> 8 篇减少 (昨日)
                        </p>
                    </div>
                    <div class="stat-icon stat-icon-secondary">
                        <i class="mdi mdi-newspaper text-xl" />
                    </div>
                </div>
            </div>

            <div class="card stat-card stat-card-success">
                <div class="flex items-start justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">
                            阅读完成
                        </p>
                        <div class="stat-value">
                            42%
                        </div>
                        <p class="stat-change success">
                            <i class="mdi mdi-arrow-up" /> 5% 增长 (本周)
                        </p>
                    </div>
                    <div class="stat-icon stat-icon-success">
                        <i class="mdi mdi-check-circle text-xl" />
                    </div>
                </div>
            </div>

            <div class="card stat-card stat-card-warning">
                <div class="flex items-start justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">
                            推荐准确率
                        </p>
                        <div class="stat-value">
                            87%
                        </div>
                        <p class="stat-change warning">
                            <i class="mdi mdi-minus" /> 与上周持平
                        </p>
                    </div>
                    <div class="stat-icon stat-icon-warning">
                        <i class="mdi mdi-star text-xl" />
                    </div>
                </div>
            </div>
        </div>

        <!-- 图表区域 -->
        <div class="grid grid-cols-1 lg:grid-cols-3">
            <div class="card lg:col-span-2">
                <div class="p-6">
                    <h3 class="font-semibold mb-4 text-lg">
                        订阅源活跃度
                    </h3>
                    <div class="chart-container">
                        <canvas id="activityChart" />
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="p-6">
                    <h3 class="font-semibold mb-4 text-lg">
                        阅读偏好
                    </h3>
                    <div class="chart-container">
                        <canvas id="preferenceChart" />
                    </div>
                </div>
            </div>
        </div>
    </div>
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
@use '@/styles/common.scss' as *;

.container-wrapper {
    width: 100%;
    margin: 0 auto;
    padding: 24px 40px;
    background-color: #f4f6f8;
    @media (max-width: 700px) {
        padding: 12px 2vw;
    }
}

.page-bg {
    background-color: #f4f6f8;
    padding: 24px;
    min-height: calc(100vh - 48px);
}

.card {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    margin-bottom: 24px;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
}

.card:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.stat-card {
    padding: 24px;
    border-left: 4px solid;
}

.stat-card-primary {
    border-color: #1976D2;
}

.stat-card-secondary {
    border-color: #5C6BC0;
}

.stat-card-success {
    border-color: #43A047;
}

.stat-card-warning {
    border-color: #FFB300;
}

.stat-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    border-radius: 8px;
}

.stat-icon-primary {
    background-color: rgba(25, 118, 210, 0.1);
    color: #1976D2;
}

.stat-icon-secondary {
    background-color: rgba(92, 107, 192, 0.1);
    color: #5C6BC0;
}

.stat-icon-success {
    background-color: rgba(67, 160, 71, 0.1);
    color: #43A047;
}

.stat-icon-warning {
    background-color: rgba(255, 179, 0, 0.1);
    color: #FFB300;
}

.stat-value {
    font-size: 28px;
    font-weight: bold;
    margin-top: 8px;
    margin-bottom: 4px;
}

.stat-change {
    font-size: 14px;
}

.success {
    color: #43A047;
}

.danger {
    color: #E53935;
}

.warning {
    color: #FFB300;
}

.chart-container {
    height: 320px;
}

.btn {
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-primary {
    background-color: #1976D2;
    color: #fff;
    border: none;
}

.btn-primary:hover {
    background-color: #0D47A1;
}

.btn-outline {
    background-color: transparent;
    border: 1px solid #ddd;
    color: #333;
}

.btn-outline:hover {
    background-color: #f5f5f5;
}

.toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    @media (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }
    .page-title {
        margin-bottom: 0;
        font-size: 24px;
        font-weight: bold;
        text-align: left;
    }
}

.stat-cards-flex {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    margin-bottom: 24px;

    // 让每个卡片在桌面端平均分布，移动端自适应
    .stat-card {
        flex: 1 1 220px;
        min-width: 180px;
        max-width: 100%;
    }
}

/* 响应式设计 */
.grid {
    display: grid;
    gap: 24px;
}

.grid-cols-4 {
    margin-bottom: 0;
}

@media (min-width: 1024px) {
    .grid-cols-3 {
        grid-template-columns: repeat(3, 1fr);
    }

    .col-span-2 {
        grid-column: span 2;
    }
}
</style>
