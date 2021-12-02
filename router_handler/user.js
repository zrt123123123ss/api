//中间件
const db = require('../db/index');//导入数据库操作模块
const bcrypt = require('bcryptjs');//打入bcryptjs这个包
const jwt = require('jsonwebtoken');//导入jsonwebtoken包
const config = require('../config');//导入jwt密钥全局配置文件
//注册模块函数
exports.regUser = (req,res) =>{
    const userinfo = req.body;
    //对表单中的数据进行合法性验证
    // if(!userinfo.username || !userinfo.password) {
    //     return res.cc('用户名或密码不合法')
    // }
    const sqlStr = 'select * from ev_users where username=?';
    db.query(sqlStr,[userinfo.username],(err,results)=>{
        //执行sql语句失败
        if(err) {
            return res.cc(err)
        }
        //用户名被占用了
        if(results.length>0) {
            return res.cc('用户名被占用，请更换其他用户名')
        }
        //用户名可用，继续操作,用bcrypt。hashSync()对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password,10)
        //定义插入新的sql语句
        const sql = 'insert into ev_users set ?';
        db.query(sql,{username:userinfo.username,password:userinfo.password},function (err,results){
            //执行sql语句成功
            if(err) {
                return res.cc(err)
            }
            //sql语句执行成功，但不影响行数不为1
            if(results.affectedRows !== 1) {
                return res.cc('注册用户失败，请稍后再试')
            }
            //注册成功
            res.send({
                status:0,
                message:'注册成功！'
            })
        }) 
    })
}
//登录模块函数
exports.login = (req,res) => {
    const userinfo = req.body;
    const sql = 'select * from ev_users where username=?';
    db.query(sql,userinfo.username,function(err,results) {
        //执行sql语句失败
        if(err) {
            return res.cc(err);
        }
        //执行sql语句成功，但是查询到数据条数不等于1
        if(results.length !== 1) {
            return res.cc('登录失败')
        }
        const compareResult = bcrypt.compareSync(userinfo.password,results[0].password);
        if(!compareResult) {
            return res.cc('登录失败');
        }
        const user = {...results[0],password:'',user_pic:''};
        const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expiresIN});
        //console.log(user);
        //console.log(tokenStr);
        res.send({
            status:0,
            message:'登录成功',
            token:'Bearer' + tokenStr,
        })
    })
}   