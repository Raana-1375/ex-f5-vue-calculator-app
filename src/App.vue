<template>
  <main class="app">
    <header class="app-header">
      <h1>🧮 Smart Calculator Dashboard</h1>
      <p>Calculator • Currency Converter • Weather</p>
    </header>

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
  flex-direction: column;
  align-items: center;
  padding: 32px;
  background: linear-gradient(180deg, #f8fbff 0%, #eef3f9 100%);
}

.app-header {
  text-align: center;
  margin-bottom: 32px;
}

.app-header h1 {
  margin: 0;
  font-size: clamp(1.25rem, 5vw, 2rem);
  font-weight: 700;
  color: #243b53;
}

.app-header p {
  margin-top: 8px;
  color: #6b7c93;
  font-size: 1rem;
}
</style>