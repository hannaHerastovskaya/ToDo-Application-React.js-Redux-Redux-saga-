
const express = require('express');
const uuid = require('uuid');
const cors = require('cors');
const randtoken = require('rand-token');

const app = express();
app.use(cors());
app.use(express.json());

const toDoList = {
    lists: [
        {
            id: new Date().valueOf(),
            tasks: [
                {
                    id: new Date().valueOf() + 1,
                    isComplete: true,
                    body: 'Co',
                },
                {
                    id: new Date().valueOf() + 2,
                    isComplete: false,
                    body: 'Destroy half of the universe',
                },
            ],
            todoListName: 'My to do list',
            userOwnerId: 0,
        },
        {
            id: new Date().valueOf() + 3,
            tasks: [
                {
                    id: new Date().valueOf() + 4,
                    isComplete: true,
                    body: 'Co 2',
                },
                {
                    id: new Date().valueOf() + 5,
                    isComplete: true,
                    body: 'Destroy half of the universe 2',
                },
            ],
            todoListName: 'My to do list 2',
            userOwnerId: 0,
        },
    ],
    users: [
        {
            login: 'user',
            password: '12345',
        },
    ],
};


app.get('/api/todolists/my', (req, res) => res.json(toDoList.lists));

app.get('/api/tasks/:id', (req, res) => {
    console.log(req.params);
    const listIndex = toDoList.lists.findIndex(list => list.id === parseInt(req.params.id, 10));
    console.log(listIndex);
    const tasks = toDoList.lists[listIndex].tasks;
    console.log(tasks);
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    if (typeof req.body.params.newTask.body !== 'string'
    || typeof req.body.params.newTask.id !== 'number'
    || typeof req.body.params.newTask.isComplete !== 'boolean') {
        res.sendStatus(400);
    } else {
        const list = toDoList.lists.find(i => i.id === req.body.params.todoListId);
        if (list === undefined || list === '') {
            res.sendStatus(404);
        } else {
            list.tasks.push(req.body.params.newTask);
            res.sendStatus(200);
        }
    }
});


app.get('/api/todolists/:id', (req, res) => {
    // console.log(req.params);
    const list = toDoList.lists.find(i => i.id === parseInt(req.params.id, 10));
    // console.log(list);
    if (!list) {
        res.sendStatus(404);
    }
    res.json(list);
});

app.post('/api/todolists', (req, res) => {
    // console.log(req.body);
    if (
        typeof req.body.todoListName !== 'string'
        || !Array.isArray(req.body.tasks)
        || req.body.tasks.some(item => typeof item.id !== 'number'
        || typeof item.body !== 'string' || typeof item.isComplete !== 'boolean')
    ) {
        res.sendStatus(400);
    } else {
        const newList = {
            id: req.body.id,
            tasks: req.body.tasks.map(item => ({
                id: item.id,
                body: item.body,
                isComplete: item.isComplete,
            })),
            todoListName: req.body.todoListName,
            userOwnerId: 0,
        };
        toDoList.lists.push(newList);
        res.json(newList);
    }
});

app.post('/api/auth/login', (req, res) => {
    let status;
    if (typeof req.body.usernameOrEmail !== 'string'
        || typeof req.body.password !== 'string') {
        res.sendStatus(400);
    } else if (toDoList.users.some(user => user.login === req.body.usernameOrEmail
                && user.password === req.body.password)) {
        status = true;
    } else {
        status = false;
    }
    if (status) {
        const token = randtoken.generate(16);
        res.status(200).send({ accessToken: token, tokenType: 'Bearer' });
    } else {
        res.sendStatus(401);
    }
});

app.post('/api/auth/register', (req, res) => {
    console.log('=== registration ===');
    console.log(req.body);
    let status;
    let message;
    // toDoList.users.some(user => console.log(user));
    if (toDoList.users.some(user => user.login === req.body.username) === true) {
        status = false;
        message = 'Username is already taken!';
        res.sendStatus(400);
    } else {
        const newUser = {
            login: req.body.username,
            password: req.body.password,
        };
        console.log(newUser);
        toDoList.users.push(newUser);
        status = true;
        message = 'Username has been registrated!';
        // toDoList.forEach(item => console.log(item.users));
        res.sendStatus(201);
    }
    console.log(toDoList.users);
    res.send({ success: status, message });
});

app.put('/api/todolists/:id', (req, res) => {
    // console.log(req.body);
    if (
        typeof req.body.todoListName !== 'string'
        || !Array.isArray(req.body.tasks)
        || req.body.tasks.some(item => typeof item.id !== 'number'
        || typeof item.body !== 'string' || typeof item.isComplete !== 'boolean')
    ) {
        res.sendStatus(400);
    } else {
        const listIndex = toDoList.lists.findIndex(list => list.id === parseInt(req.params.id, 10));
        // console.log(listIndex);
        if (listIndex === -1) {
            res.sendStatus(404);
        } else {
            const list = toDoList.lists[listIndex];
            toDoList.lists[listIndex].todoListName = req.body.todoListName;
            toDoList.lists[listIndex].tasks = req.body.tasks;
            res.sendStatus(200);
        }
    }
});

app.delete('/api/todolists/:id', (req, res) => {
    const listIndex = toDoList.lists.findIndex(list => list.id === parseInt(req.params.id, 10));
    if (listIndex === -1) {
        res.sendStatus(404);
    } else {
        toDoList.lists.splice(listIndex, 1);
        res.sendStatus(200);
    }
});

app.delete('/api/tasks/:id', (req, res) => {
    console.log(req.params);
    // const listTasks = toDoList.lists.map(list => list.tasks.map());
    // console.log(listTasks);
    // const tasks = listTasks.map(list => list.tasks);
    const list = toDoList.lists.map(i => i.tasks.map(task => task)).map(item => item.filter(task => task.id !== parseInt(req.params.id, 10)));
    // console.log('=== after ===');
    // console.log(list);
    // tasks.forEach(task => task.findIndex(item => item.id === parseInt(req.params.id, 10)));
    // console.log(index);
    console.log(list);
});

app.put('/api/tasks/:id', (req, res) => {
    console.log(req.params);
});

const port = 3001;

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
