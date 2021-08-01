const path = require('path');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
// Compression
app.use(compression());
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  defaultSrc: [
    '*',
    '\'self\'',
    'altruizt.xyz',
    'api.altruizt.xyz/*',
  ],
  styleSrc: [
    '\'self\'',
    '\'unsafe-inline\'',
    '*.googleapis.com',
    'altruizt.xyz',
    'api.altruizt.xyz/*',
  ],
  scriptSrc: [
    '\'self\'',
    // '\'unsafe-inline\'',
    'altruizt.xyz',
    'api.altruizt.xyz/*',
  ],
  contentSrc: [
    '\'self\'',
    // '\'unsafe-inline\'',
    'altruizt.xyz',
    'api.altruizt.xyz/*',
  ],
}));

const root = path.join(__dirname, 'build/');
app.use(express.static(root));
app.use((req, res, next) => {
  if (req.method === 'GET' && req.accepts('html') && !req.is('json') && !req.path.includes('.')) {
    res.sendFile('index.html', { root });
  } else next();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
