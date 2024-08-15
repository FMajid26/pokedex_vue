<template>
    <div class="flex h-[200px] my-10 relative items-center justify-between" ref="mainContent">
        <div class="z-10">
            <h1 class="text-5xl font-bold mb-1 text-pokeRed">Berries</h1>
            <!-- <p class="text-2xl text-gray-500">List of items including potion, berries, and HM/TM</p> -->
        </div>
        <img src="../assets/img/pokemon-section-img.png" class="h-full absolute right-0" alt="">
    </div>

    <div class="flex flex-col md:flex-row h-screen gap-y-1 gap-x-4">
        <div class="basis-3/12 h-fit gap-y-1 pr-4 flex flex-col pb-4 md:pb-0 border-b-2 md:border-r-2 md:border-b-0 border-gray-100">
            <SearchField
                :placeholder="'Search Items'"
                v-model="searchInput"
            />
        </div>

        <div class="w-full h-fit">
            <div ref="scrollHere">
                <h2 class="text-4xl font-bold mb-1">All Items</h2>
                <p class="text-l text-gray-500">{{ itemsAll.total }} total Item</p>
            </div>

            <div class="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 relative">
                <!-- ITEMS CARD -->
                 <ItemsCard
                    v-for="item in filteredItems.slice(currentData.from, currentData.to)" :key="item.id"
                    :items="item"
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
        v-if="isLoading"
    />

    <BackToTopButton/>
    
</template>

<script setup>
import { setBgColorToWhite } from '@/routes/fetch_api';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import SearchField from '@/components/small_comp/SearchField.vue';
import { fetchAllItems, itemsAll } from '@/routes/fetch_items';
import ItemsCard from '@/components/ItemsCard.vue';
import Pagination from '@/components/small_comp/Pagination.vue';
import Loading from '@/components/Loading.vue';
import BackToTopButton from '@/components/small_comp/BackToTopButton.vue';

let searchInput = ref('')
let isLoading = ref(false)
const currentData = reactive({
    perPage: 20,
    from: 0,
    to: 0,
    totalPage: 0
})
const currentPage = ref(1)
const sortOptions = [
    {id: 1, name: "ID (Low - High)", value:"(a,b) => a.id - b.id"},
    {id: 2, name: "Alphabet (High - Low)", value:"(a,b) => b.id - a.id"},
    {id: 3, name: "Alphabet (A - Z)", value:"(a,b) => a.name - b.name"},
    {id: 4, name: "Alphabet (Z - A)", value:"(a,b) => b.name - a.name"},
]


watch(currentPage, ()=>{
    // console.log("page : "+currentPage.value);
    sessionStorage.setItem('item-current-page', currentPage.value)

    currentData.to = currentPage.value * currentData.perPage
    currentData.from = currentData.to - currentData.perPage
});
async function nextPrevButton(act){
    if(act == 'next'){
        currentPage.value ++
    }else{
        currentPage.value --
    }

    sessionStorage.setItem('item-current-page', currentPage.value)
 
    checkPagination()
    scrollTo({top, behavior:'smooth'})
}

async function checkPagination(){
    if(sessionStorage.getItem('item-current-page') != null){
        currentPage.value = sessionStorage.getItem('item-current-page')
    }

    currentData.to = currentPage.value * currentData.perPage
    currentData.from = currentData.to - currentData.perPage
}

const filteredItems = computed(() =>{
    let searchValue = searchInput.value
    currentPage.value = 1
    if(!searchValue.length){
        return itemsAll.itemList
    }else{
        return itemsAll.itemList.filter(item =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        )
    }
})

watch(filteredItems, ()=>{
    currentData.totalPage = Math.ceil(filteredItems.value.length / currentData.perPage)
    // console.log("Total Page A: "+currentData.totalPage);
})

async function checkData(){
    if(itemsAll.itemList.length == 0){
        isLoading.value = true
        await fetchAllItems().finally(()=>{
            isLoading.value = false
            currentData.totalPage = Math.ceil(itemsAll.total / currentData.perPage)
        })
    }    
}

onMounted(()=>{
    setBgColorToWhite()
    checkData()
    checkPagination()
})

window.onbeforeunload = function(){
    sessionStorage.clear()
}
</script>
