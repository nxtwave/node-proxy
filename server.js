const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const request = require('request');

// initialize app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const apiServerHost = process.env.API;
const apiBase = process.env.BASE;

// proxy handler:
app.use(apiBase, function(req, res) {  
    var url = apiServerHost + '/' + apiBase + req.url;
    console.log('url', url);
    var options = {
        url: url,
        strictSSL: false,
        secureProtocol: 'TLSv1_method'
    };
    req.pipe(request(options)).pipe(res);
  }
);

// get port from env and store in app:
const port = process.env.PORT || 3000;
app.set('port', port);

// create HTTP Server
const server = http.createServer(app);

// listen on specified port:
server.listen(port, () => console.log(`API listening on localhost:${port}`));
