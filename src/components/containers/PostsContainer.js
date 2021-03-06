import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'
import { Card, CardColumns } from 'react-bootstrap'

export default function PostsContainer(props) {
    const [ posts, setPosts ] = useState([])
    
    const history = useHistory()
   
    useEffect(() => {
		const getPosts = async () => {
			const postsRes = await Axios.get(process.env.REACT_APP_API_URL + "/posts/all")
			console.log("POSTRESPONSE ", postsRes)
			setPosts(postsRes.data)
		}
        
		getPosts()

    }, [])
    
    const openPost = (postId) => {
        history.push('/posts/' + postId)
    }

    const onHover = (event) => {
        //event.target.style.borderColor = 'blue'
    
    }

    const PostsList = () => {
        const cards = posts.map( (post) => (
            <Card onClick={() => openPost(post._id)}
            key={post._id}
            className="btn"
            onMouseOver={onHover}
            >
                <Card.Body>
                    <Card.Title>{post.name}</Card.Title>
                    <Card.Text>{post.about}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Created at {new Date(post.created_at).toDateString()}, 
                        last edited {new Date(post.updatedAt).toDateString()} </small>
                </Card.Footer>
            </Card>
        ))

        return (
            <CardColumns className="m-3">
                {cards}
            </CardColumns>
        )
    }

    return (
        
        <div>
           <PostsList />
        </div>
    )
}