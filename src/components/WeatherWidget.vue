<template>
  <div class="weather">
    <h2 class="weather__title">Weather</h2>

    <div class="weather__toggle">
      <button
        class="weather__toggle-btn"
        :class="{ 'weather__toggle-btn--active': scope === 'national' }"
        @click="setScope('national')"
      >
        Nacional
      </button>
      <button
        class="weather__toggle-btn"
        :class="{ 'weather__toggle-btn--active': scope === 'asturias' }"
        @click="setScope('asturias')"
      >
        Asturias
      </button>
    </div>

    <p v-if="isLoading" class="weather__status">Loading weather...</p>
    <p v-else-if="errorMessage" class="weather__status weather__status--error">
      {{ errorMessage }}
    </p>

    <div v-else class="weather__cities">
      <div v-for="city in cities" :key="city.name" class="weather-card">
        <div class="weather-card__icon" v-html="getIcon(city.stateSky.id)"></div>
        <p class="weather-card__name">{{ city.name }}</p>
        <p class="weather-card__description">{{ city.stateSky.description }}</p>
        <p class="weather-card__temps">
          {{ city.temperatures.min }}° / {{ city.temperatures.max }}°
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchNationalWeather, fetchAsturiasWeather } from '../services/weatherApi.js'
import { weatherIcons, getSkyCategory } from '../assets/weatherIcons.js'

const scope = ref('national')
const cities = ref([])
const isLoading = ref(false)
const errorMessage = ref(null)

function getIcon(stateSkyId) {
  const category = getSkyCategory(stateSkyId)
  return weatherIcons[category]
}

async function loadWeather() {
  isLoading.value = true
  errorMessage.value = null

  try {
    const data = scope.value === 'national'
      ? await fetchNationalWeather()
      : await fetchAsturiasWeather()

    cities.value = data.ciudades
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

function setScope(newScope) {
  scope.value = newScope
  loadWeather()
}

onMounted(loadWeather)
</script>

<style scoped>

.weather {
  width: 100%;
  padding: 24px;
  background: #ffffff;
  border: 1px solid #edf1f6;
  border-radius: 20px;
  box-shadow:
    0 10px 24px rgba(0,0,0,.06),
    0 2px 8px rgba(0,0,0,.04);
  box-sizing: border-box;
  min-height: 560px;
  transition: transform .2s ease, box-shadow .2s ease;
}

.weather:hover{
  transform: translateY(-2px);
  box-shadow:
    0 16px 32px rgba(0,0,0,.08),
    0 4px 12px rgba(0,0,0,.05);
}

.weather__title{
  margin-bottom:24px;
  text-align:center;
  font-size:1.6rem;
  font-weight:700;
  color:#27364b;
}

.weather__toggle{
  display:flex;
  gap:12px;
  margin-bottom:20px;
}

.weather__toggle-btn{
  flex:1;
  padding:12px;
  border:1px solid #d9e2ec;
  border-radius:10px;
  background:white;
  cursor:pointer;
  font-size:.95rem;
  font-weight:500;
  transition:.2s;
}

.weather__toggle-btn:hover{
  border-color:#4a90e2;
  background:#f8fbff;
}

.weather__toggle-btn--active{
  background:#4caf50;
  color:white;
  border-color:#4caf50;
}

.weather__status{
  text-align:center;
  margin-bottom:15px;
  color:#7b8794;
  font-size:.95rem;
}

.weather__status--error{
  color:#e74c3c;
}

.weather__cities{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:16px;

  height:400px;
  overflow-y:auto;

  padding-right:6px;
}

.weather-card{

  background:#f8fafc;

  border:1px solid #edf1f6;

  border-radius:14px;

  padding:18px 12px;

  text-align:center;

  transition:.25s;
}

.weather-card:hover{

  transform:translateY(-4px);

  box-shadow:0 10px 22px rgba(0,0,0,.08);

  background:white;
}

.weather-card__icon{
  width:48px;
  height:48px;
  margin:0 auto 8px;
}

.weather-card__icon :deep(svg){
  width:100%;
  height:100%;
}

.weather-card__name{
  font-size:1.1rem;
  font-weight:700;
  color:#4f4b63;
  margin-bottom:8px;
}

.weather-card__description{
  font-size:.9rem;
  color:#7b8794;
  margin-bottom:10px;
}

.weather-card__temps{
  font-size:1.1rem;
  font-weight:600;
  color:#5d5972;
}

</style>