const path = require('path');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

const {
  SERVER_URI,
  CLIENT_URI,
} = process.env;

const app = express();
// Compression
app.use(compression());
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  useDefaults: 'false',
  directives: {
    defaultSrc: [
      '*',
      '\'self\'',
      SERVER_URI,
      CLIENT_URI,
    ],
    styleSrc: [
      '\'self\'',
      '\'unsafe-inline\'',
      'https://*.googleapis.com',
      SERVER_URI,
      CLIENT_URI,
    ],
    scriptSrc: [
      '\'self\'',
      '\'unsafe-inline\'',
      SERVER_URI,
      CLIENT_URI,
    ],
    contentSrc: [
      '\'self\'',
      '\'unsafe-inline\'',
      SERVER_URI,
      CLIENT_URI,
    ],
    'img-src': [
      '\'self\'',
      '\'unsafe-inline\'',
      'data:',
      SERVER_URI,
      CLIENT_URI,
    ],
    connectSrc: [
      '\'self\'',
      '\'unsafe-inline\'',
      SERVER_URI,
      CLIENT_URI,
    ],
  },
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
