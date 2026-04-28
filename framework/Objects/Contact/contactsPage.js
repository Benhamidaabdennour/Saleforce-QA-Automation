 class contactPage {
    constructor(page){
        this.page = page;
        this.newBtn = page.locator('//*/div//li[@data-target-selection-name="sfdc:StandardButton.Contact.NewContact"]/a')
        this.listViewPicker = page.locator('//*/div/lst-list-view-picker//button')
        this.listViewSearchINput = page.locator('//*/div/input[@role="combobox"]')
        this.listVewAllContacts = page.locator('//*/div//lightning-base-combobox-item[@data-value="AllContacts"]')
        this.listVewSearchBox = page.locator('//*/div/force-list-view-manager-search-bar//input[@name="Contact-search-input"]')
        this.recentListViewsText = page.locator('(//*/div//ul[@role="group"]//h3)[1]')
    
    }
        getContactLinkByName(name) {
            return this.page.locator('//*/tbody//tr//th//a[contains(@href, "/view")]')
                .filter({ hasText: new RegExp(`^${name}$`) }); // exact match using regex
    }
}
export default contactPage;