import { saveToJson, updateRecordJson, getTodayRecord } from '../../utils/saveToJson';
import { CONTACT_DETAIL_LABELS, CONTACT_FORM_LABELS, CONTACT_RELATED_LISTS, contactDataset } from '../../data/Contact/contactData';
import languageConfig from '../../config/languageConfig';
import ENV from '../../config/env';
const newData = contactDataset()

class contactsSteps {
  constructor(topMenuActions, contactsFormActions, contactsDetailPage) {
    this.topMenuActions    = topMenuActions;
    this.contactsFormActions = contactsFormActions;
    this.contactsDetailPage = contactsDetailPage;
  }
    async createNewContact(){        
        const data = contactDataset()
        console.log(`Creating contact: ${data.firstName} ${data.lastName}`);

        await this.topMenuActions.navigateTo(languageConfig.menuItems.Contacts[ENV.lang]);
        await this.contactsFormActions.openNewContactForm();
        await this.contactsFormActions.fillContactForm(data);
        await this.contactsFormActions.saveForm();
        saveToJson('contact', data);
    }  
    async triggerVRsForEmptyFields(){
        await this.topMenuActions.navigateTo(languageConfig.menuItems.Contacts[ENV.lang]);
        await this.contactsFormActions.openNewContactForm();
        await this.contactsFormActions.saveEmpty();
        await this.contactsFormActions.validateVRsForEmptyFields();
    }
    async validateContactCreation() {
      const contactData = getTodayRecord('contact')

      await this.contactsFormActions.openDetailsPage();
      const actualData = await this.contactsFormActions.getFieldsValues(contactData);
      await this.contactsFormActions.validateContactDetails(actualData, contactData);
  }

    async editContactDetails(){
      // Getting old Data from the file & New Data from faker
      const oldData = getTodayRecord('contact')

      const actualFullName = oldData.firstName_edited 
      ? oldData.firstName_edited + ' ' + oldData.lastName_edited ?? oldData.lastName
      : oldData.firstName + ' ' + oldData.lastName;

      console.log(actualFullName)

      await this.topMenuActions.navigateTo(languageConfig.menuItems.Contacts[ENV.lang]);
      await this.contactsFormActions.selectAllContactsList();
      await this.contactsFormActions.searchContactInListView(actualFullName);
      await this.contactsFormActions.openDetailsPage()
      await this.contactsFormActions.openEditForm();
      await this.contactsFormActions.fillContactForm(newData);
      await this.contactsFormActions.saveEdit();
      updateRecordJson('contact', newData);
    }
    async validateContactUpdate(){
      const oldData = getTodayRecord('contact')

      const actualData = await this.contactsFormActions.getFieldsValues();
      await this.contactsFormActions.validateContactDetails(actualData, newData);
    }

    async validatePicklitsValues(){
        console.log(`Inspecting Picklit Values of Contacts`);

        await this.topMenuActions.navigateTo(languageConfig.menuItems.Contacts[ENV.lang]);
        await this.contactsFormActions.openNewContactForm();
        await this.contactsFormActions.validateAllPicklits();
        await this.contactsFormActions.cancelForm();
    }

    async validateLabels(data){
        console.log(`Inspecting Labels of Contacts`);

        await this.topMenuActions.navigateTo(languageConfig.menuItems.Contacts[ENV.lang]);
        await this.contactsFormActions.openNewContactForm();
        await this.contactsFormActions.validateFormFieldLabels(CONTACT_FORM_LABELS)

        await this.contactsFormActions.fillContactForm(data);
        await this.contactsFormActions.saveForm();
        await this.contactsFormActions.openDetailsPage()
        await this.contactsFormActions.validateDetailPageLabels(CONTACT_DETAIL_LABELS)

        saveToJson('contact', data);
    }
      async validateRelatedLists(recordName){
      console.log(`Inspecting Related Lists of Contacts`);

      await this.topMenuActions.navigateTo(languageConfig.menuItems.Contacts[ENV.lang]);
      await this.contactsFormActions.searchContactInListView(recordName)
      await this.contactsFormActions.validateRelatedLists(CONTACT_RELATED_LISTS)
  }
}
export default contactsSteps