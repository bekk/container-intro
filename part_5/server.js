const express = require('express');

const PORT = 9000;
const HOST = '0.0.0.0';

const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});
// min kommentar222
app.listen(PORT, HOST);
console.log(`Starta servern på http://${HOST}:${PORT}`)
