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
  width: 100%;
  padding: 18px;
  background: #ffffff;
  border: 1px solid #edf1f6;
  border-radius: 14px;
  box-shadow: 0 2px 6px rgba(0,0,0,.05);
  box-sizing: border-box;
}

.currency-converter__title {
  margin-bottom: 16px;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 700;
  color: #27364b;
}

.currency-converter__row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.currency-converter__input {
  flex: 1;
  padding: 12px;
  border: 1px solid #d9e2ec;
  border-radius: 10px;
  font-size: 1rem;

  background: #f8fafc;
  color: #2c3e50;

  transition: all .25s ease;
}

.currency-converter__input:focus{
    outline:none;
    background:#ffffff;
    border-color:#4a90e2;
    box-shadow:0 0 0 3px rgba(74,144,226,.18);
}

.currency-converter__select{
    padding:12px 16px;
    border:1px solid #d9e2ec;
    border-radius:10px;
    background:#f4f8fc;
    color:#2c3e50;
    font-weight:600;
    cursor:pointer;
    transition:all .25s ease;
}

.currency-converter__select:hover{
  border-color:#4a90e2;
    background:#eaf2fb;
    border-color:#4a90e2;
}

.currency-converter__arrow{
    font-size:1.5rem;
    font-weight:bold;
    color:#4a90e2;
    padding:0 4px;
}

.currency-converter__status {
  margin-top: 18px;
  text-align: center;
  color: #7b8794;
  font-size: .95rem;
}

.currency-converter__status--error {
  color: #e74c3c;
}

.currency-converter__result {
  margin-top: 20px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: #40516f;
}
@media (max-width: 480px) {
  .currency-converter__row {
    flex-wrap: wrap;
  }
  .currency-converter__input {
    min-width: 0;
  }
}

</style>