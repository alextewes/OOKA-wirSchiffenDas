const express = require('express');
const axios = require('axios');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

app.post('/calculate', async (req, res) => {
  console.log('Received values:', req.body);
  setTimeout(async () => {
    const response = await axios.post('http://localhost:3002/calculate', req.body);
    res.send(response.data);
  }, 500);
});

app.listen(3001, () => {
  console.log('Oil System Service listening on port 3001');
});
