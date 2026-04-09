import pkg from '../../utils/MfaService.js'
const { generateMfaCode } = pkg;

 class MFAPage {
  
  constructor(page) {
    this.page = page;
    this.mfaInput = page.locator('//*/div//input[@name="tc"]');
    this.verifyButton = page.locator('[name="save"]');
  }
}
export default MFAPage;
