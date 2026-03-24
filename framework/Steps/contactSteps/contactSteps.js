import { saveToJson, updateRecordJson } from '../../utils/saveToJson';

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
        saveToJson('contact', data);

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

    async editContactDetails(newData, oldData){
      await this.topMenuActions.navigateTo('Contacts');
      await this.contactsFormActions.selectAllContactsList();
      await this.contactsFormActions.searchContactInListView(oldData.firstName + ' ' + oldData.lastName);
      await this.contactsFormActions.openDetailsPage()
      await this.contactsFormActions.openEditForm();
      await this.contactsFormActions.fillContactForm(newData);
      await this.contactsFormActions.saveEdit();
      updateRecordJson('contact', newData);
    }
    async validateContactUpdate(newData){
      const actualData = await this.contactsFormActions.getFieldsValues();
      await this.contactsFormActions.validateContactDetails(actualData, newData);
    }

    async validatePicklitsValues(){
        console.log(`Inspecting Picklit Values of Contacts`);

        await this.topMenuActions.navigateTo('Contacts');
        await this.contactsFormActions.openNewContactForm();
        await this.contactsFormActions.validateAllPicklits();

    }

}
export default contactsSteps