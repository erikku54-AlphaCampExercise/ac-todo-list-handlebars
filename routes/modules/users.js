
const express = require('express');
const router = express.Router();

const passport = require('passport');

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
        res.redirect('/users/login');
    });
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register', (req, res) => {
    // 取得註冊表參數
    const { name, email, password, confirmPassword } = req.body;
    // 檢查使用者是否已經註冊
    User.findOne({ email })
    .then( user => {
        // 如果已經註冊，退回原本畫面
        if (user) {
            console.log('User already exists.');
            res.render('register', {
                name,
                email,
                password,
                confirmPassword,
            }); 
        } else {
            return User.create({
                name,
                email,
                password,
            }).then(() => res.redirect('/'))
            .catch(err => console.log(err));
        }
    })
    .catch(err => console.log(err));
})



module.exports = router;
