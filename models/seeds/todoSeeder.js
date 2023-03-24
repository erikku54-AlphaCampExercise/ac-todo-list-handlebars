
const Todo = require('../todo');
const db = require('../../config/mongoose');


db.once('open', () => {
    for (let i = 0; i < 10; i++) {
        Todo.create({name: `name-${i}`})
        .then( () => console.log('create success!') )
        .catch( (err) => {
            if (err) return handleError(err);
        });
    }
    console.log('done');
})

