import React, {useState, useContext} from "react"
import { useHistory } from "react-router-dom"
import UserContext from "../context/UserContext"
import ErrorWarning from "../error/ErrorWarning"
import { Button, Form, Container} from "react-bootstrap"
import { Person, Eye, EyeSlash } from "react-bootstrap-icons"
import Axios from "axios"

export default function Register() {

	const backEndUrl = process.env.REACT_APP_API_URL
	

	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [passwordCheck, setPasswordCheck] = useState()
	const [username, setUsername] = useState()
	const [error, setError] = useState()
	const[passwordShow, setPasswordShow] = useState(false)

	const { setUserData } = useContext(UserContext)
	const history = useHistory()


	// functions

	

	const submit = async (e) => {
		e.preventDefault()
		try {
			const newUser = {email, password, passwordCheck, username}
			const registerRes = await Axios.post( backEndUrl + "/users/register", newUser
			)
			const loginRes = await Axios.post( backEndUrl + "/users/login", {
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
		<Container className="bg-dark text-light shadow p-3 mb-5 rounded">
			<h2 className="text-center">Register</h2>
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
			    <Form.Label>
					Password
					{
						passwordShow 
						?
						<EyeSlash className="text-center" size={25} onClick={(e) => setPasswordShow(!passwordShow)}/>
						:
						<Eye size={25} onClick={(e) => setPasswordShow(!passwordShow)}/>
					}
					</Form.Label>
			    <Form.Control
					type={passwordShow ? 'text' : 'password'} placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					/>
				
					
			  </Form.Group>

				<Form.Group controlId="formBasicPasswordCheck">
			    <Form.Label>Password</Form.Label>
			    <Form.Control
					type={passwordShow ? 'text' : 'password'} placeholder="Verify Password"
					onChange={(e) => setPasswordCheck(e.target.value)}
					/>
			  </Form.Group>


			  <Button variant="secondary" type="submit" value="Register">
				  <Person size={33} />
			    Register
			  </Button>
			</Form>
		</Container>
	);
}
