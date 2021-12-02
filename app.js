const express = require('express');//1.导入express模块
const cors = require('cors');//4.导入cors模块
const config = require('./config');//在路由之前配置token的中间件，导入配置文件
const expressJWT = require('express-jwt');//解析token的中间件
const artCateRouter = require('./router/artcate');//导入文章分类路由模块
const app = express();//2.创建express服务器实例
const joi = require('joi');//导入定义验证规则的包
const userinfoRouter = require('./router/userinfo');//导入并使用用户信息路由模块
const articleRouter = require('./router/artcate');
app.use(cors());
app.use('/my/article',articleRouter);
app.use(express.urlencoded({extended: false }));//6.配置解析application/x-www-form-urlencoded格式的表单数据的中间件
//一定要在路由之前m,封装res.cc函数
app.use((req,res,next) => {
    //status默认值为1，表示失败的情况
    //err的值,可能是一个错误对象吗，也可能是一个错误的描述字符串
    res.cc = function (err,status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message:err,
        })
    }
    next();
})
app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api/]}));//注册jwt模块，指定哪些接口不需要进行Token身份认证
const userRouter = require('./router/user');//导入路由模块
app.use('/my',userinfoRouter);
app.use('/api',userRouter);//注册路由模块
//错误中间件
app.use('/my/article',artCateRouter);
app.use('/uploads',express.static('./uploads'));
app.use(function (err,req,res,next) {
    if(err instanceof joi.ValidationError) {
        return res.cc(err);//数据验证失败的错误
    }
    if(err.name === 'UnauthorizedError') {
        return res.cc('身份认证失败！');//捕获身份认证失败的错误
    }
    //未知错误
    res.cc(err);
})
app.listen(3007,function () {
    console.log('api server running at http://127.0.0.1:3007');
})//3.指定端口号启动web服务器