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
  max-width: 360px;
  margin: 1.5rem auto 0;
  padding: 1rem;
  background-color: #f7f7f7;
  border-radius: 8px;
}

.weather__title {
  font-size: 1rem;
  margin: 0 0 0.75rem;
}

.weather__toggle {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.weather__toggle-btn {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #ffffff;
  cursor: pointer;
}

.weather__toggle-btn--active {
  background-color: #4caf50;
  color: #ffffff;
  border-color: #4caf50;
}

.weather__status {
  font-size: 0.9rem;
  color: #666;
}

.weather__status--error {
  color: #d9534f;
}

.weather__cities {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  max-height: 320px;
  overflow-y: auto;
}

.weather-card {
  background-color: #ffffff;
  border-radius: 6px;
  padding: 0.5rem;
  text-align: center;
}

.weather-card__icon {
  width: 40px;
  height: 40px;
  margin: 0 auto;
}

.weather-card__icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.weather-card__name {
  font-size: 0.85rem;
  font-weight: bold;
  margin: 0.25rem 0 0;
}

.weather-card__description {
  font-size: 0.7rem;
  color: #666;
  margin: 0.15rem 0;
}

.weather-card__temps {
  font-size: 0.8rem;
  margin: 0;
}
</style>