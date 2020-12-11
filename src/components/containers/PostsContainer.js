import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'
import { Container, Card, CardColumns, Button} from 'react-bootstrap'

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

    const PostsList = () => {
        const cards = posts.map( (post) => (
            <Card onClick={() => openPost(post._id)}
            key={post._id}
            >
                <Card.Body>
                    <Card.Title>{post.name}</Card.Title>
                    <Card.Text>{post.about}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Created at {post.created_at}, last edited {post.updatedAt} </small>
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