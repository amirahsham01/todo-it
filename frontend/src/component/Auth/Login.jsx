import React, { Component } from "react";
import { Row, Form, Container, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    redirect: false,
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loginHandler = (e) => {
    e.preventDefault();
    //login here
    this.props.login(this.state);
    this.setState({redirect:true});
  };

  render() {
    if(this.state.redirect){
      return <Redirect to="/home" />
    }
    return (
      <Container className="mt-4 text-center mb-5">
         <h1 className="login pt-3">LOGIN</h1>
        <Row>
        <Col md="6" className="mx-auto mt-3 text-center">
       
        <div className="form">
            <Form className="pt-5 pr-2">
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <input className="input" type="email" name="email" placeholder="Enter email" onChange={this.changeHandler} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <input className="input" type="password" name="password" placeholder="Password" onChange={this.changeHandler} />
              </Form.Group>
              <button className="form-button" onClick={this.loginHandler}>Login</button>
            </Form>
          </div>
        </Col>
        </Row>
      </Container>
    );
  }
}