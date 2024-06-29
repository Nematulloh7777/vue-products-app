<template>
    <Header>
        <h3 class="mb-5"> Настройка установка цен товаров</h3>
        <v-row>
            <v-col cols="3">
                <v-select v-model="currency" :items="formStore.currencies" label="Валюта" variant="outlined"  clearable item-title="name" item-value="id" />
            </v-col>

            <v-col cols="3">
                <v-select v-model="priceType" :items="[{id:1, name: 'General Pouros'},{id:2, name: 'Brennan Deckow'}, ]" label="Список видов цены" variant="outlined" multiple clearable item-title="name" item-value="id" />
            </v-col>

            <v-col cols="3">
                <v-select v-model="goodGroup" :items="formStore.goodGroups" label="Список групп товаров" variant="outlined" multiple clearable item-title="name" item-value="id" />
            </v-col>
        </v-row>
        
        <v-row>
            <v-col cols="3">
                <v-text-field v-model="changeByPercent" label="Изменить на X%" variant="outlined" clearable />
            </v-col>

            <v-col cols="3">
                <v-text-field v-model="changeBySum" label="Изменить на X cумму" variant="outlined" clearable />
            </v-col>
        </v-row>

        <div class="mt-5">
            <v-btn :prepend-icon="mdiArrowLeftThin" to="/settingGoods" color="red" class="mr-2 text-none" variant="outlined">Назад</v-btn>
            <v-btn :append-icon="mdiRefresh" color="red" class="mr-2 text-none" variant="outlined" @click="formStore.resetTableSetupBtn">Сбросить</v-btn>
            <v-btn :append-icon="mdiCheck" color="success  text-none" variant="outlined" @click="formStore.saveData" >Применить</v-btn>
        </div>
    </Header>
</template>

<script setup>
import Header from './header.vue'
import {ref, computed} from 'vue'
import { useFormStore } from '../stores/formStore'
import {mdiArrowLeftThin, mdiRefresh, mdiCheck} from '@mdi/js'

  const formStore = useFormStore()

  const currency = computed({
    get: () => formStore.currency,
    set: value => formStore.setCurrency(value)
  })
  const priceType = computed({
    get: () => formStore.priceType,
    set: value => formStore.setPriceType(value)
  })
  const goodGroup = computed({
    get: () => formStore.goodGroup,
    set: value => formStore.setGoodGroup(value)
  })
  const changeByPercent = computed({
    get: () => formStore.changeByPercent,
    set: value => formStore.setChangeByPercent(value)
  })
  const changeBySum = computed({
    get: () => formStore.changeBySum,
    set: value => formStore.setChangeBySum(value)
  })


</script>