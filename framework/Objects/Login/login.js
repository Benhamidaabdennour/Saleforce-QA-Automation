class login {

  constructor(page){
    // configure the different elements we need --
    this.page = page;
    this.usernameInput = page.locator('[name="username"]');
    this.passwordInput = page.locator('[name="pw"]');
    this.loginButton = page.locator('[name="Login"]');
  }
}
export default login;