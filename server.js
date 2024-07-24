const express = require('express');
const path = require('path');
const { checkVAT } = require('./vatChecker');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/check-vat', async (req, res) => {
    const { countryCode, vatNumber } = req.body;
    const result = await checkVAT(countryCode, vatNumber);
    res.json(result);
});

app.listen(port, () => {
    console.log(`VAT ID checker server running at http://localhost:${port}`);
});
