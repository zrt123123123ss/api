const db = require('../db/index');
module.exports.getArticleCates = (req,res) => {
    const sqlArticle = 'select * from ev_aericle_cate where is_delete=0 order by id asc';
    db.query(sqlArticle,(err,results) => {
        if(err) {
            return res.cc(err);
        }
        res.send({
            status:0,
            message:'获取文章分类列表成功!',
            data:results,
        })
    })
}
module.exports.addAticleCates = (req,res) => {
    const sqlAddAticle = 'select * from ev_article_cate where name=? or alias=?';
    db.query(sqlAddAticle,[req.body.name,req.body.alias],(err,results) => {
        if(err) {
            return res.cc(err);
        }
        if(results.length === 2) {
            return res.cc('分类名称与别名被占用，请更换后重试!');
        }
        if(results.length === 1 && results[0].name === req.body.name) {
            return res.cc('分类名称被占用，请更换后重试!');
        }
        if(results.length === 1 && results[0].alias === req.body.alias) {
            return res.cc('分类名称被占用，请更换后重试!');
        }
        const sqlInsert = 'insert into ev_article_cate set ?';
        db.query(sqlInsert,req.body,(err,results)=>{
            if(err) {
                return res.cc(err);
            }
            if(results.affectedRows !== 1) {
                return res.cc('新增文章分类失败!');
            }
            res.cc('新增文章分类成功!',0);
        })
    })
}
module.exports.deleteCateById = (req,res) => {
    const sql = 'update ev_article_cate set is_delete=1 where id=?';
    db.query(sql,req.params.id,(req,res)=>{
        if(err) {
            return res.cc(err);
        }
        if(results.affectedRows !== 1) {
            return res.cc('删除文章分类失败!');
        }
        res.cc('删除文章分类成功!');
    })
}
module.exports.getArticleById = (req,res) => {
    const sql = 'select * from ev_article_cate where id=?';
    db.query(sql,req.params.id,(err,results) => {
        if(err) {
            return res.cc(err);
        }
        if(results.length !== 1) {
            return res.cc('获取文章分类数据失败!');
        }
        res.send({
            status:0,
            message:'获取文章分类数据成功!',
            data:results[0],
        })
    })
}
module.exports.updateCateById = (req,res) => {
    const sql = 'select * from ev_article_cate where Id<>? and (name=? or alias=?)';
    db.query(sql,[req.body.Id,req.body.name,req.body.alias],(err,results) => {
        if(err) {
            return res.cc(err);
        }
        if(results.length === 2) {
            return res.cc('分类名称与别名被占用，请更换后重试!');
        }
        if(results.length === 1 && results[0].name === req.body.name) {
            return res.cc('分类名称被占用，请更换后重试!');
        }
        if(results.length === 1 && results[0].alias === req.body.alias) {
            return res.cc('分类别名被占用，请更换后重试!');
        }
        const sql = 'update ev_article_cate set ? where Id=?';
        db.query(sql,[req.body,req.body.Id],(err,results) => {
            if(err) {
                return res.cc(err);
            }
            if(results.affectedRows !== 1) {
                return res.cc('更新文章分类失败!');
            }
            res.cc('更新文章分类成功!');
        })

    })
}