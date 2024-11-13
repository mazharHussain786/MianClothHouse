import crypto from 'crypto'

const generateSignature = (params, apiSecret) => {
  const stringToSign = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .sort()
    .join('&');

  const signature = crypto
    .createHmac('sha1', apiSecret)
    .update(stringToSign)
    .digest('hex');

  return signature;
};

// Example usage:
const timestamp = 1729058992;
const upload_preset = 'cloth';
const apiSecret = 'oE8h7sMCStd4z-FBqy3WtVwfOws'; // Make sure this is correct

const params = {
  timestamp: timestamp,
  upload_preset: upload_preset
};

const signature = generateSignature(params, apiSecret);
console.log('Generated signature:', signature);
