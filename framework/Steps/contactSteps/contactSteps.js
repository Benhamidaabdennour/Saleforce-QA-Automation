import { expect } from '@playwright/test';

class contactsSteps {
  constructor(topMenuActions, contactsFormActions, contactsDetailPage) {
    this.topMenuActions    = topMenuActions;
    this.contactsFormActions = contactsFormActions;
    this.contactsDetailPage = contactsDetailPage;
  }
    async createNewContact(data){
        console.log(`Creating contact: ${data.firstName} ${data.lastName}`);

        await this.topMenuActions.navigateTo('Contacts');
        await this.contactsFormActions.openNewContactForm();
        await this.contactsFormActions.fillContactForm(data);
        await this.contactsFormActions.saveForm();

        console.log(`Contact form submitted`);
    }  

    // Validate toast + all key fields on the details page
    /*
  async validateContactCreation(data) {
    await this.contactsFormActions.contactsDetailPage.recordTitle.waitFor({
      state: "visible",
      timeout: 10000,
    });
 
    const titleText =
      await this.contactsFormActions.contactsDetailPage.recordTitle.innerText();
    console.log(
      `Record title: expected="${data.salutation} ${data.firstName} ${data.lastName}" | actual="${titleText}"`,
    );
 
    expect(titleText.trim()).toBe(`${data.salutation} ${data.firstName} ${data.lastName}`);
    console.log("Contact Name validated successfully");
  }*/
/*
  async validateContactDetails(data) {
    await this.contactsFormActions.openDetailsPage();
    await this.contactsFormActions.getFieldsValues();
    
  }
*/
}
export default contactsSteps;