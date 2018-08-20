var express      = require('express');
var path         = require('path');
var favicon      = require('static-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var load         = require('express-load');//npm install express-load
var mongoose     = require('mongoose');

// conexão com o mongodb
mongoose.connect('mongodb://localhost/WateringSystem',function (err){
	if (err) {
		console.log(err);
	} else {
		console.log('mongodb OK');
	}
});

var app = express();

//middleware
var erros = require('./middleware/erros');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'sua-chave-secreta' }));
app.use(express.static(path.join(__dirname, 'public')));

load('model').then('middleware').then('controller').then('routes').into(app);//npm install express-load

//middleware
app.use(erros.notfound);
app.use(erros.serverError);

app.listen(3000, function() {
    console.log('Express server listening on port 3000');
});
//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript