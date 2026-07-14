<template>
  <main class="app">
    <Calculator />
  </main>
</template>

<script setup>
import Calculator from './components/Calculator.vue'
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 2rem;
  background-color: #fafafa;
}
</style>
