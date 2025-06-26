<template>
    <v-container class="subscription-page" fluid>
        <div class="subscription-page__bg" />
        <v-row justify="center">
            <v-col
                cols="12"
                md="8"
                lg="6"
            >
                <v-card class="subscription-page__card" elevation="12">
                    <v-card-title class="subscription-page__title">
                        订阅管理
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="addSubscription">
                            <v-text-field
                                v-model="newUrl"
                                label="添加RSS订阅源URL"
                                :rules="[urlRule]"
                                class="subscription-page__input"
                                variant="outlined"
                                density="comfortable"
                                color="primary"
                                required
                            >
                                <v-tooltip activator="parent" location="bottom">
                                    请输入有效的 RSS 源链接
                                </v-tooltip>
                            </v-text-field>
                            <v-btn
                                type="submit"
                                color="primary"
                                :disabled="!validUrl"
                                class="subscription-page__btn"
                                rounded
                                size="large"
                            >
                                添加
                                <v-tooltip activator="parent" location="bottom">
                                    添加新的 RSS 订阅源
                                </v-tooltip>
                            </v-btn>
                        </v-form>
                        <v-alert
                            v-if="error"
                            type="error"
                            dense
                            class="subscription-page__alert"
                        >
                            {{ error }}
                        </v-alert>
                        <v-data-table
                            v-if="subscriptions.length > 0"
                            :headers="headers"
                            :items="subscriptions"
                            class="subscription-page__table"
                            item-key="id"
                            :items-per-page="10"
                            dense
                        >
                            <template #item.title="{item}">
                                <span>{{ item.title || item.url }}</span>
                            </template>
                            <template #item.url="{item}">
                                <a
                                    :href="item.siteUrl || item.url"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {{ item.url }}
                                </a>
                            </template>
                            <template #item.category="{item}">
                                <span>{{ item.category || '-' }}</span>
                            </template>
                            <template #item.action="{item}">
                                <v-btn icon @click="removeSubscription(item.id)">
                                    <v-icon>mdi-delete</v-icon>
                                    <v-tooltip activator="parent" location="bottom">
                                        删除该订阅
                                    </v-tooltip>
                                </v-btn>
                            </template>
                        </v-data-table>
                        <div v-else class="subscription-page__empty">
                            <v-icon size="48" color="grey">
                                mdi-rss-off
                            </v-icon>
                            <div class="subscription-page__empty-text">
                                暂无订阅，快去添加你的第一个 RSS 吧！
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
                <v-card class="mt-4 subscription-page__card" elevation="12">
                    <v-card-title class="subscription-page__title">
                        OPML 导入/导出
                    </v-card-title>
                    <v-card-text>
                        <v-btn
                            color="primary"
                            class="subscription-page__btn"
                            rounded
                            size="large"
                            @click="downloadOpml"
                        >
                            导出OPML
                            <v-tooltip activator="parent" location="bottom">
                                导出所有订阅为 OPML 文件
                            </v-tooltip>
                        </v-btn>
                        <v-file-input
                            v-model="opmlFile"
                            label="导入OPML文件"
                            accept=".xml,.opml"
                            class="subscription-page__input"
                            variant="outlined"
                            color="primary"
                            @change="importOpml"
                        >
                            <v-tooltip activator="parent" location="bottom">
                                选择 OPML 文件导入订阅
                            </v-tooltip>
                        </v-file-input>
                    </v-card-text>
                </v-card>
                <v-snackbar
                    v-model="snackbar.show"
                    :color="snackbar.color"
                    :timeout="3000"
                >
                    {{ snackbar.text }}
                </v-snackbar>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { authClient } from '@/lib/auth-client'
import { validateUrl } from '@/utils/validate'

const subscriptions = ref<any[]>([])
const newUrl = ref('')
const error = ref('')
const opmlFile = ref<File | null>(null)

const snackbar = ref({
    show: false,
    text: '',
    color: 'success',
})

const headers = [
    { text: '名称', value: 'title', align: 'start' as const },
    { text: '链接', value: 'url' },
    { text: '分组', value: 'category' },
    { text: '操作', value: 'action', sortable: false },
]

const validUrl = computed(() => validateUrl(newUrl.value))
const urlRule = (v: string) => validUrl.value || '请输入有效的URL'

async function fetchSubscriptions() {
    const { data, error: err } = await useFetch('/api/feed')
    if (err.value) {
        error.value = err.value.message
        subscriptions.value = []
    } else if (Array.isArray(data.value)) {
        subscriptions.value = data.value
    } else {
        subscriptions.value = []
        // 若后端返回错误对象
        if (data.value && typeof data.value === 'object' && 'error' in data.value) {
            error.value = (data.value as any).error
        }
    }
}

async function addSubscription() {
    error.value = ''
    if (!validUrl.value) {
        return
    }
    const { data, error: err } = await useFetch('/api/feed', {
        method: 'POST',
        body: { url: newUrl.value },
    })
    if (err.value) {
        error.value = err.value.message
        snackbar.value = { show: true, text: error.value, color: 'error' }
    } else if (data.value && typeof data.value === 'object' && 'error' in data.value) {
        error.value = (data.value as any).error
        snackbar.value = { show: true, text: error.value, color: 'error' }
    } else {
        newUrl.value = ''
        snackbar.value = { show: true, text: '添加成功', color: 'success' }
        fetchSubscriptions()
    }
}

async function removeSubscription(id: string) {
    const { data, error: err } = await useFetch(`/api/feed?id=${id}`, { method: 'DELETE' })
    const isError = !!(err?.value || data.value && typeof data.value === 'object' && 'error' in data.value)
    const msg = err?.value?.message || (data.value && typeof data.value === 'object' && 'error' in data.value ? data.value.error : '删除失败')
    if (isError) {
        snackbar.value = { show: true, text: msg, color: 'error' }
    } else {
        snackbar.value = { show: true, text: '删除成功', color: 'success' }
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
    snackbar.value = { show: true, text: 'OPML 导出成功', color: 'success' }
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
        snackbar.value = { show: true, text: result.error, color: 'error' }
    } else {
        snackbar.value = { show: true, text: `成功导入 ${result.imported || 0} 个订阅`, color: 'success' }
        fetchSubscriptions()
    }
}

onMounted(() => {
    fetchSubscriptions()
})
</script>

<style lang="scss" scoped>
.subscription-page {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    overflow: hidden;

    &__bg {
        position: absolute;
        inset: 0;
        z-index: 0;
        background: linear-gradient(135deg, #e3f0ff 0%, #f9fafe 100%);
        width: 100vw;
        height: 100vh;
        pointer-events: none;
    }

    &__card {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 600px;
        padding: 32px 24px;
        border-radius: 24px;
        box-shadow: 0 8px 32px 0 rgba(60, 80, 180, 0.10), 0 1.5px 6px 0 rgba(60, 80, 180, 0.06);
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    &__title {
        font-size: 1.5rem;
        font-weight: 700;
        text-align: left;
        margin-bottom: 12px;
        letter-spacing: 1px;
        color: #234;
    }

    &__input {
        margin-bottom: 18px;
        font-size: 1rem;
    }

    &__btn {
        margin-bottom: 12px;
        font-size: 1.05rem;
        font-weight: 600;
        letter-spacing: 1px;
        border-radius: 8px;
        box-shadow: 0 2px 8px 0 rgba(60, 80, 180, 0.08);
    }

    &__alert {
        margin-bottom: 12px;
        border-radius: 8px;
    }

    &__list-area {
        margin-top: 8px;
        min-height: 120px;
    }

    &__list {
        margin-top: 8px;
    }

    &__empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #999;
        padding: 32px 0 16px 0;
        .subscription-page__empty-text {
            margin-top: 8px;
            font-size: 1.1rem;
            color: #888;
        }
    }

    &__table {
        margin-top: 12px;
    }

    @media (max-width: 900px) {
        &__card {
            max-width: 98vw;
            padding: 28px 8vw 24px 8vw;
            border-radius: 16px;
        }
        &__title {
            font-size: 1.2rem;
        }
    }
}
</style>
