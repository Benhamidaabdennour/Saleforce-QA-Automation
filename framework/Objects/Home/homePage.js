
class HomePage {
  constructor(page) {
    this.page = page;
    this.appLauncher = page.locator('//*/div[@role="navigation"]//button');
  }

  get appLauncherButton() {
    return this.appLauncher;
  }

  async waitForPageLoad() {
    await this.appLauncherButton.waitFor({ state: "visible", timeout: 15000 });
  }
}

export default HomePage;