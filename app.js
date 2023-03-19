
const express = require('express');
const app = express();
const port = 3000;


const exphbs = require('express-handlebars').engine;
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');


app.use(express.urlencoded({ extended: true }));

//僅在非正式環境時使用dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI);  //設定連線到mongoDB

// //取得資料庫連線狀態
// const db = mongoose.connection;
// //連線異常(註冊一個事件監聽器，看error事件有沒有發生)
// db.on('error', () => {
//     console.log('mongodb error!')
// })
// //連線成功(註冊一個事件監聽器，看open事件是否發生)
// db.once('open', () => {
//     console.log('mongodb connected!');
// })

mongoose.connect(process.env.MONGODB_URI)
.then( () => {
    console.log('mongodb connected!');
}).catch( (err) => {
    console.log('mongodb error:', err);
})



const Todo = require('./models/todo')

app.get('/', (req, res) => {

    Todo.find()     //取出所有todos
    .lean()         //轉換為js物件
    .then( todos => res.render('index', {todos})) 
    .catch( err => console.error(err));          //error handle
})

app.get('/todos/new', (req, res) => {
    return res.render('new')
})

app.post('/todos', (req, res) => {
    const name = req.body.name;
    return Todo.create({name})
        .then( () => res.redirect('/'))
        .catch( err => console.error(err))
})

app.get('/todos/:id', (req, res) => {

    const id = req.params.id

    Todo.findOne({ _id: id})
    .lean()
    .then( todo => res.render('detail', {todo}))
    .catch( err => console.log(err));
})


app.listen(port, () => {
    console.log(`your app is now listening @ port: ${port}`);
})