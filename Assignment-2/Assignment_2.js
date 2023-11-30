const express = require('express');
const bodyParser = require('body-parser');
const { default: axios } = require('axios');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/api', (req, res) => {
  try {
    const inputString = req.body.str;
    if (!inputString) {
      return res.status(400).json({ error: 'Payload must contain a "str" property.' });
    }

  
    const wordCount = (inputString.match(/\b\w{2,}\b/g) || []).length;


    if (wordCount >= 8) {
      return res.status(200).json({ message: '200 OK' });
    } else {
      return res.status(406).json({ error: 'Not Acceptable. Must contain at least 8 words.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
