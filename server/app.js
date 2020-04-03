var fs = require('fs');
var app = require('express')();
var bodyParser = require('body-parser');
const http = require("http").createServer(app);
const io = require("socket.io")(http);

//创建application/json解析
var jsonParser = bodyParser.json();

//创建application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({extended: false});

io.on("connection", socket => {  // 客户端链接成功
  console.log(123)
  socket.on("login", msg => {  // 监听的频道必须和客户端监听的频道相同，等待消息
    console.log(msg)  
    io.emit("send", "服务端");  // 向所有客户端发送信息
  });

  io.on("disconnect", _ => {  // 客户端断开链接
    
  });

});

app.post('/login',urlencodedParser,(req,res)=>{
  console.log(req.body)
  res.send(req.body)
  fs.writeFile('./username.txt',JSON.stringify(req.body),err=>{
    if(err){
      return console.log(err);
    }else{
      return console.log('写入成功')
    }
  })
})

app.get('/myList',(req,res)=>{
  console.log(req.headers.self)
  res.send('get')
})

http.listen('3010',()=>console.log('启动在 3010 端口'))