const { test} = require('@playwright/test')
const { LoginPage } = require('../../pages/General/login_page')
require('dotenv').config();
const datacredentials = require("fs").promises
import { SelectCredentials } from '../../utils/selectCredentials'


test.afterEach(async ({ page }, testInfo) => {
  await page
      .waitForTimeout(20000) //Give some time
  await page
      .screenshot({
          path: 'screenshots/login/' + testInfo.title + '.png'
  })
})

//sucessful login
test('Login sucessful', async ({ page }) => {
  const data = await datacredentials.readFile("tests/General/loginCredentials.json", "utf-8")
  const credentials = JSON.parse(data)
  //Select enviroment and get data for login
  const SelectEnviromentData = new SelectCredentials(page)
  const enviromentData = await SelectEnviromentData.encontrarPropiedad(credentials, process.env.ENVIROMENT)
  const loginPage = new LoginPage(page)
  await loginPage.openUrl(enviromentData.url)
  await loginPage.selectDocumentType(enviromentData.documentType)
  await loginPage.typeDocumentNumber(enviromentData.documentNumber)
  await loginPage.typePassword(enviromentData.password)
  await loginPage.selectLoginButton()
  await loginPage.validateMessage('¡Hola, WILDER YAMID!')
})


