import React, { Component } from 'react';
import SideNav from "../SideNav";
import AddTodo from "../Todos/AddTodo";
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Axios from 'axios';

const URL = process.env.REACT_APP_URL;

export default class Tomorrow extends Component {

    state = {
        displayDate: '',
        nextDate: moment().add(1, 'days').format('YYYY MM DD'),
        todos: [],
    }

    tomorrowTodos = () => {
      let token = localStorage.getItem("token");

      Axios.get(`${URL}/todos`, {
          headers: {
              "x-auth-token": token,
          },
      })
        .then((res) => {
          let todos = res.data.todos;

          for (let index = 0; index < todos.length; index++) {
            const element = todos[index];
            let todoDate = new Date(element.scheduled);
            let todoDateFormatted = moment(todoDate).format('YYYY MM DD')

            if(this.state.nextDate === todoDateFormatted) {
              // console.log("we have a match");
              this.setState({ todos: [...this.state.todos, element]});
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    componentDidMount() {
      this.tomorrowTodos();

      let date = moment()
        .add(1, 'days')
        .format('dddd, D MMM YYYY');

      this.setState({ displayDate: date });
    }
   
    render() {
      return (
        <div>
            <SideNav/>
            <div className="mt-4 main">
                <h4 className="today"><strong>Tomorrow</strong></h4>
                <p>{this.state.displayDate}</p>
                <Row className="mt-4">
                {this.state.todos.map((todo) => (
                    <Col key={todo._id} md="4" className="mb-4">
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
      );
    }
}
