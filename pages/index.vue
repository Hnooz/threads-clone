<template>
    <main-layout>
        <div id="INdexPage" class="w-full overflow-auto">
            <div class="mx-auto max-w-[500px] overflow-hidden">
                <div id="Posts" class="px-4 max-w-[600px] mx-auto">
                    <div  v-for="post in posts" :key="post">
                        <Post v-if="isPosts" :post="post" @isDeleted="posts = []" />
                        <Post v-if="isPosts" :post="post" @isDeleted="posts = []" />
                        <Post v-if="isPosts" :post="post" @isDeleted="posts = []" />
                        <Post v-if="isPosts" :post="post" @isDeleted="posts = []" />
                        <Post v-if="isPosts" :post="post" @isDeleted="posts = []" />
                    </div>
                </div>
            </div>
        </div>
    </main-layout>
</template>

<script setup>
    import MainLayout from "~/layouts/MainLayout.vue";
    import { useUserStore } from '~/stores/user';

    const userStore = useUserStore()
    // const user = useSupabaseUser()

    const posts = ref([])
    const isPosts = ref(true)
    const isLoading = ref(false)

    onMounted(() => {
        posts.value = [
            {
                name: 'john doe',
                image: 'https://placehold.co/100',
                text: 'this is title text',
                picture: 'http://placehold.co/500'
            }
        ]
    })
</script>