var express = require('express');
var Upstox = require('upstox');
var upstoxService = require('./service/UpstoxService')
var app = express();
global.service;
const port = 3000;
var bodyParser = require('body-parser');
var upstox;

//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }))

//To parse json data
app.use(bodyParser.json())


/*root*/
app.get('/', function(req, res){
   res.send("<html><head><title>Bean Trade</title></head><body> Welcome to Middle Ware</body> </html>");
});

/*test function*/
app.get('/:test',function(req,res){
    service = new upstoxService("","")
    console.log(service.Test1(req.params.test));
    res.send(service.Test1(req.params.test));
})
/*getting Upstox Access Token*/
app.get('/api/getAccessToken/:apiKey/:apiSecret', function(req, res){
    console.log(req.params.apiKey+" : "+req.params.apiSecret);
    global.service = new upstoxService(req.params.apiKey,req.params.apiSecret);
    console.log(service);
    
    res.send(global.service.getAccessCode()); 
 });

 app.get('/api/getAccessToken', function(req, res){
    var returnString = global.service.generateAccessToken(req.query.code)
    console.log(returnString+"      agchjg;uhjkhjkh")
    res.send(returnString);
 });
 
 /*Get the profile of the login user*/
 app.post('/api/getProfile', function(req, res){
     var access = req.body;

     if(!access.accessCode){
         res.send("Invalid access token");
     }
     upstox.setToken(access.accessCode);
     upstox.getProfile()
        .then(function (response) {
            res.json(response);
            })
        .catch(function(error){
            res.send(error);
        });
 });

 /*To place Order in Upstox if the following format
  { "transaction_type":"b",
    "exchange":"NSE_EQ",
    "symbol": "RELIANCE",
    "quantity": 100,
    "order_type":"m",
    "product": "I" } */
 app.post('/api/placeOrder/:accessCode', function(req, res){
    var access = req.params.accessCode;
    var placeOrderJSON = req.body;
    upstox.setToken(access);

    if(!placeOrderJSON){
        res.send("There is no json check the body: "+placeOrderJSON);
    }
    upstox.placeOrder(placeOrderJSON)
    .then(function (response) {
        res.send(response);
    })
    .catch(function(error){
       res.send(error)
    });
});

/*To get orders History*/
app.post('/api/ordersHistory', function(req, res){
    var access = req.body;

    if(!access.accessCode){
        res.send("Invalid access token");
    }
    upstox.setToken(access.accessCode);
    upstox.getOrders()
    .then(function (response) {
        res.send(response);
    })
    .catch(function(error){
        res.send(error);
    });
});

/* Provides the trades for the current day */
app.post('/api/tradeBook', function(req, res){
    var access = req.body;

    if(!access.accessCode){
        res.send("Invalid access token");
    }
    upstox.setToken(access.accessCode);
    upstox.getTradeBook()
    .then(function (response) {
        res.send(response);
    })
    .catch(function(error){
        res.send(error);
    });
});

/*To run the application in the port*/
app.listen(port,function(){
    console.log("Node Started at "+port);
});