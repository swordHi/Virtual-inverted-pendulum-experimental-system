const http = require('http');
const url = require('url');
const fs = require('fs');
var itv;
var data = {'tdata':[0,0],'sdata':[0,0],'adata':[0,0],'tadata':[0,0]};

var server = http.createServer((req,res)=>{
  let add = url.parse(req.url,true);
  // 初始计算处理
  if(req.url.startsWith('/dynamic/set')){
    fs.readFile('./dynamic/model.html','utf-8', (err, data) => {
      if (err) { // 排除文件路径错误
        console.log('index.html文件路径不正确');
        return;
      }

      // 动态修改初始角度
      let result = add.query.theta;
      data = data.replace('$$60$$',result);

      res.end(data); // index页面发送给浏览器
    })
  }
  else if(add.query.theta){
    io.to(cli[0].id).emit('message', {"theta":add.query.theta});
    cli[0].on('message', callback);
    count();
  }
  
  // 文件请求处理
  else{
    ss.staticServer(req,res,path.join(__dirname,''));
  }
})

var io = require('socket.io')(server);
const ss = require('./Static Server.js');
const path = require('path');

var cli = [];
io.on('connection', function(client){
  console.log('connect');
  cli.push(client); 
  client.on('control', function(obj){      
    let ini_data = {
      "ss":obj.ss,
      "s":data.sdata[0],
      "a":data.adata[0],
      "t":data.tdata[0],
      "ta":data.tadata[0]
    }
    io.to(cli[0].id).emit('change', ini_data);
    cli[0].on('change', callback);
    count();
  });
});



console.log("server started on port 3000");
server.listen(3000);

function callback(obj){   
      data = {'tdata':obj.theta,'sdata':obj.s,'adata':obj.a,'tadata':obj.ta};
      io.to(cli[cli.length-1].id).emit('state',data);
      io.to(cli[cli.length-2].id).emit('control',{'tdata':obj.theta,'sdata':obj.s});
      cli[0].removeAllListeners('message');
      cli[0].removeAllListeners('change');
    }

function count(){  
  if(itv){
      clearInterval(itv);
      itv = null;
  } 
  itv = setInterval(function(){
    io.to(cli[0].id).emit('change', {"ss":0,"s":data.sdata[1],"a":data.adata[1],"t":data.tdata[1],"ta":data.tadata[1]});
    cli[0].on('change', callback);
  },50)   
}