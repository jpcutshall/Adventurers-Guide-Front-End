import React, {useState, useContext, useEffect} from "react";
import Axios from "axios"
import { useHistory, useParams } from "react-router-dom"
import UserContext from "../context/UserContext"
import { Form, Button, Container, Spinner } from "react-bootstrap"
import GoogleApiWrapper from "../containers/GoogleApiWrapper"
import ErrorWarning from "../error/ErrorWarning"


export default function EditPost() {
    const backEndUrl = process.env.REACT_APP_API_URL
    let { id } = useParams()
    const [name, setName] = useState()
    const [about, setAbout] = useState()
    const [background, setBackground] = useState()
    const [camping, setCamping] = useState()
    const [gtk, setGtk] = useState()
    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')
    const [tags, setTags] = useState()
    const [post, setPost] = useState({})
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
            const updatedPost = { name, about, background, camping, gtk, lat, long, tags}
            console.log('Update Post ', updatedPost)
            const updatedPostRes = await Axios.put(
                backEndUrl + "/posts/edit/" + id,
                updatedPost,
                { headers: {"x-auth-token": localStorage.getItem("auth-token")}}
            )

            setLoading(false)
            history.push("/posts/" + id)
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg)
            setLoading(false)
        }
    }

    useEffect(() => {
        const getPost = async () => {
            const getPostRes = await Axios.get(backEndUrl + "/posts/" + id)
            setPost(getPostRes.data)
            console.log('Showing Post', getPostRes.data)
        }

        getPost()
    }, [])


    return (
        <Container>
            <h2 className="text-center">Edit Wiki Post</h2>
            {error && (
			<ErrorWarning message={error} clearError={() => setError(undefined)} />
		    )}
            <Form onSubmit={submit}>
                <Form.Group controlId="formBasicText">
                    <Form.Control 
                    type="text" value={post.name}
                    onChange={ (e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicTextArea">
                    <Form.Control 
                    as="textarea" rows={3} value={post.about}
                    onChange={ (e) => setAbout(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicTextArea">
                    <Form.Control 
                    as="textarea" rows={3} value={post.background}
                    onChange={ (e) => setBackground(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicTextArea">
                    <Form.Control 
                    as="textarea" rows={2}  value={post.camping}
                    onChange={ (e) => setCamping(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicTextArea">
                    <Form.Control 
                    as="textarea" rows={3} value={post.gtk}
                    onChange={ (e) => setGtk(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicText">
                    <Form.Control 
                    type="text" placeholder="latitude"
                    value={post.lat}
                    onChange={ (e) => setLat(e.target.value)}
                    disabled
                    />
                </Form.Group>

                <Form.Group controlId="formBasicText">
                    <Form.Control 
                    type="text" placeholder="longitude"
                    value={post.long}
                    onChange={ (e) => setLong(e.target.value)}
                    disabled
                    />
                </Form.Group>

                <Form.Group controlId="formBasicText">
                    <Form.Control 
                    type="text" value={post.tags}
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

