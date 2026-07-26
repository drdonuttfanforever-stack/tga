const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/index.html', (req, res) => {
  res.set('Content-Type', 'application/hta');
  res.sendFile(__dirname + '/index.html');
});

app.get('/', (req, res) => {
  res.redirect('/index.html');
});

app.listen(port, '0.0.0.0', () => {
  console.log('HTA server on port ' + port);
});
