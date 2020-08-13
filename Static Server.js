const path = require('path');
const fs = require('fs');
const mime = require('./static/mime.json');

exports.staticServer = (req,res,root) => {
    fs.readFile(path.join(root,req.url),(err,fileContent)=>{
        if(err){// 没有找到对应文件
            res.writeHead(404,{
                'Content-Type':'text/plain; charset=utf8'
            });
            res.end('页面加载错误');
        }else{
            let dtype = 'text/html';// 获取请求文件的后缀
            let ext = path.extname(req.url);// 如果请求的文件后缀合理，就获取到标准的响应格式
            if(mime[ext]){
                dtype = mime[ext];
            }
            if(dtype.startsWith('text')){// 如果响应的内容是文本，就设置成utf8编码
                dtype += '; charset=utf8'
            }
            res.writeHead(200,{// 设置响应头信息
                'Content-Type':dtype
            });
            res.end(fileContent);
        }
    });
}