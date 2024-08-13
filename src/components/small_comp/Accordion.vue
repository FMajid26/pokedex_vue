<template>
        <button 
            @click.prevent="toggleAccordion"
            class="flex flex-row items-center w-full gap-x-2 justify-between"
        >
            <h1 class="mt-5 text-2xl font-bold text-pokeRed">{{props.title}}</h1>
            <img src="../../assets/icons/linear/arrow-down.svg" class="h-6">
        </button>

        <div v-if="isOpen">
            <slot name="content"></slot>
        </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['title'])
const isOpen = ref(false)

function toggleAccordion (){
    isOpen.value = !isOpen.value
    console.log(isOpen.value);
}
</script>