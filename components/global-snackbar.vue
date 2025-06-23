<template>
    <v-snackbar
        v-model="show"
        :color="color"
        :timeout="timeout"
        location="top"
    >
        {{ text }}
    </v-snackbar>
</template>

<script setup lang="ts">
import { useGlobalSnackbar } from '@/composables/use-global-snackbar'
const { show, text, color, timeout } = useGlobalSnackbar()
</script>
