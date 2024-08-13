import {ref, onMounted } from 'vue';
import axios from 'axios';

const filterPokemonType = ref ([])

async function fetchFilterOptions(){
    await axios.get("https://pokeapi.co/api/v2/type?limit=50").
    then((response)=>{
        let data = response.data
        data.results.forEach(function(d){
            let filterMap = {
                'name' : d.name,
                'url' : d.url
            }
            filterPokemonType.value.push(filterMap)
        });
        // console.log(data);
    })
}



export {
    filterPokemonType,
    fetchFilterOptions
 }