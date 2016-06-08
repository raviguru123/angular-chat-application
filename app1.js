var express=require("express");
var app=express();
var http=require("http").Server(app);
var io=require("socket.io")(http);

app.use(express.static(__dirname+"/"));
http.listen(3000,function(){
	console.log("server is running=",__dirname);
});

app.get("/",function(req,res){
	res.sendFile(__dirname+"/index.html");
});

io.on("connection",function(socket){
	socket.on("send message",function(msg){
		console.log("message=",msg);
		io.emit("new message",msg);
	})
})