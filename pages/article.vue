<template>
    <div class="article-page">
        <div class="article-page__bg" />
        <div class="article-page__layout">
            <aside class="article-page__sidebar">
                <Sidebar />
            </aside>
            <main class="article-page__main">
                <section class="article-page__card">
                    <Topbar class="article-page__topbar">
                        <template #search>
                            <SearchBar v-model="search" />
                        </template>
                    </Topbar>
                    <div class="article-page__header">
                        <v-icon
                            class="article-page__icon"
                            size="28"
                            color="primary"
                        >
                            mdi-file-document-outline
                        </v-icon>
                        <h1 class="article-page__title">
                            文章
                        </h1>
                    </div>
                    <ArticleList
                        :items="filteredArticles"
                        :selected-id="selectedId"
                        class="article-page__list"
                        @select="selectArticle"
                    />
                    <div v-if="filteredArticles.length === 0" class="article-page__empty">
                        <v-icon size="48" color="grey">
                            mdi-file-document-multiple-outline
                        </v-icon>
                        <div class="article-page__empty-text">
                            暂无文章，试试更换订阅源或关键词吧！
                        </div>
                    </div>
                </section>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Sidebar from '@/components/sidebar.vue'
import Topbar from '@/components/topbar.vue'
import SearchBar from '@/components/search-bar.vue'
import ArticleList from '@/components/article-list.vue'

// 明确声明 articles 的类型，避免 never 类型
interface Article {
    id: string
    title: string
    // ...可根据实际情况补充其它字段...
}
const articles = ref<Article[]>([
  // ...模拟数据...
])
const search = ref('')
const selectedId = ref('')
const filteredArticles = computed(() => articles.value.filter((a) => a.title.includes(search.value)),
)
function selectArticle(id: string) {
  selectedId.value = id
}
</script>

<style lang="scss" scoped>
// filepath: d:\Projects\typescript-projects\rss-zero\pages\article.vue
.article-page {
    position: relative;
    min-height: 100vh;
    width: 100vw;
    overflow-x: hidden;

    &__bg {
        position: fixed;
        inset: 0;
        z-index: 0;
        background: linear-gradient(135deg, #e3f0ff 0%, #f9fafe 100%);
        width: 100vw;
        height: 100vh;
        pointer-events: none;
    }

    &__layout {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: row;
        min-height: 100vh;
        width: 100vw;
        justify-content: flex-start;
        align-items: stretch;
    }

    &__sidebar {
        min-width: 240px;
        max-width: 280px;
        background: #f6f8fa;
        border-right: 1px solid #e3e8f0;
        box-shadow: 2px 0 12px 0 rgba(60, 80, 180, 0.04);
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 0 0 0 0;
        transition: background 0.2s;
        z-index: 2;
        @media (max-width: 900px) {
            display: none;
        }
        // 让 Sidebar 内部内容有内边距
        > * {
            padding: 24px 0 24px 24px;
        }
    }

    &__main {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 40px 0 24px 0;
        background: transparent;
        min-height: 100vh;
        @media (max-width: 900px) {
            padding: 18px 0 12px 0;
        }
    }

    &__card {
        width: 100%;
        max-width: 900px;
        background: #fff;
        border-radius: 18px;
        box-shadow: 0 8px 32px 0 rgba(60, 80, 180, 0.10), 0 1.5px 6px 0 rgba(60, 80, 180, 0.06);
        padding: 32px 40px 24px 40px;
        display: flex;
        flex-direction: column;
        min-height: 70vh;
        @media (max-width: 900px) {
            padding: 18px 4vw 12px 4vw;
            border-radius: 10px;
        }
    }

    &__topbar {
        margin-bottom: 12px;
    }

    &__header {
        display: flex;
        align-items: center;
        margin-bottom: 18px;
        gap: 8px;
    }

    &__icon {
        margin-right: 4px;
    }

    &__title {
        font-size: 1.6rem;
        font-weight: 700;
        color: #234;
        letter-spacing: 1px;
        margin: 0;
    }

    &__list {
        margin-top: 8px;
        flex: 1 1 auto;
    }

    &__empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #999;
        padding: 64px 0 16px 0;
        min-height: 220px;
        .article-page__empty-text {
            margin-top: 14px;
            font-size: 1.15rem;
            color: #888;
            text-align: center;
        }
    }
}
</style>
