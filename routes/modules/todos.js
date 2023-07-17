
const express = require('express');
const router = express.Router();

const Todo = require('../../models/todo');


router.get('/new', (req, res) => {
    return res.render('new')
})

router.post('/', (req, res) => {

    const userId = req.user._id;
    const name = req.body.name;

    return Todo.create({ name, userId })
        .then( () => res.redirect('/'))
        .catch( err => console.error(err));
})

router.get('/:id', (req, res) => {

    const userId = req.user._id;
    const id = req.params.id;

    Todo.findOne({ _id: id, userId })
    .lean()
    .then( todo => res.render('detail', {todo}))
    .catch( err => console.log(err));
})

router.get('/:id/edit', (req, res) => {

    const userId = req.user._id;
    const _id = req.params.id;

    Todo.findOne({ _id, userId })
    .lean()
    .then( todo => res.render('edit', {todo}))
    .catch( err => console.log(error));

})

router.put('/:id', (req, res) => {

    const userId = req.user._id;
    const _id = req.params.id;
    const { name, isDone } = req.body;

    Todo.findOne({ _id, userId })
    .then( todo => {
        todo.name = name;
        todo.isDone = isDone === 'on';
        return todo.save();
    })
    .then( () => res.redirect(`/todos/${_id}`))
    .catch( err => console.log(err));
})

router.delete('/:id', (req, res) => {

    const userId = req.user._id;
    const _id = req.params.id;

    Todo.findOne({ _id, userId })
    .then( todo => todo.deleteOne() )
    .then( () => res.redirect('/'))
    .catch( err => console.log(err));
})



module.exports = router;