import express from 'express';
const router = express.Router();
import { v4 as uuid } from 'uuid';
import chalk from 'chalk';

let users = [
    {
        firstName: 'Lorem',
        lastName: 'Ipsum',
        email: 'asdf@asdf.com',
        handle: 'asdf',
        id: uuid(),
    },
    {
        firstName: 'Dolor',
        lastName: 'Sit Amet',
        email: 'zxcv@zxcv.com',
        handle: 'zxcv',
        id: uuid(),
    },
];

// Find all users
router.get('/', (req, res) => {
    res.send(users);
    // console.log(users)
});

// Find user details
router.get('/:id', (req, res) => {
    // console.log(req.params)
    // const { id } = req.params
    const foundUser = users.find((user) => {
        return user.id === req.params.id;
    });
    res.send(foundUser);
    console.log(chalk.bgYellow(`user requested:: ${foundUser.firstName}`))
});

// Create a user
router.post('/', (req, res) => {
    const user = req.body;
    users.push({ ...user, id: uuid() });
    console.log(chalk.bgGreen(
        'USER ADDED::', user.firstName, user.lastName, user.email, user.handle
    ));
});

// Delte user
router.delete('/:id', (req, res) => {
    // console.log(req.body);
    users = users.filter((user) => {
        return user.id !== req.params.id;
    });
    console.log(chalk.bgRed(
        `user with id ${req.params.id} has been deleted`
    ));
});

// Updated user
router.put('/:id', (req, res) => {
    const { firstName, lastName, email, handle } = req.body;
    const user = users.find((user) => {
        return user.id === req.params.id;
    })
    if (firstName) {
        user.firstName = firstName;
        console.log(chalk.bgBlue(
            `First name has been updated to --${req.body.firstName}`
        ))
    }
    if (lastName) {
        user.lastName = lastName;
        console.log(chalk.bgBlue(
            `Last name has been updated to --${req.body.lastName}`
        ))
    }
    if (email) {
        user.email = email;
        console.log(chalk.bgBlue(
            `User email has been updated to --${req.body.email}`
        ))
    }
    if (handle) {
        user.handle = handle;
        console.log(chalk.bgBlue(
            `User email has been updated to --${req.body.handle}`
        ))
    }
});

export default router;