 class opportunityDetailsPage { 
    constructor(page){
        this.page = page;
        
        // fields

        // buttons
        this.saveBtn = page.locator('div[role="dialog"] button[name="SaveEdit"]')
        this.cancelBtn = page.locator('//*/li[@data-target-selection-name="sfdc:StandardButton.Opportunity.CancelEdit"]//button[@name="CancelEdit"]')
        this.toastSuccess = page.locator('//*/div[@data-key="success"]//a')
    }
 }
 export default opportunityDetailsPage;