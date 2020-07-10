const Sequelize = require('sequelize');
const TodoModel = require('./models/Todo');

const sequelize = new Sequelize('todo', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb'
  });

const Todo = TodoModel(sequelize, Sequelize);

sequelize.sync()
.then(() => {
    console.log("Tables is created");
});

module.exports = {
    Todo
}