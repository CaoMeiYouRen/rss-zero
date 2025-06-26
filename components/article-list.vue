<template>
    <div class="article-list">
        <ArticleListItem
            v-for="item in items"
            :key="item.id"
            :item="item"
            :selected="item.id === selectedId"
            @click="select(item.id)"
        />
    </div>
</template>

<script setup lang="ts">
import ArticleListItem from './article-list-item.vue'
defineProps<{
  items: any[]
  selectedId?: string
}>()
const emit = defineEmits(['select'])
function select(id: string) {
  emit('select', id)
}
</script>

<style scoped lang="scss">
// ...样式略...
</style>
