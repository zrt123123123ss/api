//中间件
//导入定义验证规则的包
const joi = require('joi');
//定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required();
const password = joi.string().pattern(/^[\S]{6,12}$/).required();
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();
const avatar = joi.string().dataUri().required();
module.exports.update_userinfo_schema = {
    body:{
        id,
        nickname,
        email,
    },
}
module.exports.reg_login_schema = {
    body:{
        username,
        password,
    },
}
module.exports.update_password_schema = {
    body:{
        oldPwd:password,
        newPwd:joi.not(joi.ref('oldPwd')).concat(password),
    },
}
module.exports.update_avatar_schema = {
    body:{
        avatar,
    }
}