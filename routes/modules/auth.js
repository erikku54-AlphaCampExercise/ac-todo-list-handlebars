
const express = require('express');
const router = express.Router();

const passport = require('passport');

// facebook驗證登入需要兩條路由，包含：
// 1. 使用者要求使用Facebook帳號登入的按鈕
// 2. Facebook獲得使用者同意之後，將使用者資料發送給Express的位址

// 路由1: 收到使用者要求使用，向Facebook發出資料請求，帶入的參數scope是我們向Facebook要求的資料
router.get('/facebook', passport.authenticate('facebook', 
    { scope: ['email', 'public_profile']}
))

// 路由2: 收到facebook把資料發回來，決定要再導向哪個分頁
router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/users/login'
}))

module.exports = router;