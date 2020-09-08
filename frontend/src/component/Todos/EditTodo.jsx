import React, { Component } from "react";
import { Form, Button, Row } from "react-bootstrap";

export default class EditTodo extends Component {
  state = {
    description: this.props.todo.description,
    status: this.props.todo.status,
  };

  changeHandler = (e) => {
    //allow a re render in todo.jsx
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = () => {
    this.props.editTodo(this.state, this.props.todo._id);
  };

  render() {
    let { description, status } = this.state;
    return (
    <div>
        <h1>Edit Todo</h1>
          <Row>
            <Form.Control
              className="mb-4"
              name="description"
              value={description}
              onChange={this.changeHandler}
            />
          </Row>
          <Row>
            <Form.Control
              className="mb-2"
              name="status"
              value={status}
              onChange={this.changeHandler}
            />
          </Row>
          <Button onClick={this.submitHandler}>Submit</Button>
    </div>
    );
  }
}