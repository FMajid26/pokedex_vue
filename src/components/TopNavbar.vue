<template>
    <!-- NAVBAR CONTAINER -->
    <nav class="w-full flex flex-col md:flex-row fixed z-40 top-0 start-0 h-fit min-h-16 bg-white px-4 py-4 md:px-20 md:py-0 items-center border-b-[1px] border-[#E7E7E7] justify-between">
        <!-- LOGO & MENU -->
        <div class="flex flex-col gap-2 w-full md:flex-row items-center">
            <div class="flex flex-row justify-between w-full">
                <img src="../assets/logo/pokedex_logo.png" class="object-fill h-10 me-6" alt="pokedex-logo">          
                <!-- HAMBURGER MENU -->
                <div class="btn-icon navbar-sm-menu" @click="navbarMenusClicked">
                    <svg class="size-4 stroke-black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 7H21" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M3 12H21" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M3 17H21" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </div>
            </div>
            
            <ul class="navbar-menus w-full md:w-fit flex-col md:flex-row gap-2"
                :class="isNavbarHidden ? 'hidden' : 'flex'"
            >
                <!-- <li class="active" ><a href="#">Home</a></li> -->
                <RouterLink :to="{name: 'home'}" @click="navbarMenusClicked">
                    <li>
                        Pokemon
                    </li>
                </RouterLink>
                
                <RouterLink :to="{name: 'pokeitems'}" @click="navbarMenusClicked">
                    <li>
                        Items
                    </li>
                </RouterLink>
            </ul>
        </div>

        <!-- SEARCH FORM -->
        <!-- <div class="flex input-field items-center gap-x-2 navbar-search">
            <input placeholder="Search anything"/>
            <img src="../assets/icons/linear/search-normal.svg" class="h-4" alt="" srcset="">
        </div> -->
    </nav>
</template>

<script setup>
import Items from '@/views/Items.vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

let isNavbarHidden = ref(true)

function navbarMenusClicked(){
    isNavbarHidden.value = !isNavbarHidden.value
    console.log(isNavbarHidden.value);
    
}

</script>