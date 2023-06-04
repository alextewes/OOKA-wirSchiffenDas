const express = require('express');
const axios = require('axios');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

app.post('/calculate', (req, res) => {
  console.log('Received value:', req.body);
  setTimeout(() => {
    res.send({result: 'Calculation complete'});
  }, 500);
});

app.listen(3002, () => {
  console.log('Fuel System Service listening on port 3002');
});
