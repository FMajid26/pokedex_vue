<template>
    <div class="flex w-full input-field items-center justify-between">
        <input :placeholder="props.placeholder" class="w-full"
            v-model="model"
        />
        <img src="../assets/icons/linear/search-normal.svg" class="h-4" alt="" srcset="">
    </div>
</template>

<script setup>
const model = defineModel()
const props = defineProps(['placeholder'])

</script>