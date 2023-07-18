
const User = require('../models/user');

const bcrypt = require('bcryptjs');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;   // 此處.Strategy可以省略不寫，因為此package預設輸出就是Strategy

module.exports = app => {
    // 初始化Passport模組
    app.use(passport.initialize());
    app.use(passport.session());

    // 設定本地登入策略
    passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
        User.findOne({ email })
            .then(user => {
                if (!user) {
                    // 如果使用者不存在
                    return done(null, false, { message: 'This email is not registered!'});
                }

                return bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return done(null, false, { message: 'Email or Password incorrect.'});
                    }
                    return done(null, user);
                })
            }).catch(err => done(err, false))
    }))

    // 設定序列化及反序列化
    passport.serializeUser((user, done) => {
        done(null, user.id);
    })
    passport.deserializeUser((id, done) => {
        User.findById(id)
            .lean()     // 後續物件可能傳進前端樣板，所以先把資料庫物件換成JS物件
            .then(user => done(null, user))
            .catch(err => done(err, null));
    })
}

