    
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const server = require('./listen.js');
const bodyParser = require('body-parser');
const fs = require('fs');

//Define port used for the server
const PORT = 3000;

//Apply express middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//create sign in route
require(__dirname + '/api/login.js')(app, fs);

//Start server listening for requests
server.listen(http, PORT);