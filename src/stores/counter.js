import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCounterStore = defineStore('counter', () => {
  const loading = ref(false);
  const countries = ref ([])

  async function getCountries(name) {
    loading.value = true;
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/all/${name}`)
      countries.value = response.data
    } catch (error) {
      console.error(error)
    }
  }

  async function getCountryByName(name) {
    console.log("Searching...");
    loading.value = true;
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`)
      return response.data[0]
    } catch (error) {
      console.error(error)
      


    

    }



  return {  loading,
    countries: computed(() => countries.value),
    getCountries,
    getCountryByName,
   };
}
  
})
