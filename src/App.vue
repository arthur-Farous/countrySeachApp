<script setup>
import { RouterLink } from 'vue-router';
import TheNavbar from './components/TheNavbar.vue';


</script>


<template>
  <div>
    <TheNavbar/>
    <Suspense>
    <RouterView/>
  </Suspense>
  </div>
  
  
</template>

<style scoped>

</style>