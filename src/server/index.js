const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.json());

app.use('/api',require('./routes'));

const proxy = require('express-http-proxy');
app.use(proxy('127.0.0.1:3001'));
app.listen(process.env.PORT || 3000);