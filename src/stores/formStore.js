import { defineStore } from 'pinia'
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import {useRouter} from 'vue-router'

import {useCreatedProductsStore} from '../stores/createdProducts'

export const useFormStore = defineStore('formStore', () => {
  const authToken = localStorage.getItem('authToken')

  const createdProducts = useCreatedProductsStore()
  const router = useRouter()

  const number = ref()
  const date = ref('')
  const organization = ref()
  const author = ref('')
  const comment = ref('')
  const basis = ref('')
  const currency = ref()
  const priceType = ref([])
  const goodGroup = ref([])
  const changeByPercent = ref()
  const changeBySum = ref()

  const organizations = ref([])
  const currencies = ref([])
  const priceTypes = ref([])
  const goodGroups = ref([])
  const tableItems = ref([])

  const setNumber = (value) => {number.value = value}
  const setDate = (value) => {date.value = value}
  const setOrganization = (value) => {organization.value = value}
  const setAuthor = (value) => {author.value = value}
  const setComment = (value) => {comment.value = value}
  const setBasis = (value) => { basis.value = value}
  const setCurrency = (value) => { currency.value = value}
  const setPriceType = (value) => { priceType.value = value}
  const setGoodGroup = (value) => { goodGroup.value = value}
  const setChangeByPercent = (value) => { changeByPercent.value = value}
  const setChangeBySum = (value) => { changeBySum.value = value}

  const resetTableSetupBtn = () => {
    currency.value = []
    priceType.value = []
    goodGroup.value = []
    changeByPercent.value = ''
    changeBySum.value = ''
  }
  
  const saveData = async () => {
    const data = {
      goodGroupIds: goodGroup.value,
      priceTypeIds: priceType.value,
      changeBySum: changeBySum.value,
      organization_id: organization.value,
      date: date.value,
    }

    try {
      const res = await axios.get('http://95.142.94.22:8410/api/good-group/get/good-prices', {
        params: data, 
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      // tableItems.value = []
      res.data.result.forEach(item => {
        tableItems.value.push(item)
      })
     await router.push('/settingGoods')

      console.log(tableItems.value)

      currency.value = []
      priceType.value = []
      goodGroup.value = []
      changeByPercent.value = ''
      changeBySum.value = ''

    } catch (err) {
      console.log(err)
      alert('Ошибка при Приминения')
    }
  }

  const sendData = async () => {
    try{
      const goods = tableItems.value.map(item => {
        const prices = item.prices ? [{
          price_type_id: item.prices.id,
          oldPrice: parseFloat(item.prices.old_price),
          newPrice: item.prices.newPrice
        }] : [];
  
        return {
          good_id: item.id,
          prices: prices
        };
      });


      const data = {
        date: '2024-06-26 12:12:12',
        organization_id: organization.value,
        start_date: '2024-06-26',
        comment: comment.value,
        basis: basis.value,
        goods: goods
      }

      const res = await axios.post('http://95.142.94.22:8410/api/price-set-up', data, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
      })

      console.log(res)
      console.log(res.data);
      await router.push('/home')

      createdProducts.fetchItems()
      // currency.value = []
      // priceType.value = []
      // goodGroup.value = []
      // changeByPercent.value = ''
      // changeBySum.value = ''

      // number.value = ''
      // organization.value = []
      // comment.value = ''
      // basis.value = ''
      // currency.value = []
      // priceType.value = []
      // goodGroup.value = []
      // changeByPercent.value = ''
      // changeBySum.value = ''

    } catch (err) {
      console.log(err)
      alert('Ошибка при Сохранения')
    }
  }

  const fetchOrganizations = async () => {
    try {
      const res = await axios.get('http://95.142.94.22:8410/api/organization', {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
      });

      organizations.value = res.data.result.data.map(org => ({ id: org.id, name: org.name }))
    } catch (err) {
      console.error(err);
    }
  }

  const fetchCurrencies = async () => {
    try {
      const res = await axios.get('http://95.142.94.22:8410/api/currency', {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
      });

      currencies.value = res.data.result.data.map(curr => ({ id: curr.id, name: curr.name }))
    } catch (err) {
      console.error(err);
    }
  }

  const fetchPriceTypes = async (currencyId) => {
    try {
      const res = await axios.get(`http://95.142.94.22:8410/api/currency/get-price-type/${currencyId}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
      });

      priceTypes.value = res.data.result.map(type => ({ id: type.id, name: type.name }))
    } catch (err) {
      console.error(err)
    }
  }

  const fetchGoodGroups = async () => {
    try {
      const res = await axios.get(`http://95.142.94.22:8410/api/good-group`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
      });

      goodGroups.value = res.data.result.data.map(type => ({ id: type.id, name: type.name }))
    } catch (err) {
      console.error(err)
    }
  }


  onMounted(async () => {
    await fetchOrganizations()
    await fetchCurrencies()
    await fetchGoodGroups()
  })
  
  // watch(() => currency.value, async (newValue) => {
  //   if (newValue) {
  //     await fetchPriceTypes(newValue)
  //   }
  // }, { immediate: true })


  return {
    number,
    date,
    organization,
    author,
    comment,
    basis,
    currency,
    priceType,
    goodGroup,
    changeByPercent,
    changeBySum,
    organizations,
    currencies,
    priceTypes,
    goodGroups,
    tableItems,
    setNumber,
    setDate,
    setOrganization,
    setAuthor,
    setComment,
    setBasis,
    setCurrency,
    setPriceType,
    setGoodGroup,
    setChangeByPercent,
    setChangeBySum,
    saveData,
    resetTableSetupBtn,
    fetchOrganizations,
    fetchCurrencies,
    sendData,

  }
})
