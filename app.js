
const express = require('express');
const app = express();

// 僅在非正式環境時使用dotenv
// 在正式上線模式(production mode)中，process.env裡通常會自動新增NODE_ENV，並將值設定成"production"
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const port = process.env.PORT || 3000;

const exphbs = require('express-handlebars').engine;
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

// 載入body-parser
app.use(express.urlencoded({ extended: true }));


// 載入設定使用session儲存機制，其中options物件的secret是驗證字串（最必要設定）
// resave是每次使用者互動後強制更新session，saveUninitialized是強制將未初始化的session存回（這兩項沒設會跳警告）
const session = require('express-session');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

//載入method-override
const methodOverride = require('method-override');  
app.use(methodOverride('_method'));  //設定每一筆請求都會透過method-override進行前處理

// 載入passport使用者驗證機制
const usePassport = require('./config/passport');
usePassport(app);

// 載入connect-flash訊息閃存機制
const flash = require('connect-flash');
app.use(flash());

// 將驗證資料存入res.locals中，供後續路由及view樣板取用
// 注意req.user的資料是在passport的deserialize流程中，從資料庫中取出後放入的
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.user = req.user;
    res.locals.success_msg = req.flash('success_msg');  // 設定success_msg訊息
    res.locals.warning_msg = req.flash('warning_msg');  // 設定warning_msg訊息
    return next();  
})


// 載入路由
const routes = require('./routes');
app.use(routes);


const db = require('./config/mongoose');


app.listen(port, () => {
    console.log(`your app is now listening @ port: ${port}`);
})