const {expect} = require('@playwright/test')
import {validMail, validOTP} from './constants'
const fs = require('fs')

// !!Actions
export const clickByElement = async (page, id, Class) => {
    if (id) {
        await page.locator(`id=${id}`).click()
    }
    if (Class) {
        await page.locator(`.${Class}`).click()
    }
}
export const fillByElement = async (page, id, Class, text, index) => {
    if (index) {
        await page
            .locator(id ? `id=${id}` : `.${Class}`)
            .nth(index)
            .fill(text)
    }
    if (index == null) {
        await page.locator(id ? `id=${id}` : `.${Class}`).fill(text)
    }
}
export const clickByRole = async (page, role, name) => {
    await page.getByRole(role, {name: name}).click()
}

// !!Assertions
export const visibleByElement = async (page, id, Class, selector) => {
    if (id) {
        await expect(page.locator(`id=${id}`)).toBeVisible()
    }
    if (Class) {
        await expect(page.locator(`.${Class}`)).toBeVisible()
    }
    if (selector) {
        await expect(page.locator(selector)).toBeVisible()
    }
}
export const expectElementToHaveText = async (page, id, Class, text) => {
    if (id) {
        await expect(page.locator(`id=${id}`)).toHaveText(text)
    }
    if (Class) {
        await expect(page.locator(`.${Class}`)).toHaveText(text)
    }
}
export const visibleByText = async (page, text) => {
    await expect(page.getByText(text)).toBeVisible()
}
export const expectElementToContainText = async (page, id, Class, text) => {
    if (id) {
        await expect(page.locator(`id=${id}`)).toContainText(text)
    }
    if (Class) {
        await expect(page.locator(`.${Class}`)).toContainText(text)
    }
}
export const visibleByRole = async (page, role, name) => {
    await expect(page.getByRole(role, {name: name})).toBeVisible()
}
// Download a File
export const downloadFile = async (page, id, selector) => {
    const [download] = await Promise.all([
        // Start waiting for the download
        page.waitForEvent('download'),
        // Perform the action that initiates download
        page.locator(id ? `id=${id}` : selector).click(),
    ])
    const suggestedFileName = download.suggestedFilename()
    const filePath = 'download/' + suggestedFileName
    await download.saveAs(filePath)
    expect(fs.existsSync(filePath)).toBeTruthy()
}
// !!Flows
// Login a User
export const loginUser = async (page) => {
    await fillByElement(page, 'email', null, validMail)
    await clickByElement(page, 'set-otp-to-email')
    await fillByElement(page, 'otp', null, validOTP)
    await clickByElement(page, 'verify-otp')
    await expectElementToHaveText(page, null, 'navbar-brand', 'Dashboard')
}
