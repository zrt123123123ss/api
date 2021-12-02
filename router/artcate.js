const express = require('express');
const router = express.Router();
const artcate_handler = require('../router_handler/artcate');
const expressJoi = require('@escook/express-joi');
const {add_cate_schema} = require('../schema/artcate');
const {delete_cate_schema} = require('../schema/artcate');
const {get_cate_schema} = require('../schema/artcate');
const {update_cate_schema} = require('../schema/artcate');
router.get('/cates',artcate_handler.getArticleCates);
router.post('/addcates',artcate_handler.addAticleCates);
router.post('/addcates',expressJoi(add_cate_schema),artcate_handler.addAticleCates);
router.get('/deletecate/:id',expressJoi(delete_cate_schema),artcate_handler.deleteCateById);
router.get('/cates/:id',expressJoi(get_cate_schema),artcate_handler.getArticleById);
router.post('/updatecate',expressJoi(update_cate_schema),artcate_handler.updateCateById);
module.exports = router;