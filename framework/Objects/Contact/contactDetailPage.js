
class ContactDetailPage {
  constructor(page) {
    this.page = page;
    // details tab to be clicked
    this.detailsTab = page.locator('//*/li[@data-target-selection-name="detailTabTab"]').first();

    // All fields without Edit access
    this.contactName = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Name"]//lightning-formatted-name[@data-output-element-id="output-field"]');
    this.accountName = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.AccountId"]//force-lookup//a')
    this.title = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Title"]//lightning-formatted-text[@data-output-element-id="output-field"]')
    this.department = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Department"]//lightning-formatted-text[@data-output-element-id="output-field"]')
    this.birthday = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Birthdate"]//lightning-formatted-text[@data-output-element-id="output-field"]')
    this.reportsTo = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.ReportsToId"]//force-lookup//a')
    this.leadSource = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.LeadSource"]//lightning-formatted-text[@data-output-element-id="output-field"]')
    this.phone = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Phone"]//lightning-formatted-phone')
    this.homePhone = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.HomePhone"]//lightning-formatted-phone')
    this.mobilePhone = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.MobilePhone"]//lightning-formatted-phone')
    this.otherPhone = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.OtherPhone"]//lightning-formatted-phone')
    this.fax = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Fax"]//lightning-formatted-phone')
    this.email = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Email"]//lightning-formatted-email')
    this.assistantName = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.AssistantName"]//lightning-formatted-text[@data-output-element-id="output-field"]')
    this.assistantPhone = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.AssistantPhone"]//lightning-formatted-phone')
    this.languages = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Languages__c"]//lightning-formatted-text[@data-output-element-id="output-field"]')
    this.level = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Level__c"]//lightning-formatted-text[@data-output-element-id="output-field"]')
    this.description = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.Description"]//lightning-formatted-text[@data-output-element-id="output-field"]')
    this.mailingAddress = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.MailingAddress"]//lightning-formatted-address[@data-output-element-id="output-field"]')
    this.otherAddress = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Contact.OtherAddress"]//lightning-formatted-address[@data-output-element-id="output-field"]')

    // All compact view fields
    this.recordName = page.locator('//*/lightning-formatted-name[@slot="primaryField"]')
    this.compactAccountName = page.locator('//records-highlights-details-item//a[contains(@href, "/lightning/r/Account/")]')
    this.contactOwner = page.locator('//records-highlights-details-item//a[contains(@href, "/lightning/r/User/")]')
    this.compactEmail = page.locator('//records-highlights-details-item//a[contains(@href, "mailto")]')
    this.compactPhone = page.locator('//records-highlights-details-item[1]//div//lightning-formatted-phone]')

    // Buttons
    this.dropDownBtn = page.locator('//*/ul[@role="presentation"]//lightning-button-menu//button')
    this.editBtn = page.locator('//*/lightning-menu-item[@data-target-selection-name="sfdc:StandardButton.Contact.Edit"]')
    this.saveBtn = page.locator('button[name="SaveEdit"]')


  // Toast message
    this.updateToastMessage = page.locator('//*/div[@data-key="success"]')
      }
}

export default ContactDetailPage;