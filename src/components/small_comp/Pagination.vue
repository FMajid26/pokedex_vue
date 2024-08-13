<script setup>

const props = defineProps(['currentPage', 'totalPage'])
const emit = defineEmits(['nextpage', 'prevpage'])

function nextPageClicked(){
    emit('nextpage')
}

function prevPageClicked(){
    emit('prevpage')
}

</script>

<template>
    <div class="flex w-full mt-8 mb-10 gap-x-4 justify-center">
        <button class="btn" @click="prevPageClicked" :disabled="currentPage == 1">Previous</button>
        <button class="btn" @click="nextPageClicked" :disabled="props.currentPage == props.totalPage">Next</button>
    </div>
</template>