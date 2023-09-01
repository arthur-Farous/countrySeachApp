<script setup>
import { ref } from 'vue';

export function useDarkMode() {
  const isDarkMode = ref(false);

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    document.body.classList.toggle('dark-mode', isDarkMode.value);
  };

  return {
    isDarkMode,
    toggleDarkMode,
  };
}

</script>

<template>
    <div :class="{ 'dark-mode': darkMode.isDarkMode }"></div>
</template>




<style scoped>

</style>