 class signedProjectsForm{ 
    constructor(page){
        this.page = page;
        
        // fields
        this.opportunityName = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Opportunity.Name"]//input')
        this.accountName = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Opportunity.AccountId"]//input[@role="combobox"]')
        this.amount = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Opportunity.Amount"]//input')
        this.type = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Opportunity.Type"]//button[@role="combobox"]')
        this.leadSource = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Opportunity.LeadSource"]//button[@role="combobox"]')
        this.endDate = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Opportunity.End_Date__c"]//input[@type="text"]')
        this.closeDate = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Opportunity.CloseDate"]//input[@type="text"]')
        this.stage = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Opportunity.StageName"]//button[@role="combobox"]')
        this.private = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Opportunity.IsPrivate"]//input[@type="checkbox"]')
        this.trackingNumber = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Opportunity.TrackingNumber__c"]//input[@type="text"]')
        this.description = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Opportunity.Description"]//textarea')

        // buttons
        this.saveBtn = page.locator('div[role="dialog"] button[name="SaveEdit"]')
        this.cancelBtn = page.locator('//*/li[@data-target-selection-name="sfdc:StandardButton.Opportunity.CancelEdit"]//button[@name="CancelEdit"]')
        this.toastSuccess = page.locator('//*/div[@data-key="success"]//a')
    }
 }

 export default signedProjectsForm;