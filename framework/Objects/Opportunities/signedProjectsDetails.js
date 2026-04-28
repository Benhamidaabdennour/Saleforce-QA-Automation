 class signedProjectsDetails{ 
    constructor(page){
        this.page = page;
        
        // fields

        
        // path values
        this.pathClosed = page.locator('//*/div//flexipage-component2[@data-target-selection-name="runtime_sales_pathassistant_pathAssistant"]//ul[@role="listbox"]//li[data-name="Closed"]');

        // closing dialog
        this.stageBtn = page.locator('//*/div//flexipage-component2[@data-target-selection-name="runtime_sales_pathassistant_pathAssistant"]//button').nth(1)
        this.closeValue = page.locator('//*/div//select[@size="1"]//option')
        this.closeSaveBtn = page.locator('//*/div[@role="dialog"]//button[@aria-live="off"]').nth(1)
        this.cancelBtn = page.locator('//*/div//button//span[@dir="ltr"]').nth(0)
        // buttons
        this.saveBtn = page.locator('div[role="dialog"] button[name="SaveEdit"]')
        this.cancelBtn = page.locator('//*/li[@data-target-selection-name="sfdc:StandardButton.Opportunity.CancelEdit"]//button[@name="CancelEdit"]')
        this.toastSuccess = page.locator('//*/div[@data-key="success"]').nth(0)
    }
 }
 export default signedProjectsDetails;