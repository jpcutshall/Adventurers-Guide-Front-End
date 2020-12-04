import React, {useState, useContext} from "react"
import { useHistory } from "react-router-dom"
import UserContext from "../context/UserContext"
import { Button, Form, Container} from "react-bootstrap"
import Axios from "axios"

export default function Login() {
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()

	const { setUserData } = useContext(UserContext)
	const history = useHistory()

	const submit = async (e) => {
		e.preventDefault()
		const loginUser = {email, password}

		const loginRes = await Axios.post("http://localhost:3003/users/login", loginUser
		)
		setUserData({
			token: loginRes.data.token,
			user: loginRes.data.user
		})
		localStorage.setItem("auth-token", loginRes.data.token)
		history.push("/")
	}

	return (
		<Container>
			<Form onSubmit={submit}>

			  <Form.Group controlId="formBasicEmail">
			    <Form.Label>Email address</Form.Label>
			    <Form.Control
					type="email" placeholder="Enter email"
					onChange={(e) => setEmail(e.target.value)}
					/>
			  </Form.Group>

				<Form.Group controlId="formBasicPassword">
			    <Form.Label>Password</Form.Label>
			    <Form.Control
					type="password" placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					/>
			  </Form.Group>
				<Button variant="primary" type="submit" value="Login">
			    Login
			  </Button>
			</Form>
		</Container>

	);
}
