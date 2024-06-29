import { defineStore } from 'pinia'
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'

export const useCreatedProductsStore = defineStore('createdProducts', () => {
  const authToken = localStorage.getItem('authToken')

  const items = ref([])
  const loading = ref(false)

  const fetchItems = async () => {
    try{
        loading.value= true 
        const res = await axios.get(`http://95.142.94.22:8410/api/price-set-up`,{
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        console.log(res)
        items.value = res.data.result.data
        loading.value= false 
        console.log(items.value);
    }catch (err) {
        console.log(err);
    }
  }

  const formattedItems = computed(() => {
    return items.value.map((item, i)=> ({
      Номер: i+1,
      Дата: item.start_date,
      Организация: item.organization.name,
      Автор: item.author.name
    }))
  })

  onMounted(async () => {
    await fetchItems()
  })

  return {
    items,
    formattedItems,
    loading,
    fetchItems
  }
})
