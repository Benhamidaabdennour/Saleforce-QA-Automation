 class leadDetailsPage {
  constructor(page) {
    this.page = page;

    // Tabs XPATHs
    this.detailsTab = page.locator('//*/li[@data-target-selection-name="detailTabTab"]').first();
    
    // Fields XPATHs
    this.name = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Lead.Name"]//lightning-formatted-name');
    this.company = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Lead.Company"]//lightning-formatted-text');
    this.phone = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Lead.Phone"]//lightning-formatted-phone/a');
    this.email = page.locator('//*/div[@data-target-selection-name="sfdc:RecordField.Lead.Email"]//lightning-formatted-email//a');
  
  
  }
}
export default leadDetailsPage;