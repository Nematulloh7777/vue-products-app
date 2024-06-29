<template>
    <Header >
     <v-btn :prepend-icon="mdiArrowLeftThin" to="/home" color="red" class="mb-5 text-none" variant="outlined">Назад</v-btn>
      <h3 class="mb-5">Установка цен товаров</h3>
      <v-row>
        <v-col cols="2">
          <v-text-field label="Номер" v-model="number" variant="outlined" clearable />
        </v-col>
  
        <v-col cols="2">
          <v-text-field label="Дата изменения" v-model="date" variant="outlined" clearable />
        </v-col>
  
        <v-col cols="3">
          <v-select 
            :items="[{id:1, name: 'Dr. Armand Dibbert'}]" 
            v-model="organization" 
            label="Организация" 
            multiple 
            variant="outlined" 
            clearable 
            item-title="name" 
            item-value="id"
          />
        </v-col>
  
        <div class="mt-5">
          <v-btn :append-icon="mdiCog" to="/tableSetup" color="primary" class="mr-2 text-none" variant="outlined">Настройка</v-btn>
          <v-btn :append-icon="mdiContentSave" color="success  text-none" variant="outlined" @click="formStore.sendData" >Сохранить</v-btn>
        </div>
      </v-row>
  
      <TableProducts/>
  
      <div class="mt-5">
        <v-row>
          <v-col cols="2">
            <v-text-field label="Автор" v-model="author" variant="outlined" clearable />
          </v-col>
  
          <v-col cols="4">
            <v-text-field label="Комментарий"  v-model="comment" variant="outlined" clearable />
          </v-col>
  
          <v-col cols="4">
            <v-text-field label="Основание"  v-model="basis" variant="outlined" clearable />
          </v-col>
        </v-row>
      </div>
    </Header>
  
  </template>
  
  <script setup>
  import {onMounted, computed} from 'vue'
  import {useAuthStore} from '../stores/authStore'
  import {useFormStore} from '../stores/formStore'
  
  import {mdiArrowLeftThin, mdiCog, mdiContentSave} from '@mdi/js'
  import Header from '@/components/header.vue'
  import TableProducts from '../components/table-products.vue'
  
    const authStore = useAuthStore()
    const formStore = useFormStore()
  
    const author = computed({
      get: () => formStore.author,
      set: value => formStore.setAuthor(value)
    })
    const date = computed({
      get: () => formStore.date,
      set: value => formStore.setDate(value)
    })
    const number = computed({
      get: () => formStore.number,
      set: value => formStore.setNumber(value)
    })
    const organization = computed({
      get: () => formStore.organization,
      set: value => formStore.setOrganization(value)
    })
    const comment = computed({
      get: () => formStore.comment,
      set: value => formStore.setComment(value)
    })
    const basis = computed({
      get: () => formStore.basis,
      set: value => formStore.setBasis(value)
    })
  
    onMounted(async () => {
      date.value = '2024-06-27 12:12:38'
      number.value = 1
      comment.value = 'test'
      basis.value = 'test'
      organization.value = 1
      author.value = authStore.loginName
    })
  
  </script>
  
  