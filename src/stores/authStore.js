import {defineStore} from 'pinia'
import {shallowRef, ref} from 'vue'
import {useRouter} from 'vue-router'
import axios from 'axios'

export const useAuthStore = defineStore('authStore', () => {

    const userName = shallowRef('')
    const password = shallowRef('')
  
    const loginName = shallowRef()
    
    let authToken = ''
  
    const router = useRouter()
  
    const signUp = async () => {
      try {
          const res = await axios.post(`http://95.142.94.22:8410/api/login`, {
              login: userName.value,
              password: password.value
          })

          authToken = res.data.token
          loginName.value = res.data.user.login

          localStorage.setItem('authToken', authToken)
          await router.push('/home')
      } catch (err) {
          console.log(err)
          alert('Ошибка неверный логин или пароль')
      }
    }

  return {
    userName,
    password,
    loginName,
    authToken,
    signUp,
  }
})
