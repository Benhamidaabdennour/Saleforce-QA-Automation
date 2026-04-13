
class webToLeadActions {
    constructor(webToLeadPage, page){
        this.page = page;
        this.webToLeadPage = webToLeadPage;
    }

    async fillWebToLeadForm(webToleadData){
        await this.webToLeadPage.submitBtn.waitFor({ state: 'visible'});

        await this.webToLeadPage.fullName.fill(webToleadData.fullName);
        await this.webToLeadPage.company.fill(webToleadData.company);
        await this.webToLeadPage.email.fill(webToleadData.email);
        await this.webToLeadPage.phone.fill(webToleadData.phone);
    }

    async submitForm(){
        await this.webToLeadPage.submitBtn.click();
    }
}

export default webToLeadActions;