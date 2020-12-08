import React, {useState, useContext, useCallback} from "react";
import Axios from "axios"
import { useHistory } from "react-router-dom"
import { Form, Button, Container } from "react-bootstrap"
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import ErroWarning from "../error/ErrorWarning"

const containerStyle = {
    width: '400px',
    height: '400px'
  };

export default function Post() {
    const backEndUrl = "http://localhost:3003"
    const [map, setMap] = useState()
    const [name, setName] = useState()
    const [about, setAbout] = useState()
    const [background, setBackground] = useState()
    const [camping, setCamping] = useState()
    const [gtk, setGtk] = useState()
    const [lati, setLati] = useState()
    const [long, setLong] = useState()
    const [tags, setTags] = useState()
    const [error, setError] = useState()

    const history = useHistory()

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
      }, [])
     
      const onUnmount = useCallback(function callback(map) {
        setMap(null)
      }, [])

    const submit = async (e) => {
        e.preventDefault()
        try {
            const newPost = { name, about, background, camping, gtk, lati, long, tags }
            const postRes = await Axios.post( backEndUrl + "/posts/new", newPost)
            console.log("POST RESPONSE ::: ", postRes)
            history.push("/")
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
    }

    return (
        <Container>
            <h2>New Wiki Post</h2>
            <Form onSubmit={submit}>
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
                    onChange={ (e) => setBackground(e.target.value)}
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
                    onChange={ (e) => setLati(e.target.value)}
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
            <LoadScript
                googleMapsApiKey="AIzaSyC12MTCxmUc2gU23kdQl-AsTwQYb8gVnGA"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={
                        
                        {lat: -1,
                        lng: -30.10}
                       
                    }
                    zoom={10}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                { /* Child components, such as markers, info windows, etc. */ }
                <></>
                </GoogleMap>
            </LoadScript>
        </Container>
    )
}