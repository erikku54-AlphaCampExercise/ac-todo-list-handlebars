
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

const db = mongoose.connection;
module.exports = db;