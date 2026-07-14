<template>
  <div class="currency-converter">
    <h2 class="currency-converter__title">Currency Converter</h2>

    <div class="currency-converter__row">
      <input
        v-model.number="amount"
        type="number"
        class="currency-converter__input"
        placeholder="Amount"
      />

      <select v-model="fromCurrency" class="currency-converter__select">
        <option value="EUR">€ EUR</option>
        <option value="USD">$ USD</option>
        <option value="JPY">¥ JPY</option>
      </select>

      <span class="currency-converter__arrow">→</span>

      <select v-model="toCurrency" class="currency-converter__select">
        <option value="EUR">€ EUR</option>
        <option value="USD">$ USD</option>
        <option value="JPY">¥ JPY</option>
      </select>
    </div>

    <p v-if="isLoading" class="currency-converter__status">Loading rates...</p>
    <p v-else-if="errorMessage" class="currency-converter__status currency-converter__status--error">
      {{ errorMessage }}
    </p>
    <p v-else-if="convertedValue !== null" class="currency-converter__result">
      {{ amount }} {{ fromCurrency }} = {{ convertedValue }} {{ toCurrency }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchExchangeRates } from '../services/currencyApi.js'

const amount = ref(1)
const fromCurrency = ref('EUR')
const toCurrency = ref('USD')
const rates = ref(null)
const isLoading = ref(false)
const errorMessage = ref(null)

async function loadRates() {
  isLoading.value = true
  errorMessage.value = null

  try {
    rates.value = await fetchExchangeRates()
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

const convertedValue = computed(() => {
  if (!rates.value || !amount.value) return null

  // Rates are based on USD, so we convert: amount -> USD -> target currency
  const amountInUsd = amount.value / rates.value[fromCurrency.value]
  const result = amountInUsd * rates.value[toCurrency.value]

  return result.toFixed(2)
})

onMounted(loadRates)
</script>

<style scoped>
.currency-converter {
  max-width: 360px;
  margin: 1.5rem auto 0;
  padding: 1rem;
  background-color: #f7f7f7;
  border-radius: 8px;
}

.currency-converter__title {
  font-size: 1rem;
  margin: 0 0 0.75rem;
}

.currency-converter__row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.currency-converter__input {
  flex: 1;
  min-width: 80px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.currency-converter__select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.currency-converter__arrow {
  font-weight: bold;
}

.currency-converter__status {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: #666;
}

.currency-converter__status--error {
  color: #d9534f;
}

.currency-converter__result {
  margin-top: 0.75rem;
  font-weight: bold;
}
</style>