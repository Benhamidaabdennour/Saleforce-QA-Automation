 class TopMenuPage {
  constructor(page) {
    this.page = page;

    // App Launcher
    this.appLauncherButton = page.locator('//*/div[@role="navigation"]//button');
    this.appLauncherSearchInput = page.locator('//*/div//one-app-launcher-search-bar//input[@type="search"]');

    // App Launcher result item (dynamic — use method below)
    this.appLauncherItemLink = (label) =>
      page.getByRole('option', { name: label }).or(
        page.locator('.slds-listbox__item').filter({ hasText: label })
      ).first();
  }
}
export default TopMenuPage;