
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

//使用mongoose.model方法，會把定義的Schema編譯程一個可供操作的model物件，名為User
module.exports = mongoose.model('User', userSchema);
