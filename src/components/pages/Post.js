import React, {useState, useContext} from "react";
import { useHistory } from "react-router-dom/"
import { Form, Button, Container } from "react-bootstrap"
import ErroWarning from "../error/ErrorWarning"

export default function Post() {
    const [name, setName] = useState()
    const [about, setAbout] = useState()
    const [history, setHistory] = useState()
    const [camping, setCamping] = useState()
    const [gtk, setGtk] = useState()
    const [lat, setLat] = useState()
    const [long, setLong] = useState()
    const [tags, setTags] = useState()
    const [error, setError] = useState()

    const submit = async (e) => {
        e.preventDefault()
        try {

        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
    }

    return (
        <Container>
            <h2>New Wiki Post</h2>
            <Form>
                <Form.Group controlId="formBasicText">
                    <Form.Control 
                    type="text" placeholder="Post Name"
                    onChange={ (e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicTextArea">
                    <Form.Control 
                    as="textarea" rows={3} placeholder="About"
                    onChange={ (e) => setAbout(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicTextArea">
                    <Form.Control 
                    as="textarea" rows={3} placeholder="History"
                    onChange={ (e) => setHistory(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicTextArea">
                    <Form.Control 
                    as="textarea" rows={2} placeholder="Camping"
                    onChange={ (e) => setCamping(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicTextArea">
                    <Form.Control 
                    as="textarea" rows={3} placeholder="Good To know"
                    onChange={ (e) => setGtk(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicText">
                    <Form.Control 
                    type="text" placeholder="latitude"
                    onChange={ (e) => setLat(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicText">
                    <Form.Control 
                    type="text" placeholder="longitude"
                    onChange={ (e) => setLong(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicText">
                    <Form.Control 
                    type="text" placeholder="tags"
                    onChange={ (e) => setTags(e.target.value)}
                    />
                </Form.Group>
                <Button variant="secondary" type="submit" value="Submit">
			    Submit
			  </Button>
                    
                
            </Form>
        </Container>
    )
}