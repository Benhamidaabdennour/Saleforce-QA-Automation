// @ts-check
import { test, expect } from '@playwright/test';
import { login } from '../framework/Objects/Login/login';
import { MFAPage } from '../framework/Objects/Login/mfaPage';

const data = require("../dataset/loginInfo.json")
const accountData = require("../dataset/account.json")

test("Login to SF with or without MFA", async({ page }) =>{
  await page.goto(data.qa.url)

  const logger = new login(page)
  const mfaHandler = new MFAPage(page)
  const account = new accounts(page)

  await logger.loginToSF()
  await mfaHandler.submitMFA()

  //await page.goto(accountData.url)
  await account.accessAccounts()  
  await account.newAccount()

  await page.pause()
}
)
