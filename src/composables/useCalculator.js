import { ref } from 'vue'

// Map of operations avoids long if/else chains
const operations = {
  '+': (a, b) => a + b,
  '−': (a, b) => a - b,
  '×': (a, b) => a * b,
  '÷': (a, b) => {
    if (b === 0) throw new Error('Cannot divide by zero')
    return a / b
  },
}

export function useCalculator() {
  const displayValue = ref('0')
  const previousValue = ref(null)
  const pendingOperator = ref(null)
  const errorMessage = ref(null)
  const isResultShown = ref(false)

  function inputDigit(digit) {
    errorMessage.value = null

    if (isResultShown.value) {
      displayValue.value = digit
      isResultShown.value = false
      return
    }

    displayValue.value = displayValue.value === '0'
      ? digit
      : displayValue.value + digit
  }

  function inputDecimal() {
    errorMessage.value = null

    if (isResultShown.value) {
      displayValue.value = '0.'
      isResultShown.value = false
      return
    }

    if (!displayValue.value.includes('.')) {
      displayValue.value += '.'
    }
  }

  function chooseOperator(operator) {
    errorMessage.value = null

    if (pendingOperator.value && !isResultShown.value) {
      calculateResult()
    }

    previousValue.value = displayValue.value
    pendingOperator.value = operator
    isResultShown.value = false
    displayValue.value = '0'
  }

  function calculateResult() {
    if (!pendingOperator.value || previousValue.value === null) return

    const a = parseFloat(previousValue.value)
    const b = parseFloat(displayValue.value)
    const operation = operations[pendingOperator.value]

    try {
      const result = operation(a, b)
      displayValue.value = String(result)
      isResultShown.value = true
      pendingOperator.value = null
      previousValue.value = null
    } catch (error) {
      errorMessage.value = error.message
      displayValue.value = 'Error'
      isResultShown.value = true
      pendingOperator.value = null
      previousValue.value = null
    }
  }

  function clear() {
    displayValue.value = '0'
    previousValue.value = null
    pendingOperator.value = null
    errorMessage.value = null
    isResultShown.value = false
  }

  return {
    displayValue,
    errorMessage,
    inputDigit,
    inputDecimal,
    chooseOperator,
    calculateResult,
    clear,
  }
}