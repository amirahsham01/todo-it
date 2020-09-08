import React, { Component } from 'react';
import SideNav from "../SideNav";
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import AddTodo from './AddTodo';

const URL = process.env.REACT_APP_URL;

export default class AllTodos extends Component {

    state = {
        todos: [],
    };

    fetchTodos = () => {
        let token = localStorage.getItem("token");

        Axios.get(`${URL}/todos`, {
            headers: {
                "x-auth-token": token,
            },
        })
          .then((res) => {
            // console.log(res.data);
            this.setState({ todos: res.data.todos });
          })
          .catch((err) => {
            console.log(err);
          });
    };

    componentDidMount() {
        this.fetchTodos();
    }

    render() {
        return (
            <div>
                <SideNav/>
                <div className="mt-4 main">
                    <h4><strong>All My To-dos</strong></h4>
                    <Row className="mt-4">
                        {this.state.todos.map((todo) => (
                            <Col key={todo._id} md="5" className="mb-4">
                                <Card>
                                    <Card.Body>
                                        {todo.description}
                                        <div>
                                            <Link to={`/todo/${todo._id}`}>See Todo</Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <AddTodo/>
                </div>
            </div>
        )
    }
}
