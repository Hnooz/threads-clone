<script setup>
    import { useUserStore } from '~/stores/user';
    const emit = defineEmits(['isDeleted'])
    const props = defineProps({ post : Object })

    const userStore = useUserStore()
    const runtimeConfig = useRuntimeConfig()
    const client = useSupabaseClient()
    const user = useSupabaseUser()

    const isMenu = ref(false)
    const isLike = ref(false)
    const isDeleting = ref(false)

    const hasLiked = computed(() => {
        if (! user.value) return
        let res = false
        
        props.post.likes.forEach(like => {
            if (like.userId == user.value.identities[0].user_id && like.postId == props.post.id) {
                res = true
            }
        });

        return res
    })

    const destroy = async(id, picture) => {
        let res = confirm('Are you sure you want to delete this post?')
        if(!res) return
        try {
            isMenu.value = false
            isDeleting.value = true

            const { data, error } = await client.storage.from('threads-clone-files').remove(picture)
            await useFetch(`/api/delete-post/${id}`, { method : 'DELETE'})
            emit('isDeleted', true)

            isDeleting.value = false
        } catch (error) {
            console.log(error)
            isDeleting.value = false            
        }
    }

    const likePost = async(id) => {
        isLike.value = true
        try {
            await useFetch('/api/like-post/', {
                method: 'POST',
                body: {
                    userId: user.value.identities[0].user_id,
                    postId: id,
                }
            })

            await userStore.getAllPosts()
            isLike.value = false
        } catch (error) {
            console.log(error)
            isLike.value = false
        }
    }

    const unlikePost = async(id) => {
        isLike.value = true
        try {
            await fetch(`/api/unlike-post/${id}`, { method : 'DELETE'})
            await userStore.getAllPosts()
            isLike.value = false
        } catch (error) {
            console.log(error)
            isLike.value = false            
        }
    }

    const like = () => {
        const likePostsObj = ref(null)

        if (props.post.likes.length < 1) {
            likePost(props.post.id)
            return null
        } else {
            props.post.likes.forEach(like => {
                if(like.userId == user.value.identities[0].user_id && like.postId == props.post.id) {
                    likePostsObj.value = like
                }
            })
        }
        if (likePostsObj.value) {
            unlikePost(likePostsObj.value.id)
            return null
        }

        likePost(props.post.id)
    }
</script>

<template>
    <div class="z-50 bottom-0 w-full">
       <div class="py-2 w-full">
            <div class="flex items-center justify-between">
                <div class="flex items-center text-white">
                    <img class="rounded-full h-[35px]" :src="post.image" alt="">
                    <h1 class="ml-2 font-medium text-white">{{ post.name }}</h1>
                </div>
                <div v-if="user && user.identities && (user.identities[0].user_id == post.userId)" @click="isMenu = !isMenu" class="relative">
                    <button :disabled="isDeleting" :class="isMenu ? 'bg-gray-800' : ''" class="flex items-center text-white p-1 h-[24px] w-[24px] hover:bg-gray-800 rounded-full cursor-pointer">
                        <svg v-if="!isDeleting" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        <svg v-else class="w-6 h-6 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor" /><path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor" /></svg>
                    </button>
                    <div v-if="isMenu" class="absolute border border-gray-600 right-0 z-20 mt-1 rounded">
                        <button @click="destroy(post.id, post.picture)" class="flex items-center rounded gap-2 text-red-600 justify-between bg-black w-full pl-4 pr-3 py-1 hover:bg-gray-900">
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
                <div class="bg-black rounded-lg w-[calc(100%-50px)] text-sm font-medium">
                    <div class="py-2 text-gray-300">{{ post.text }}</div>
                    <img class="mx-auto w-full mt-2 pr-2 rounded" v-if="post && post.picture" :src="runtimeConfig.public.bucketUrl + post.picture" alt="">
                    <div class="absolute mt-2 w-full">
                        <button class="flex items-center gap-1" @click="like()" :disabled="isLike">
                            <svg v-if="!hasLiked" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-red-500">
                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                            </svg>
                        </button>
                        <div class="relative text-sm mt-2 text-gray-500">
                            <div>
                                <span v-if="!isLike">{{ post.likes.length }}</span> 
                                <span v-else>
                                    <svg class="w-6 h-6 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor" /><path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor" /></svg>
                                </span> 
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