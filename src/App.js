import React, { Component } from 'react';
import { 
    Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label,
    Input, FormGroup, ButtonGroup
} from 'reactstrap';
import Axios from 'axios';

class App extends Component {
    state = {
        todos: [],
        newTodoData: {
            title: '',
            description: '',
            state: 'pending'
        },
        editTodoData: {
            id: '',
            title: '',
            description: '',
            state: ''
        },
        newTodoModal: false,
        editTodoModal: false,
        rSelected: null,
    }

    componentWillMount(){
        this._refreshTodos();
    }

    toggleNewTodoModal(){
        this.setState({
            newTodoModal: ! this.state.newTodoModal
        });
    }

    toggleEditTodoModal(){
        this.setState({
            editTodoModal: ! this.state.editTodoModal
        });
    }

    editTodo(id, title, description, state){
        this.setState({
            editTodoData: {
                id,
                title,
                description,
                state
            },
            editTodoModal: ! this.state.editTodoModal
        })
    }

    addTodo(){
        Axios.post('http://localhost:3000/api/todo', this.state.newTodoData)
        .then((response) => {
            let { todos } = this.state;
            todos.push(response.data.todo);
            this.setState({
                todos,
                newTodoModal: false,
                newTodoData: {
                    title: '',
                    description: '',
                    state: 'pending'
                }
            });
        });
    }

    updateTodo(){
        Axios.put('http://localhost:3000/api/todo/' + this.state.editTodoData.id, this.state.editTodoData)
        .then(() => {
            this._refreshTodos();
            this.setState({
                editTodoModal: false,
                newTodoData: {
                    id: '',
                    title: '',
                    description: '',
                    state: ''
                }
            });
        });
    }

    deleteTodo(id){
        Axios.delete('http://localhost:3000/api/todo/' + id)
        .then(() => {
            this._refreshTodos();
        });
    }

    _refreshTodos(){
        Axios.get('http://localhost:3000/api/todo')
        .then(response => {
            this.setState({
                todos: response.data.todos
            })
        });
    }

    render() {
        let count = 0;
        let todos = this.state.todos.map(todo => {
            return(
                <tr key={todo.id}>
                    <td>{count+=1}</td>
                    <td>{todo.title}</td>
                    <td>{todo.description}</td>
                    <td>{todo.state}</td>
                    <td>
                        <Button className="mr-2" color="success" size="sm" 
                            onClick={
                                this.editTodo.bind(this, todo.id, todo.title, todo.description, todo.state)
                            }>Edit</Button>
                        <Button color="danger" size="sm" onClick={this.deleteTodo.bind(this, todo.id)}>Delete</Button>
                    </td>
                </tr>
            );
        });

        return (
            <div className="App container">
                <h1>To-do App</h1>
                <Button className="my-3" color="primary" onClick={this.toggleNewTodoModal.bind(this)}>Add To-do</Button>
                <Modal isOpen={this.state.newTodoModal} toggle={this.toggleNewTodoModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewTodoModal.bind(this)}>Add a new To-do</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input 
                                id="title" 
                                value={this.state.newTodoData.title} 
                                onChange={ e => {
                                    let { newTodoData } = this.state;
                                    newTodoData.title = e.target.value;
                                    this.setState({ newTodoData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="title">Description</Label>
                            <Input 
                                id="description" 
                                value={this.state.newTodoData.description} 
                                onChange={ e => {
                                    let { newTodoData } = this.state;
                                    newTodoData.description = e.target.value;
                                    this.setState({ newTodoData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="title">State</Label>
                            <ButtonGroup>
                                <Button color="danger" 
                                    onClick={() => {
                                        let { newTodoData } = this.state;
                                        newTodoData.state = 'pending';
                                        this.setState({rSelected: 'pending', newTodoData})
                                    }} 
                                    active={this.state.rSelected === 'pending'}>Pending</Button>
                                <Button color="success" 
                                    onClick={() => {
                                        let { newTodoData } = this.state;
                                        newTodoData.state = 'done';
                                        this.setState({rSelected: 'done', newTodoData})
                                    }} 
                                    active={this.state.rSelected === 'done'}>Done</Button>
                            </ButtonGroup>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addTodo.bind(this)}>Add To-do</Button>
                        <Button color="secondary" onClick={this.toggleNewTodoModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.editTodoModal} toggle={this.toggleEditTodoModal.bind(this)}>
                    <ModalHeader toggle={this.toggleEditTodoModal.bind(this)}>Edit a To-do</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input 
                                id="title" 
                                value={this.state.editTodoData.title} 
                                onChange={ e => {
                                    let { editTodoData } = this.state;
                                    editTodoData.title = e.target.value;
                                    this.setState({ editTodoData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="title">Description</Label>
                            <Input 
                                id="description" 
                                value={this.state.editTodoData.description} 
                                onChange={ e => {
                                    let { editTodoData } = this.state;
                                    editTodoData.description = e.target.value;
                                    this.setState({ editTodoData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="title">State</Label>
                            <ButtonGroup>
                                <Button color="danger" 
                                    onClick={() => {
                                        let { editTodoData } = this.state;
                                        editTodoData.state = 'pending';
                                        this.setState({rSelected: 'pending', editTodoData})
                                    }} 
                                    active={this.state.rSelected === 'pending'}>Pending</Button>
                                <Button color="success" 
                                    onClick={() => {
                                        let { editTodoData } = this.state;
                                        editTodoData.state = 'done';
                                        this.setState({rSelected: 'done', editTodoData})
                                    }} 
                                    active={this.state.rSelected === 'done'}>Done</Button>
                            </ButtonGroup>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateTodo.bind(this)}>Update To-do</Button>
                        <Button color="secondary" onClick={this.toggleEditTodoModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>State</th>
                            <th>Action</th>
                        </tr>
                    </thead>
            
                    <tbody>
                        {todos}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default App;
