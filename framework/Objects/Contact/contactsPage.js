 class contactPage {
    constructor(page){
        this.page = page;
        this.newBtn = page.getByRole('button', { name: 'New' })
        this.listViewPicker = page.locator('//*/div/lst-list-view-picker//button')
        this.listViewSearchINput = page.locator('//*/div/input[@role="combobox"]')
        this.listVewAllContacts = page.locator('//*/div//lightning-base-combobox-item[@data-value="AllContacts"]')
        this.listVewSearchBox = page.locator('//*/div/force-list-view-manager-search-bar//input[@name="Contact-search-input"]')
        this.recentListViewsText = page.locator('(//*/div//ul[@role="group"]//h3)[1]')
    
    }
       // This is a test to see if a dynamic locator is better
        getContactLinkByName(name) {
            return this.page.locator('//*/tbody//tr//th//a[contains(@href, "/view")]')
                .filter({ hasText: new RegExp(`^${name}$`) }); // exact match using regex
    }
}
export default contactPage;