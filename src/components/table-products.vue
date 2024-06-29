<template>
  <div  v-if="!formStore.tableItems.length">
      <h3>Ещё нет таблицы !</h3>
  </div>

    <div else>
    <div v-if="formStore.tableItems.length">

        <div  style=" display: flex; justify-content: left;">
            <div style="height: 100%; width: 220px; border:1px solid black;">
            <div style="border:1px solid black; height: 69px; padding: 5px; font-weight: 700; display: flex; justify-content: center; align-items: center;">Товары</div>
            </div>

            <div v-for="item in formStore.tableItems" :key="item.prices.good_id" style="height: 100%; width: 18%; border:1px solid black;">
            <div style="border:1px solid black; padding: 5px;  text-align: center;">{{ item.name }}</div>

            <div style="display: flex; justify-content: space-around;">
                <div style="border:1px solid black; padding: 5px; display: flex; width: 100%; font-weight: 700;">Старая</div>
                <div style="border:1px solid black; padding: 5px; display: flex; width: 100%; font-weight: 700;">Новая</div>
                <div style="border:1px solid black; padding: 5px; display: flex; width: 30%; font-weight: 700;">+-</div>
            </div>
            </div>
        </div>

        <div style=" display: flex; justify-content: left; ">
            
            <div  style=" width: 220px; height: 100%;  border:1px solid black;">
            <div v-for="(item, i) in formStore.tableItems" :key="item.id" style=" border:1px solid black; display: flex; padding: 5px; "> 
                {{i + 1}}. {{ item.prices.name }}
            </div>
            </div>

            <div v-for="item in formStore.tableItems" :key="item.prices.good_id"  style="height: 100%; width: 18%; border:1px solid black;">

                <div v-for="item in formStore.tableItems" style="display: flex; justify-content: left;">
                    <div style="border:1px solid black; padding: 5px; display: flex; width: 100%;">{{ item.prices.oldPrice }}</div>
                    <div style="border:1px solid black; padding: 2px; display: flex; width: 100%;">
                        <input type="number" v-model="item.prices.newPrice" style="border: 1px solid black; padding-left: 10px; padding-right: 5px; margin-right: 5px; margin-left: 5px; border-radius: 5px; width: 100%;" />
                    </div>
                    <div style="border:1px solid black; padding: 5px; display: flex; width: 30%;">
                      <span :class="{'status_green': parseFloat(item.prices.oldPrice.replace('.', '')) > item.prices.newPrice, 'status_red': parseFloat(item.prices.oldPrice.replace('.', '')) < item.prices.newPrice}"></span>
                    </div>
            </div>

            </div>
        </div>

        <div style=" display: flex; justify-content: left; ">
            
            <div  style=" width: 220px; height: 10%;  border:1px solid black;">
            <div  style=" border:1px solid black; display: flex; padding: 5px; ">Итого: </div>
            </div>

            <div v-for="item in formStore.tableItems"  style="height: 100%; width: 18%; border:1px solid black;">

                <div  style="display: flex; justify-content: left;">
                    <div  style="border:1px solid black; padding: 5px; display: flex; width: 100%;">{{ totalItems  }}</div>
                    <div style="border:1px solid black; padding: 5px; display: flex; width: 100%;">{{ priceDifference   }}</div>
                    <div style="border:1px solid black; padding: 5px; display: flex; width: 30%;"></div>
            </div>

            </div>
        </div>
    </div>
  </div>

</template>


<script setup>
import {useFormStore} from '../stores/formStore'
import {computed} from 'vue'

    const formStore = useFormStore()

    const totalItems = computed(() => formStore.tableItems.length)

    const getPriceDifference = () => {
        const totalOldPrices = formStore.tableItems.reduce((total, item) => total + (parseFloat(item.prices.oldPrice.replace('.', '')) || 0), 0)
        const totalNewPrices = formStore.tableItems.reduce((total, item) => total + (item.prices.newPrice || 0), 0)
        return totalOldPrices - totalNewPrices
    }

    const priceDifference = computed(getPriceDifference)

</script>

<style>
.status_green {
  width: 20px;
  height: 20px;
  background-color: green;
  border-radius: 50%;
  display: inline-block;
}

.status_red {
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
  display: inline-block;
}
</style>