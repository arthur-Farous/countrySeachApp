import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCounterStore = defineStore('counter', () => {
  const loading = ref(false);
  const countries = ref ([])

  async function getCountryData(name){
    console.log("Searching...");
  loading.value = true;
    try{
      const feedback = await axios(
        `https://restcountries.com/v3.1/all${name}`
      );
      countries.value = feedback.data;
      loading.value = false;
    }
      catch(error){
      console.log(error)
      }
  }

  return { countries, getCountryData };
});

