<template>
    <div class="flex h-[200px] my-10 relative items-center justify-between" ref="mainContent">
        <div class="z-10">
            <h1 class="text-5xl font-bold mb-1 text-pokeRed">Pokemon</h1>
            <p class="text-2xl text-gray-500">List of pokemons</p>
        </div>
        <img src="../assets/img/pokemon-section-img.png" class="h-full absolute right-0" alt="">
    </div>
    
    <!-- BODY WRAPPER -->
    <div class="flex flex-col md:flex-row h-screen gap-y-1 gap-x-4">
        <!-- FILTER -->
        <div class="basis-3/12 h-fit gap-y-1 pr-4 flex flex-col pb-4 md:pb-0 border-b-2 md:border-r-2 md:border-b-0 border-gray-100">
            <SearchField
                v-model="searchInput"
                :placeholder="'Search Pokemon'"
            />

            <!-- SORT & FILTER -->
            <div class="w-full flex flex-row mt-2 gap-3">
                <button class="flex w-full flex-row sm:hidden items-center justify-center gap-2 input-field" type="button"
                    @click="filterOptionsClicked"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.40002 2.09998H18.6C19.7 2.09998 20.6 2.99998 20.6 4.09998V6.29998C20.6 7.09998 20.1 8.09998 19.6 8.59998L15.3 12.4C14.7 12.9 14.3 13.9 14.3 14.7V19C14.3 19.6 13.9 20.4 13.4 20.7L12 21.6C10.7 22.4 8.90002 21.5 8.90002 19.9V14.6C8.90002 13.9 8.50002 13 8.10002 12.5L4.30002 8.49998C3.80002 7.99998 3.40002 7.09998 3.40002 6.49998V4.19998C3.40002 2.99998 4.30002 2.09998 5.40002 2.09998Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.93 2.09998L6 9.99998" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Filter
                </button>
              
            </div>

            <div
                class="filter-options mt-2 pt-2 border-t-2 border-gray-0 md:block md:!block"
                :class="isFilterShown? 'block' : 'hidden'"
            >
                <p class="mb-2 font-bold text-xl text-pokeRed">Filter</p>
                <p class="mb-2 font-bold">Types</p>
                <div class="grid grid-cols-2 gap-2">
                    <Checkbox v-for="item in filterPokemonType" 
                        :option="item.name"
                        v-model="filterSelected"
                    />
                </div>
                <div 
                    class="mt-2 flex w-full text-center h-10 justify-center cursor-pointer sm:hidden"
                    @click="filterOptionsClicked"
                >
                    Close Filter
                </div>
            </div>

            
        </div>

        <!-- RIGHT SECTION -->
        <div class="w-full h-fit">
            <div ref="scrollHere">
                <h2 class="text-4xl font-bold mb-1">All Pokemon</h2>
                <p class="text-l text-gray-500">{{ pokeApi.pokemonList.length }} total Pokemon</p>
            </div>

            <!-- ITEMS LIST -->
            <div class="w-full h-fit grid grid-cols-2 md:grid-cols-4 gap-4">
                <PokemonCard v-for="item in filteredPokemon.slice(currentData.from, currentData.to)" :key="item.id"
                    :id="item.id"
                    :name="item.name"
                    :elements="item.types"
                    :sprite-url="item.sprites"
                />
            </div>

            <!-- PAGINATION-->
            <Pagination
                @nextpage = "nextPrevButton('next')"
                @prevpage = "nextPrevButton('prev')"
                :current-page="currentPage"
                :total-page="currentData.totalPage"
            />
            
        </div>
        
    </div>
    
    <Loading
    v-show="isLoading"
    />
    
    <BackToTopButton/>
    <!-- <button @click="backToTop" class="btn p-0 h-14 justify-center fixed bottom-10 right-10 flex-col aspect-square z-40">
        <img src="../assets/icons/linear/arrow-up.svg" class="size-6 !stroke-white fill-white aspect-square"/>
    </button> -->
    
    
</template>

<script setup>
import PokemonCard from '@/components/PokemonCard.vue';
import Checkbox from '@/components/small_comp/Checkbox.vue';
import {ref, onMounted, watch, onBeforeUnmount, defineAsyncComponent, reactive, computed, onBeforeMount } from 'vue';
import axios from 'axios';
import '@/routes/filter_api.js'
import { fetchFilterOptions, filterPokemonType } from '@/routes/filter_api.js';
import * as pokeApi from '@/routes/fetch_api';
import Pagination from '@/components/small_comp/Pagination.vue';
import Loading from '@/components/Loading.vue';
import SearchField from '@/components/small_comp/SearchField.vue';
import BackToTopButton from '@/components/small_comp/BackToTopButton.vue';

let searchInput = ref("")
let filterSelected = ref([])
let isLoading = ref(false)
const currentPage = ref(1)
const currentData = reactive({
    perPage: 20,
    from: 0,
    to: 0,
    totalPage: 0
})

let isFilterShown = ref(false)

function filterOptionsClicked(){
    isFilterShown.value = !isFilterShown.value
    backToTop()
}

const filteredPokemon = computed(()=>{
    let searchValue = searchInput.value
    currentPage.value = 1
    if(searchValue.length){
        if(filterSelected.value.length){
            return pokeApi.pokemonList.list.filter( poke => 
                poke.types.filter(ty => 
                    poke.name.includes(searchValue.toLowerCase())
                    && filterSelected.value.includes(ty.type.name)
                ).length>0
            )
        }else{
            return pokeApi.pokemonList.list.filter( poke => 
                poke.name.includes(searchValue.toLowerCase())
            )
        }
    }else{
        if(filterSelected.value.length){
            return pokeApi.pokemonList.list.filter( poke => 
                poke.types.filter(ty => 
                    filterSelected.value.includes(ty.type.name)
                ).length>0
            )
        }
        else{
            return pokeApi.pokemonList.list
        }
    }
})

watch(filteredPokemon, ()=>{
    currentData.totalPage = Math.ceil(filteredPokemon.value.length / currentData.perPage)
    // filteredPokemon.value.sort((a,b) => b.id - a.id)
})

watch(filterSelected, (newFilter, oldFilter) => {
    sessionStorage.setItem('filter-selected', JSON.stringify(filterSelected.value))
    console.log("New Filter : "+newFilter.length);
    let storageFilter = JSON.parse(sessionStorage.getItem('filter-selected'))
    console.log("Filter on Storage : "+storageFilter.length);
    console.log("Old Filter : "+oldFilter.length);

    // if(newFilter.length != storageFilter.length){
    //     sessionStorage.setItem('poke-current-page', 1)
    // }else{
    if((newFilter.length != oldFilter.length) && pokeApi.reactivePokeData.about.length != null){
        sessionStorage.setItem('poke-current-page', 1)
    }
    pokeApi.reactivePokeData.about = []
    // }
    checkPagination()
    
    // currentData.to = currentPage.value * currentData.perPage
    // currentData.from = currentData.to - currentData.perPage
})

watch(currentPage, ()=>{
    checkPagination()
    console.log("page : "+currentPage.value);
    // sessionStorage.setItem('poke-current-page', currentPage.value)

    // currentData.to = currentPage.value * currentData.perPage
    // currentData.from = currentData.to - currentData.perPage
});

watch(searchInput, ()=>{
    sessionStorage.setItem('search-input', searchInput.value)
})

async function nextPrevButton(act){
    if(act == 'next'){
        currentPage.value ++
    }else{
        currentPage.value --
    }

    sessionStorage.setItem('poke-current-page', currentPage.value)
    
    checkPagination()
    scrollTo({top, behavior:'smooth'})
}

async function checkData(){
    if(filterPokemonType.value.length == 0){
        await fetchFilterOptions()
    }

    if(pokeApi.pokemonList.list.length == 0){
        isLoading.value = true
        await pokeApi.fetchAllPokemonDataV2().finally(()=>{
            isLoading.value = false
            currentData.totalPage = Math.ceil(pokeApi.pokemonList.list.length.total / currentData.perPage)
        }
        )
    }

    // console.log("Total Page : "+currentData.totalPage);
}

async function checkPagination(){
    if(sessionStorage.getItem('poke-current-page') != null){
        currentPage.value = sessionStorage.getItem('poke-current-page')
    }

    currentData.to = currentPage.value * currentData.perPage
    currentData.from = currentData.to - currentData.perPage
}

async function checkFilter() {
    if(sessionStorage.getItem('filter-selected') != null){
        filterSelected.value = JSON.parse(sessionStorage.getItem('filter-selected'))
    }

    if(sessionStorage.getItem('search-input') != null){
        searchInput.value = sessionStorage.getItem('search-input')
    }
}

function backToTop(){
    scrollTo({top, behavior:'smooth'})
}

onMounted(()=>{
    pokeApi.setBgColorToWhite()
    checkData()
    checkFilter()
    checkPagination()
})

window.onbeforeunload = function(){
    sessionStorage.clear()
}
</script>