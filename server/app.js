const fs = require('fs');
const path = require('path');
const app = require('express')();
const bodyParser = require('body-parser');
const http = require("http").createServer(app);
const io = require("socket.io")(http);

//创建application/json解析
var jsonParser = bodyParser.json();

//创建application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/**
 * ======================================  socket部分开始   ========================================
 */
io.on("connection", socket => {  // 客户端链接成功
  socket.on("login", msg => {  // 监听的频道必须和客户端监听的频道相同，等待消息
    console.log(msg)
    io.emit("send", "服务端");  // 向所有客户端发送信息
  });

  io.on("disconnect", _ => {  // 客户端断开链接

  });

});
/**
 * ======================================  socket部分结束   ========================================
 */

/**
 * ======================================  接口部分开始   ========================================
 */
// 注册
app.post('/sign', urlencodedParser, (req, res) => {
  // console.log(req.body)
  fs.readFile('./users.json', 'utf8', (err, data) => {
    if (err) {
      return console.log(err)
    }
    let isExist = JSON.parse(data).some(u => u.name == req.body.name && u.userId);
    if (isExist) {
      res.send({
        state: true,
        msg: "用户已存在"
      })
    } else {
      res.send({
        state: false,
        msg: "用户创建"
      })
      let alls = JSON.parse(data);
      let user = {
        userId: new Date().getTime(),
        name: req.body.name,
        exist: true,
        list: []
      }
      alls.push(user);
      fs.writeFile('./users.json', JSON.stringify(alls), err => {
        if (err) {
          return console.log(err);
        } else {
          return console.log('写入成功')
        }
      })
    }
  })
})

// 登录
app.post('/login', urlencodedParser, (req, res) => {
  console.log(req.body)
  fs.readFile('./users.json', 'utf8', (err, data) => {
    if (err) {
      return console.log(err)
    }
    let isExist = JSON.parse(data).some(u => u.name == req.body.name && u.exist);
    if (isExist) {
      res.send({
        isExist: true,
        info: JSON.parse(data).filter(u => u.name == req.body.name)[0]
      })
    } else {
      res.send({
        isExist: false,
        msg: "用户不存在"
      });
    }
  })
})

// 新增工具人信息
app.post('/addItem', urlencodedParser, (req, res) => {
  // console.log(req.headers['custom-id'])
  let id = req.headers['custom-id'];
  // console.log(req.body.name)
  // 读取数据,判断是否已经有改角色
  readData('./users.json', data => {
    // console.log("==================================================")
    // console.log(new Date().toString())
    // console.log(data);
    let user = data.filter(u => u.userId == id)[0];

    let _data = data.map(u => {
      if (u.userId == id) {
        // 判断是否有该工具人
        let gongjuren = u.list.some(g => g.name == req.body.name)
        let _list = null;
        if (gongjuren) {
          // console.log('存在')
          _list = u.list.map(l => {
            if (l.name == req.body.name) {
              return JSON.parse(JSON.stringify(req.body))
            } else {
              return l;
            }
          })
        } else {
          // console.log('没有')
          u.list.push(JSON.parse(JSON.stringify(req.body)))
          _list = u.list;

        }
        // console.log(_list)
        return Object.assign(u, { list: _list })

      } else {
        return u;
      }
    })
    // console.log(_data)
    // 更新user.josn
    writeData('./users.json', JSON.stringify(_data), _ => {
      console.log("更新成功")
      res.send(_data)
    })

    // 更新ddle.json
    let ddleDate = {
      'hs': {
        'data': {
          'pt': [],

        }
      },
    };
    console.log(_data)
    // _data.forEach(item => {
    //   if (item.list.length > 0) {
    //     if(item.list.scene)return;
    //     // let lists = item.list.map(v => {
    //     //   return {

    //     //   }
    //     // })
    //     // let _list = item.list.scene;
    //     console.log(item)
    //   }
    // })


    // writeData('./ddle.json',JSON.stringify(ddleDate), _=>{
    //   console.log("更新成功")
    //   res.send(_data)
    // })

  })
})

// 获取用户信息
app.get('/userInfo', (req, res) => {
  let id = req.headers['custom-id'];
  // console.log(id)
  // 读取数据,判断是否已经有改角色
  readData('./users.json', data => {
    // console.log(data);
    let user = data.filter(u => u.userId == id)[0];
    // console.log(user)
    res.send(user)
  })
})

// 获取当前工具人信息
app.post('/gongjurenInfo', urlencodedParser, (req, res) => {
  let id = req.headers['custom-id'];
  // console.log(req.body.name)
  readData('./users.json', data => {
    let gongjuren = data.filter(u => u.userId == id)[0].list.filter(v => v.name == req.body.name)[0];
    res.send(gongjuren)
  })
})

// 删除当前工具人
app.post('/deleteGongjuren', urlencodedParser, (req, res) => {
  let id = req.headers['custom-id'];
  console.log(req.body.name)
  readData('./users.json', data => {
    let nGongjuren = data.filter(u => u.userId == id)[0].list.filter(v => v.name != req.body.name);
    let _data = data.map(v => {
      if (v.userId == id) {
        return {
          userId: v.userId,
          name: v.name,
          exist: v.exist,
          list: nGongjuren
        }
      } else {
        return v
      }
    })
    writeData('./users.json', JSON.stringify(_data), _ => {
      console.log("删除成功")
      res.send({
        state: true,
        msg: "删除成功"
      })
    })
  })
})

// 获取叠叠乐列表
app.post('/ddleList', urlencodedParser, (req, res) => {
  readData('./ddle.json', data => {
    console.log(data)
    res.send(JSON.stringify(data))
  })
  // res.send('get')
})

app.post('/downLoad', urlencodedParser, (req, res) => {
  // fs.readFile().then(res => {
  // })
  // console.log(123)
  res.writeHead(200, {
    'Content-Type': 'application/octet-stream',//告诉浏览器这是一个二进制文件
    'Content-Disposition': 'attachment; filename=124.json',//告诉浏览器这是一个需要下载的文件
  });//设置响应头
  var readStream = fs.createReadStream('./data.json');//得到文件输入流
  // readStream.on('data', (chunk) => {
  //   console.log(chunk)
  //   res.write(chunk, 'binary');//文档内容以二进制的格式写到response的输出流
  // });
  readStream.pipe(res)
  readStream.on('end', () => {
    console.log('结束')
    res.end();
  })

})

/**
 * ======================================  接口部分结束   ========================================
 */

http.listen('3010', () => console.log('启动在 3010 端口'))



/**
 * ======================================  一些方法   ========================================
 */
// 读取 json 内容
function readData(file, callback) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      return console.log(err)
    }
    // console.log(data.toString())
    callback && callback((JSON.parse(data)))
  })
}

// // 写入 json 内容
function writeData(file, data, callback) {
  fs.writeFile(file, data, err => {
    if (err) {
      return console.log(err);
    } else {
      callback && callback()
    }
  })
}