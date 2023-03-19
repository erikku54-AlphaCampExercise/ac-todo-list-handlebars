
const mongoose = require('mongoose');
const Todo = require('../todo');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

mongoose.connect(process.env.MONGODB_URI)
.then( () => {
    console.log('mongodb connected!');

    for (let i = 0; i < 10; i++) {
        Todo.create({name: `name-${i}`})
        .then( () => console.log('create success!') )
        .catch( (err) => {
            if (err) return handleError(err);
        });
    }
    console.log('done');

}).catch( (err) => {
    console.log('mongodb error: ', err);
})