<template>
    <header class="topbar">
        <div class="topbar__left">
            <span class="topbar__logo">UI</span>
        </div>
        <div class="topbar__center">
            <slot name="search" />
        </div>
        <div class="topbar__right">
            <v-icon>mdi-magnify</v-icon>
            <v-icon>mdi-bell-outline</v-icon>
            <v-avatar size="32">
                <!-- <img src="/avatar.jpg" alt="profile" /> -->
            </v-avatar>
        </div>
    </header>
</template>

<script setup lang="ts">
// ...existing code...
</script>

<style scoped lang="scss">
// ...样式略...
</style>
