<template>
  <div>
    <header v-if="showNavbar" :style="{ backgroundColor: '#7fc1d4' }" class="sticky top-0 z-50"> 
      <nav class="flex items-center justify-between p-6 mx-auto max-w-7xl lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <router-link to="/" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="w-auto h-12" src="../public/Oji-logo -tagline.png" alt="" />
          </router-link>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <PopoverGroup class="hidden lg:flex lg:gap-x-12">
          <router-link to="/" class="font-semibold leading-6 text-gray-900 text-md nav-link">Home</router-link>
          <router-link to="/area" class="font-semibold leading-6 text-gray-900 text-md nav-link">Energy Area</router-link>
          <!-- <router-link to="/widget" class="text-sm font-semibold leading-6 text-gray-900 nav-link">Widget</router-link>
          <router-link to="/charts" class="text-sm font-semibold leading-6 text-gray-900 nav-link">Charts</router-link> -->
          <!-- Start Multiple Navbar Child Menu Desktop View -->
          <!-- ==Production Button Dropdown Menu==  -->
          <!-- <Popover class="relative">
            <PopoverButton class="flex items-center text-sm font-semibold leading-6 text-gray-900 gap-x-1 hover:text-white">
              Product
              <ChevronDownIcon class="flex-none w-5 h-5 text-gray-900" aria-hidden="true" />
            </PopoverButton>
            <transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-y-1 opacity-0" enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in" leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-1 opacity-0">
              <PopoverPanel class="absolute z-10 w-screen max-w-md mt-3 overflow-hidden bg-white shadow-lg -left-8 top-full rounded-3xl ring-1 ring-gray-900/5">
                <div class="p-4">
                  <div v-for="item in products" :key="item.name" class="relative flex items-center p-4 text-sm leading-6 rounded-lg group gap-x-6 hover:bg-gray-50">
                    <div class="flex items-center justify-center flex-none rounded-lg h-11 w-11 bg-gray-50 group-hover:bg-white">
                      <component :is="item.icon" class="w-6 h-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                    </div>
                    <div class="flex-auto">
                      <router-link :to="item.href" class="block font-semibold text-gray-900">
                        {{ item.name }}
                        <span class="absolute inset-0" />
                      </router-link>
                      <p class="mt-1 text-gray-600">{{ item.description }}</p>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  <router-link v-for="item in callsToAction" :key="item.name" :to="item.href" class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                    <component :is="item.icon" class="flex-none w-5 h-5 text-gray-400" aria-hidden="true" />
                    {{ item.name }}
                  </router-link>
                </div>
              </PopoverPanel>
            </transition>
          </Popover> -->
          <!-- End Multiple Navbar Child Menu Desktop View -->
        </PopoverGroup>

        <!-- <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <router-link to="/login" class="text-sm font-semibold leading-6 text-gray-900 nav-link">Log Out <span aria-hidden="true">&rarr;</span></router-link>
        </div> -->
      </nav>
      <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-10" />
        <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10" :style="{backgroundColor: '#7fc1d4'}">
          <div class="flex items-center justify-between">
            <router-link to="/" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="w-auto h-8" src="../public/ojilogo-removebg-preview.png" alt="" />
            </router-link>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div class="flow-root mt-6">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="py-6 space-y-2">
                <!-- Start Sub Navbar Mobile View  -->
                <Disclosure as="div" class="-mx-3" v-slot="{ open }">
                  <DisclosureButton class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Product
                    <ChevronDownIcon :class="[open ? 'rotate-180' : '', 'h-5 w-5 flex-none']" aria-hidden="true" />
                  </DisclosureButton>
                  <DisclosurePanel class="mt-2 space-y-2">
                    <DisclosureButton v-for="item in [...products, ...callsToAction]" :key="item.name" as="router-link" :to="item.href" class="block py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50">{{ item.name }}</DisclosureButton>
                  </DisclosurePanel>
                </Disclosure>
                <!-- End Sub Navbar Mobile View  -->
                <router-link to="/" class="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50">Home</router-link>
                <router-link to="/widget" class="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50">Energy Area</router-link>
                <router-link to="/widget" class="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50">Widget</router-link>
                <router-link to="/company" class="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50">Charts</router-link>
              </div>
              <!-- <div class="py-6">
                <router-link to="/login" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log Out</router-link>
              </div> -->
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
    <router-view />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  Dialog,
  DialogPanel,
  // !! Disclosure for Colapse Navbar Mobile View !!
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  // Popover,
  // !! PopoverButton for Colapse Navbar Desktop View !! 
  // PopoverButton,
  // PopoverGroup,
  // PopoverPanel,
} from '@headlessui/vue'
import {
  // ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  // SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
// Kalo aktifin Navbar Multiple Menu mdiDesktopClassic, jangan lupa import 'ChevronDownIcon,' di bawah ini 
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/vue/20/solid'

const products = [
  { name: 'Syringe', description: 'Get a better understanding of your traffic', href: '/analytics', icon: ChartPieIcon },
  { name: 'Blood Bag', description: 'Speak directly to your customers', href: '/engagement', icon: CursorArrowRaysIcon },
  { name: 'Urine Bag', description: 'Your customers’ data will be safe and secure', href: '/security', icon: FingerPrintIcon },
  // { name: 'Integrations', description: 'Connect with third-party tools', href: '/integrations', icon: SquaresPlusIcon },
  // { name: 'Automations', description: 'Build strategic funnels that will convert', href: '/automations', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '/watch-demo', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '/contact-sales', icon: PhoneIcon },
]

const mobileMenuOpen = ref(false)
const route = useRoute()

const showNavbar = computed(() => {
  return route.path !== '/login'
})
</script>

<style scoped>
  .nav-link {
    @apply text-sm font-semibold leading-6 text-gray-900 rounded-xl transition duration-300 ease-in-out;
  }

  .nav-link:hover {
    @apply text-white font-bold;
  }
</style>
