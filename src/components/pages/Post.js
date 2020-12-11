import React, {useState, useContext} from "react";
import Axios from "axios"
import { useHistory } from "react-router-dom"
import UserContext from "../context/UserContext"
import { Form, Button, Container, Spinner } from "react-bootstrap"
import GoogleApiWrapper from "../containers/GoogleApiWrapper"
import ErrorWarning from "../error/ErrorWarning"


export default function Post() {
    const backEndUrl = process.env.REACT_APP_API_URL
    const [name, setName] = useState()
    const [about, setAbout] = useState()
    const [background, setBackground] = useState()
    const [camping, setCamping] = useState()
    const [gtk, setGtk] = useState()
    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')
    const [tags, setTags] = useState()
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState()
    
    const {userData} = useContext(UserContext)
    const history = useHistory()
    

    const setLatAndLng = (lat, lng) => {
        setLat(lat)
        setLong(lng)
    }

    const handleClick = (e) => {
        setLoading(true)
        submit(e)
    }

    

    const submit = async (e) => {
        e.preventDefault()
        try {
            console.log("DATA", userData.user)
            const newPost = { name, about, background, camping, gtk, lat, long, tags, user: userData.user.id }
            console.log('NewPost', newPost)
            const postRes = await Axios.post( backEndUrl + "/posts", newPost, 
            {
                headers: {"x-auth-token": localStorage.getItem("auth-token")}
            }
            )
            console.log(postRes)
            setLoading(false)
            history.push("/")
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg)
            setLoading(false)
        }
    }

    return (
        <Container>
            <h2 className="text-center">New Wiki Post</h2>
            {error && (
			<ErrorWarning message={error} clearError={() => setError(undefined)} />
		    )}
            <Form onSubmit={submit}>
                <Form.Group controlId="formBasicText">
                    <Form.Control 
                    type="text" placeholder="Post Name - location name, lake name, forest name"
                    onChange={ (e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicTextArea">
                    <Form.Control 
                    as="textarea" rows={3} placeholder="About - Lake, National park, State park, Trails, Location marker info- basic info"
                    onChange={ (e) => setAbout(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicTextArea">
                    <Form.Control 
                    as="textarea" rows={3} placeholder="History - any history is acceptable - please reference if possible"
                    onChange={ (e) => setBackground(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicTextArea">
                    <Form.Control 
                    as="textarea" rows={2} placeholder="Camping - info about camping - Camping spot? - leave no trace? Atleast 200 ft from trail?"
                    onChange={ (e) => setCamping(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicTextArea">
                    <Form.Control 
                    as="textarea" rows={3} placeholder="Good To know - Laws, closures, permits, Events "
                    onChange={ (e) => setGtk(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicText">
                    <Form.Control 
                    type="text" placeholder="latitude"
                    value={lat}
                    onChange={ (e) => setLat(e.target.value)}
                    disabled
                    />
                </Form.Group>

                <Form.Group controlId="formBasicText">
                    <Form.Control 
                    type="text" placeholder="longitude"
                    value={long}
                    onChange={ (e) => setLong(e.target.value)}
                    disabled
                    />
                </Form.Group>

                <Form.Group controlId="formBasicText">
                    <Form.Control 
                    type="text" placeholder="tags"
                    onChange={ (e) => setTags(e.target.value)}
                    />
                </Form.Group>
                <Button className="m-3" variant="secondary" 
                type="submit" value="Submit" disabled={isLoading}
                onClick={!isLoading ? handleClick : null}
                >
			    {isLoading ? <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner> : 'Submit Post'}
			  </Button>
                    
                
            </Form>
            <GoogleApiWrapper setCoords={setLatAndLng}/>
        </Container>
    )
}