<template>
  <Header>
    <div class="float-right mb-5">
      <v-btn width="160" class="text-none" :append-icon="mdiPlusCircle" color="success" variant="outlined" to="/settingGoods">Создать</v-btn>
    </div>
     <v-data-table 
      class="header elevation-3" 
      density="comfortable" 
      hover 
      :items="createdProducts.formattedItems"
      :loading="createdProducts.loading"
      items-per-page-text="Элементов на странице"
     ></v-data-table>
  </Header>

</template>

<script setup>
import {mdiPlusCircle} from '@mdi/js'

import Header from '../components/header.vue'

import {useCreatedProductsStore} from '../stores/createdProducts'

  const createdProducts = useCreatedProductsStore()

</script>

<style>
.header th {
  color: blue;
}
td,
th {
  border: 1px solid #dddddd;
}
</style>