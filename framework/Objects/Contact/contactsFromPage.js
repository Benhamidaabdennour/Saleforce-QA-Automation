
class contactsFormPage {
    constructor(page){
    // Get all locators for the fields we want to fill in for the contact creation form
    
    // Contact information
    this.page = page
    this.NameSalutation = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Name"]//button[@role="combobox"]')
    this.FirstName = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Name"]//input[@name="firstName"]')
    this.LastName = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Name"]//input[@name="lastName"]')
    this.Account = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.AccountId"]//input[@role="combobox"]');
    this.phone = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Phone"]//input[@name="Phone"]')
    this.otherPhone = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.OtherPhone"]//input[@name="OtherPhone"]')
    this.mobilePhone = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.MobilePhone"]//input[@name="MobilePhone"]')
    this.homePhone = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.HomePhone"]//input[@name="HomePhone"]')
    this.Title =  page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Title"]//input[@name="Title"]')
    this.department =  page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Department"]//input[@name="Department"]')
    this.email =  page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Email"]//input[@name="Email"]')
    this.fax =  page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Fax"]//input[@name="Fax"]')
    this.birthday =  page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Birthdate"]//input[@name="Birthdate"]')
    this.reportsTo = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.ReportsToId"]//input[@role="combobox"]');
    this.assistant =  page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.AssistantName"]//input[@name="AssistantName"]')
    this.AssistantPhone =  page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.AssistantPhone"]//input[@name="AssistantPhone"]')
    this.leadSource = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.LeadSource"]//button[@role="combobox"]');
    this.techPartner = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Tech_Partner__c"]//input[@role="combobox"]')
    
    // Lookup Filter related 
    this.techPartnerSearch = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Tech_Partner__c"]//lightning-base-combobox-item//lightning-icon//lightning-primitive-icon').first();
    this.techPartnerSearchMore = page.locator('//*/force-list-view-manager-search-bar//lightning-input//lightning-primitive-input-simple//input')
    this.techPartnerResults = page.locator('[role="dialog"] table[role="grid"]');    
    // Address information
    this.mailingCountry = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.MailingAddress"]//input[@role="combobox"][@name="country"]');
    this.mailingStreet =  page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.MailingAddress"]//textarea[@name="street"]');
    this.mailingCity =  page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.MailingAddress"]//input[@name="city"]');
    this.mailingProvince =  page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.MailingAddress"]//input[@role="combobox"][@name="province"]');
    this.mailingPostalCode =  page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.MailingAddress"]//input[@name="postalCode"]');
    
    // Other address information
    this.otherCountry = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.OtherAddress"]//input[@role="combobox"][@name="country"]');
    this.otherStreet =  page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.OtherAddress"]//textarea[@name="street"]');
    this.otherCity =  page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.OtherAddress"]//input[@name="city"]');
    this.otherProvince =  page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.OtherAddress"]//input[@role="combobox"][@name="province"]');
    this.otherPostalCode =  page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.OtherAddress"]//input[@name="postalCode"]');

    // Additional information   
    this.languages =  page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Languages__c"]//input[@name="Languages__c"]')
    this.level = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Level__c"]//button[@role="combobox"]');
    this.description = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Description"]//textarea[@class="slds-textarea"]');

    // Buttons
    //this.saveBtn = page.locator('//*/li[@data-target-selection-name="sfdc:StandardButton.Contact.SaveEdit"]//button[@name="SaveEdit"]');
    this.saveBtn = page.locator('div[role="dialog"] button[name="SaveEdit"]');
    this.cancelBtn = page.locator('//*/li[@data-target-selection-name="sfdc:StandardButton.Contact.CancelEdit"]//button[@name="CancelEdit"]');

    // toast message
    this.toastMessage = page.locator('.toastMessage')
    this.toastSuccess = page.locator('.slds-theme_success')

    // Error messages
    this.lastNameError = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Name"]//div[@part="help-text"][@data-name="lastName"]//span')
    this.saveFormError = page.locator('//*/div[@role="dialog"]//records-record-edit-error-header//h2')
}
}

export default contactsFormPage;