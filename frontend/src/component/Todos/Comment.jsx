import React, { Component } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";
import Axios from "axios";

const URL = process.env.REACT_APP_URL;

export default class Comment extends Component {

    state = {
        todo: this.props.todo,
        comments: [],
        comment: {
            content: "",
        }
    }

    changeHandler = (e) => {
        let copy = { ...this.state };
        copy.comment[e.target.name] = e.target.value;
        //allow a re render in todo.jsx
        this.setState(copy);
    };

    submitComment = () => {
        // this.state.commentsObj.comments.push(this.state.comment);
        // this.props.editTodo(this.state.commentsObj, this.props.todo._id);

        let token = localStorage.getItem("token");

        Axios.post(`${URL}/todos/comments`, this.state.comment, {"headers" : {"x-auth-token": token}})
        .then((res) => {
            this.setState({
                comments: [...this.state.comments, this.state.comment],
                comment: {
                    content: "",
                },
            });
        })
        .catch((err) => {
            console.log(err);
        });
        
    }

    render() {
        let { comment, comments, todo } = this.state;
        return (
            <div className="mt-4">
                <Row>
                    <Col md="5">
                        <h4>Comments: </h4>
                        <ul>
                        {comments.map((c, i) => (
                            <li key={i}>{todo.author.username}: {c.content}</li>
                        ))}
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col md="5">
                        <Form.Control
                        className="my-2"
                        name="content"
                        placeholder="Write a comment"
                        value={comment.content}
                        onChange={this.changeHandler}
                        />
                    </Col>
                </Row>
              <Button onClick={this.submitComment}>Add Comment</Button>
            </div>
        )
    }
}
