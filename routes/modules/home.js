
const express = require('express');
const router = express.Router();

const Todo = require('../../models/todo');


router.get('/', (req, res) => {

    Todo.find()     //取出所有todos
    .sort({ _id: 'asc' })     //升冪排序
    .lean()         //轉換為js物件
    .then( todos => res.render('index', {todos})) 
    .catch( err => console.error(err));          //error handle
})

// 匯出路由模組
module.exports = router;