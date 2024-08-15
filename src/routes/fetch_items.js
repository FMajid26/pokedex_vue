import axios from "axios";

import { reactive } from "vue";


let itemsAll = reactive({
    itemList: [],
    total: 0,
    totalPage: 0
})
let berriesAll = reactive({
    berryList: [],
})

async function fetchAllItems() {
    itemsAll.itemList = []
    const response = await axios.get("https://pokeapi.co/api/v2/item?limit=5000")
    const data = response.data
    itemsAll.total = data.count

    fetchAllBerries()

    data.results.forEach(res => {
        fetchItemDetail(res.url)
    });
}

async function fetchAllBerries(){
    berriesAll.berryList = []
    const response = await axios.get("https://pokeapi.co/api/v2/berry?limit=1000")
    const data = response.data
    berriesAll.total = data.count
}

async function fetchItemDetail(url) {
    await axios.get(url)
    .then((response)=>{
        const data = response.data
       
        const itemMap = {
            id: data.id,
            name: '-',
            category: data.category != undefined ? data.category.name.replace(/-/g, ' ') : '-',
            effect: '-',
            sprites: data.sprites.default != undefined ? data.sprites.default : null
        }

        if(data.names.length){
            data.names.forEach(n => {
                if(n.language.name == "en"){
                    itemMap.name = n.name
                }
            });
        }else{
            itemMap.name = data.name.replace(/-/g, ' ')
        }
        
        data.effect_entries.forEach(e => {
            if(e.language.name == "en"){
                itemMap.effect = e.short_effect
            }
        })
    
        itemsAll.itemList.push(itemMap)
        itemsAll.itemList.sort((a,b) => a.id - b.id)
    })
}

async function fetchBerryDetail(url) {
    
    await axios.get(url)
    .then((response)=>{
        const data = response.data
       
        const itemMap = {
            id: data.id,
            name: '-',
            category: data.category != undefined ? data.category.name.replace(/-/g, ' ') : '-',
            effect: '-',
            sprites: data.sprites.default != undefined ? data.sprites.default : null
        }

        if(data.names.length){
            data.names.forEach(n => {
                if(n.language.name == "en"){
                    itemMap.name = n.name
                }
            });
        }else{
            itemMap.name = data.name.replace(/-/g, ' ')
        }
        
        data.effect_entries.forEach(e => {
            if(e.language.name == "en"){
                itemMap.effect = e.short_effect
            }
        })
    
        itemsAll.itemList.push(itemMap)
        itemsAll.itemList.sort((a,b) => a.id - b.id)
    })
}

export{
    // Variable
    itemsAll,

    // Function
    fetchAllItems,
}