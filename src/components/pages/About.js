import React from "react"
import { Container, Col, Row, Alert} from "react-bootstrap"

export default function About() {
    return (
        <Container className="m-3 text-center">
            <Row className="m-3">
                <Col>
                <Alert className="text-center shadow p-3 mb-5 rounded" variant="secondary">
                    <p>This page is solely supported by users like you through donations.</p>
                    <p>Please make a donation <a href="/fakedonate">here</a> to keep this source of free information up and running</p>
                </Alert>
                </Col>
            </Row>
            <Row className="m-3">
                <Col>
                    <h1>About</h1>
                </Col>
            </Row>
            <Row className="m-3 bg-dark text-light shadow-lg rounded">
                <Col>
                    <h3>
                        Adventurers Guide is A free Anon User Created wiki for outdoor adventurers
                    </h3>
                    <h3>To Use Create or edit a post please create an account.</h3>
                    <h3>once you are logged in you can click on a post to edit its information or click post near logout to create a new entry.</h3>
                    <h3>Creating a new post is simple. mark the location on the map by simply clicking the location. Add as much information as you can and post!</h3>
                </Col>
            </Row>
            <Row className="m-5">
                <Col>
                    <h2>Unethical use will lead to ban</h2>
                </Col>
            </Row>
        </Container>
    )
}