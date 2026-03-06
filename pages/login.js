import { expect, Locator, Page } from '@playwright/test';
const data = require("../dataset/loginInfo.json")

export class login {

  constructor(page){
    // configure the different elements we need --
    this.page = page;
    this.usernameInput = "#username";
    this.passwordInput = "#password";
    this.loginBtn = "#Login";
  }

  async loginToSF(){
    await this.page.fill(this.usernameInput, data.qa.username)
    await this.page.fill(this.passwordInput, data.qa.password)
    await this.page.click(this.loginBtn)
  }
}