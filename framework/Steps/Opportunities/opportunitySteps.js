import { saveToJson, updateRecordJson, getTodayRecord } from '../../utils/saveToJson';
import { opportunityDataset } from '../../data/Opportunities/opportunityData';
import languageConfig from '../../config/languageConfig';
import ENV from '../../config/env';

const newData = opportunityDataset()
const data = opportunityDataset()

class opportunitySteps {
  constructor(topMenuActions, opportunityActions) {
    this.topMenuActions    = topMenuActions;
    this.opportunityActions = opportunityActions;
  }

  async createSignedProject(){
    console.log(`Creating opportunity: ${data.opportunityName}`);

    await this.topMenuActions.navigateTo(languageConfig.menuItems.Opportunities[ENV.lang]);
    await this.opportunityActions.openSignedProjectForm();
    await this.opportunityActions.fillSignedProject(data);
    await this.opportunityActions.saveForm();
    saveToJson('opportunity', data);
  }

  async closeWinOpportunity(){
    await this.opportunityActions.closeWinOpportunity();
}
}

export default opportunitySteps;
export { data }