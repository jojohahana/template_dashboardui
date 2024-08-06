<template>
    <div class="flex">
      <!-- Sidebar -->
      <div class="flex flex-col w-64 h-screen px-4 py-8 bg-white border-r">
        <h2 class="text-3xl font-semibold text-center text-blue-800">Admin</h2>
  
        <div class="flex flex-col justify-between mt-6">
          <aside>
            <ul>
              <li>
                <router-link to="/dashboard" class="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md">
                  <span class="mx-4 font-medium">Dashboard</span>
                </router-link>
              </li>
              <li>
                <router-link to="/team" class="flex items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-200 rounded-md">
                  <span class="mx-4 font-medium">Team</span>
                </router-link>
              </li>
              <li>
                <router-link to="/projects" class="flex items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-200 rounded-md">
                  <span class="mx-4 font-medium">Projects</span>
                </router-link>
              </li>
              <li>
                <router-link to="/calendar" class="flex items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-200 rounded-md">
                  <span class="mx-4 font-medium">Calendar</span>
                </router-link>
              </li>
            </ul>
          </aside>
        </div>
      </div>
  
      <!-- Content -->
      <div class="flex flex-col flex-1 h-screen overflow-y-auto">
        <header class="flex items-center justify-between w-full h-16 px-6 py-4 bg-white border-b">
          <h1 class="text-2xl font-semibold text-gray-800">Dashboard</h1>
        </header>
        <main class="flex-1 p-6 bg-gray-100">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SidebarAdmin',
  };
  </script>
  
  <style scoped>
  /* Add any specific styles for your sidebar here */
  </style>
  