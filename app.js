let express = require('express');
let path = require('path');
let cors = require('cors');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));

app.use(cors());
app.set('trust proxy', true);

// app.use(express.static(__dirname + '/blogs/dist'));


require('./app/routes')(app);


module.exports = app;
