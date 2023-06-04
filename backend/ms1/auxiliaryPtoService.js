const express = require('express');
const axios = require('axios');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
app.use(express.json());
app.use(cors());

// Replace :memory: with a file name to persist the database
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

// Create a table to store configurations
db.run(`CREATE TABLE configurations
        (
            id           INTEGER PRIMARY KEY AUTOINCREMENT,
            auxiliaryPto TEXT,
            oilSystem    TEXT,
            fuelSystem   TEXT
        )`);

app.post('/calculate', async (req, res) => {
  console.log('Received values:', req.body);

  // Store configuration in the database
  let stmt = db.prepare(`INSERT INTO configurations(auxiliaryPto, oilSystem, fuelSystem) VALUES(?, ?, ?)`);
  stmt.run([req.body.auxiliaryPto, req.body.oilSystem, req.body.fuelSystem], function(err) {
    if (err) {
      console.error(err.message);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
  stmt.finalize();

  setTimeout(async () => {
    const response = await axios.post('http://localhost:3001/calculate', req.body);
    res.send(response.data);
  }, 5000);
});

app.listen(3000, () => {
  console.log('Auxiliary PTO Service listening on port 3000');
});
