
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const todoSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    isDone: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,    // 型態為ObjectId
        ref: 'User',                    // 參考對象為User model
        index: true,                    // 將此欄位設定為索引，以後用此欄位查找時效能較好
        required: true, 
    },
})

//使用mongoose.model方法，會把定義的Schema編譯程一個可供操作的model物件，名為Todo
module.exports = mongoose.model('Todo', todoSchema);
