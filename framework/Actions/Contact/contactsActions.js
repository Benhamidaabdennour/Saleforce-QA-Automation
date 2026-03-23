import { tr } from "@faker-js/faker";
import {lookupSelector, selectRandomPicklist } from "../../utils/helpers.js";
import { expect } from '@playwright/test';

const normalize = (str) => str?.replace(/\u00A0/g, ' ').replace(/\r/g, '').trim();

class contactsActions {
    constructor(contactsPage, contactsFormPage, contactsDetailPage){
        this.contactsFormPage = contactsFormPage
        this.contactsPage = contactsPage
        this.contactsDetailPage = contactsDetailPage    
    }  

    // Open the new contact form
    async openNewContactForm(){
        await this.contactsPage.newBtn.click()
        await this.contactsFormPage.FirstName.waitFor({state: 'visible'})
        }

    async selectPicklist(buttonLocator, value) {
        //await buttonLocator.scrollIntoViewIfNeeded();
        await buttonLocator.focus();
        await buttonLocator.click();
        await this.contactsFormPage.page.waitForTimeout(1000);

        await this.contactsFormPage.page
        .getByRole("option", { name: value, exact: true })
        .click();
  }

    async fillContactForm(data){
        const form = this.contactsFormPage
        
        // Picklist values 
        const dataMailingCountry = await selectRandomPicklist(form.mailingCountry);
        if (dataMailingCountry) {
            data.mailingCountry = dataMailingCountry;
            const dataMailingProvince = await selectRandomPicklist(form.mailingProvince);
        if (dataMailingProvince) data.mailingProvince = dataMailingProvince;
            else data.mailingProvince = ''; // no provinces for this country
        }

        const dataOtherCountry = await selectRandomPicklist(form.otherCountry);
        if (dataOtherCountry) {
            data.otherCountry = dataOtherCountry;
            const dataOtherProvince = await selectRandomPicklist(form.otherProvince);
        if (dataOtherProvince) data.otherProvince = dataOtherProvince;
            else data.otherProvince = ''; // no provinces for this country
        }

        const dataLevel = await selectRandomPicklist(form.level)
        const dataLeadSource = await selectRandomPicklist(form.leadSource)
        const dataNameSalutation = await selectRandomPicklist(form.NameSalutation)
        
        // Updating Data object with the selected picklist values to be used later for validation
        if(dataLevel) data.level = dataLevel
        if(dataLeadSource) data.leadSource = dataLeadSource
        if(dataNameSalutation) data.salutation = dataNameSalutation
        if(dataMailingCountry) data.mailingCountry = dataMailingCountry
        if(dataOtherCountry) data.otherCountry = dataOtherCountry
        
        // Text fields
        if(data.firstName) await form.FirstName.fill(data.firstName)
        if(data.lastName) await form.LastName.fill(data.lastName)
        if(data.account) await lookupSelector(form.Account, data.account)
        if(data.reportsTo) await lookupSelector(form.reportsTo, data.reportsTo)
        if(data.email) await form.email.fill(data.email)
        if(data.phone) await form.phone.fill(data.phone)
        if(data.homePhone) await form.homePhone.fill(data.homePhone)
        if(data.mobilePhone) await form.mobilePhone.fill(data.mobilePhone)
        if(data.otherPhone) await form.otherPhone.fill(data.otherPhone)
        if(data.department) await form.department.fill(data.department)
        if(data.title) await form.Title.fill(data.title)
        if(data.description) await form.description.fill(data.description)
        if(data.languages) await form.languages.fill(data.languages)
        if(data.assistant) await form.assistant.fill(data.assistant)
        if(data.assistantPhone) await form.AssistantPhone.fill(data.assistantPhone)
        if(data.birthday) await form.birthday.fill(data.birthday)
        if(data.fax) await form.fax.fill(data.fax)

        // Address fields
        if(data.mailingStreet) await form.mailingStreet.fill(data.mailingStreet)
        if(data.mailingCity) await form.mailingCity.fill(data.mailingCity)
        if(data.mailingPostalCode) await form.mailingPostalCode.fill(data.mailingPostalCode)
       
        if(data.otherStreet) await form.otherStreet.fill(data.otherStreet)
        if(data.otherCity) await form.otherCity.fill(data.otherCity)
        if(data.otherPostalCode) await form.otherPostalCode.fill(data.otherPostalCode)
    }
       
    async saveEmpty(){
        /**
         You can use this function to save a non-empty form
         But use saveForm() better, it has the verification for the next step
         Including the url changes and the Details tab visibility
         */
        await this.contactsFormPage.saveBtn.waitFor({ state: 'visible', timeout: 5000 });
        await this.contactsFormPage.saveBtn.click({ force: true });
    }
    async saveForm() {
        // This function was edited to include waiting before clicking on Details Tab
        // by validation that the url changed to an actual record
        await this.contactsFormPage.saveBtn.click();
        
        // Wait for the modal to close (form disappears after successful save)
        await this.contactsFormPage.saveBtn.waitFor({ state: 'hidden', timeout: 10000 });
        
        // Wait for navigation to detail page
        await this.contactsFormPage.saveBtn.page().waitForURL('**/view', { timeout: 10000 });
        
        console.log('Record saved successfully');
}
    async saveEdit() {
        await this.contactsFormPage.saveBtn.waitFor({ state: 'visible', timeout: 5000 });
        await this.contactsFormPage.saveBtn.click();
        await this.contactsFormPage.saveBtn.waitFor({ state: 'hidden', timeout: 10000 });
        await this.contactsPage.page.waitForURL('**/view', { timeout: 10000 });
        console.log('Record updated successfully');
    }

    async getFieldsValues(){

        // Prepping fields to be trimmed and normalized for validation
        const mailingAddressTrimmed = await this.contactsDetailPage.mailingAddress.innerText()
        const otherAddressTrimmed = await this.contactsDetailPage.otherAddress.innerText()

        // Extracting and normalizing field values from the UI for validation
        return {
            contactName:    (await this.contactsDetailPage.contactName.innerText()).trim(),
            title:          normalize(await this.contactsDetailPage.title.innerText()),
            email:          normalize(await this.contactsDetailPage.email.innerText()),
            phone:          normalize(await this.contactsDetailPage.phone.innerText()),
            homePhone:      normalize(await this.contactsDetailPage.homePhone.innerText()),
            mobilePhone:    normalize(await this.contactsDetailPage.mobilePhone.innerText()),
            otherPhone:     normalize(await this.contactsDetailPage.otherPhone.innerText()),
            fax:            normalize(await this.contactsDetailPage.fax.innerText()),
            assistant:      normalize(await this.contactsDetailPage.assistantName.innerText()),
            assistantPhone: normalize(await this.contactsDetailPage.assistantPhone.innerText()),
            leadSource:     normalize(await this.contactsDetailPage.leadSource.innerText()),
            level:          normalize(await this.contactsDetailPage.level.innerText()),
            languages:      normalize(await this.contactsDetailPage.languages.innerText()),
            description:    normalize(await this.contactsDetailPage.description.innerText()),
            department:     normalize(await this.contactsDetailPage.department.innerText()),
            mailingAddress: mailingAddressTrimmed.trim().replace(/\n/g, ', '),
            otherAddress:   otherAddressTrimmed.trim().replace(/\n/g, ', '),
        };

    }
   
  
    async alidateToastSuccess() {
        await this.contactsFormPage.toastSuccess.waitFor({
        state: "visible",
        timeout: 10000,
        });
        console.log("Toast success message displayed");
    }

    async validateFieldValue(label, expectedValue) {
        const field = this.contactsDetailPage.getFieldValue(label);
        await field.waitFor({ state: "visible", timeout: 10000 });
        const actualValue = await field.innerText();
        console.log(
        `[${label}]: expected="${expectedValue}" | actual="${actualValue}"`,
        );
        return actualValue.trim();
    }

    async openDetailsPage(){        
        await this.contactsDetailPage.detailsTab.click()
        await this.contactsDetailPage.contactName.waitFor({state: 'visible'})
    }

    async validateContactDetails(actualData, expectedData) {     
        // Map creation data keys → UI keys, normalize to match UI format
        const expectedMapped = {
            // Simple fields containing only one value
            title:          normalize(expectedData.title),
            email:          normalize(expectedData.email).toLowerCase(),
            phone:          normalize(expectedData.phone),
            homePhone:      normalize(expectedData.homePhone),
            mobilePhone:    normalize(expectedData.mobilePhone),
            otherPhone:     normalize(expectedData.otherPhone),
            fax:            normalize(expectedData.fax),
            assistant:      normalize(expectedData.assistant),
            assistantPhone: normalize(expectedData.assistantPhone),
            leadSource:     normalize(expectedData.leadSource),
            level:          normalize(expectedData.level),
            languages:      normalize(expectedData.languages),
            description:    normalize(expectedData.description),
            department:     normalize(expectedData.department),

            // Fields that contain multiple values concatenated in the UI
            // Concatenated name fields
            contactName: [
            expectedData.salutation,
            expectedData.firstName,
            expectedData.lastName
            ].filter(Boolean).join(' '),

            // Concatenated address fields (with newlines replaced by commas, and skipping empty values)
            otherAddress: [
            expectedData.otherStreet,
            [expectedData.otherCity, expectedData.otherProvince, expectedData.otherPostalCode]
                .filter(v => v && v.trim() !== '')
                .join(' '),
            expectedData.otherCountry,
            ].filter(v => v && v.trim() !== '').join(', '),

            mailingAddress: [
            expectedData.mailingStreet,
            [expectedData.mailingCity, expectedData.mailingProvince, expectedData.mailingPostalCode]
                .filter(v => v && v.trim() !== '')
                .join(' '),
            expectedData.mailingCountry,
            ].filter(v => v && v.trim() !== '').join(', '),
        };

        // Validate each field and collect any failures for a final summary log
        const failures = [];

        for (const [key, expectedValue] of Object.entries(expectedMapped)) {
            const actualValue = actualData[key];
            try {
                expect(actualValue).toBe(expectedValue);
                console.log(`✅ ${key}`);
            } catch {
                failures.push(`❌ ${key}: expected "${expectedValue}", got "${actualValue}"`);
            }
        }

        if (failures.length > 0) { // this will only be logged if there are validation failures, otherwise the test will pass silently with checkmarks for each field
            throw new Error(`Contact validation failed:\n${failures.join('\n')}`);
        }
}

    async validateVRsForEmptyFields(){
        // Running basic expect assertions here to validate that the error messages are displayed
        expect(await this.contactsFormPage.lastNameError).toBeVisible()
        console.log('Last Name required field error message is displayed as expected')
        expect(await this.contactsFormPage.saveFormError).toBeVisible()
        console.log('Save form error message is displayed as expected')
    }

    async selectAllContactsList(){
        await this.contactsPage.listViewPicker.click()
        await this.contactsPage.recentListViewsText.waitFor({state: 'visible'})
        await this.contactsPage.listVewAllContacts.click()
    }

    async searchContactInListView(contactName) {
        await this.contactsPage.listVewSearchBox.fill(contactName);
        await this.contactsPage.listVewSearchBox.press('Enter');

        // Wait for results and find exact match
        const contactLink = this.contactsPage.getContactLinkByName(contactName);
        await contactLink.waitFor({ state: 'visible', timeout: 10000 });
        await contactLink.evaluate(el => el.click());
        
        await this.contactsPage.page.waitForURL('**/view', { timeout: 15000 });
        await this.contactsDetailPage.detailsTab.click();
    }    
async openEditForm(){
        await this.contactsDetailPage.dropDownBtn.click()
        await this.contactsDetailPage.editBtn.click()
        await this.contactsFormPage.FirstName.waitFor({state: 'visible'})
    }
}


export default contactsActions