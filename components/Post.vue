<script setup>
    import { useUserStore } from '~/stores/user';

    const userStore = useUserStore()
    const runtimeConfig = useRuntimeConfig()

    const isMenu = ref(false)
    const isLike = ref(false)
    const isDeleting = ref(false)

    const emit = defineEmits(['isDeleted'])
    const props = defineProps({ post : Object })

    // const client = useSupabaseClient()
    // const user = useSupabaseUser()
</script>

<template>
    <div class="z-50 bottom-0 w-full">
       <div class="py-2 w-full">
            <div class="flex items-center justify-between">
                <div class="flex items-center text-white">
                    <img class="rounded-full h-[35px]" :src="post.image" alt="">
                    <h1 class="ml-2 font-semibold text-white">{{ post.name }}</h1>
                </div>
                <div @click="isMenu = !isMenu" class="relative">
                    <button :disabled="isDeleting" :class="isMenu ? 'bg-gray-800' : ''" class="flex items-center text-white p-1 h-[24px] w-[24px] hover:bg-gray-800 rounded-full cursor-pointer">
                        <svg v-if="!isDeleting" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white animate-spin">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </button>
                    <div v-if="isMenu" class="absolute border border-gray-600 right-0 z-20 mt-1 rounded">
                        <button class="flex items-center rounded gap-2 text-red-600 justify-between bg-black w-full pl-4 pr-3 py-1 hover:bg-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="relative flex items-center w-full">
                <div class="w-[42px] mx-auto">
                    <div class="absolute ml-4 mt-1 top-0 w-[1px] bg-gray-700 h-full"></div>
                </div>
                <div class="bg-black rounded-lg w-[calc(100%-50px)] text-sm font-light">
                    <div class="py-2 text-gray-300">{{ post.text }}</div>
                    <img class="mx-auto w-full mt-2 pr-2 rounded" v-if="post && post.picture" :src="post.picture" alt="">
                    <div class="absolute nt-2 w-full ml-2">
                        <button class="flex items-center gap-1" :disabled="isLike">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </button>
                        <div class="relative text-sm text-gray-500">
                            <div>
                                <span>4</span> 
                                <span>likes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </div> 
       <div class="relative inline-block text-gray-500 pt-1 pb-1.5">
            <div class="flex items-center">
                <div class="flex items-center flex-wrap text-white gap-1 w-[42px]">
                    <div class="flex gap-0.5">
                        <img class="rounded-full h-[14px] mt-2" src="https://picsum.photos/id/202/50" alt="">
                        <img class="rounded-full h-[17px]" src="https://picsum.photos/id/223/50" alt="">
                    </div>
                    <div class="flex items-center">
                        <img class="rounded-full h-[11px] ml-4" src="https://picsum.photos/id/99/50" alt="">
                    </div>
                </div>
            </div>
       </div>
       <div class="h-[1px] bg-gray-800 w-full mt-3" />
    </div>
</template>