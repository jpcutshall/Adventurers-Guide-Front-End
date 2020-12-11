import React, { useState, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import GoogleApiWrapper from "../containers/GoogleApiWrapper"


export default function ShowPosts() {
    const [post, setPost] = useState({})
    let { id } = useParams()
    console.log('PARAMS IS===', id)

    useEffect(() => {
        const getPost = async () => {
            const getPostRes = await Axios.get(process.env.REACT_APP_API_URL + "/posts/" + id)
            setPost(getPostRes.data)
        }

        getPost()

    }, [])

    return (
        <Container className="m-3 text-center">
            <h1 className="text-center m-3">{post.name}</h1>
            <div>
                <h3>About</h3>
                <p>{post.about}</p>
            </div>
            <div>
                <h3>Location</h3>
                <GoogleApiWrapper lat={post.lat} lng={post.long} />
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
        </Container>

    )
}