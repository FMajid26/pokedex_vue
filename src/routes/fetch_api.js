import { nextTick, reactive, ref } from "vue"
import axios from 'axios';
import { list } from "postcss";

const pokemonRawData = ref([])
const pokemonList = reactive({
    length: null,
    list: []
})
const pokemonTotal = ref(null)
const pokemonSpecies = ref()
const pokemonEvolveLine = ref()
const pokemonAbility = ref([])
const currentDataOpen = ref()
const bgColor = ref()
const flavorTextEn = ref('')
const reactivePokeData = reactive({
    about: [],
    ability: [],
    evolution: [],
    species: [],
    moves: [],
    varieties: []
})
const allPokemonData = reactive({
    allData: []
})

function getBgColor(){
    return bgColor
}

async function fetchAllPokemonDataV2() {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=2000')
    const data = response.data

    data.results.forEach(p => {
        fetchPokeDetailV2(p.url)
    })
    

    pokemonList.length = data.count
}

async function fetchPokeDetailV2(url) {
    const response = await axios.get(url)
    const data = response.data

    let clean_name = data.name.replace(/-/g, ' ')

    const pokemonMap = {
        'id': data.id,
        'name': clean_name,
        'types': data.types,
        'sprites': data.sprites.other.home.front_default != null ? data.sprites.other.home.front_default : data.sprites.other['official-artwork'].front_default,
    }
    
    pokemonList.list.push(pokemonMap)
    pokemonList.list.sort((a, b) => a.id - b.id)
}

async function fetchEvolveLine(url){
    reactivePokeData.evolution = []

    const response = await axios.get(url)
    const data = response.data

    let evolData = data.chain

    do{
        let evolveLength = evolData.evolves_to.length
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon/"+evolData.species.name)
        const data = response.data
        console.log("Evolve : "+evolData.species.name);
        let clean_name = data.name.replace(/-/g, ' ')
        const pokemonMap = {
            'id': data.id,
            'name': clean_name,
            'types': data.types,
            'sprites': data.sprites.other.home.front_default != null ? data.sprites.other.home.front_default : data.sprites.other['official-artwork'].front_default,
        }
        reactivePokeData.evolution.push(pokemonMap)
        
        if(evolveLength > 1){
            for(let i = 1; i < evolveLength; i++){
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon/"+evolData.evolves_to[i].species.name)
                const data2 = response.data
                let clean_name = data2.name.replace(/-/g, ' ')
                const pokemonMap2 = {
                    'id': data2.id,
                    'name': clean_name,
                    'types': data2.types,
                    'sprites': data2.sprites.other.home.front_default != null ? data2.sprites.other.home.front_default : data2.sprites.other['official-artwork'].front_default,
                }
                reactivePokeData.evolution.push(pokemonMap2)
            }
        }

        evolData = evolData.evolves_to[0]
    }while (evolData != undefined && evolData.hasOwnProperty('evolves_to'))
}

async function openPokemonDetail(url){
    reactivePokeData.about = []
    reactivePokeData.moves = []
    reactivePokeData.varieties = []
    reactivePokeData.species = []
    reactivePokeData.evolution = []
    
    const response = await axios.get(url)
    reactivePokeData.about = response.data
    reactivePokeData.about.name = response.data.name.replace(/-/g, ' ')

    reactivePokeData.ability = []
    response.data.abilities.forEach( d => {
        fetchPokemonAbility(d.ability.url)
    })

    fetchPokemonSpecies(response.data.species.url)

    response.data.moves.forEach( m =>{
        fetchPokemonMoves(m.move.url)
    })
    

    // bgColor.value = "bg-gradient-to-r from-element-"+reactivePokeData.about.types[0].type.name+"/70 to-element-"+reactivePokeData.about.types[0].type.name;
    setBgColorToWhite("bg-gradient-to-r from-element-"+reactivePokeData.about.types[0].type.name+"/70 to-element-"+reactivePokeData.about.types[0].type.name)
    // console.log("bgColor: "+bgColor.value);
    
}

async function setBgColorToWhite(color){
    if (color == null) {
        bgColor.value = "bg-white body-wrapper pt-20 pb-20"
    }else{
        bgColor.value = color+" body-wrapper pt-20 pb-20"
    }
    
}

async function fetchPokemonSpecies(url){
    flavorTextEn.value = '-'
    const response = await axios.get(url)
    reactivePokeData.species = response.data

    let flavor_text = 'flavor_text'

    for(let flv of response.data.flavor_text_entries){
        if(flv.language.name == 'en'){
            flavor_text = flv.flavor_text
            break
        }
    }
    
    let fixedText = flavor_text.replace(/[\u{0080}-\u{FFFF}]/gu," ");
    // let fixedText = JSON.stringify(flavor_text)
    // fixedText = fixedText.replace(/[\r\n]+/gm, " ")
    // console.log("flavorText : "+fixedText);
    flavorTextEn.value = flavor_text

    fetchEvolveLine(response.data.evolution_chain.url)
    response.data.varieties.forEach(v =>{
        fetchPokemonVarieties(v.pokemon.url)
    })
}

async function fetchPokemonMoves(url){
    let name_en = '-'
    const response = await axios.get(url)

    let respData =  response.data
    for(let mv of response.data.names){
        if(mv.language.name == 'en'){
            respData.name_en = mv.name
            break
        }
    }
    // console.log(respData);
 
    reactivePokeData.moves.push(respData)
}

async function fetchPokemonVarieties(url){
    const response = await axios.get(url)
    reactivePokeData.varieties.push(response.data)
    reactivePokeData.varieties.sort((a,b) => a.id - b.id)
}

async function fetchPokemonAbility(url){
    axios.get(url)
    .then((response) =>{
        const data = response.data
        const AbilityMap= {
            'name': data.names[7].name,
            'effect': data.effect_entries[1].short_effect
        }
        reactivePokeData.ability.push(AbilityMap)
    })
}

export { 
    pokemonRawData, pokemonList, pokemonTotal, pokemonSpecies, pokemonEvolveLine, currentDataOpen, pokemonAbility, reactivePokeData, bgColor, flavorTextEn, allPokemonData,
    fetchPokemonVarieties,getBgColor, setBgColorToWhite, fetchPokemonSpecies, fetchEvolveLine, fetchPokemonAbility, openPokemonDetail, fetchAllPokemonDataV2, fetchPokeDetailV2 }