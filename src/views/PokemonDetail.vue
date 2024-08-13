<template>
    <div class="flex flex-col h-fit md:pt-12 justify-left relative">

        <button @click="$router.back()" class="btn w-fit fixed z-40">
            <img src="../assets/icons/linear/arrow-left.svg" class="h-4 w-4" alt="" srcset="">
            Back
        </button>

        <div class="flex flex-col md:flex-row gap-y-4 w-full">
            <div class="basis-6/12">
                <img :src="reactivePokeData.about.sprites.other.home.front_default != null ? reactivePokeData.about.sprites.other.home.front_default : reactivePokeData.about.sprites.other['official-artwork'].front_default"
                    v-if="reactivePokeData.about.length != 0" class="w-100 h-100" alt=""
                >
            </div>
            <!-- RIGHT -->
            <div class="flex flex-col basis-6/12">
                <!-- NAME -->
                <div class="flex flex-row justify-between gap-x-4">
                    <div class="flex flex-col text-white w-full gap-y-1">
                        <p class="text-xl">#{{ reactivePokeData.about.id }}</p>
                        <h1 class="capitalize text-3xl md:text-5xl font-bold">{{ reactivePokeData.about.name }}</h1>
                        <div class="flex flex-row gap-x-4 text-base md:text-xl">
                            <p><span class="font-bold">Weight :</span> {{ reactivePokeData.about.weight/10 }} kg</p>
                            <p><span class="font-bold">Height :</span>{{ reactivePokeData.about.height*10 }} cm</p>
                        </div>
                        
                        
                    </div>
                    <div class="flex flex-col w-fit gap-2 align-right items-end">
                        <Badge v-for="el in reactivePokeData.about.types" 
                        :text="el.type.name"
                        class="md:badge-big border-2 border-white"/>
                    </div>

                </div>
                <p class="mt-2 text-lg text-gray-100" v-if="flavorTextEn != null">{{ flavorTextEn }}</p>

                <!-- BASE STATS -->
                <div class="w-full bg-white mt-6 p-6 rounded-[16px]">
                    <h1 class="text-2xl font-bold text-pokeRed">Base Stats</h1>
                    <div class="mt-4 grid grid-cols-2 gap-2">
                        <p class="text-sm md:text-lg" v-for="stat in reactivePokeData.about.stats">
                            <span class="font-bold uppercase">{{stat.stat.name}} : </span>
                            {{ stat.base_stat }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="flex w-full flex-col bg-white p-6 rounded-[16px] mt-4 md:mt-10">
            <!-- VARIETIES -->
            <h1 class="text-2xl font-bold text-pokeRed">Form Varieties</h1>
            <div class="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3">
                <PokemonCard v-for="v in reactivePokeData?.varieties" :key="v.id"
                    :id="v.id"
                    :name="v.name"
                    :elements="v.types"
                    :sprite-url="v.sprites.other.home.front_default != null ? v.sprites.other.home.front_default : v.sprites.other['official-artwork'].front_default"
                />
            </div>

            <!-- EVOLUTION -->
            <h1 class="mt-5 text-2xl font-bold text-pokeRed">Evolution Line</h1>
            <div class="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3">
                <PokemonCard v-for="evol in reactivePokeData.evolution" 
                    v-if="reactivePokeData.evolution.length != 0"
                        :id="evol.id"
                        :name="evol.name"
                        :elements="evol.types"
                        :sprite-url="evol.sprites"
                />
            </div>

            <!-- ABILITIES -->
            <h1 class="mt-5 text-2xl font-bold text-pokeRed">Abilites</h1>
            <div class="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3">
                <div v-for="d in reactivePokeData?.ability" :key="d.id" class="border-2 p-4 rounded-[12px]">
                    <p class="text-lg font-bold">{{ d.name }}</p>
                    <p class="text-gray-600">{{ d.effect }}</p>
                    <p v-if="reactivePokeData.ability == null">
                        This pokemon doesn't have any abilitiy
                    </p>
                </div>
            </div>

            <!-- MOVES -->
            <h1 class="mt-5 text-2xl font-bold text-pokeRed">Moves</h1>
            <div class="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3">
                <!-- <SkillCard v-for="m in reactivePokeData.moves" :key="m.id"
                    :move-name="m.names[7].name"
                    :move-element="'bg-element-'+m.type.name"
                    :move-pow="m.power || '-'"
                    :move-acc="m.accuracy || '-'"
                    :move-pp="m.pp"
                /> -->
                <SkillCard v-for="m in reactivePokeData.moves" :key="m.id"
                    :move-detail="m"
                />
            </div>
        </div>    

    </div>
    
</template>

<script setup>
import axios from 'axios';
const props = defineProps(['id'])
// const id = 'charizard'

import PokemonCard from '@/components/PokemonCard.vue';
import data from '@/assets/wartortle.json'
import Badge from '@/components/small_comp/Badge.vue';
import { onBeforeMount,ref, onMounted, watch, nextTick, onUpdated } from 'vue';
import { bgColor, currentDataOpen, fetchEvolveLine, fetchPokemonAbility, fetchPokemonSpecies, fetchPokemonVarieties, flavorTextEn, openPokemonDetail, pokemonAbility, pokemonEvolveLine, pokemonSpecies, reactivePokeData } from '@/routes/fetch_api';
import SkillCard from '@/components/small_comp/SkillCard.vue';
import Accordion from '@/components/small_comp/Accordion.vue';
import Moves from './Moves.vue';

const flavor_text = ref('')
const isLoading = ref(false)

watch(reactivePokeData.varieties, ()=>{
    console.log("Varieties: "+reactivePokeData.varieties.length);
})

openPokemonDetail('https://pokeapi.co/api/v2/pokemon/'+props.id)
// .then(fetchVarieties())
// .finally(forceRender())
</script>