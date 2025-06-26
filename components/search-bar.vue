<template>
    <v-text-field
        v-model="search"
        placeholder="搜索文章"
        prepend-inner-icon="mdi-magnify"
        clearable
        dense
        hide-details
        class="search-bar"
    />
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['update:search'])
const search = ref('')
watch(search, (val) => emit('update:search', val))
</script>

<style scoped lang="scss">
// ...样式略...
</style>
