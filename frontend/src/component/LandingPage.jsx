import React, { Component } from 'react';
import { Row, Col, Image, Container } from 'react-bootstrap';

class LandingPage extends Component {
    render() {
        return (
                <div id="first-section">
                    <svg id="svg" viewBox="-300 0 950 270" >
                        <path d="M-314,267 C105,364 400,100 812,279" fill="none" stroke="white" strokeWidth="120" strokeLinecap="round"/>
                    </svg>
                    <Container>
                        <Row>
                            <Col className="d-flex justify-content-between">
                                <div>
                                    <Image src="note-01.png" height="70px"/>
                                    <span className="logo">TODO.IT</span>
                                </div>
                                <div>
                                    <p id="started">Get Started</p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mt-4">
                                <div className="main-header">
                                    <div className="bodymovin" data-icon="https://s3.amazonaws.com/iconfinder-files/week-of-icons/2018/animations/01.json"></div>
                                    <p className="header">organize<br/>with 
                                        <span className="todoit"> todo.it</span>
                                    </p>
                                    <p id="scroll-text">scroll</p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Image src="scroll.svg" id="scroll"/>
                        </Row>
                    </Container>
                </div>
        )
    }
}

export default LandingPage;
