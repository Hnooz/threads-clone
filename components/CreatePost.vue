<script setup>
    import { v4 as uuidv4 } from 'uuid'
    import { useUserStore } from '~/stores/user';

    const userStore = useUserStore()
    const text = ref(null)
    const isLoading = ref(false)

    const file = ref(null)
    const fileDisplay = ref(null)
    const fileData = ref(null)

    const adjustTextareaHeight = () => {
        const textarea = document.getElementById("textarea")
        textarea.style.height = "auto"
        textarea.style.height = textarea.style.height + "px"
    }

    const clearData = () => {
        text.value = null
        file.value = null
        fileDisplay.value = null
        fileData.value = null
    }

    // const client = useSupabaseClient()
    // const user = useSupabaseUser()
</script>

<template>
    <div id="CreatePost" class="fixed z-50 bottom-0 w-full h-full overflow-hidden">

    </div>
</template>