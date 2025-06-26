<template>
    <div
        class="article-list-item"
        :class="{'article-list-item--selected': selected}"
        @click="$emit('click')"
    >
        <v-avatar size="40" class="article-list-item__avatar">
            <img :src="item.avatar" alt="avatar">
        </v-avatar>
        <div class="article-list-item__info">
            <div class="article-list-item__title">
                {{ item.title }}
            </div>
            <div class="article-list-item__meta">
                <span>{{ item.author }}</span>
                <span>{{ item.time }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
  item: any
  selected?: boolean
}>()
</script>

<style scoped lang="scss">
// ...样式略...
</style>
