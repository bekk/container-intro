const express = require('express');

const PORT = 9000;
const HOST = '0.0.0.0';

const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/health', (req, res) => {
  res.send('MyWonderfulService is healthy\nRunning on Node' + process.version);
});

app.get('/random', (req, res) => {
  res.send((Math.floor(Math.random()*1000)).toString());
});

app.listen(PORT, HOST);
console.log(`Starta servern på http://${HOST}:${PORT}`)
