import React, {useState, useEffect} from "react";
import Axios from "axios"
import { useHistory, useParams } from "react-router-dom"
//import UserContext from "../context/UserContext"
import { Form, Button, Container, Spinner } from "react-bootstrap"
import GoogleApiWrapper from "../containers/GoogleApiWrapper"
import ErrorWarning from "../error/ErrorWarning"


export default function EditPost() {
    const backEndUrl = process.env.REACT_APP_API_URL
    const { id } = useParams()
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
    
 //   const {userData} = useContext(UserContext)
    const history = useHistory()
    

    const setLatAndLng = (lat, lng) => {
        setLat(lat)
        setLong(lng)
    }

    const handleClick = (e) => {
        setLoading(true)
        submit(e)
    }
    const deleteClick = async (e) => {
        e.preventDefault()
        try {
            
            console.log('Post Id to be deleted', id)
            const deletedPostRes = await Axios.delete( backEndUrl + "/posts/" + id, {
                headers: {"x-auth-token": localStorage.getItem("auth-token")}
            } )
            console.log(deletedPostRes)
            setLoading(false)
            history.push("/")

        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg)
            setLoading(false)
        }
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
            console.log('Updated Post ', updatedPostRes)
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
            setName(getPostRes.data.name)
            setAbout(getPostRes.data.about)
            setCamping(getPostRes.data.camping)
            setBackground(getPostRes.data.background)
            setGtk(getPostRes.data.gtk)
            setLat(getPostRes.data.lat)
            setLong(getPostRes.data.long)
            setTags(getPostRes.data.tags)
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
                    type="text" value={name}
                    onChange={ (e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicTextArea">
                    <Form.Control 
                    as="textarea" rows={3} value={about}
                    onChange={ (e) => setAbout(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicTextArea">
                    <Form.Control 
                    as="textarea" rows={3} value={background}
                    placeholder="History - any history is acceptable - please reference if possible"
                    onChange={(e) => setBackground(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicTextArea">
                    <Form.Control 
                    as="textarea" rows={2}  value={camping}
                    placeholder="Camping - info about camping - Camping spot? - leave no trace? Atleast 200 ft from trail?"
                    onChange={ (e) => setCamping(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicTextArea">
                    <Form.Control 
                    as="textarea" rows={3} value={gtk}
                    placeholder="Good To know - Laws, closures, permits, Events "
                    onChange={ (e) => setGtk(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicText">
                    <Form.Control 
                    type="text" placeholder="latitude"
                    value={lat !== '' ? lat : post.lat}
                    onChange={ (e) => setLat(e.target.value)}
                    disabled
                    />
                </Form.Group>

                <Form.Group controlId="formBasicText">
                    <Form.Control 
                    type="text" placeholder="longitude"
                    value={long !== '' ? long : post.long}
                    onChange={ (e) => setLong(e.target.value)}
                    disabled
                    />
                </Form.Group>

                <Form.Group controlId="formBasicText">
                    <Form.Control 
                    type="text" value={tags}
                    placeholder="tags"
                    onChange={ (e) => setTags(e.target.value)}
                    />
                </Form.Group>
                <Button className="m-3" variant="secondary" 
                type="submit" value="Submit" disabled={isLoading}
                onClick={!isLoading ? handleClick : null}
                >
			    {isLoading ? <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner> : 'Submit Post'}
			    </Button>
                <Button className="m-3 btn btn-danger" 
                disabled={isLoading}
                onClick={!isLoading ? deleteClick : null}
                >
			    {isLoading ? <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner> : 'Delete Post'}
			    </Button>   
                
            </Form>
            <GoogleApiWrapper setCoords={setLatAndLng} lat={post.lat} lng={post.long}/>
        </Container>
    )
}

