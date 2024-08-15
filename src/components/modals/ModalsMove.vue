<template>
    <div class="bg-black/60 z-50 flex flex-col gap-y-4 w-full h-full fixed top-0 left-0 px-4 py-4 justify-center items-center md:py-10" v-show="modalOpened">
        
        <div class="flex flex-col bg-white w-full h-fit max-h-full sm:min-w-[400px] sm:max-w-[500px] md:w-[640px] rounded-[16px] overflow-hidden">
            <div class="flex flex-row w-full gap-x-3 px-4 py-6 text-white justify-between" :class="props.bgColor">
                <div class="flex flex-col gap-y-1 w-full">
                    <p class="text-2xl font-bold line-clamp-1">{{ props.moveDetail.name_en }}</p>
                    <div class="grid grid-cols-2 font-medium">
                        <p class="text-lg">Power: <span class="font-bold">{{ props.moveDetail.power || '-'}}</span></p>
                        <p class="text-lg">Accuracy: <span class="font-bold">{{ props.moveDetail.accuracy  || '-'}}</span></p>
                    </div>
                </div>
                <div class="flex flex-col h-full justify-center w-20 rounded-[8px] gap-y-0 bg-black/20 font-bold items-center">
                    <p class="text-sm">PP</p>
                    <p class="text-2xl mt-[-4px]">{{ props.moveDetail.pp }}</p>
                </div>
            </div>

            <div class="flex flex-col h-fit p-4 text-black/60 gap-y-3">
                <div class="flex flex-col w-full h-fit overflow-auto">
                    <p class="text-lg text-black font-bold">Description : </p>
                    <p class="text-md" v-if="props?.moveDetail.effect_entries.length != 0">
                        {{ props.moveDetail.effect_entries[0].effect}}
                    </p>
                </div>
            </div>
        </div>

        <button class="btn" @click="modalClicked">
            Close
        </button>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps(['moveDetail', 'bgColor'])
const modalOpened = ref(false)
const emit = defineEmits(['clickmodal'])

function modalClicked(){
    emit('clickmodal')
}

// onMounted(() =>{
//     modalOpened.value = true
// })
</script>