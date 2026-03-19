import {lookupSelector, selectRandomPicklist } from "../../utils/helpers.js";

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
        const mainlingCountryBoolean = await selectRandomPicklist(form.mailingCountry)
        if(mainlingCountryBoolean) await selectRandomPicklist(form.mailingProvince)

        const otherCountryBoolean = await selectRandomPicklist(form.otherCountry)
        if(otherCountryBoolean) await selectRandomPicklist(form.otherProvince)
        
        await selectRandomPicklist(form.level)
        await selectRandomPicklist(form.leadSource)
        await selectRandomPicklist(form.NameSalutation)
        
        // Text fields
        if(data.firstName) await form.FirstName.fill(data.firstName)
        if(data.lastName) await form.LastName.fill(data.lastName)
        if(data.account) await lookupSelector(form.Account, data.account) //form.accountName.fill(data.accountName)
        if(data.reportsTo) await lookupSelector(form.reportsTo, data.reportsTo)
        if(data.email) await form.email.fill(data.email)
        if(data.phone) await form.phone.fill(data.phone)
        if(data.mobile) await form.mobile.fill(data.mobile)
        if(data.department) await form.department.fill(data.department)
        if(data.title) await form.Title.fill(data.title)
        if(data.description) await form.description.fill(data.description)
        if(data.languages) await form.languages.fill(data.languages)
        if(data.assistant) await form.assistant.fill(data.assistant)
        if(data.AssistantPhone) await form.AssistantPhone.fill(data.AssistantPhone)
        if(data.birthday) await form.birthday.fill(data.birthday)
        if(data.fax) await form.fax.fill(data.fax)
        if(data.otherPhone) await form.otherPhone.fill(data.otherPhone)
        if(data.phone) await form.Number.fill(data.phone)

        // Address fields
        if(data.mailingStreet) await form.mailingStreet.fill(data.mailingStreet)
        if(data.mailingCity) await form.mailingCity.fill(data.mailingCity)
        if(data.mailingPostalCode) await form.mailingPostalCode.fill(data.mailingPostalCode)
       
        if(data.otherStreet) await form.otherStreet.fill(data.otherStreet)
        if(data.otherCity) await form.otherCity.fill(data.otherCity)
        if(data.otherPostalCode) await form.otherPostalCode.fill(data.otherPostalCode)
    }
       
    async saveForm(){
        await this.contactsFormPage.saveBtn.click()
    }
        
        /* Picklist values
        if(data.salutation) await this.selectPicklist(form.NameSalutation, data.salutation)
        if(data.leadSource) await this.selectPicklist(form.leadSource, data.leadSource)
        if(data.level) await this.selectPicklist(form.level, data.level) */
        /*
      

    }
   
    async cancelForm(){
        await this.contactsFormPage.cancelBtn.click()
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
    /*
    async getFieldsValues(){
        const contactDetails = {
            contactName: await this.contactsDetailPage.contactName.innerText(),
            accountName: await this.contactsDetailPage.accountName.innerText(),
            title: await this.contactsDetailPage.title.innerText(),
            department: await this.contactsDetailPage.department.innerText(),
            birthday: await this.contactsDetailPage.birthday.innerText(),
            reportsTo: await this.contactsDetailPage.reportsTo.innerText(),
            leadSource: await this.contactsDetailPage.leadSource.innerText(),
            phone: await this.contactsDetailPage.phone.innerText(),
            homePhone: await this.contactsDetailPage.homePhone.innerText(),
            mobilePhone: await this.contactsDetailPage.mobilePhone.innerText(),
            otherPhone: await this.contactsDetailPage.otherPhone.innerText(),
            fax: await this.contactsDetailPage.fax.innerText(),
            email: await this.contactsDetailPage.email.innerText(),
            assistantName: await this.contactsDetailPage.assistantName.innerText(),
            languages: await this.contactsDetailPage.languages.innerText(),
            level: await this.contactsDetailPage.level.innerText(),
            description: await this.contactsDetailPage.description.innerText(),
            mailingAddress: await this.contactsDetailPage.mailingAddress.innerText(),
            otherAddress: await this.contactsDetailPage.otherAddress.innerText()
         }
         console.log("Contact details retrieved from the details page:", contactDetails);
         return contactDetails  
        }
*/

}

export default contactsActions