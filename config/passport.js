
const User = require('../models/user');

const bcrypt = require('bcryptjs');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;   // 此處.Strategy可以省略不寫，因為此package預設輸出就是Strategy
const FacebookStrategy = require('passport-facebook').Strategy;  // 此處.Strategy也可以省略

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

    // 設定Facebook登入策略
    passport.use(new FacebookStrategy({ 
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName']
    }, (accessToken, refreshToken, profile, done) => {
        // console.log(profile);
        const { name, email } = profile._json;
        User.findOne({ email })
            .then(user => {
                if (user) 
                    return done(null, user);

                // 如果沒找到user，就要替他建一筆資料，因為password欄位必填，所以要替他建密碼
                // 產生0-1隨機亂數，轉成36進位(10數字＋26英文字)的字串，在擷取最後的8碼    
                const randomPassword = Math.random().toString(36).slice(-8);
                bcrypt
                .genSalt(10)
                .then(salt => bcrypt.hash(randomPassword, salt))
                .then(hash => User.create({
                    name,
                    email,
                    password: hash
                }))
                .then(user => done(null, user))
                .then(err => done(err, false))
            })
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

