<script setup>
import { nextTick, ref } from 'vue';

const props = defineProps(['text'])
const elemenets = ref()
elemenets.value = "bg-element-"+props.text

</script>

<template>
    <p class="badge capitalize w-fit" :class="elemenets">{{ props.text }}</p>
</template>