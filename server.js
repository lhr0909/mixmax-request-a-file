require('babel-register');
require('babel-polyfill');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');

var expressResolver = require('./api/resolver.jsx').default;

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
  res.sendFile(__dirname + '/editor.html');
});

// The in-email representation.
app.post('/api/resolver', cors(corsOptions), expressResolver);

app.listen(process.env.PORT || 8910);
