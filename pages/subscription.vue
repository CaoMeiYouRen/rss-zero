<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-title>订阅管理</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="addSubscription">
                            <v-text-field
                                v-model="newUrl"
                                label="添加RSS订阅源URL"
                                :rules="[urlRule]"
                                required
                            />
                            <v-btn
                                type="submit"
                                color="primary"
                                :disabled="!validUrl"
                            >
                                添加
                            </v-btn>
                        </v-form>
                        <v-alert
                            v-if="error"
                            type="error"
                            dense
                        >
                            {{ error }}
                        </v-alert>
                        <v-list>
                            <v-list-item v-for="item in subscriptions" :key="item.id">
                                <v-list-item-content>
                                    <v-list-item-title>{{ item.title || item.url }}</v-list-item-title>
                                    <v-list-item-subtitle>{{ item.url }}</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn icon @click="removeSubscription(item.id)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
                <v-card class="mt-4">
                    <v-card-title>OPML 导入/导出</v-card-title>
                    <v-card-text>
                        <v-btn color="primary" @click="downloadOpml">
                            导出OPML
                        </v-btn>
                        <v-file-input
                            v-model="opmlFile"
                            label="导入OPML文件"
                            accept=".xml,.opml"
                            @change="importOpml"
                        />
                    </v-card-text>
                </v-card>
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

const validUrl = computed(() => validateUrl(newUrl.value))
const urlRule = (v: string) => validUrl.value || '请输入有效的URL'

async function fetchSubscriptions() {
    const { data } = await useFetch('/api/subscription')
    subscriptions.value = data.value || []
}

async function addSubscription() {
    error.value = ''
    if (!validUrl.value) {
        return
    }
    const { data, error: err } = await useFetch('/api/subscription', {
        method: 'POST',
        body: { url: newUrl.value },
    })
    if (err.value) {
        error.value = err.value.message
    } else if (data.value?.error) {
        error.value = data.value.error
    } else {
        newUrl.value = ''
        fetchSubscriptions()
    }
}

async function removeSubscription(id: string) {
    await useFetch(`/api/subscription?id=${id}`, { method: 'DELETE' })
    fetchSubscriptions()
}

async function downloadOpml() {
    const res = await fetch('/api/opml')
    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'subscriptions.opml'
    a.click()
    window.URL.revokeObjectURL(url)
}

async function importOpml() {
    if (!opmlFile.value) {
        return
    }
    const formData = new FormData()
    formData.append('opml', opmlFile.value)
    const res = await fetch('/api/opml', {
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

// onMounted(async () => {
//     // 匿名自动登录
//     const session = authClient.useSession()
//     if (!session.value.data?.user?.id) {
//         const user = await authClient.signIn.anonymous()
//         console.log(user)
//     }
//     // fetchSubscriptions()
// })
</script>
