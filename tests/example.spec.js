// @ts-check
import { test, expect } from '@playwright/test';
import { login } from '../pages/login';
import { MFAPage } from '../pages/mfaPage';
const data = require("../dataset/loginInfo.json")

test("Login to SF with or without MFA", async({ page }) =>{
  await page.goto(data.qa.url)

  const logger = new login(page)
  const mfaHandler = new MFAPage(page)

  await logger.loginToSF()
  await mfaHandler.submitMFA()
  await page.pause()
}
)
