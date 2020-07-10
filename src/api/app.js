// framework del backend
const express = require("express");
// convierte el json
const bodyParser = require("body-parser");
// manejador de encabesado - peticion y autorizacion
var cors = require('cors');

const methodOverride = require("method-override");
// modelo de la base de datos
const { Todo } = require("./sequelize");
// implementacion
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

const router = express.Router();

// Routes
// buscar y listar
router.get("/api/todo", (req, res, next) => {
    Todo.findAll()
    .then(todos => {
        res.status(200).send({todos});
    }).catch( err => {
        res.status(500).send({err});
    });
    
});

// buscar el id
router.get("/api/todo/:id", (req, res, next) => {
    let id = req.params.id;

    Todo.findOne({where: {id: id}})
    .then(todo => {
        res.status(200).send({todo});
    }).catch( err => {
        res.status(500).send({err});
    });
});


// crear el dato
router.post("/api/todo", (req, res, next) => {
    let data = req.body;

    Todo.create(data)
    .then(todo => {
        res.status(201).send({todo});
    })
    .catch(err => {
        res.status(500).send({err});
    });
});

// actualizar por la id
router.put("/api/todo/:id", (req, res, next) => {
    let id = req.params.id;
    let data = req.body;
    Todo.findOne({where: {id: id}})
    .then(todo => {
        todo.update(data)
        .then(todoUpdated=>{
            res.status(202).send({todo});
        })
    }).catch( err => {
        res.status(500).send({err});
    });
});

// eliminar busca por la id
router.delete("/api/todo/:id", (req, res, next) => {
    let id = req.params.id;
    
    Todo.destroy({where: {id: id}})
    .then(todo => {
        res.status(204).send({todo});
    }).catch( err => {
        res.status(500).send({err});
    });
});

app.use(router)

app.listen(3000, () => {
    console.log("Server running on port 3000");
});