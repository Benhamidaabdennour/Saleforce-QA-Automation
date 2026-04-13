
 class leadPage {
  constructor(page) {
    this.page = page;

    // Fields XPATHs
    this.listViewPicker = page.locator('//*/div/lst-list-view-picker//button');
    this.listViewSearchInput = page.locator('//*/div/input[@role="combobox"]');
    this.listVewAllLeads = page.locator('//*/div//lightning-base-combobox-item[@data-value="AllOpenLeads"]');
    this.listVewSearchBox = page.locator('//*/div/force-list-view-manager-search-bar//input[@name="Lead-search-input"]');
    this.recentListViewsText = page.locator('(//*/div//ul[@role="group"]//h3)[1]');
    this.refreshButton = page.locator('//*/lst-list-view-manager-button-bar//button[@name="refreshButton"]')
  }
    getLeadLinkByName(leadName){
    return this.page.locator('//*/tbody//tr//th//a[contains(@href, "/view")]')
        .filter({ hasText: new RegExp(`^${leadName}$`) }); // exact match using regex
    };

}
export default leadPage;