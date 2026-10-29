<script setup lang="ts">
    import { ref } from 'vue'
    import { fetchUserFile } from '../composable/fetch_user_file.js'
    import { UploadEmit } from '../composable/upload'


    const name = ref('')
    const emit = defineEmits<UploadEmit>()

    async function loadAdvancements() {
        const file = await fetchUserFile(name.value)
        emit('update', file)
    }
    
</script>

<template>
    <h2>Look up a users Advancements</h2>
    <input v-model="name" type="text">
    <button @click="loadAdvancements">Get Advancements</button>
    // TODO: eventlistner instead of onclick? buttonclick --> show advancements (look up program after upload)
</template>
