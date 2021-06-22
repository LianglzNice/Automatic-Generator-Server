const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const cors = require('@koa/cors');
const fs = require('fs');

const app = new Koa();
const router = new Router();

router.post('/export', async ctx => {
    let { list } = ctx.request.body;
    let data = require('./template/html')(list);

    try{
        fs.writeFileSync('files/index.html', data);
        let stream = fs.createReadStream('files/index.html');
        ctx.set({
            'Content-Type': 'application/octet-stream', //告诉浏览器这是一个二进制文件  
            'Content-Disposition': 'attachment; filename=index.html', //告诉浏览器这是一个需要下载的文件  
        });
        ctx.body = stream;
    }catch(err){
        ctx.body = { code: 200, msg: '文件生成失败！' }
    }
})

app.use(bodyParser());
app.use(cors());
app.use(router.routes())
   .use(router.allowedMethods());

app.listen(8020, '127.0.0.1');