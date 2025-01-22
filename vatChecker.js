// vatChecker.js
const soap = require('soap');
const Bottleneck = require('bottleneck');

// This is the official WSDL for VIES
const url = 'https://ec.europa.eu/taxation_customs/vies/checkVatService.wsdl';

// Create a limiter that allows only 1 concurrent SOAP request
const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 0
});

async function checkVAT(vatCountryCode, vatNumber) {
  // Wrap the SOAP call in limiter.schedule
  return limiter.schedule(async () => {
    try {
      const client = await soap.createClientAsync(url);
      const [result] = await client.checkVatAsync({ countryCode: vatCountryCode, vatNumber: vatNumber });
      return result;
    } catch (error) {
      return { error: error.message };
    }
  });
}

module.exports = { checkVAT };
