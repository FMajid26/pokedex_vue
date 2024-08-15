<template>
    <div class="bg-black/90 z-50 flex flex-col gap-y-4 w-full h-full fixed top-0 left-0 px-4 py-4 justify-center items-center md:py-10">
        <p class="text-white text-3xl font-bold z-20">
            LOADING DATA
        </p>
        <img src="../assets/img/pokeball-gray.png"
            class="w-[100px] absolute mt-4 opacity-25 animate-spin"
            v-show="!isImageLoaded"
        >
    </div>
</template>

<script setup>

</script>