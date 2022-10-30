const {test} = require('@playwright/test')
import {} from './common'
import {URL} from './constants'

test.beforeEach(async ({page}) => {
    await page.goto(URL)
    await loginUser(page)
})
test.describe('', () => {
    test('', async ({page}) => {})
})
