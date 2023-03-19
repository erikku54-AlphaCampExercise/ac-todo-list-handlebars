
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const todoSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    done: Boolean
})

//使用mongoose.model方法，會把定義的Schema編譯程一個可供操作的model物件，名為Todo
module.exports = mongoose.model('Todo', todoSchema);
