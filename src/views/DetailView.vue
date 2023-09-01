<script setup>
import { computed, onUnmounted } from "vue";
import {useRoute} from 'vue-router'
import { useCounterStore } from "../stores/counter";


const countryStore = useCounterStore(0);
const route = useRoute();

countryStore.getCountryData(route.params.name)

// const singleCountry = computed(() => {
//     return countryStore.countryDetails[0];
// })

const singleCountry = computed(() => {
    const countryDetails = countryStore.countryDetails;
    return countryDetails ? countryDetails[0] : null;
})


</script>


<template>
    
    
    <section>
    <!-- <div class="main">
        <div class="btn">
            <img src="../assets/call-made.svg" alt="">
            <button><RouterLink to="/">Back</RouterLink></button>
        </div>
    </div>
    <div>
        <div>  
            <img :src="countryStore.countryDetails[0].flags.svg"/>
        <div>
        <h3>{{countryStore.countryDetails[0]?.name.common }}</h3>
        </div>
        </div>
        </div> -->  

        <div class="main">
      <div class="btn">
        <img src="../assets/call-made.svg" alt="">
        <button><RouterLink to="/">Back</RouterLink></button>
      </div>
      </div>
      <div v-if="singleCountry">
      <div>
        <img :src="singleCountry?.flags?.svg || ''" alt="Flag" />
        <div>
          <h3>{{ singleCountry?.name?.common }}</h3>
        </div>
      </div>
    </div>
</section>



</template>


<style scoped>
.detailPage{
    padding: 80px 82pc 124px 80px;
}


.btn{
    border-radius: 6px;
    background: #FFF;
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.29);
    width: 136px;
    height: 40px;
    padding: 10px 39px 10px 32px;
    display: flex;
    gap: 10px;

}

button{
    border: none;
    background: #FFF;
}
</style>