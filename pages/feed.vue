<template>
    <section class="page-bg subscriptions">
        <div class="subscriptions__header">
            <h2 class="page-title">
                订阅管理
            </h2>
            <div class="subscriptions__actions">
                <div class="subscriptions__search">
                    <input
                        v-model="search"
                        type="text"
                        placeholder="搜索订阅源..."
                    >
                    <span class="mdi mdi-magnify" />
                </div>
                <button class="subscriptions__opml-btn" @click="downloadOpml">
                    <span class="mdi mdi-download" /> 导出 OPML
                </button>
                <label class="subscriptions__opml-btn">
                    <span class="mdi mdi-upload" /> 导入 OPML
                    <input
                        type="file"
                        accept=".opml,.xml"
                        style="display:none"
                        @change="onOpmlChange"
                    >
                </label>
            </div>
        </div>

        <div class="card subscriptions__add">
            <h3>添加新订阅</h3>
            <div class="subscriptions__add-row">
                <input
                    v-model="newUrl"
                    type="url"
                    placeholder="输入 RSS 订阅源 URL"
                    :class="{'is-invalid': error}"
                >
                <button @click="addSubscription">
                    <span class="mdi mdi-plus" /> 添加订阅源
                </button>
            </div>
            <div class="subscriptions__hint">
                <span class="mdi mdi-information-outline" /> 示例: https://example.com/feed/
            </div>
            <div v-if="error" class="subscriptions__error">
                {{ error }}
            </div>
        </div>

        <div class="card subscriptions__table-wrap">
            <table v-if="filteredSubscriptions.length" class="subscriptions__table">
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>URL</th>
                        <th>更新频率</th>
                        <th>文章数</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in filteredSubscriptions" :key="item.id">
                        <td>
                            <div class="subscriptions__feed-info">
                                <div class="subscriptions__feed-avatar" :style="{background: avatarBg(item.title)}">
                                    <span>{{ item.title ? item.title[0] : 'R' }}</span>
                                </div>
                                <div>
                                    <div class="subscriptions__feed-title">
                                        {{ item.title || item.url }}
                                    </div>
                                    <div class="subscriptions__feed-desc">
                                        {{ item.category || '-' }}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <a
                                :href="item.siteUrl || item.url"
                                target="_blank"
                                rel="noopener"
                            >{{ item.url }}</a>
                        </td>
                        <td>
                            <div class="subscriptions__feed-status">
                                <span
                                    class="subscriptions__feed-dot"
                                    :class="{
                                        'dot-success': item.status === 'active',
                                        'dot-warning': item.status === 'slow',
                                        'dot-danger': item.status === 'error'
                                    }"
                                />
                                <span>
                                    {{ item.frequency || '未知' }}
                                </span>
                            </div>
                        </td>
                        <td>{{ item.count || '-' }}</td>
                        <td>
                            <div class="subscriptions__feed-actions">
                                <button @click="editSubscription(item)">
                                    <span class="mdi mdi-pencil" />
                                </button>
                                <button @click="refreshSubscription(item)">
                                    <span class="mdi mdi-refresh" />
                                </button>
                                <button @click="removeSubscription(item.id)">
                                    <span class="mdi mdi-delete" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else class="subscriptions__empty">
                <span class="mdi mdi-rss-off" />
                <div>暂无订阅，快去添加你的第一个 RSS 吧！</div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const subscriptions = ref<any[]>([])
const newUrl = ref('')
const error = ref('')
const search = ref('')
const opmlFile = ref<File | null>(null)

function avatarBg(title: string) {
    // 简单 hash 颜色
    const colors = ['#e0e7ff', '#bbf7d0', '#f3e8ff', '#fee2e2', '#fef9c3']
    let sum = 0
    for (let i = 0; i < (title || '').length; i++) {
sum += title.charCodeAt(i)
}
    return colors[sum % colors.length]
}

const filteredSubscriptions = computed(() => {
    if (!search.value) {
return subscriptions.value
}
    return subscriptions.value.filter(
        (s) => (s.title || '').toLowerCase().includes(search.value.toLowerCase()) ||
            (s.url || '').toLowerCase().includes(search.value.toLowerCase()),
    )
})

async function fetchSubscriptions() {
    const { data, error: err } = await useFetch('/api/feed')
    if (err.value) {
        error.value = err.value.message
        subscriptions.value = []
    } else if (Array.isArray(data.value)) {
        subscriptions.value = data.value
    } else {
        subscriptions.value = []
        if (data.value && typeof data.value === 'object' && 'error' in data.value) {
            error.value = (data.value as any).error
        }
    }
}

async function addSubscription() {
    error.value = ''
    if (!newUrl.value) {
        error.value = '请输入有效的URL'
        return
    }
    const { data, error: err } = await useFetch('/api/feed', {
        method: 'POST',
        body: { url: newUrl.value },
    })
    if (err.value) {
        error.value = err.value.message
    } else if (data.value && typeof data.value === 'object' && 'error' in data.value) {
        error.value = (data.value as any).error
    } else {
        newUrl.value = ''
        fetchSubscriptions()
    }
}

async function removeSubscription(id: string) {
    const { data, error: err } = await useFetch(`/api/feed?id=${id}`, { method: 'DELETE' })
    if (err?.value || data.value && typeof data.value === 'object' && 'error' in data.value) {
        error.value = err?.value?.message || (data.value && typeof data.value === 'object' && 'error' in data.value ? data.value.error : '删除失败')
    } else {
        fetchSubscriptions()
    }
}

async function downloadOpml() {
    const res = await fetch('/api/feed/opml')
    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'subscriptions.opml'
    a.click()
    window.URL.revokeObjectURL(url)
}

function onOpmlChange(e: Event) {
    const files = (e.target as HTMLInputElement).files
    if (files && files.length) {
        opmlFile.value = files[0]
        importOpml()
    }
}

async function importOpml() {
    if (!opmlFile.value) {
return
}
    const formData = new FormData()
    formData.append('opml', opmlFile.value)
    const res = await fetch('/api/feed/opml', {
        method: 'POST',
        body: formData,
    })
    const result = await res.json()
    if (result.error) {
        error.value = result.error
    } else {
        fetchSubscriptions()
    }
}

function editSubscription(item: any) {
    // TODO: 编辑订阅
    alert('编辑功能开发中')
}
function refreshSubscription(item: any) {
    // TODO: 刷新订阅
    alert('刷新功能开发中')
}

onMounted(() => {
    fetchSubscriptions()
})
</script>

<style scoped lang="scss">
@use '@/styles/common.scss' as *;

.subscriptions {
    padding: 24px 40px;
    @media (max-width: 700px) {
        padding: 12px 2vw;
    }
    &__header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        gap: 12px;
        .page-title {
            margin-bottom: 0;
            font-size: 24px;
            font-weight: bold;
            text-align: left;
        }
    }
    &__actions {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
    }
    &__search {
        position: relative;
        input {
            padding: 7px 32px 7px 32px;
            border-radius: 8px;
            border: 1px solid #d1d5db;
            font-size: 15px;
            outline: none;
            transition: border .2s;
            &:focus {
                border-color: #2563eb;
            }
        }
        .mdi {
            position: absolute;
            left: 8px;
            top: 50%;
            transform: translateY(-50%);
            color: #888;
            font-size: 20px;
        }
    }
    &__opml-btn {
        background: #f3f4f6;
        color: #222;
        border: none;
        border-radius: 8px;
        padding: 7px 18px;
        font-size: 15px;
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        transition: background .2s;
        &:hover {
            background: #e5e7eb;
        }
    }
    &__add {
        // 移除 card 样式，统一用 .card
        h3 {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 12px;
        }
    }
    &__add-row {
        display: flex;
        flex-direction: row;
        gap: 12px;
        @media (max-width: 600px) {
            flex-direction: column;
            gap: 8px;
        }
        input[type="url"] {
            flex: 1 1 0;
            padding: 8px 14px;
            border-radius: 8px;
            border: 1px solid #d1d5db;
            font-size: 15px;
            outline: none;
            transition: border .2s;
            &.is-invalid {
                border-color: #ef4444;
            }
            &:focus {
                border-color: #2563eb;
            }
        }
        button {
            background: #2563eb;
            color: #fff;
            border: none;
            border-radius: 8px;
            padding: 8px 22px;
            font-size: 15px;
            display: flex;
            align-items: center;
            gap: 6px;
            cursor: pointer;
            transition: background .2s;
            &:hover {
                background: #1d4ed8;
            }
        }
    }
    &__hint {
        margin-top: 10px;
        color: #888;
        font-size: 13px;
        display: flex;
        align-items: center;
        gap: 4px;
    }
    &__error {
        color: #ef4444;
        margin-top: 8px;
        font-size: 14px;
    }
    &__table-wrap {
        // 移除 card 样式，统一用 .card
        overflow-x: auto;
        padding: 0;
    }
    &__table {
        width: 100%;
        min-width: 700px;
        border-collapse: separate;
        border-spacing: 0;
        thead {
            background: #f3f4f6;
            th {
                padding: 12px 16px;
                font-size: 13px;
                font-weight: 600;
                color: #666;
                text-align: left;
                letter-spacing: 1px;
            }
        }
        tbody {
            tr {
                transition: background .2s;
                &:hover {
                    background: #f9fafb;
                }
            }
            td {
                padding: 14px 16px;
                font-size: 15px;
                color: #222;
                vertical-align: middle;
            }
        }
    }
    &__feed-info {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    &__feed-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 16px;
        margin-right: 6px;
    }
    &__feed-title {
        font-weight: 500;
        color: #222;
        font-size: 15px;
    }
    &__feed-desc {
        color: #888;
        font-size: 12px;
        margin-top: 2px;
    }
    &__feed-status {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
    }
    &__feed-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: inline-block;
        margin-right: 3px;
        background: #bbb;
        &.dot-success { background: #22c55e; }
        &.dot-warning { background: #facc15; }
        &.dot-danger { background: #ef4444; }
    }
    &__feed-actions {
        display: flex;
        gap: 8px;
        button {
            background: none;
            border: none;
            color: #2563eb;
            font-size: 18px;
            cursor: pointer;
            padding: 2px 6px;
            border-radius: 6px;
            transition: background .2s, color .2s;
            &:hover {
                background: #f3f4f6;
                color: #1d4ed8;
            }
            &:last-child {
                color: #ef4444;
                &:hover { color: #b91c1c; }
            }
        }
    }
    &__empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #bbb;
        padding: 40px 0 24px 0;
        .mdi {
            font-size: 48px;
            margin-bottom: 10px;
        }
        div {
            font-size: 1.1rem;
            color: #888;
        }
    }
}
</style>

