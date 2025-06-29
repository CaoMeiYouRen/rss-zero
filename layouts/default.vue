<template>
    <div class="layout-default">
        <!-- 顶部导航栏 -->
        <header class="layout-default__header">
            <div class="layout-default__header-inner">
                <div class="layout-default__logo">
                    <i class="mdi mdi-rss-box text-2xl text-primary" />
                    <span class="layout-default__logo-text">RSS Zero</span>
                </div>
                <nav class="layout-default__nav">
                    <NuxtLink to="/recommendations" class="layout-default__nav-link">
                        推荐内容
                    </NuxtLink>
                    <NuxtLink to="/feed" class="layout-default__nav-link">
                        订阅管理
                    </NuxtLink>
                    <NuxtLink to="/dashboard" class="layout-default__nav-link">
                        数据看板
                    </NuxtLink>
                    <NuxtLink to="/settings" class="layout-default__nav-link">
                        设置
                    </NuxtLink>
                </nav>
                <div class="layout-default__actions">
                    <NuxtLink to="/feed">
                        <v-btn
                            color="primary"
                            class="layout-default__add-btn"
                            rounded
                        >
                            <v-icon left>
                                mdi-plus
                            </v-icon>
                            添加订阅
                        </v-btn>
                    </NuxtLink>
                    <!-- <a
                        href="https://github.com/CaoMeiYouRen/rss-zero"
                        target="_blank"
                        class="layout-default__icon-btn"
                        aria-label="GitHub"
                    >
                        <i class="mdi mdi-github"></i>
                    </a>
                    <a
                        href="https://rss0.app/"
                        target="_blank"
                        class="layout-default__icon-btn"
                        aria-label="官网"
                    >
                        <i class="mdi mdi-web"></i>
                    </a> -->
                </div>
            </div>
        </header>
        <!-- 主内容 -->
        <main class="layout-default__main page-bg">
            <slot />
        </main>
        <!-- 页脚 -->
        <footer class="layout-default__footer">
            <div class="layout-default__footer-inner">
                <div class="layout-default__footer-left">
                    <i class="mdi mdi-rss-box mr-2 text-primary text-xl" />
                    <span class="font-medium text-gray-700 text-sm">RSS Zero © 2025</span>
                </div>
                <div class="layout-default__footer-links">
                    <a
                        href="https://github.com/CaoMeiYouRen/rss-zero"
                        target="_blank"
                        class="layout-default__footer-link"
                        aria-label="GitHub"
                    >
                        <i class="mdi mdi-github text-xl" />
                    </a>
                    <a
                        href="https://rss0.app/"
                        target="_blank"
                        class="layout-default__footer-link"
                        aria-label="官网"
                    >
                        <i class="mdi mdi-web text-xl" />
                    </a>
                </div>
            </div>
            <div class="layout-default__footer-bottom">
                <div class="text-gray-500 text-sm">
                    智能信息流推荐工具 | 订阅、阅读、发现优质内容
                </div>
                <div class="layout-default__footer-bottom-links">
                    <NuxtLink to="/about" class="layout-default__footer-bottom-link">
                        关于我们
                    </NuxtLink>
                    <a href="mailto:support@cmyr.dev" class="layout-default__footer-bottom-link">联系我们</a>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
// ...无需脚本...
</script>

<style scoped lang="scss">
@use '@/styles/common.scss' as *;
.layout-default {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__header {
    background: #fff;
    border-bottom: 1px solid #f2f3f5;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 1px 4px 0 rgba(60, 80, 180, 0.04);
  }
  &__header-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__logo {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 1.2rem;
    color: #165DFF;
    .mdi {
      margin-right: 6px;
    }
  }
  &__logo-text {
    color: #165DFF;
    font-weight: 700;
    font-size: 1.2rem;
    letter-spacing: 1px;
  }
  &__nav {
    display: flex;
    align-items: center;
    gap: 28px;
    margin-left: 32px;
    flex: 1 1 auto;
    @media (max-width: 900px) {
      display: none;
    }
  }
  &__nav-link {
    color: #6b7685;
    font-weight: 500;
    font-size: 1rem;
    text-decoration: none;
    transition: color 0.2s;
    &:hover, &.router-link-active {
      color: #165DFF;
    }
  }
  &__actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  &__add-btn {
    font-weight: 600;
    font-size: 1rem;
    padding: 0 18px;
    min-width: 120px;
  }
  &__icon-btn {
    color: #6b7685;
    font-size: 1.4rem;
    margin-left: 8px;
    transition: color 0.2s;
    &:hover {
      color: #165DFF;
    }
  }

  &__main {
    flex: 1 1 auto;
    min-height: 0;
  }

  &__footer {
    background: #fff;
    border-top: 1px solid #f2f3f5;
    padding: 0;
    margin-top: 0;
  }
  &__footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  &__footer-left {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
  }
  &__footer-links {
    display: flex;
    align-items: center;
    gap: 18px;
  }
  &__footer-link {
    color: #6b7685;
    transition: color 0.2s;
    &:hover {
      color: #165DFF;
    }
  }
  &__footer-bottom {
    border-top: 1px solid #f2f3f5;
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px 24px 8px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 0.98rem;
  }
  &__footer-bottom-links {
    display: flex;
    gap: 18px;
  }
  &__footer-bottom-link {
    color: #6b7685;
    text-decoration: none;
    transition: color 0.2s;
    &:hover {
      color: #165DFF;
      text-decoration: underline;
    }
  }
  @media (max-width: 900px) {
    &__header-inner, &__footer-inner, &__footer-bottom {
      padding: 0 12px;
    }
    &__footer-inner, &__footer-bottom {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  }
}
</style>
