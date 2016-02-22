//adding babel for ES6 and JSX support
require('babel-register');
require('babel-polyfill');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');

var expressResolver = require('./api/resolver.jsx').default;

// Using ejs
app.set('view engine', 'ejs');

// Serve assets in /public.
app.use(express.static(__dirname + '/public'));

// So we can POST.
app.use(bodyParser.urlencoded());

// Since Mixmax calls this API directly from the client-side, it must be whitelisted.
var corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

// The editor interface.
app.get('/editor', function(req, res) {
  console.log(req.query);
  if (req.query.data) {
    req.query.data = JSON.parse(req.query.data);
  } else {
    req.query.data = {};
  }
  res.render('editor', req.query);
});

// The uploader app interface
app.get('/uploader', function(req, res) {
  console.log(req.query);
  res.render('uploader', req.query);
});

// The in-email representation.
app.post('/api/resolver', cors(corsOptions), expressResolver);

app.listen(process.env.PORT || 8910);
