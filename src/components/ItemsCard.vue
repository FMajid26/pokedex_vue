<script setup>
import { ref } from 'vue';
import ModalsItem from './modals/ModalsItem.vue';

const props = defineProps(['items'])
const modalOpened = ref(false)
const isImageLoaded = ref(false)

function openModal(){
    modalOpened.value = true
}

function closeModal(){
    modalOpened.value = false
}

function imageLoaded(){
    isImageLoaded.value = true
}

</script>

<template>
    <div @click="openModal" class="w-full flex flex-row pr-2 md:pr-5 pl-0 py-2 border-[1px] border-gray-200 text-black text-center rounded-[16px] cursor-pointer hover:outline hover:outline-pokeRed hover:outline-2 capitalize">
        <img src="../assets/img/pokeball-gray.png"
            class="animate-spin basis-1/3 grow-0 w-full opacity-25"
            v-show="!isImageLoaded"
        >
        <img :src="props.items.sprites != null 
                    ? props.items.sprites 
                    : '/src/assets/img/img-not-found.png'" 
            class="basis-1/3 grow-0 w-full"
            @load="imageLoaded()"
            v-show="isImageLoaded"
        >
        <div class="flex flex-col text-right grow items-end justify-center gap-0 sm:gap-1">
            <p class="text-md sm:text-xl font-bold line-clamp-1 capitalize">{{ props.items.name }}</p>
            <p class="text-base text-sm text-black/60 line-clamp-1 capitalize">{{ props.items.category }}</p>
        </div>
    </div>

    <ModalsItem
        :items="props.items"
        v-show="modalOpened"
        @clickmodal="closeModal"
    />
</template>