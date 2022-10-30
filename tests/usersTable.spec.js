const {test} = require('@playwright/test')
import {
    visibleByRole,
    loginUser,
    downloadFile,
    clickByRole,
    fillByElement,
    clickByElement,
    visibleByText,
    visibleByElement,
} from './common'
import {invalidMail, URL, validMail} from './constants'

test.beforeEach(async ({page}) => {
    await page.goto(URL)
    await loginUser(page)
})
test.describe('Users Table', () => {
    test('Should reload Users table', async ({page}) => {
        await clickByElement(page, 'menu-users')
        await visibleByRole(page, 'columnheader', 'Role')
    })
    test('Should reload Deleted Users table', async ({page}) => {
        await clickByElement(page, 'menu-users')
        await clickByRole(page, 'button', 'Deleted users')
        await visibleByRole(page, 'columnheader', 'INNER DATA')
    })
    test('Should download all the users table into a CSV file', async ({
        page,
    }) => {
        await clickByElement(page, 'menu-users')
        await visibleByRole(page, 'columnheader', 'Role')
        await downloadFile(page, 'save_csv')
    })
    test("Should download all user's training report", async ({page}) => {
        await clickByElement(page, 'menu-users')
        await visibleByRole(page, 'columnheader', 'Role')
        await downloadFile(
            page,
            null,
            '#root > div > div > div.sc-flMpop.fMZamX.main-panel > div > div > div > div.sc-bkzYnD.kwkEfR.card-body > table > tbody > tr:nth-child(1) > td:nth-child(6)',
        )
    })
    test('Should display user information', async ({page}) => {
        await clickByElement(page, 'menu-users')
        await fillByElement(page, 'search_filter', null, validMail, 1)
        await clickByRole(page, 'cell', validMail)
        await visibleByElement(page, null, null, 'input[name="email"]')
    })
})
