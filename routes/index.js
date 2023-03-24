
const express = require('express');
const router = express.Router();

module.exports = router;


const home = require('./modules/home');
const todos = require('./modules/todos');

// 網址符合'/todos'的request導向todo路由
router.use('/todos',todos)
// 網址符合'/'的request導向home路由
router.use('/', home)