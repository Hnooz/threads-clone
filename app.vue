<script setup>
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()
</script>

<template>
  <div class="bg-black fixed w-[calc(100%+1px)] h-full">
    <NuxtPage />

    <CreatePost :class="userStore.isMenuOverlay ? 'max-h-[100hv] transition-all duration-200 ease-in visible' : 'max-h-0 transition-all duration-200 ease-out invisible'" />
    <Modal :class="userStore.isLogoutOverlay ? 'max-h-[100hv] transition-all duration-200 ease-in visible' : 'max-h-0 transition-all duration-200 ease-out invisible'" />
  </div>
</template>
