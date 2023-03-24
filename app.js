
const express = require('express');
const app = express();
const port = 3000;


const exphbs = require('express-handlebars').engine;
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');


app.use(express.urlencoded({ extended: true }));


const methodOverride = require('method-override');  //載入
app.use(methodOverride('_method'));  //設定每一筆請求都會透過method-override進行前處理


const routes = require('./routes');
app.use(routes);


//僅在非正式環境時使用dotenv
// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }

const db = require('./config/mongoose');


app.listen(port, () => {
    console.log(`your app is now listening @ port: ${port}`);
})