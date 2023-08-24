<script setup>
    import { v4 as uuidv4 } from 'uuid'
    import { useUserStore } from '~/stores/user';

    // const client = useSupabaseClient()
    // const user = useSupabaseUser()

    const userStore = useUserStore()
    const content = ref('')
    const isLoading = ref(false)

    const file = ref(null)
    const fileDisplay = ref(null)
    const fileData = ref(null)

    const adjustTextareaHeight = () => {
        const textarea = document.getElementById("textarea")
        textarea.style.height = "auto"
        textarea.style.height = textarea.scrollHeight + "px"
    }

    const clearData = () => {
        content.value = ''
        file.value = null
        fileDisplay.value = null
        fileData.value = null
    }

    const onChange = () => {
        fileDisplay.value = URL.createObjectURL(file.value.files[0])
        fileData.value = file.value.files[0]
    }

    const close = () => {
        userStore.isMenuOverlay = false
        clearData()
    }
</script>

<template>
    <div id="CreatePost" class="fixed z-50 bottom-0 w-full h-full overflow-hidden">
        <div class="bg-black h-full w-full text-white overflow-auto">
            <div class="flex items-center justify-start py-4 max-w-[500px] mx-auto border-b border-b-gray-700">
                <button @click="close()" class="rounded-full px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h1 class="text-[16px] font-semibold">New Thread</h1>
            </div>
            <div id="Post" class="z-40 bottom-0 max-h-[100vh-200px] w-full px-3 max-w-[500px] mx-auto">
                <div class="py-2 w-full">
                    <div class="flex items-center">
                        <div class="flex items-center text-white">
                            <img class="rounded-full h-[35px]" src="https://picsum.photos/id/223/50" alt="">
                            <h1 class="ml-2 font-semibold text-[18px]">Hnooz Daily Blog</h1>
                        </div>
                    </div>
                    <div class="relative flex items-center w-full">
                        <div class="w-[42px] mx-auto">
                            <div class="absolute ml-4 mt-1 top-0 w-[1px] bg-gray-700 h-full"></div>
                        </div>
                        <div class="bg-black rounded-lg w-[calc(100%-50px)] font-light">
                            <div class="pt-2 text-gray-300 bg-black w-full">                               
                                <textarea id="textarea" v-model="content" @input="adjustTextareaHeight()" class="w-full resize-none bg-black outline-none" placeholder="Start a thread...">
                                </textarea>                                
                            </div>
                            <div class="w-full">
                                <div class="flex flex-col gap-2 py-1">
                                    <div v-if="fileDisplay">
                                        <img class="mx-auto w-full mt-2 mr-2 rounded-lg" :src="fileDisplay" alt="">
                                    </div>
                                    <label for="fileInput">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                        </svg>
                                        <input id="fileInput" ref="file" type="file" @input="onChange" hidden accept=".jpg,.jpeg,.png">
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button v-if="content" :disabled="isLoading"
                class="fixed bottom-0 font-bold text-lg w-full bg-black inline-block float-right p-4 border-t border-t-gray-700"
                :class="isLoading ? 'text-gray-600' : 'text-blue-600'"
                >
                <span v-if="!isLoading">Post</span>
                <span v-else class="flex items-center gap-2 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    please wait...
                </span>
            </button>
        </div>
    </div>
</template>