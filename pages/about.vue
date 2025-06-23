<template>
    <v-container class="about-page" fluid>
        <div class="about-page__bg" />
        <v-row align="center" justify="center">
            <v-col
                cols="12"
                md="8"
                lg="6"
                class="about-page__col"
            >
                <v-card class="about-page__card" elevation="12">
                    <v-card-title class="about-page__title">
                        关于 RSS Zero
                    </v-card-title>
                    <v-card-text class="about-page__text">
                        <p>
                            RSS Zero 是一个基于 RSS 的信息流推荐工具，支持个性化推荐、多平台同步、自动发现、自定义配置、AI 大模型等功能。
                        </p>
                        <p>
                            项目开源，欢迎参与贡献和反馈建议。
                        </p>
                        <p>
                            <a
                                href="https://github.com/cmyr/rss-zero"
                                target="_blank"
                                class="about-page__link"
                            >
                                GitHub 仓库
                            </a>
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped lang="scss">
.about-page__col {
    display: flex;
    align-items: center;
    justify-content: center;
}

.about-page {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 0;
    margin: 0;

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
        max-width: 640px;
        padding: 48px 32px 40px 32px;
        border-radius: 24px;
        box-shadow: 0 8px 32px 0 rgba(60, 80, 180, 0.10), 0 1.5px 6px 0 rgba(60, 80, 180, 0.06);
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__title {
        font-size: 2rem;
        font-weight: 700;
        text-align: center;
        margin-bottom: 16px;
        letter-spacing: 1px;
        color: #234;
    }

    &__text {
        font-size: 1.08rem;
        color: #4a5568;
        text-align: center;
        line-height: 1.7;
        margin-bottom: 8px;
    }

    &__link {
        color: #3b5bfd;
        text-decoration: underline;
        font-weight: 500;

        &:hover {
            color: #234;
        }
    }

    @media (max-width: 600px) {
        &__card {
            max-width: 98vw;
            padding: 28px 8vw 24px 8vw;
            border-radius: 16px;
        }

        &__title {
            font-size: 1.3rem;
        }

        &__text {
            font-size: 0.98rem;
        }
    }
}
</style>
