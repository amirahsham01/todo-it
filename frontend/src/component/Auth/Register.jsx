import React, { Component } from "react";
import { Row, Form, Container, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export default class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    redirect: false,
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  registerHandler = (e) => {
    e.preventDefault();
    //login here
    this.props.register(this.state);
    this.setState({redirect:true});
  };

  render() {
    if(this.state.redirect){
      return <Redirect to="/home" />
    }
    return (
      <Container className="mt-4 text-center mb-5">
        <h1 className="login pt-3">SIGN UP</h1>
        <Row>
          <Col md="6" className="mx-auto mt-3 text-center">
            <div className="form-two">
              <Form className="pt-5 pr-2">
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <input className="input" type="username" name="username" placeholder="Enter username" onChange={this.changeHandler} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <input className="input" type="email" name="email" placeholder="Enter email" onChange={this.changeHandler} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <input className="input" type="password" name="password" placeholder="Password" onChange={this.changeHandler} />
                </Form.Group>
                <button className="form-button" onClick={this.registerHandler}>Sign Up</button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}