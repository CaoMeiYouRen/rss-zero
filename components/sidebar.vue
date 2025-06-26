<template>
    <nav class="sidebar">
        <div class="sidebar__title">
            Fashion Trends - 月刊
        </div>
        <ul class="sidebar__menu">
            <li
                v-for="item in menu"
                :key="item.label"
                class="sidebar__item"
            >
                <v-icon v-if="item.icon" size="20">
                    {{ item.icon }}
                </v-icon>
                <span>{{ item.label }}</span>
            </li>
        </ul>
        <div class="sidebar__group-title">
            Book Revlove
        </div>
        <ul class="sidebar__group-list">
            <li
                v-for="group in groups"
                :key="group"
                class="sidebar__group-item"
            >
                <v-icon size="18">
                    mdi-checkbox-blank-circle-outline
                </v-icon>
                {{ group }}
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
const menu = [
  { label: 'Fashion trends - news', icon: 'mdi-newspaper' },
  // ...可扩展
]
const groups = ['IT岛发展', '甘蔗农道', '丁格流港', '乐福旺库']
</script>

<style scoped lang="scss">
// ...样式略...
</style>
