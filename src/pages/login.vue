<template>
    <v-row justify="center" class="pt-16" >
      <v-col cols="10" md="3">
        <v-form id="loginForm" ref="loginForm" name="loginForm" lazy-validation>
          <h2 class="text-center mb-5" >Войти</h2>
          <v-text-field
            id="username"
            v-model="authStore.userName"
            name="username"
            :rules="[(v) => !!v || 'Обязательный']"
            validate-on-blur
            label="Имя пользователя"
            variant="outlined"
            clearable
          />
          <v-text-field
            id="password"
            v-model="authStore.password"
            name="password"
            :rules="[(v) => !!v || 'Обязательный']"
            validate-on-blur
            :type="showPassword ? 'text' : 'password'"
            label="Пароль"
            variant="outlined"
            clearable
          >
            <template #append-inner>
              <v-icon
                tabindex="-1"
                aria-label="show hide password"
                :icon="showPassword ? mdiEye : mdiEyeOff"
                @click="showPassword = !showPassword"
              />
            </template>
          </v-text-field>
          <div class="d-flex justify-center">
            <v-btn color="success" width="250" @click="authStore.signUp" size="large">
                <v-icon start :icon="mdiAccountCheck" />
                Войти
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>

  </template>
  
  <script setup lang="ts">
  import {mdiAccountCheck, mdiEye, mdiEyeOff} from '@mdi/js'
  import {useAuthStore} from '../stores/authStore'
  import {ref, shallowRef} from 'vue'

  const authStore = useAuthStore() 

  const showPassword = shallowRef(false)
  const loginForm = ref(false)

  </script>
  