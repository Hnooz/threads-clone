<script setup>
    import MainLayout from "~/layouts/MainLayout.vue";
    import { useUserStore } from '~/stores/user';

    const userStore = useUserStore()
    const user = useSupabaseUser()

    const posts = ref([])
    const isPosts = ref(false)
    const isLoading = ref(false)

    watchEffect(() => {
        if (!user.value) {
            return navigateTo('/login')
        }
    })

    onBeforeMount(async () => {
        try {
            isLoading.value = true
            posts.value = await userStore.getAllPosts()
        } catch (error) {
            console.log(error);
        }
    })

    onMounted(() => {
        watchEffect(() => {
            posts.value = userStore.posts
            if (userStore.posts && userStore.posts.length >= 1) {
                isPosts.value = true
                isLoading.value = false
            } else {
                isLoading.value = false
                isPosts.value = false
            }
        })
    })
    watch(() => posts.value, () => {
        posts.value = userStore.posts
        if (userStore.posts && userStore.posts.length >= 1) {
            isPosts.value = true
            isLoading.value = false
        } else {
            isPosts.value = false
            isLoading.value = false
        }
    }, { deep: true })
</script>

<template>
    <main-layout>
        <div id="IndexPage" class="w-full overflow-auto">
            <div class="mx-auto max-w-[500px] overflow-hidden">
                <div id="Posts" class="px-4 max-w-[600px] mx-auto">
                    <div v-for="post in posts" :key="post">
                        <Post v-if="isPosts" :post="post" @isDeleted="posts = userStore.getAllPosts()" />
                    </div>
                    <div v-if="!isPosts">
                        <client-only>
                            <div v-if="isLoading" class="mt-20 w-full flex items-center justify-center mx-auto">
                                <div class="text-white mx-auto flex flex-col items-center justify-center">
                                    <svg class="w-6 h-6 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor" /><path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor" /></svg>
                                    <span class="w-full mt-1">Loading</span>
                                </div>
                            </div>
                            <div v-if="!isLoading" class="mt-20 w-full flex items-center justify-center mx-auto">
                                <div class="text-white mx-auto flex flex-col items-center justify-center">   
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                                    </svg>                         
                                    <span class="w-full mt-1">Make the first posts</span>
                                </div>
                            </div>
                        </client-only>
                    </div>
                </div>
            </div>
        </div>
    </main-layout>
</template>