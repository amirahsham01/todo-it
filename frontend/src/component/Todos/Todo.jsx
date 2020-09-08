import React, { Component } from 'react';
import EditTodo from "./EditTodo";
import Comment from "./Comment";
import Axios from 'axios';
import { Button, Badge } from 'react-bootstrap';
import SideNav from '../SideNav';
import { Redirect } from 'react-router-dom';

const URL = process.env.REACT_APP_URL;

export default class Todo extends Component {

    // signal = Axios.CancelToken.source();

    state = {
        todo: null,
        edit: false,
        redirect: false,
    };

    showEdit = () => {
        this.setState((prevState) => ({ edit: !prevState.edit }));
    };

    editTodo = (obj, id) => {
        Axios.put(`${URL}/todos/${id}`, obj)
            .then((res) => {
                console.log("done edit")
                // call method for re render
                this.getTodo();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    removeLabel = (e) => {
        let indexToRemove = Number(e.target.dataset.index);
        Axios.get(`${URL}/todos/${this.props.match.params.id}`)
            .then((res) => {
                let labels = res.data.todo.labels;
                labels.splice(indexToRemove, 1);
                // console.log(res.data.todo.labels);
                this.setState({ todo: res.data.todo });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    deleteTodo = (e) => {
        Axios.delete(`${URL}/todos/${e.target.id}`)
        .then((res) => {
            this.getTodo();
        })
        .catch((err) => {
            console.log(err);
        });

        this.setState({ redirect: true });
    };

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/home' />
        }
    }

    getTodo = () => {
        Axios.get(`${URL}/todos/${this.props.match.params.id}`)
            .then((res) => {
                // console.log(res.data);
                this.setState({ todo: res.data.todo });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount() {
        this.getTodo();
    }

    // componentWillUnmount() {
    //     this.signal.cancel('Api is being canceled');
    // }

    render() {
        let { todo, edit } = this.state;
        return (
            <div className="mt-4">
                <SideNav/>
                <div className="main">
                    <h4>Todo here</h4>
                    {todo ? (
                        <div>
                            <div className="my-2">
                                {todo.description}
                                <p>status: 
                                    <span className={todo.completed === "true" ? 'green' : 'red'}>
                                    {todo.completed ? " completed" : " incompleted"}
                                    </span>
                                </p>
                                {todo.labels.map((label, i) => (
                                    <div key={i} className="label-wrapper">
                                    <Badge pill variant="info" className="mt-0 mb-3 mx-1">{label}</Badge>
                                    <span data-index={i} className="label"  onClick={(e) => this.removeLabel(e)}><i className="fa fa-times-circle"></i></span>
                                    </div>
                                ))}
                            </div>
                            {this.renderRedirect()}
                            <Button onClick={this.deleteTodo} variant="danger" id={todo._id}>Delete</Button>
                            <Button onClick={this.showEdit}>Edit Todo</Button>
                            {edit && <EditTodo todo={todo} editTodo={this.editTodo} />}
                            <Comment todo={todo} editTodo={this.editTodo}/>
                        </div>
                    ) : ("error leh")}
                </div>
            </div>
        )
    }
}