import React, { useState, useEffect, useContext } from 'react'
import UserContext from "../context/UserContext"
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useParams, useHistory } from 'react-router-dom'
import Axios from 'axios'
import GoogleApiWrapper from "../containers/GoogleApiWrapper"


export default function ShowPosts() {
    const [post, setPost] = useState({})
    const {userData} = useContext(UserContext)
    const { id } = useParams()
    const history = useHistory()

    const checkEditPriv = () => {
        console.log('Checking edit')
        console.log(userData.user)
        console.log(id)
            
    }

    useEffect(() => {
        const getPost = async () => {
            const getPostRes = await Axios.get(process.env.REACT_APP_API_URL + "/posts/" + id)
            setPost(getPostRes.data)
            console.log('Showing Post userID', getPostRes.data)
        }
        

        getPost()
        checkEditPriv()

    }, [])

    
    const editPost = () => {
        history.push('/edit/' + id)
    }

    return (
        <Container className="m-3 text-center">
            <h1 className="text-center m-3">{post.name}</h1>
            <div>
                <h3>About</h3>
                <p>{post.about}</p>
            </div>
            <div>
                <h3>Location</h3>
                <GoogleApiWrapper lat={post.lat} lng={post.long} post={true} />
            </div>
            { post.background ?
                <>
                    <h3>History</h3>
                    <p>{post.background}</p> 
                </>    
                    : null
            }
            { post.camping ?
                <>
                    <h3>Camping Info</h3>
                    <p>{post.camping}</p> 
                </>
                    : null
            }
            { post.gtk ?
                <>
                    <h3>Good To Know</h3>
                    <p>{post.gtk}</p> 
                </>
                    : null
            }
            {  userData.user.id === post.user ?
                <>
                    <Row>
                        <Col>
                            <Button
                            className="m-3 btn btn-secondary"
                            onClick={editPost}
                            >Edit</Button>
                        </Col>
                    </Row>
                </>
                    : <><Row><Col>...</Col></Row></>
                    
            }
               
        </Container>

    )
}