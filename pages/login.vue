<script setup>
    const client = useSupabaseClient()
    const user = useSupabaseUser()

    watchEffect(() => {
        if (user.value) {
            return navigateTo('/')
        }
    })

    const login = async (prov) => {
        const { data, error } = await client.auth.signInWithOAuth({
            provider: prov,
            redirectTo: window.location.origin
        })
        console.log(true);
        if (error) console.log(error)
    }
</script>

<template>
    <div id="AuthPage" class="w-full h-[100vh] pt-32">
        <div class="w-full">
            <div class="w-full flex items-center justify-center gap-2.5 p-2">
                <img class="w-[35px]" src="/threads-logo.png" alt="">
                <span class="font-bold text-2xl text-white">Threads</span>
            </div>
            <div class="max-w-[350px] mx-auto px-2 text-white">
                <h1 class="text-center mb-6 mt-4">Login / Register</h1>
                <button @click="login('github')" class="flex items-center justify-center gap-3 p-1.5 w-full border rounded-full text-lg font-semibold">
                    <p class="flex items-center gap-2 justify-between">
                        <img class="w-full max-w-[30px] rounded-full" src="/github-logo.png" alt="">
                        Github
                    </p>
                </button>
            </div>
        </div>
    </div>
</template>
