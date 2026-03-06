// utils/MfaService.cjs (CommonJS)
const dotenv = require('dotenv');
dotenv.config();
/// to be confirmed with rym
const otplib = require('otplib');
// authenticator wasn't included when I installed the library
// I'm using the "otplib.generate()" directly
// had to change it to async and await, it was returning a promise
//const { authenticator } = otplib; 

async function generateMfaCode() {
  const secret = process.env.TOTP_SECRET;
  if (!secret) throw new Error('TOTP_SECRET undefined');
  const otpCode = await otplib.generate({secret}); //was expecting an object so I had to refine it
  return otpCode.toString();
}

module.exports = { generateMfaCode };