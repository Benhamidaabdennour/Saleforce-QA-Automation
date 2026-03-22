import { da } from '@faker-js/faker';
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
    async triggerVRsForEmptyFields(){
        await this.topMenuActions.navigateTo('Contacts');
        await this.contactsFormActions.openNewContactForm();
        await this.contactsFormActions.saveEmpty();
        await this.contactsFormActions.validateVRsForEmptyFields();

    }
    async validateContactCreation(contactData) {
      await this.contactsFormActions.openDetailsPage();
      const actualData = await this.contactsFormActions.getFieldsValues(contactData);
      await this.contactsFormActions.validateContactDetails(actualData, contactData);
  }
}
export default contactsSteps