<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast'
import AppHeader from '../src/components/AppHeader.vue'

const headerConfig = {
  headertext: 'GOLDING / Alexander von Truchseß',
}

const headerValues = {
  navButtons: [
    /* would implement but not now
    {
      buttonText: 'User List',
      buttonLink: '/userList',
      isExternal: false,
    },
    {
      buttonText: 'Logout',
      buttonLink: '/form',
      isExternal: false,
    },
    */
    {
      buttonText: 'Login / Register',
      buttonLink: '/form',
      isExternal: false,
    },
    {
      buttonText: 'About',
      buttonLink: '/about',
      isExternal: false,
    },
  ],
  actions: {
    search: {
      placeholder: 'Search...', // Placeholder for the search bar
      onSearch: () => console.log('Search triggered'), // Function for search action
    },
    customAction: {
      text: 'Search',
      onClick: () => alert('Custom action triggered'), // Example custom action
    },
  },
}
</script>

<template>
  <!-- Global Toast Popup for error and success messages-->
  <Toast />

  <AppHeader :config="headerConfig" :values="headerValues" />

  <div style="margin-top: 10px">
    <RouterView />
  </div>
</template>
