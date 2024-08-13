<template>
    <div @click="openModal" class="flex flex-row w-full gap-x-3 p-4 pr-0 rounded-[12px] text-white justify-between hover:cursor-pointer" :class="bgColor">
        <div class="flex flex-col gap-y-1 w-full">
            <p class="text-lg font-bold line-clamp-1">{{ props.moveDetail.name_en }}</p>
            <div class="grid grid-cols-2 font-medium">
                <p>Power: <span class="font-bold">{{ props.moveDetail.power || '-'}}</span></p>
                <p>Accuracy: <span class="font-bold">{{ props.moveDetail.accuracy || '-' }}</span></p>
            </div>
        </div>
        <div class="flex flex-col h-full justify-center w-20 rounded-l-[8px] gap-y-0 bg-black/20 font-bold items-center">
            <p class="text-sm">PP</p>
            <p class="text-2xl mt-[-4px]">{{ props.moveDetail.pp }}</p>
        </div>
    </div>

    <ModalsMove
        v-show="isModalOpen"
        :move-detail="moveDetail"
        :bg-color="bgColor"
        @clickmodal="closeModal"
    />
</template>

<script setup>
import { computed, ref, getCurrentInstance, onMounted } from 'vue';
import ModalsMove from '../modals/ModalsMove.vue';

const isModalOpen = ref(false)
const bgColor = ref()

const props = defineProps(['moveName', 'moveElement', 'movePow', 'moveAcc', 'movePp', 'moveDetail'])
bgColor.value = "bg-element-"+props.moveDetail.type.name

function openModal(){
    isModalOpen.value = true
}

function closeModal(){
    isModalOpen.value = false
}

onMounted(()=>{
    isModalOpen.value = false
})

</script>