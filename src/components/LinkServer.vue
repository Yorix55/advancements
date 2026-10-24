<script setup lang="ts">
    import { ref } from 'vue'
    import { fetchUserFile } from '../composable/fetch_user_file.js'

    const name = ref('')
</script>

<template>
    <h2>Look up a users Advancements</h2>
    <input v-model="name" type="text">
    <button v-on:click="fetchUserFile(name)">Get Advancements</button>
</template>
