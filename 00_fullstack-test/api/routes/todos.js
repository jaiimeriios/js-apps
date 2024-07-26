import express from 'express';
const router = express.Router();
import { v4 as uuid } from 'uuid';
import chalk from 'chalk';

let todos = [
    {
        title: 'Lorem ipsum dolor sit amet',
        description: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh praesent tristique magna sit amet purus gravida quis blandit. Nibh sit amet commodo nulla',
        important: true,
        id: uuid(),
    },
    {
        title: 'Sit amet nulla facilisi',
        description: 'morbi tempus iaculis urna id volutpat. Ut tortor pretium viverra suspendisse potenti nullam ac tortor',
        important: false,
        id: uuid(),
    },
];



/*
    Request:    From Client to Server
    Response:   From Server to Client
    Server:     Receive Request and Send Response
    Client:     Send Request and Receive Response
*/



// Find all todos
router.get('/', (req, res) => {
    res.send(todos);
    // console.log(todos)
});

// Find todo details
router.get('/:id', (req, res) => {
    // console.log(req.params)
    // const { id } = req.params
    const foundTodo = todos.find((todo) => {
        return todo.id === req.params.id;
    });
    res.send(foundTodo);
    console.log(chalk.bgYellow(`user requested:: ${foundTodo.title}`))
});

// Create a todo
router.post('/', (req, res) => {
    const todo = req.body;
    todos.push({ ...todo, id: uuid() });
    console.log(chalk.bgGreen(
        `TODO ADDED:: ${todo.title} ${todo.description} ${todo.important}`
    ));
});

// Delte todo
router.delete('/:id', (req, res) => {
    // console.log('deleteee');
    // console.log(req.body);
    todos = todos.filter((todo) => {
        return todo.id !== req.params.id;
    });
    console.log(chalk.bgRed(
        `TODO DELETED:: ${req.params.id}`
    ));
});

// Updated todo
router.put('/:id', (req, res) => {
    const { title, description, important } = req.body;
    const todo = todos.find((todo) => {
        return todo.id === req.params.id;
    })
    if (title) {
        todo.title = title;
        console.log(chalk.bgBlue(
            `New Title:: ${req.body.title}`
        ))
    }
    if (description) {
        todo.description = description;
        console.log(chalk.bgBlue(
            `New Description:: ${req.body.description}`
        ))
    }
    if (important) {
        todo.important = important;
        console.log(chalk.bgBlue(
            `Important:: ${req.body.important}`
        ))
    }
});

export default router;