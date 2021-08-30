// BUILD YOUR SERVER HERE
const express = require('express');
const server = express();
server.use(express.json());

const Users = require('./users/model');

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!!!' })
})

server.post('/api/users', (req, res) => {
    const newUser = req.body;
    Users.insert(newUser)
        .then(dogs => {
          if(newUser.name && newUser.bio){
            res.status(201).json(dogs)
          }
          else{
            res.status(400).json({ message: 'provide name and bio' })
          }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    Users.findById(id)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            }
            else {
                res.status(404).json({ message: 'does not exist' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    Users.remove(id)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            }
            else {
                res.status(404).json({ message: `does not exist` })
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;



    try {
        const result = await Users.update(id, changes)
        if (changes.name && changes.bio && result !== null) {
            res.status(200).json(result)
        }
        else if (result !== null) {
            res.status(400).json({ message: `provide name and bio` })
        }
        else{
            res.status(404).json({ message: `does not exist` })
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})


module.exports = server;
