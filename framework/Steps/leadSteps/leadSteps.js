import { th } from '@faker-js/faker';
import ENV from '../../config/env';
import languageConfig from '../../config/languageConfig';

import { webToLeadDataset } from '../../data/Lead/leadData';
const webToLeadData = webToLeadDataset();
class leadSteps {
    constructor(webToLeadActions, topMenuActions, leadPage, leadActions) {
        this.webToLeadActions = webToLeadActions;
        this.topMenuActions = topMenuActions;
        this.leadPage = leadPage;
        this.leadActions = leadActions;
    }

    async submitWebToLeadForm(){
        console.log(`Submitting Web To Lead form for: ${webToLeadData.fullName}`);
        await this.webToLeadActions.fillWebToLeadForm(webToLeadData);
        await this.webToLeadActions.submitForm();
    }

    async validateWebToLeadCreation() {
        
        await this.topMenuActions.navigateTo(languageConfig.menuItems.Leads[ENV.lang]);
        await this.leadActions.selectAllLeadsList();
        await this.leadActions.searchLeadInListView(webToLeadData.fullName);
        const actualData = await this.leadActions.getFieldsValues();
        await this.leadActions.validateWebtoLeadData(webToLeadData, actualData);
    }
}
export default leadSteps;