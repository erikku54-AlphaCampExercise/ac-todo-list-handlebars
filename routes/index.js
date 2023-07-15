
const express = require('express');
const router = express.Router();


const home = require('./modules/home');
const todos = require('./modules/todos');
const users = require('./modules/users');

// 網址符合'/todos'的request導向todo路由
router.use('/todos',todos);
// 網址符合'/users'的request導向users路由
router.use('/users', users);
// 網址符合'/'的request導向home路由
router.use('/', home);


module.exports = router;