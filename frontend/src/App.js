import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './index.scss';
import LandingPage from "./component/LandingPage";
import Home from "./component/Home";
import Register from "./component/Auth/Register";
import Login from "./component/Auth/Login";
import Todo from "./component/Todos/Todo";
import Navigation from "./component/Navigation";
import PrivateRoute from "./component/PrivateRoute";
import { decode } from "jsonwebtoken";
import Axios from 'axios';
import { Alert } from "react-bootstrap";
import AllTodos from './component/Todos/AllTodos';
import Tomorrow from './component/Todos/Tomorrow';

const URL = process.env.REACT_APP_URL;

export default class App extends Component {
  state = {
    todos: [],
    errorMessage: null,
    isAuth: false,
    user: null,
  };

  defaultTodo = {
    description: "Add a new task",
    completed: false,
    scheduled: "",
    priority: "",
    labels: ["General"],
  }

  submitDefaultTodo = () => {
    let token = localStorage.getItem("token");

    Axios.post(`${URL}/todos`, this.defaultTodo, 
    {"headers" : {"x-auth-token": token}})
        .then((res) => {
            console.log("registered successfully");
        })
        .catch((err) => {
            console.log(err);
        });
  };

  logoutHandler = (e) => {
    e.preventDefault();
    console.log("i logged out");

    this.setState({
      todos: [],
      isAuth: false,
      user: null,
    });

    localStorage.removeItem("token");
  };

  getUserProfile = (token) => {
    Axios.get(`${URL}/auth/user`, {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) => {
        this.setState({
          isAuth: true,
          user: res.data.user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  loginHandler = (credentials) => {
    //login here
    Axios.post(`${URL}/auth/login`, credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        this.getUserProfile(res.data.token); //get uptodate user information
        
        this.setState({
          isAuth: true,
          successMessage: "user logged in",
        });
      })
      .catch((err) => {
        // console.log(err);
        this.setState({
          isAuth: false,
          errorMessage: err.response.data.message,
        });
      });
  };

  registerHandler = (credentials) => {
    //login here
    Axios.post(`${URL}/auth/register`, credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        this.submitDefaultTodo();

        this.setState({
          isAuth: true,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isAuth: false,
        });
      });
  };

  componentDidMount() {
    // this.fetchTodos();
    let token = localStorage.getItem("token");

    if (!(token == null)) {
      let decodedToken = decode(token);

      if (!decodedToken) {
        localStorage.removeItem("token");
      } else {
        this.getUserProfile(token);
        // this.setState({
        //   isAuth: true,
        // });
      }
    }
  }

  render() {
    let { isAuth, user, errorMessage } = this.state;
    return (
      <Router>
        {errorMessage && <Alert>{errorMessage}</Alert>}
        <Navigation user={user} logout={this.logoutHandler} />
        <Switch>
          <Route path="/" exact render={() => !isAuth ? <LandingPage /> : <Redirect to="/"/>} />
          
          <PrivateRoute exact path="/home" isAuth={isAuth} component={Home} />
          <PrivateRoute exact path="/todo/:id" isAuth={isAuth} component={Todo} />
          <PrivateRoute exact path="/all" isAuth={isAuth} component={AllTodos} />
          <PrivateRoute exact path="/tmrw" isAuth={isAuth} component={Tomorrow} />

          <Route exact path="/register" render={() => isAuth ? <Redirect to="/home"/> : <Register register={this.registerHandler}/>} />
          <Route exact path="/login" render={() => isAuth ? <Redirect to="/home"/> : <Login login={this.loginHandler}/>} />
        </Switch>
      </Router>
    )
  }
}
