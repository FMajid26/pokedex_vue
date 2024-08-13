import { createApp } from 'vue'
import { createRouter, createMemoryHistory, useRouter, useRoute } from 'vue-router'
import App from './App.vue'
import './style.css'
import './assets/systems.css'
import Pokemons from './views/Pokemons.vue'
import PokeMoves from './views/Moves.vue'
import PokemonDetail from '@/views/PokemonDetail.vue'
import ModalsMove from './components/modals/ModalsMove.vue'
import Items from './views/Items.vue'

const routes = [
    {
        path: "/",
        name: 'home',
        component: Pokemons
    },
    {
        path: "/pokemon/:id",
        name: 'PokemonDetail',
        component: PokemonDetail,
        props: true
    },
    {
        path: "/moves",
        name: 'pokemoves',
        component: PokeMoves,
    },
    {
        path: "/items",
        name: 'pokeitems',
        component: Items,
    },
    
]

const router = createRouter({
    history: createMemoryHistory(),
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior() {
        return { top: 0, left: 0 }
      }
})

export default router
createApp(App).use(router).mount('#app')