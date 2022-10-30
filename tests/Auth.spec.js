const {test} = require('@playwright/test')
import {
    clickByElement,
    visibleByText,
    visibleByElement,
    fillByElement,
    loginUser,
} from './common'
import {validMail, invalidMail, invalidOTP, URL} from './constants'

test.beforeEach(async ({page}) => {
    await page.goto(URL)
})
test.describe('Auth User Login', () => {
    test('Should display OTP screen if not logged in', async ({page}) => {
        await visibleByElement(page, 'set-otp-to-email')
    })
    test('Should sent an OTP to mail', async ({page}) => {
        await fillByElement(page, 'email', null, validMail)
        await clickByElement(page, 'set-otp-to-email')
        await visibleByText(page, 'OTP has been sent to mail')
    })
    test('Should notify by message if email is invalid', async ({page}) => {
        await fillByElement(page, 'email', null, invalidMail)
        await clickByElement(page, 'set-otp-to-email')
        await visibleByText(page, 'User not found')
    })
    test('Should notifiy by message if OTP is invalid', async ({page}) => {
        await fillByElement(page, 'email', null, validMail)
        await clickByElement(page, 'set-otp-to-email')
        await fillByElement(page, 'otp', null, invalidOTP)
        await clickByElement(page, 'verify-otp')
        await visibleByText(page, 'The verification of the OTP has failed')
    })
    test('Should login a user', async ({page}) => {
        await loginUser(page)
    })
})
