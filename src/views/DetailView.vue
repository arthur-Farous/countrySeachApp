<script setup>

import { useCounterStore } from '../stores/counter';
import { useRoute,} from 'vue-router';
import { ref, onMounted } from 'vue';
import { computed } from 'vue';

const countryStore = useCounterStore();
const route = useRoute();


const countryData = ref(null);
onMounted(async () => {
  const countryName = route.params.name;
  countryData.value = await countryStore.getCountryByName(countryName);
  countryStore.loading = false;
});

const loading = computed(() => {
  return countryStore.loading;
});

</script>



    

<template>
  <div class="detail">
    <div class="button">
      <img src="../assets/call-made.svg" alt="">
      <button> <router-link to="/">Back</router-link> </button>
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
    <div class="data"   v-if="countryData">
      <img :src="countryData?.flags.png" alt="">
      <div class="single_countryData">
      <h1>{{ countryData?.name.common }}</h1>
      <div class="contents">
      <div class="first_Div">
      <p><strong> Native Name:</strong> {{ countryData?.name.native ? countryData.name.native.common : 'N/A' }}</p>
      <p><strong>Population:</strong> {{ countryData?.population }}</p>
      <p><strong>Region:</strong> {{ countryData?.region }}</p>
      <p><strong>Subregion:</strong> {{ countryData?.subregion }}</p>
      <p><strong>Capital: </strong>{{ countryData?.capital }}</p>
      </div>
      <div class="Second_Div">
        <p><strong>Top Level Domain:</strong>{{ countryData?.tld }}</p>
        <p><strong>Currencies:</strong>{{ countryData?.currencies }}</p>
        <div class="linquities">
        <p><strong>Languages:</strong></p>
        <ul>
          <li v-for="language in countryStore.countryData[0]?.languages" :key="language">{{language }}</li>
        </ul>
      </div>
      </div>
    </div>
      <div class="last_Div">
        <p><strong>Border countries:</strong></p>
        <ul>
          <li v-for="borderCountry in countryStore.countryData[0]?.borders" :key="borderCountry">{{ borderCountry }}</li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>



<style scoped>
.detail{padding: 80px 82px 124px 80px}

.button{
    border-radius:6px;
    background:#fff;
    box-shadow:0px 0px 7px 0px rgba(0,0,0,0.29);
    width:136px;
    height:40px;
    padding:10px 39px 10px 32px;
    display:flex;
    gap:10px;

}button{
  border:none;
  background: #fff;
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
  height: 30%;
}
.data{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 64px;
  gap: 24px;
}

.data img{
  /* max-width: 319.837px;
  width: 100%;
max-height: 275.924px;
 height: 100%; */
flex-shrink: 0;
padding-left: 28px;
padding-right: 28px;
}
.single_countryData{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
}
/* .single_countryData{
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 50px;
  margin-bottom: 32px;
} */

.single_countryData h2{
  color: #111517;
font-size: 22px;
font-style: normal;
font-weight: 800;
line-height: normal;
padding-bottom: 16px;
}

.first_Div{
  display: flex;
  flex-direction: column;
}
.first_Div p{
  color: #111517;
font-size: 14px;
font-style: normal;
font-weight: 300;
line-height: 32px;
}
.Second_Div{
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
  padding-right: 30px;
  padding-left: 5px;

}
.Second_Div p{
  color: #111517;
font-size: 14px;
font-style: normal;
font-weight: 300;
line-height: 32px;
text-align: left;
}
.linquities{
  display: flex;
  gap: 6px;
}

.linquities ul{
  display: flex;
  gap: 6px;
}
.linquities ul li{
  list-style: none;
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: 32px; 
}

.last_Div{
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.last_Div ul{
  display: flex;
  list-style: none;
  gap: 10px;
  flex-wrap: wrap;
}
.last_Div ul li{
  border-radius: 2px;
background: #FFF;
padding: 6px 30px;
box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.10);
}

@media(min-width: 1024px) {
  .data{
    display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 100px;
  }

  .data img{
    max-width: 559.715px;
    width: 100%;
max-height: 483.169px;
height: 100%;
  }
  .single_countryData{
    display: flex;
  justify-content: space-between;
  gap: 40px;
  }

  .single_countryData h2{
    font-size: 32px;
  }

  .contents{
    font-size: 14px;
  }
  .first_Div{
  flex-direction: column;
  padding: 0px;
}
.Second_Div{
  display: flex;
  flex-direction: column;
}

}
</style>     