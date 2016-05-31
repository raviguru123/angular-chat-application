var app=require("express")();
var http=require('http').Server(app);
var io=require("socket.io")(http);
var _ = require('underscore');
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get("/",function(req,res){

	res.sendFile(__dirname+"/index.html");
});




io.on('connection', function(socket){
	socket.on("connect", function () {  
		console.log("Connected!");
	});
	socket.on('chat message', function(msg){
		console.log("message=:",msg);
		io.emit("chat message",msg);
		//socket.broadcast.emit('chat message', msg);
	});
});
http.listen(3000,function(){
	console.log("server listen on port 3000");
});