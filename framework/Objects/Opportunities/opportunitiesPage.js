 class opportunitiesPage{ 

    constructor(page){
        this.page = page;
        this.newBtn = page.locator('//*/div//li[@data-target-selection-name="sfdc:StandardButton.Opportunity.New"]/a')
        this.listViewPicker = page.locator('//*/div/lst-list-view-picker//button')
        this.listViewSearchINput = page.locator('//*/div/input[@role="combobox"]')
        this.listVewAllOpportunities = page.locator('//*/div//lightning-base-combobox-item[@data-value="AllOpportunities"]')
        this.listVewSearchBox = page.locator('//*/div/force-list-view-manager-search-bar//input[@name="Opportunity-search-input"]')
        this.recentListViewsText = page.locator('(//*/div//ul[@role="group"]//h3)[1]')
        this.signedProjectRecordType = page.locator('//*/div//fieldset//input[@type="radio"]').nth(0)
        this.newProjectRecordType = page.locator('//*/div//fieldset//input[@type="radio"]').nth(1)
        this.recordTypeCancelBtn = page.locator('//*/div[@role="dialog"]//button[@type="button"]').nth(3)
        this.recordTypeNextBtn = page.locator('//*/div[@role="dialog"]//button[@type="button"]').nth(4)

    }
            getOpportunityLinkByName(name) {
            return this.page.locator('//*/tbody//tr//th//a[contains(@href, "/view")]')
                .filter({ hasText: new RegExp(`^${name}$`) }); // exact match using regex
    }
 }

export default opportunitiesPage;