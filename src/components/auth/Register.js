import React, {useState, useContext} from "react"
import { useHistory } from "react-router-dom"
import UserContext from "../context/UserContext"
import ErrorWarning from "../error/ErrorWarning"
import { Button, Form, Container} from "react-bootstrap"
import Axios from "axios"

export default function Register() {

	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [passwordCheck, setPasswordCheck] = useState()
	const [username, setUsername] = useState()
	const [error, setError] = useState()

	const { setUserData } = useContext(UserContext)
	const history = useHistory()

	const submit = async (e) => {
		e.preventDefault()
		try {
			const newUser = {email, password, passwordCheck, username}
			const registerRes = await Axios.post("http://localhost:3003/users/register", newUser
			)
			const loginRes = await Axios.post("http://localhost:3003/users/login", {
				email,
				password
			})
			setUserData({
				token: loginRes.data.token,
				user: loginRes.data.user
			})
			localStorage.setItem("auth-token", loginRes.data.token)
			history.push("/")
		} catch (err) {
			err.response.data.msg && setError(err.response.data.msg)
		}
	}

	return (
		<Container>
		{error && (
			<ErrorWarning message={error} clearError={() => setError(undefined)} />
		)}
			<Form onSubmit={submit}>

			  <Form.Group controlId="formBasicEmail">
			    <Form.Label>Email address</Form.Label>
			    <Form.Control
					type="email" placeholder="Enter email"
					onChange={(e) => setEmail(e.target.value)}
					/>
			    <Form.Text className="text-muted">
			      We'll never share your email.
			    </Form.Text>
			  </Form.Group>


				<Form.Group controlId="formBasicUsername">
			    <Form.Label>Username</Form.Label>
			    <Form.Control
					type="text" placeholder="Username"
					onChange={(e) => setUsername(e.target.value)}
					/>
			  </Form.Group>


			  <Form.Group controlId="formBasicPassword">
			    <Form.Label>Password</Form.Label>
			    <Form.Control
					type="password" placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					/>
			  </Form.Group>

				<Form.Group controlId="formBasicPasswordCheck">
			    <Form.Label>Password</Form.Label>
			    <Form.Control
					type="password" placeholder="Verify Password"
					onChange={(e) => setPasswordCheck(e.target.value)}
					/>
			  </Form.Group>


			  <Button variant="primary" type="submit" value="Register">
			    Submit
			  </Button>
			</Form>
		</Container>
	);
}
