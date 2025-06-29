<template>
    <div class="settings-page">
        <div class="settings-page__header">
            <h2 class="settings-page__title">
                设置
            </h2>
            <button class="settings-page__save-btn">
                <span class="mdi mdi-content-save settings-page__icon" /> 保存设置
            </button>
        </div>

        <div class="settings-page__main">
            <div class="settings-page__left">
                <!-- 阅读设置 -->
                <div class="settings-card">
                    <h3 class="settings-card__title">
                        阅读设置
                    </h3>
                    <div class="settings-card__body">
                        <div class="settings-row">
                            <div>
                                <h4 class="settings-row__label">
                                    文章摘要长度
                                </h4>
                                <p class="settings-row__desc">
                                    控制文章摘要的显示长度
                                </p>
                            </div>
                            <div class="settings-row__input-group">
                                <button class="settings-row__btn">
                                    <span class="mdi mdi-minus" />
                                </button>
                                <input
                                    type="text"
                                    :value="summaryLength"
                                    class="settings-row__input"
                                    aria-label="Selected value"
                                    readonly
                                >
                                <button class="settings-row__btn">
                                    <span class="mdi mdi-plus" />
                                </button>
                                <span class="settings-row__unit">段落</span>
                            </div>
                        </div>

                        <div class="settings-row">
                            <div>
                                <h4 class="settings-row__label">
                                    自动翻译
                                </h4>
                                <p class="settings-row__desc">
                                    自动翻译非母语文章
                                </p>
                            </div>
                            <div class="settings-row__switch">
                                <input
                                    id="toggle1"
                                    type="checkbox"
                                    class="settings-switch__input"
                                >
                                <label for="toggle1" class="settings-switch__label" />
                            </div>
                        </div>

                        <div class="settings-row">
                            <div>
                                <h4 class="settings-row__label">
                                    暗色模式
                                </h4>
                                <p class="settings-row__desc">
                                    切换界面主题
                                </p>
                            </div>
                            <div class="settings-row__switch">
                                <input
                                    id="toggle2"
                                    type="checkbox"
                                    class="settings-switch__input"
                                >
                                <label for="toggle2" class="settings-switch__label" />
                            </div>
                        </div>

                        <div class="settings-row">
                            <div>
                                <h4 class="settings-row__label">
                                    自动加载更多
                                </h4>
                                <p class="settings-row__desc">
                                    滚动到底部时自动加载更多文章
                                </p>
                            </div>
                            <div class="settings-row__switch">
                                <input
                                    id="toggle3"
                                    type="checkbox"
                                    class="settings-switch__input"
                                >
                                <label for="toggle3" class="settings-switch__label" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 推荐算法设置 -->
                <div class="settings-card">
                    <h3 class="settings-card__title">
                        推荐算法设置
                    </h3>
                    <div class="settings-card__body">
                        <div>
                            <label class="settings-label">推荐权重</label>
                            <div class="settings-weight-group">
                                <div class="settings-weight">
                                    <label class="settings-weight__label">关键词匹配</label>
                                    <div class="settings-weight__slider">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            :value="keywordWeight"
                                            class="settings-slider"
                                        >
                                        <span class="settings-weight__percent">{{ keywordWeight }}%</span>
                                    </div>
                                </div>
                                <div class="settings-weight">
                                    <label class="settings-weight__label">来源可信度</label>
                                    <div class="settings-weight__slider">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            :value="sourceWeight"
                                            class="settings-slider"
                                        >
                                        <span class="settings-weight__percent">{{ sourceWeight }}%</span>
                                    </div>
                                </div>
                                <div class="settings-weight">
                                    <label class="settings-weight__label">阅读历史</label>
                                    <div class="settings-weight__slider">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            :value="historyWeight"
                                            class="settings-slider"
                                        >
                                        <span class="settings-weight__percent">{{ historyWeight }}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label class="settings-label">重要度计算</label>
                            <div class="settings-factor-list">
                                <div
                                    v-for="factor in factors"
                                    :key="factor.id"
                                    class="settings-factor"
                                >
                                    <div class="settings-factor__left">
                                        <input
                                            :id="factor.id"
                                            type="checkbox"
                                            class="settings-factor__checkbox"
                                            :checked="factor.checked"
                                        >
                                        <label :for="factor.id" class="settings-factor__label">{{ factor.name }}</label>
                                    </div>
                                    <div class="settings-factor__right">
                                        <span class="settings-factor__weight-label">权重:</span>
                                        <input
                                            type="number"
                                            :value="factor.weight"
                                            min="0"
                                            max="100"
                                            class="settings-factor__weight-input"
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 右侧栏 -->
            <div class="settings-page__right">
                <!-- 用户信息 -->
                <div class="settings-card">
                    <div class="settings-user">
                        <img
                            src="https://picsum.photos/200/200?random=user"
                            alt="用户头像"
                            class="settings-user__avatar"
                        >
                        <div>
                            <h3 class="settings-user__name">
                                张三
                            </h3>
                            <p class="settings-user__email">
                                zhangsan@example.com
                            </p>
                        </div>
                    </div>
                    <div class="settings-user__actions">
                        <button class="settings-user__btn">
                            <span class="mdi mdi-account-circle settings-user__btn-icon" /> 个人资料
                        </button>
                        <button class="settings-user__btn">
                            <span class="mdi mdi-key settings-user__btn-icon" /> 更改密码
                        </button>
                        <button class="settings-user__btn">
                            <span class="mdi mdi-bell-ring-outline settings-user__btn-icon" /> 通知设置
                        </button>
                        <button class="settings-user__btn settings-user__btn--danger">
                            <span class="mdi mdi-logout settings-user__btn-icon" /> 退出登录
                        </button>
                    </div>
                </div>

                <!-- 应用信息 -->
                <div class="settings-card">
                    <h3 class="settings-card__title">
                        应用信息
                    </h3>
                    <div class="settings-appinfo">
                        <div class="settings-appinfo__row">
                            <span class="settings-appinfo__label">版本</span>
                            <span class="settings-appinfo__value">1.0.0</span>
                        </div>
                        <div class="settings-appinfo__row">
                            <span class="settings-appinfo__label">上次更新</span>
                            <span class="settings-appinfo__value">2025-06-15</span>
                        </div>
                        <div class="settings-appinfo__row">
                            <span class="settings-appinfo__label">存储空间</span>
                            <span class="settings-appinfo__value">128MB / 512MB</span>
                        </div>
                        <div class="settings-appinfo__progress">
                            <div class="settings-appinfo__progress-bar" style="width: 25%" />
                        </div>
                    </div>
                    <button class="settings-appinfo__btn">
                        <span class="mdi mdi-refresh settings-appinfo__btn-icon" /> 检查更新
                    </button>
                </div>

                <!-- 帮助与支持 -->
                <div class="settings-card">
                    <h3 class="settings-card__title">
                        帮助与支持
                    </h3>
                    <div class="settings-help">
                        <a href="#" class="settings-help__link">
                            <span class="mdi mdi-help-circle-outline settings-help__icon" /> 帮助中心
                        </a>
                        <a href="#" class="settings-help__link">
                            <span class="mdi mdi-book-open-page-variant settings-help__icon" /> 使用教程
                        </a>
                        <a href="#" class="settings-help__link">
                            <span class="mdi mdi-file-document-outline settings-help__icon" /> 隐私政策
                        </a>
                        <a href="#" class="settings-help__link">
                            <span class="mdi mdi-email-outline settings-help__icon" /> 联系我们
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 阅读设置
const summaryLength = ref(3)
const autoTranslate = ref(false)
const darkMode = ref(false)
const autoLoadMore = ref(false)

// 推荐算法设置
const keywordWeight = ref(60)
const sourceWeight = ref(30)
const historyWeight = ref(10)

const factors = ref([
  { id: 'factor1', name: '标题关键词匹配', checked: true, weight: 40 },
  { id: 'factor2', name: '文章长度', checked: true, weight: 20 },
  { id: 'factor3', name: '发布时间', checked: true, weight: 30 },
  { id: 'factor4', name: '来源可信度', checked: true, weight: 10 },
])
</script>

<style scoped lang="scss">
// 修复全局 * {padding:0;margin:0;} 影响，补充必要的间距和布局
.settings-page {
    // margin: 0 40px;
    padding: 24px 40px;
    background: #f7f8fa;
    min-height: 100vh;
    box-sizing: border-box;
    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
    }
    &__title {
        font-weight: bold;
        font-size: 24px;
    }
    &__save-btn {
        background: #2563eb;
        color: #fff;
        border: none;
        border-radius: 8px;
        padding: 8px 24px;
        font-size: 16px;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: background .2s;
        &:hover {
            background: #1d4ed8;
        }
    }
    &__icon {
        font-size: 20px;
        margin-right: 6px;
    }
    &__main {
        display: grid;
        grid-template-columns: 1fr 340px;
        gap: 32px;
        @media (max-width: 1024px) {
            grid-template-columns: 1fr;
        }
    }
    &__left {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
    &__right {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
}

.settings-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.03);
    padding: 24px;
    &__title {
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 16px;
    }
    &__body {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
}

.settings-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    &__label {
        font-weight: 500;
        color: #222;
        font-size: 15px;
    }
    &__desc {
        color: #888;
        font-size: 12px;
        margin-top: 2px;
    }
    &__input-group {
        display: flex;
        align-items: center;
        gap: 0;
    }
    &__btn {
        background: #fff;
        border: 1px solid #d1d5db;
        width: 32px;
        height: 32px;
        border-radius: 6px 0 0 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 18px;
        &:last-child {
            border-radius: 0 6px 6px 0;
        }
        &:hover {
            background: #f3f4f6;
        }
    }
    &__input {
        width: 48px;
        height: 32px;
        border: 1px solid #d1d5db;
        border-left: none;
        border-right: none;
        text-align: center;
        font-size: 15px;
        outline: none;
    }
    &__unit {
        margin-left: 8px;
        color: #888;
        font-size: 14px;
    }
    &__switch {
        position: relative;
        width: 48px;
        height: 24px;
        display: flex;
        align-items: center;
    }
}

.settings-switch__input {
    opacity: 0;
    width: 48px;
    height: 24px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    cursor: pointer;
}
.settings-switch__label {
    display: block;
    width: 48px;
    height: 24px;
    background: #e5e7eb;
    border-radius: 12px;
    position: relative;
    transition: background .2s;
}
.settings-switch__input:checked + .settings-switch__label {
    background: #2563eb;
}
.settings-switch__label::after {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    left: 2px;
    top: 2px;
    transition: left .2s;
}
.settings-switch__input:checked + .settings-switch__label::after {
    left: 26px;
}

.settings-label {
    font-weight: 500;
    color: #444;
    font-size: 14px;
    margin-bottom: 8px;
    display: block;
}

.settings-weight-group {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
}
.settings-weight {
    flex: 1 1 120px;
    min-width: 120px;
    &__label {
        color: #888;
        font-size: 12px;
        margin-bottom: 4px;
        display: block;
    }
    &__slider {
        display: flex;
        align-items: center;
    }
    &__percent {
        font-weight: 500;
        color: #222;
        font-size: 13px;
        margin-left: 8px;
    }
}
.settings-slider {
    width: 100px;
    accent-color: #2563eb;
    margin-right: 0;
}

.settings-factor-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.settings-factor {
    background: #f8fafc;
    border-radius: 8px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__left {
        display: flex;
        align-items: center;
    }
    &__checkbox {
        width: 16px;
        height: 16px;
        accent-color: #2563eb;
        border-radius: 4px;
    }
    &__label {
        margin-left: 8px;
        color: #222;
        font-size: 14px;
    }
    &__right {
        display: flex;
        align-items: center;
    }
    &__weight-label {
        color: #888;
        font-size: 12px;
        margin-right: 4px;
    }
    &__weight-input {
        width: 40px;
        height: 24px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        text-align: center;
        font-size: 13px;
        outline: none;
    }
}

.settings-user {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    &__avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin-right: 16px;
        object-fit: cover;
    }
    &__name {
        font-weight: 600;
        color: #222;
        font-size: 15px;
    }
    &__email {
        color: #888;
        font-size: 12px;
        margin-top: 2px;
    }
    &__actions {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    &__btn {
        border: 1px solid #d1d5db;
        background: #fff;
        color: #444;
        border-radius: 8px;
        padding: 8px 0;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background .2s;
        &-icon {
            font-size: 18px;
            margin-right: 8px;
        }
        &:hover {
            background: #f3f4f6;
        }
        &--danger {
            background: #ef4444;
            color: #fff;
            border: none;
            &:hover {
                background: #dc2626;
            }
        }
    }
}

.settings-appinfo {
    &__row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
    }
    &__label {
        color: #666;
        font-size: 13px;
    }
    &__value {
        font-weight: 500;
        color: #222;
        font-size: 13px;
    }
    &__progress {
        background: #e5e7eb;
        height: 8px;
        border-radius: 4px;
        width: 100%;
        margin: 8px 0 0 0;
        overflow: hidden;
    }
    &__progress-bar {
        background: #2563eb;
        height: 8px;
        border-radius: 4px;
        width: 0;
        transition: width .3s;
    }
    &__btn {
        border: 1px solid #d1d5db;
        background: #fff;
        color: #444;
        border-radius: 8px;
        padding: 8px 0;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-top: 16px;
        transition: background .2s;
        &-icon {
            font-size: 18px;
            margin-right: 8px;
        }
        &:hover {
            background: #f3f4f6;
        }
    }
}

.settings-help {
    display: flex;
    flex-direction: column;
    gap: 10px;
    &__link {
        display: flex;
        align-items: center;
        color: #444;
        font-size: 14px;
        border-radius: 8px;
        padding: 8px 0 8px 8px;
        text-decoration: none;
        transition: background .2s;
        &:hover {
            background: #f3f4f6;
        }
    }
    &__icon {
        font-size: 18px;
        margin-right: 8px;
    }
}
</style>
