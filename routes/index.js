
const express = require('express');
const router = express.Router();

const home = require('./modules/home');
const todos = require('./modules/todos');
const users = require('./modules/users');
const auth = require('./modules/auth');

const { authenticator } = require('../middleware/auth');    // 載入驗證程序middleware

// 網址符合'/todos'的request導向todo路由，並加入驗證程序
router.use('/todos', authenticator, todos);
// 網址符合'/users'的request導向users路由
router.use('/users', users);
// 網址符合'/auth'的request導向auth路由
router.use('/auth', auth);
// 網址符合'/'的request導向home路由，並加入驗證程序
router.use('/', authenticator, home);


module.exports = router;