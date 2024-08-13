<script setup>
import { ref } from 'vue';

const props = defineProps(['option'])
const model = defineModel()

const bgColor = ref()
bgColor.value = "bg-element-"+props.option+"/40"
</script>

<template>
    <div class="poke-types-checkbox flex flex-row gap-x-2 mb-1 items-center" :class="bgColor">
        <input type="checkbox"
            class="w-4 h-4 rounded-full ring-offset-gray-200" 
            :value="props.option"
            v-model="model"
        > 
        <p class="capitalize">
            {{ props.option }}
        </p>
    </div>
</template>