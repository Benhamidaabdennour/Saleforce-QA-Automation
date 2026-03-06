import pkg from '../utils/MfaService.cjs';
const { generateMfaCode } = pkg;

export class MFAPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.mfaInputSelector = "#tc";   // input text
    this.verifyBtnSelector = "#save"; // bouton Verify
    this.errorMessage = "tc-error"
  }

  /**
   * Detect MFA page, generate OTP, fill input and click Verify
   */

  // Running this function allowed system to submit a valid OTP code
  // but only for one browser, since playwright runs multiples ones at the same time
  // we have to make sure that a new OTP is generated wheneven we see the expiring message
  //**************TBD****************

  async submitMFA() {
    // If the MFA page is detected by the URL
    if (this.page.url().includes('/identity/verification/method/')) {
      //console.log('MFA page detected: ', this.page.url());

      // Wait until the input is visible
      await this.page.waitForSelector(this.mfaInputSelector, { state: 'visible', timeout: 15000 });

      // Generate OTP
      // added an await here as well
      const otp = await generateMfaCode();
      console.log('Generated OTP:', otp);

      // Fill in the input and click Verify
      await this.page.fill(this.mfaInputSelector, otp);
      await this.page.click(this.verifyBtnSelector);
      console.log('MFA submitted.');
    } else {
      console.log('MFA page not displayed, skipping MFA step.');
    }
  }
/*
    async submitMFAfixed() {
    // If the MFA page is detected by the URL
    if (this.page.url().includes('/identity/verification/method/')) {
      //console.log('MFA page detected: ', this.page.url());

      // Wait until the input is visible
      await this.page.waitForSelector(this.mfaInputSelector, { state: 'visible', timeout: 15000 });

      // Generate OTP
      // added an await here as well
      const otp = await generateMfaCode();
      console.log('Generated OTP:', otp);

      // Fill in the input and click Verify
      await this.page.fill(this.mfaInputSelector, otp);
      await this.page.click(this.verifyBtnSelector);
      console.log('MFA submitted.');
    } else {
      console.log('MFA page not displayed, skipping MFA step.');
    }
  }
*/
}

