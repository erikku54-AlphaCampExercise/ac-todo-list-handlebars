
const express = require('express');
const router = express.Router();

const passport = require('passport');
const bcrypt = require('bcryptjs');

const User = require('../../models/user');

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
}))

// 登出： 舊版passport v0.4是同步函數，但新版v0.6是非同步函數，需要在callback中做後續動作
// 根據官方文件，logout的router若可以使用post方法會更好
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return console.log(err);
        req.flash('success_msg', '你已經成功登出。')
        res.redirect('/users/login');
    });
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register', (req, res) => {
    // 取得註冊表參數
    const { name, email, password, confirmPassword } = req.body;
    
    const errors = []
    // 檢查填寫錯誤
    if (!name || !email || !password || !confirmPassword) {
        errors.push({message: '所有欄位都是必填。'})
    }
    if (password !== confirmPassword) {
        errors.push({message: '密碼與確認密碼不相符！'})
    }

    if (errors.length) {
        return res.render('register', {
            errors,
            name,
            email,
            password,
            confirmPassword
        })
    }

    // 檢查使用者是否已經註冊
    User.findOne({ email })
    .then( user => {
        // 如果已經註冊，退回原本畫面
        if (user) {
            // console.log('User already exists.');
            errors.push({message: '這個Email已經註冊過了。'})
            return res.render('register', {
                errors,
                name,
                email,
                password,
                confirmPassword,
            }); 
        } 

        return bcrypt
            .genSalt(10)    // 產生salt，並設定複雜係數為10
            .then(salt => bcrypt.hash(password, salt))  // 為使用者密碼加salt，產生雜湊值
            .then(hash => User.create({
                name,
                email,
                password: hash,     // 使用雜湊值取代原先的密碼
            }))
            .then(() => {
                req.flash('success_msg', '註冊成功！請重新登入。')
                res.redirect('/users/login');
            })
            .catch(err => console.log(err));
    })
    // .catch(err => console.log(err));
})



module.exports = router;
