import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useProductsStore = defineStore('productsStore', () => {
  const authToken = localStorage.getItem('authToken')

  const items = ref([])

  const fetchItems = async () => {
    try{
        const res = await axios.get(`http://95.142.94.22:8410/api/priceType`,{
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        console.log(res)
        items.value = res.data.result.data
    }catch (err) {
        console.log(err);
    }
  }

  return {
    items,
    fetchItems
  }
})
