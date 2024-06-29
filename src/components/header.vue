<template>
    <v-app id="inspire">
      <v-app-bar class="hidden-xs-only">
        <v-app-bar-title class="name_App">
            <div class="d-flex">
                <img src="/public/img/logo.png" alt="logo">
                <div>
                    <span  class="ml-3"> Vue | Products App</span>
                </div>
            </div>
        </v-app-bar-title>
        <v-toolbar-items>
          <v-btn class="text-none" to="/home">
            <v-icon :icon="mdiHomeOutline" class="mr-2" size="x-large" />
            Главная
          </v-btn>
        </v-toolbar-items>
        <v-spacer />
  
        <v-toolbar-items class="mr-5">
        <v-menu offset-y>
          <template #activator="{props}">
            <v-btn id="menu" :append-icon="mdiMenuDown" :prepend-icon="mdiAccount" v-bind="props">
             {{  authStore.loginName }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/" @click="logout">
              <v-icon start>{{ mdiLogoutVariant }}</v-icon>
              Выход
            </v-list-item>
          </v-list>
        </v-menu>
        
        </v-toolbar-items>
      </v-app-bar>
      <v-main>
        <div class="ma-5">
        <slot />
        </div>
      </v-main>
    </v-app>
  
  </template>
  
  <script setup>
  import {mdiAccount, mdiHomeOutline, mdiMenuDown, mdiLogoutVariant} from '@mdi/js'
  import {ref} from 'vue' 
  import {useAuthStore} from '../stores/authStore'

  const authStore = useAuthStore() 

  function logout() {
    localStorage.removeItem('authToken');
  }

  </script>


<style scoped>
.name_App {
  max-width: 250px;
}
@media screen and (max-width: 768px) {
  .side-menu {
    display: none;
  }
}
</style>