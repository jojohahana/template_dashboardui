<template>
  <div>
    <header v-if="showNavbar" :style="{ backgroundColor: '#7fc1d4' }" class="sticky top-0 z-50"> 
      <nav class="flex items-center justify-between p-6 mx-auto max-w-7xl lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <router-link to="/" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img 
              class="w-auto max-w-full transition-all duration-300" 
              :class="logoSize" 
              src="../public/Oji-logo -tagline.png" 
              alt="Company Logo" 
            />
          </router-link>
        </div>
        
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        <PopoverGroup class="hidden lg:flex lg:gap-x-12">
          <router-link to="/" class="nav-link" :class="textSize">Home</router-link>
          <router-link to="/area" class="nav-link" :class="textSize">Energy Area</router-link>
        </PopoverGroup>
      </nav>
    </header>

    <router-view />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { Bars3Icon } from '@heroicons/vue/24/outline'

// State
const mobileMenuOpen = ref(false)
const route = useRoute()
const screenWidth = ref(window.innerWidth)

// Update screen width on resize
const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth
}

// Listen for screen resize
onMounted(() => {
  window.addEventListener('resize', updateScreenWidth)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth)
})

// Show navbar except on login page
const showNavbar = computed(() => route.path !== '/login')

// Dynamically adjust logo size
const logoSize = computed(() => {
  // if (screenWidth.value >= 1536) return "h-30" // Large Projector
  if (screenWidth.value >= 1280) return "h-20" // 32" Monitor
  if (screenWidth.value >= 1024) return "h-15" // Standard Monitor
  return "h-12" // Default (14" Laptop)
})

// Dynamically adjust text size
const textSize = computed(() => {
  // if (screenWidth.value >= 1536) return "text-2xl" // Large Projector
  if (screenWidth.value >= 1280) return "text-xl" // 32" Monitor
  if (screenWidth.value >= 1024) return "text-lg" // Standard Monitor
  return "text-lg" // Default (14" Laptop)
})
</script>

<style scoped>
.nav-link {
  @apply font-semibold leading-6 text-gray-900 rounded-lg transition duration-300 ease-in-out;
}
.nav-link:hover {
  @apply text-white font-bold;
}
</style>
