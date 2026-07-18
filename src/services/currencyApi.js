import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_CURRENCYFREAKS_API_BASE_URL
const API_KEY = import.meta.env.VITE_CURRENCYFREAKS_API_KEY

/**
 * Fetches exchange rates for EUR, USD and JPY, using USD as the base currency.
 * Returns an object like { EUR: 0.92, USD: 1, JPY: 148.3 }
 */
export async function fetchExchangeRates() {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        apikey: API_KEY,
        symbols: 'EUR,USD,JPY',
        base: 'USD',
      },
    })

    return response.data.rates
  } catch (error) {
    throw new Error('Failed to fetch currency exchange rates')
  }
}