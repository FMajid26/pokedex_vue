<template>
    <div class="bg-black/60 z-50 flex flex-col gap-y-4 w-full h-full fixed top-0 left-0 px-4 py-4 justify-center items-center md:py-10">
        <!-- MODAL BODY/CONTAINER -->
        <div class="flex flex-col bg-white w-full sm:min-w-[400px] sm:max-w-[500px] md:w-[640px] h-fit rounded-[16px] overflow-hidden">
            <!-- HEADER -->
            <div class="flex flex-row w-full gap-x-3 pr-4 justify-between bg-black/10">
                <img 
                    :src="props.items.sprites != null 
                        ? props.items.sprites 
                        : '/src/assets/img/img-not-found.png'"
                    class="basis-1/3 w-full"
                >
                <div class="flex flex-col gap-y-1 w-full text-black basis-2/3 justify-center items-end md:items-start">
                    <p class="text-2xl font-bold line-clamp-1 capitalize">{{ props.items.name }}</p>
                    <p class="text-lg text-black/60 capitalize">{{ props.items.category }}</p>
                </div>
            
            </div>

            <!-- BODY -->
            <div class="flex flex-col p-4 text-black/60 gap-y-3 md:text-lg">
                <div class="flex flex-col">
                    <p class=" text-black font-bold">Effect :</p>
                    <p>{{ props.items.effect }}</p>
                </div>
            </div>
        </div>

        <button class="btn" @click="modalClicked">
            Close
        </button>
    </div>
</template>

<script setup>
import { itemsAll } from '@/routes/fetch_items';
import { onMounted, ref } from 'vue';

const props = defineProps(['items'])
const modalOpened = ref(false)
const emit = defineEmits(['clickmodal'])

function modalClicked(){
    emit('clickmodal')
}

// onMounted(() =>{
//     modalOpened.value = true
// })
</script>