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
var users=[];
io.sockets.on("connection",function(socket){
	socket.on("send message",function(msg){
		console.log("message=",msg);
		io.sockets.emit("new message",msg);
	});
	socket.on("set user",function(data,callback){
		console.log("user=",data);
		if(users.indexOf(data)!=-1)
		{
			callback(false);
		}
		else
		{
			callback(true);
			socket.user=data;
			users.push(socket.user);
			updateuser();
			
		}
	})
	function updateuser(){
		io.sockets.emit("usernames",users);
	}
	socket.on("disconnect",function(){
		//console.log('disconnect',socket.user);
		if(!socket.user)return;
		users.splice(users.indexOf(socket.user),1);
		updateuser();
	});
})