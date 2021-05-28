const http = require('http');
const express = require('express');
const fs = require('fs');
const router = express.Router();
const app = express();
// var path = require('path');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
const server = http.createServer(app);
const { port, URL } = require('./server/config/constants.json');

app.use('/', router);
router.use('/api', router);

app.use('/static', express.static('public'));

//Db Stuff//
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Candidate = require('./server/models/candidate');
var Recruiter = require('./server/models/recruiter');
var Job = require('./server/models/job');

app.use(
	cors({
		origin: '*',
		methods: [ 'GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE' ],
		allowedHeaders: [ 'Authorization', 'Content-Type' ],
		credentials: true
	})
);

// // Compression middleware (should be placed before express.static)
app.use(compression());

// // CookieParser should be above session
app.use(cookieParser());

// bodyParser should be above methodOverride
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.raw());

app.use(methodOverride());

// parse application/json
router.use(bodyParser.json());
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose
	.connect(URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log(`Database connected`);
	})
	.catch((err) => {
		console.error(err);
	});

process.on('unhandledRejection', (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason);
	// Application specific logging, throwing an error, or other logic here
});

// Bootstrap routes
fs.readdirSync(`${__dirname}/server/api`).forEach((file) => {
	fs.readdirSync(`${__dirname}/server/api/${file}`).forEach((subFile) => {
		if (subFile.indexOf('route') !== -1) {
			require(`${__dirname}/server/api/${file}/route`)(app);
		}
	});
});

module.exports = server.listen(port, 'localhost');
console.log(`Server started on port ${port} in ${__dirname}`);
