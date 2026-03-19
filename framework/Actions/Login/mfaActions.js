import generateMfaCode from "../../utils/MfaService.js";

class MFAActions {
  constructor(mfaPage) {
    this.mfaPage = mfaPage;
  }

  async submitMFA() {
    try {
      // Wait for MFA input to appear
      console.log('Waiting for MFA input to appear...');
      await this.mfaPage.mfaInput.waitFor({ state: 'visible', timeout: 8000 });
      console.log('MFA input appeared, generating OTP...');

      console.log('Generating MFA code using TOTP...' + generateMfaCode());
      const otp = generateMfaCode(); // no await needed, it's synchronous now
      console.log('Generated OTP:', otp);

      await this.mfaPage.mfaInput.fill(otp);
      await this.mfaPage.verifyButton.click();

    } catch {
      // MFA input never appeared — MFA not required
      console.log('MFA not required or already passed.');
    }
  }
}

export default MFAActions;