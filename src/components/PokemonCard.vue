<script setup>
import { ref } from "vue";
import Badge from "./small_comp/Badge.vue";
const props = defineProps(["id", "name", "spriteUrl", "elements"]);
const isImageLoaded = ref(false)

let clean_name = props.name.replace(/-/g, ' ')

function imageLoaded(){
    isImageLoaded.value = true
}

</script>

<template>
    <RouterLink :to="{name: 'PokemonDetail', params:{id}}">
        <div class="item-card relative cursor-pointer">
            <img src="../assets/img/pokeball-gray.png"
                class="w-[150px] absolute m-auto left-0 right-0 top-0 opacity-25 animate-spin"
                v-show="!isImageLoaded"
            >
            <img :src="props.spriteUrl" 
                class="w-[150px] absolute m-auto left-0 right-0 top-0"
                @load="imageLoaded()"
                v-show="isImageLoaded"
            >
            <div class="item-text">
                <p class="text-base text-sm">#{{ props.id }}</p>
                <p class="text-base font-bold">{{clean_name}}</p>
                <div class="flex flex-row mt-2 gap-1 justify-center">
                    <Badge v-for="el in props.elements" :text="el.type.name"/>
                </div>
            </div>
        </div>
    </RouterLink>
</template>

