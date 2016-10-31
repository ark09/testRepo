'use strict';

const 
  bodyParser = require('body-parser'),
  express = require('express'),
  //https = require('https'),  
  fb    = require('./fb');

var app = express();
app.set('port', process.env.PORT );
app.set('view engine', 'ejs');
app.use(bodyParser.json({ verify: fb.verifyRequestSignature }));
app.use(express.static('public'));


//var server  = https.createServer(app);
app.get('/',function(req,res){res.send('You have called the server using HTTP GET');});
app.get('/fb/webhook', function(req,res){fb.webhookValidation(req,res);});
app.get('/fb/authorize', function(req,res){fb.authorize(req,res);});
app.post('/fb/webhook', function(req,res){fb.handleMessagingEvent(req,res);});
/*server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("App Server listening at", addr.address + ":" + addr.port);
});*/
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});