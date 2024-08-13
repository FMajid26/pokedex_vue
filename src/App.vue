<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import Test from './components/Test.vue'
import TopNavbar from './components/TopNavbar.vue';
import Pokemons from './views/Pokemons.vue';
import PokemonDetail from './views/PokemonDetail.vue';
import { RouterView } from 'vue-router';
import { onMounted, ref, nextTick } from 'vue';
import { bgColor } from './routes/fetch_api';
import ModalsMove from './components/modals/ModalsMove.vue';
import Items from './views/Items.vue';
import Loading from './components/Loading.vue';


</script>

<template>
  <header>
    <nav>
      <TopNavbar/>
    </nav>
  </header>
    
  <main>
    <body 
    :class="bgColor">
      <RouterView :key="$route.path"/>
    </body>
  </main>
</template>
