<script setup>
    import { useUserStore } from '~/stores/user';

    const userStore = useUserStore()
    const client = useSupabaseClient()

    const logout = () => {
        client.auth.signOut()
        userStore.isLogoutOverlay = false
        return navigateTo('/')
    }
</script>

<template>
    <div id="Modal" class="fixed grid place-items-center h-screen z-50 bottom-0 bg-black/50 backdrop-blur-md w-full">
        <div class="bg-black w-full max-w-[300px] rounded-lg text-white border border-gray-600 p-2">
            <button @click="userStore.isLogoutOverlay = false" class="flex items-center justify-between bg-black w-full p-3">
                <span>Close Modal</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <hr class="border-b border-b-gray-700 my-1">
            <button @click="logout()" class="flex items-center justify-between bg-black w-full p-3">
                <span>Logout</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
            </button>
        </div>
    </div>
</template>

