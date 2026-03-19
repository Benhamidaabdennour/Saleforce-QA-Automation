import * as OTPAuth from 'otpauth';

function generateMfaCode() {
    console.log('inside generateMfaCode function');

  const secret = process.env.TOTP_SECRET;
  console.log('returned ' + secret);

  if (!secret) throw new Error('TOTP_SECRET undefined');

  const totp = new OTPAuth.TOTP({
    secret: OTPAuth.Secret.fromBase32(secret),
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
  });
  return totp.generate();
}

export default  generateMfaCode;