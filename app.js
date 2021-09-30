let express = require('express');
let path = require('path');
let cors = require('cors');
let app = express();
let bodyParser = require('body-parser');

const swaggerUiExpress  = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');

let credentials = {
    userName: "count-getir",
    password: "H55fC5(9n<2\\]w%&" //Z9$T8p7wwNAF~SGV
};
let realm = 'Basic Authentication';

function authenticationStatus(resp) {
    resp.writeHead(401, { 'WWW-Authenticate': 'Basic realm="' + realm + '"' });
    resp.end('Authorization is needed');

}

app.use('/swagger',(request, response, next) => {
    let authentication, loginInfo;
    if (!request.headers.authorization) {
        authenticationStatus (response);
        return;
    }
    authentication = request.headers.authorization.replace(/^Basic/, '');
    authentication = (new Buffer(authentication, 'base64')).toString('utf8');
    loginInfo = authentication.split(':');
    if (loginInfo[0] === credentials.userName && loginInfo[1] === credentials.password) {
        next()
    }else{
        authenticationStatus (response);
    }

});

app.use('/swagger', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));

app.use(cors());
app.set('trust proxy', true);

// app.use(express.static(__dirname + '/blogs/dist'));


require('./app/routes')(app);


module.exports = app;
