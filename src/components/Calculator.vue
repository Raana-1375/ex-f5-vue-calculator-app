<template>
  <div class="calculator">
    <div class="calculator__display">
      <span class="calculator__display-value">{{ displayValue }}</span>
    </div>

    <div class="calculator__keypad">
      <button class="key key--function" @click="clear">CE</button>
      <button class="key key--operator" @click="chooseOperator('÷')">÷</button>
      <button class="key key--operator" @click="chooseOperator('×')">×</button>
      <button class="key key--operator" @click="chooseOperator('−')">−</button>

      <button class="key" @click="inputDigit('7')">7</button>
      <button class="key" @click="inputDigit('8')">8</button>
      <button class="key" @click="inputDigit('9')">9</button>
      <button class="key key--operator" @click="chooseOperator('+')">+</button>

      <button class="key" @click="inputDigit('4')">4</button>
      <button class="key" @click="inputDigit('5')">5</button>
      <button class="key" @click="inputDigit('6')">6</button>
      <button class="key key--equals" @click="calculateResult">=</button>

      <button class="key" @click="inputDigit('1')">1</button>
      <button class="key" @click="inputDigit('2')">2</button>
      <button class="key" @click="inputDigit('3')">3</button>

      <button class="key key--wide" @click="inputDigit('0')">0</button>
      <button class="key" @click="inputDecimal">.</button>
    </div>
    <CurrencyConverter />
  </div>
</template>

<script setup>
import { useCalculator } from '../composables/useCalculator.js'
import CurrencyConverter from './CurrencyConverter.vue'
const {
  displayValue,
  inputDigit,
  inputDecimal,
  chooseOperator,
  calculateResult,
  clear,
} = useCalculator()
</script>

<style scoped>
.calculator {
  max-width: 360px;
  margin: 0 auto;
  padding: 1rem;
}

.calculator__display {
  background-color: #1e1e1e;
  color: #ffffff;
  text-align: right;
  padding: 1rem;
  border-radius: 8px;
  font-size: 2rem;
  margin-bottom: 0.75rem;
  min-height: 3rem;
  word-break: break-all;
}

.calculator__keypad {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.key {
  padding: 1rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  background-color: #f0f0f0;
  cursor: pointer;
}

.key:active {
  opacity: 0.7;
}

.key--operator {
  background-color: #f7a94b;
  color: #ffffff;
}

.key--function {
  background-color: #d9534f;
  color: #ffffff;
}

.key--equals {
  background-color: #4caf50;
  color: #ffffff;
}

.key--wide {
  grid-column: span 2;
}
</style>