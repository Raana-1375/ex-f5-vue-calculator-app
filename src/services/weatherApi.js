import axios from 'axios'

const NATIONAL_URL = 'https://api.el-tiempo.net/json/v3/general'
const ASTURIAS_PROVINCE_ID = '33'
const ASTURIAS_URL = `https://api.el-tiempo.net/json/v3/provincias/${ASTURIAS_PROVINCE_ID}`

/**
 * Fetches national weather summary, including a list of cities
 * with their sky state and temperatures.
 */
export async function fetchNationalWeather() {
  try {
    const response = await axios.get(NATIONAL_URL)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch national weather data')
  }
}

/**
 * Fetches weather data for Asturias province, including a list
 * of municipalities with their sky state and temperatures.
 */
export async function fetchAsturiasWeather() {
  try {
    const response = await axios.get(ASTURIAS_URL)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch Asturias weather data')
  }
}