// modelo
module.exports = (sequelize, type) => {
    const Todo = sequelize.define('todos', {
        title: {
            type: type.STRING
        },
        description: {
            type: type.STRING
        },
        state: {
            type: type.STRING
        }
    },{
        timestamps: true
    });

    return Todo;
}