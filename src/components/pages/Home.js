import React, { useState } from "react"
import PostsContainer from "../containers/PostsContainer"
import { Container } from "react-bootstrap"
import Axios from "axios"

export default function Home() {
	
	
	
	
	

	return (
		<Container>
			<h2 className="text-center">Home</h2>
			<PostsContainer />
		</Container>
	);
}
