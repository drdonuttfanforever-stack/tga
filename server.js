const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/index.hta', (req, res) => {
  res.set({
    'Content-Type': 'application/hta',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'no-cache, no-store',
    'Pragma': 'no-cache'
  });
  res.sendFile(__dirname + '/index.hta');
});

app.get('/', (req, res) => {
  res.redirect('/index.hta');
});

app.listen(port, '0.0.0.0', () => {
  console.log('HTA server running on port ' + port);
});
