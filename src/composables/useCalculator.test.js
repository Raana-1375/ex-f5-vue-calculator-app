import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCalculator } from './useCalculator.js'

describe('useCalculator', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with a display value of "0"', () => {
    const { displayValue } = useCalculator()
    expect(displayValue.value).toBe('0')
  })

  it('adds two numbers correctly', () => {
    const { displayValue, inputDigit, chooseOperator, calculateResult } = useCalculator()

    inputDigit('7')
    chooseOperator('+')
    inputDigit('3')
    calculateResult()

    expect(displayValue.value).toBe('10')
  })

  it('subtracts two numbers correctly', () => {
    const { inputDigit, chooseOperator, calculateResult, displayValue } = useCalculator()

    inputDigit('9')
    chooseOperator('−')
    inputDigit('4')
    calculateResult()

    expect(displayValue.value).toBe('5')
  })

  it('handles decimal numbers correctly', () => {
    const { inputDigit, inputDecimal, chooseOperator, calculateResult, displayValue } = useCalculator()

    inputDigit('2')
    inputDecimal()
    inputDigit('5')
    chooseOperator('+')
    inputDigit('1')
    inputDecimal()
    inputDigit('5')
    calculateResult()

    expect(displayValue.value).toBe('4')
  })

  it('shows an error when dividing by zero', () => {
    const { inputDigit, chooseOperator, calculateResult, displayValue, errorMessage } = useCalculator()

    inputDigit('5')
    chooseOperator('÷')
    inputDigit('0')
    calculateResult()

    expect(displayValue.value).toBe('Error')
    expect(errorMessage.value).toBeTruthy()
  })

  it('resets everything when clear is called', () => {
    const { inputDigit, clear, displayValue } = useCalculator()

    inputDigit('9')
    clear()

    expect(displayValue.value).toBe('0')
  })

  it('stores and recalls a value from memory', () => {
    const { inputDigit, memoryAdd, clear, memoryRecall, displayValue } = useCalculator()

    inputDigit('5')
    memoryAdd()
    clear()
    memoryRecall()

    expect(displayValue.value).toBe('5')
  })
})