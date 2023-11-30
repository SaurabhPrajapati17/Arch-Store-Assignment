const express = require('express');
const bodyParser = require('body-parser');
const { default: axios } = require('axios');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/api', (req, res) => {
  try {
    // Check if the payload has the "str" property
    const inputString = req.body.str;
    if (!inputString) {
      return res.status(400).json({ error: 'Payload must contain a "str" property.' });
    }

    // Use regex to count the number of words
    const wordCount = (inputString.match(/\b\w{2,}\b/g) || []).length;

    // Check if there are at least 8 words
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
