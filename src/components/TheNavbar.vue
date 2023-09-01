<script setup>


</script>



<template>
  <div class="header">
    <h2>Where in the world?</h2>
    <div class="mode">
      <img src="../assets/moon-icon.svg"  @click="darkMode.toggleDarkMode"/>
      <p>Dark Mode</p>
    </div>
  </div>
</template>


<style scoped>
.header{ display: flex;
justify-content: space-between;
padding-left: 16px;
  padding-top: 30px;
  padding-bottom: 30px;
  background: #FFF;
box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
}

.header h2{
  color: #111517;
font-size: 14px;
font-style: normal;
font-weight: 800;
line-height: 20px;
}
.mode{
  display: flex;
  justify-content:center;
  align-items: center;
  padding-right: 16px;
  gap:8px;
}

.mode p{
  color: #111517;
font-size: 12px;
font-style: normal;
font-weight: 600;
line-height: normal;   
}

@media(min-width: 1024px) {
  .header{
    padding: 23px 80px 29px 81px;
  }

  .header h2{
    color: #111517;
font-size: 24px;
font-style: normal;
font-weight: 800;
line-height: normal;
  }
.mode p{
  color: #111517;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: normal;
}


}

</style>