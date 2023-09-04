<script setup>
import { useCounterStore } from '../stores/counter';
import{onMounted, ref,watch} from 'vue'
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
 const inputText = ref('');
 const route = useRoute();
 const router = useRouter();
 const selectedContinent = ref('');
 const countryStore = useCounterStore()



 const customDebounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const handleInputDebounced = customDebounce((newValue) => {
  inputText.value = newValue;
}, 500); 

watch(inputText, handleInputDebounced);



 const filteredCountries = computed(() => {
  if (!countryStore.countries) {
    return [];
  }
  const searchTerm = inputText.value.toLowerCase();
  const selectedContinentValue = selectedContinent.value.toLowerCase();
  
  return countryStore.countries.map((countryDetails) => {
    const commonName = countryDetails.name.common.toLowerCase();
    const region = countryDetails.region.toLowerCase();

    const continentMatch = selectedContinentValue === '' || region === selectedContinentValue;
    const searchMatch = searchTerm === '' || commonName.includes(searchTerm);

    return { ...countryDetails, continentMatch, searchMatch };
  }).filter((country) => country.continentMatch && country.searchMatch);
});


// onMounted(async () => {
//   try {
//     await countryStore.$getCountries(inputText.value); // Call the function to fetch countries.
//   } catch (error) {
//     console.error(error);
//   }
// });

  // const countryDetails = countryStore.getCountries()
  
  const countryDetails = countryStore.getCountries(inputText.value);


  onMounted(async () => {
  try {
    await countryStore.getCountries(inputText.value); 
  } catch (error) {
    console.error(error);
  }
});
 

// Debounced input

// For the loader component.
const loading = computed(() => {
  return countryStore.loading && (inputText.value || selectedContinent.value);
  countryStore.loading = false;
});

// Navigating To the singlepage view
const navigateToCountryDetail = (countryName) => {
  router.push({ name: 'Detail', params: { name: countryName } });
};

//  countryStore.getCountryData(inputText.value);



</script>

<template>
  <section>
    <div class="outerDiv">
        <div class="search_box">
            <img src="../assets/search.svg" alt="">
            <input  class="custom-placeholder"  type="text"  placeholder="Search for a country..." v-model="inputText"/>
        </div>
        <div class="Selection">  
            <select v-model="selectedContinent" class="select_id">
                <option  value="">Filter By Region</option>
                <option value="Africa">Africa</option>
                <option value="Americas">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
        </div>
    </div>
    <div class="loadingComponent"   v-if="loading">
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
     
    <div class="class" v-if="filteredCountries.length">
      <div @click="navigateToCountryDetail(countryDetails.name.common)"
     v-for="countryDetails in filteredCountries" :key="countryDetails.name.common" class="card">
        <img :src="countryDetails.flags.svg"/>
       <div class="main_details"> 
        <h2>{{ countryDetails.name.common }}</h2>
        <div class="Info">
        <p>Population:{{ countryDetails.Population }}</p>
        <p>Region:{{ countryDetails.region }}</p>
        <p>capital:{{ countryDetails.capital }}</p>
      </div>
       </div>
      </div>
      </div>
  </section>
        
</template>


<style scoped>
.outerDiv{
  display: flex;
  flex-direction: column;
    padding: 24px 16px 40px 16px;
    gap: 40px;
}

input{
    border: none;
}
.search_box{
    display: flex;
    max-width: 343px;
    width: 100%;
max-height: 48px;
 height: 100%;
border-radius: 5px;
background: #FFF;
box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.05);
gap: 26px;
padding: 16px 0px 16px 32px;
justify-content: center;
margin: 0 auto;
}
.search_box img{
    max-width: 16px;
    width:100%;
max-height: 16px;
height:100%;
flex-shrink: 0;
}

.Selection{
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 200px;
  width: 100%;
max-height: 48px;
 height: 100%;
flex-shrink: 0;
  border-radius: 5px;
background: #FFF;
box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.05);

}

.Selection{
  padding: 14px 91px 14px 24px;
}

.select_id{
  color: #111517;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 166.667% */
border: none;
}
.custom-placeholder::placeholder{
    color: #C4C4C4;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 20px; 
}

.main_details h2{
  color: #111517;
font-size: 18px;
font-style: normal;
font-weight: 800;
line-height: 26px; /* 144.444% */
}
.main_details{
display: flex;
flex-direction: column;
justify-content: center;
align-content: center;
 gap: 16px;

 padding: 24px 91px 46px 24px;
}

.class img{
  max-width: 336px;
  width: 100%;
max-height: 160px;
 height: 100%;
flex-shrink: 0;
}
.class{
  display: flex;
  flex-direction: column;
  border-radius: 5px;
background: #FFF;
box-shadow: 0px 0px 7px 2px rgba(0, 0, 0, 0.03);
max-width: 264px;
width: 100%;
max-height: 336px;
height: 100%;
flex-shrink: 0;
gap: 40px;
margin: 0 auto;
}

.Info{
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.Info p{
  color: #111517;
font-size: 14px;
font-style: normal;
font-weight: 300;
line-height: 16px;
}


lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #000;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loadingComponent {

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 50%;
  padding: 50px;
}
@media(min-width: 1024px) {
    .outerDiv{
        padding: 48px 80px 48px 80px;
        display: flex;
       flex-direction: row;
       justify-content: space-between;
    }

    .Selection{
      border-radius: 5px;
background: #FFF;
box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.05);
    }
    .search_box{
    max-width: 480px;
    width: 100%;
      max-height: 56px;
      height: 100%;
      flex-shrink: 0;
       padding: 18px 270px 18px 32px;
       display: flex;
    }

    .custom-placeholder::placeholder{
        font-size: 14px;
    }

   .class{
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(4, 1fr);
    gap:65px;
    justify-content: center;
    align-self: center;
   } 
}
</style>