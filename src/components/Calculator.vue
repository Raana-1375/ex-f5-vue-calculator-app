<template>
  <div class="dashboard">
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
      <button class="key key--memory" @click="memoryAdd">M+</button>
      <button class="key key--memory" @click="memoryRecall">MR</button>
      <button class="key key--memory" @click="memoryClear">MC</button>
    </div>
  </div>
    <div class="sidebar">
    <CurrencyConverter />
    <WeatherWidget />
  </div>
</div>
</template>

<script setup>
import { useCalculator } from '../composables/useCalculator.js'
import CurrencyConverter from './CurrencyConverter.vue'
import WeatherWidget from './WeatherWidget.vue'
const {
  displayValue,
  inputDigit,
  inputDecimal,
  chooseOperator,
  calculateResult,
  clear,
  memoryAdd,
  memoryRecall,
  memoryClear,
} = useCalculator()
</script>

<style scoped>
.dashboard{
    display:flex;
    gap:32px;
    max-width:1180px;
    margin:0 auto;
}

.calculator{
    flex:0 0 470px;
}

.sidebar{
    flex:1;
    min-width:520px;
}

.calculator__display{
    background:linear-gradient(180deg,#292929,#111);
    color:white;
    font-size:2.2rem;
    font-weight:300;
    border-radius:18px;
    padding:22px;
    min-height:80px;
    display:flex;
    justify-content:flex-end;
    align-items:center;
    margin-bottom:20px;
}

.calculator__keypad{
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:10px;
}

.key{
    height:56px;
    border:none;
    border-radius:16px;
    font-size:1.25rem;
    font-weight:500;
    cursor:pointer;

    background:#f5f7fa;

    transition:
        transform .18s,
        box-shadow .18s,
        background .18s;

    box-shadow:0 3px 8px rgba(0,0,0,.05);
}

.key:hover{
    transform:translateY(-2px);
    box-shadow:0 8px 18px rgba(0,0,0,.10);
}

.key:active{
    transform:scale(.97);
}

.key--operator{
    background:#f7b046;
    color:white;
}

.key--equals{
    background:#41b64d;
    color:white;
}

.key--function{
    background:#ea5750;
    color:white;
}

.key--wide {
  grid-column: span 2;
}
.key--memory {
  background:#697785;
    color:white;
  font-size: 0.9rem;
}
@media (max-width: 760px) {
  .dashboard {
    flex-direction: column;
    gap: 20px;
  }
  .calculator {
    flex: none;
    width: 100%;
  }
  .sidebar {
    min-width: 0;
    width: 100%;
  }
}
</style>