const {test} = require('@playwright/test')
import {clickByElement, loginUser, visibleByElement} from './common'
import {URL} from './constants'

test.beforeEach(async ({page}) => {
    await page.goto(URL)
    await loginUser(page)
})
test.describe('Logout a User', () => {
    test('Should logout to the login screen', async ({page}) => {
        await clickByElement(page, 'logout')
        await visibleByElement(page, 'email')
    })
})
