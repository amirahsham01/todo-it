import React, { Component } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";

export default class Comment extends Component {

    state = {
        comments: [],
        comment: ""
    }

    changeHandler = (e) => {
        //allow a re render in todo.jsx
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        let { comment } = this.state;
        return (
            <div>
                <Row>
                    <Col md="5">
                        {this.state.comments.map((c, i) => (
                            <span key={i}>{c.content}</span>
                        ))}
                    </Col>
                </Row>
                <Row>
                    <Col md="5">
                        <Form.Control
                        className="my-2"
                        name="comment"
                        placeholder="Write a comment"
                        value={comment}
                        onChange={this.changeHandler}
                        />
                    </Col>
                </Row>
              <Button>Add Comment</Button>
            </div>
        )
    }
}
