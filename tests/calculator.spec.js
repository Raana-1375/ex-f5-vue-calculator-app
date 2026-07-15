import { test, expect } from '@playwright/test'

test.describe('Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('performs a basic addition correctly', async ({ page }) => {
    await page.getByRole('button', { name: '7', exact: true }).click()
    await page.getByRole('button', { name: '+', exact: true }).click()
    await page.getByRole('button', { name: '3', exact: true }).click()
    await page.getByRole('button', { name: '=', exact: true }).click()

    await expect(page.locator('.calculator__display-value')).toHaveText('10')
  })

  test('shows an error when dividing by zero', async ({ page }) => {
    await page.getByRole('button', { name: '5', exact: true }).click()
    await page.getByRole('button', { name: '÷', exact: true }).click()
    await page.getByRole('button', { name: '0', exact: true }).click()
    await page.getByRole('button', { name: '=', exact: true }).click()

    await expect(page.locator('.calculator__display-value')).toHaveText('Error')
  })

  test('clears the display when CE is clicked', async ({ page }) => {
    await page.getByRole('button', { name: '9', exact: true }).click()
    await page.getByRole('button', { name: 'CE', exact: true }).click()

    await expect(page.locator('.calculator__display-value')).toHaveText('0')
  })
})