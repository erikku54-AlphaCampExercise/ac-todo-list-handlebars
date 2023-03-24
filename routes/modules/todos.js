
const express = require('express');
const router = express.Router();

const Todo = require('../../models/todo');


router.get('/new', (req, res) => {
    return res.render('new')
})

router.post('/', (req, res) => {
    const name = req.body.name;
    return Todo.create({name})
        .then( () => res.redirect('/'))
        .catch( err => console.error(err));
})

router.get('/:id', (req, res) => {

    const id = req.params.id;

    Todo.findOne({ _id: id})
    .lean()
    .then( todo => res.render('detail', {todo}))
    .catch( err => console.log(err));
})

router.get('/:id/edit', (req, res) => {

    const id = req.params.id;

    Todo.findById(id)
    .lean()
    .then( todo => res.render('edit', {todo}))
    .catch( err => console.log(error));

})

router.put('/:id', (req, res) => {

    const id = req.params.id;
    const { name, isDone } = req.body;

    Todo.findById(id)
    .then( todo => {
        todo.name = name;
        todo.isDone = isDone === 'on';
        return todo.save();
    })
    .then( () => res.redirect(`/todos/${id}`))
    .catch( err => console.log(err));
})

router.delete('/:id', (req, res) => {

    const id = req.params.id;

    Todo.findById(id)
    .then( todo => todo.deleteOne() )
    .then( () => res.redirect('/'))
    .catch( err => console.log(err));
})



module.exports = router;