
const bcrypt = require('bcryptjs')
// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config()
// }

const Todo = require('../todo');
const User = require('../user');
const db = require('../../config/mongoose');

const SEED_USER = {
    name: 'root',
    email: 'root@example.com',
    password: '12345678'
}

db.once('open', () => {
    bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({     // 建立user
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash
    }))
    // 每個create()結果都是一個promise，所有promise結果都產生都才往下走
    .then(user => Promise.all(Array.from(    
            { length: 10 },
            (v, i) => Todo.create({ name: `name-${i}`, userId: user._id })
    )))
    .then(() => {
        console.log('done.');
        process.exit();     // 關閉這段node執行程序
    })
    .catch(err => console.log(err))
})

