
class homePage {
  constructor(page) {
    this.page = page;
    this.appLauncher = page.locator('//*/div[@role="navigation"]//button');
    this.notificationIcon = page.locator('//*/div[@data-target-selection-name="89957d541b0841849e6a3633bcff5869"]//button')
    this.notificationCount = page.locator('//*/div[@data-target-selection-name="89957d541b0841849e6a3633bcff5869"]//button//span').nth(2)
    this.latestNotificationTitle = page.locator('//*/div[@role="dialog"]//h3').nth(0)
    this.latestNotificationText = page.locator('//*/div[@role="dialog"]//li//a//span[@data-aura-class="uiOutputText"]').nth(0)
    this.notificationItems = page.locator('//*/div[@role="dialog"]//li')
  }

  get appLauncherButton() {
    return this.appLauncher;
  }

  async waitForPageLoad() {
    await this.appLauncherButton.waitFor({ state: "visible", timeout: 15000 });
  }
}

export default homePage;