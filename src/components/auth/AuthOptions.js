import React, { useContext } from "react"
import {useHistory} from "react-router-dom"
import { Button } from "react-bootstrap"
import UserContext from "../context/UserContext"

export default function AuthOptions() {
	const {userData, setUserData} = useContext(UserContext)

	const history = useHistory()

	const register = () => {
		history.push('/register')
	}

	const login = () => {
		history.push("/login")
	}

	const post = () => {
		history.push('/post')
	}

	const logout = () => {
		setUserData({
			token: undefined,
			user: undefined,
		})
		localStorage.setItem("auth-token", "")
	}

	return (
		<nav className="auth-options">
			{
				userData.user ? (
				<>	
				<Button className="mr-2" onClick={post}>Post</Button>
				<Button className="mr-2" onClick={logout}>Log out</Button>
				</>
			) : (
				<>
					<Button className="mr-2" onClick={register}>Register</Button>
					<Button className="mr-2" onClick={login}>Login</Button>
				</>
			)}
		</nav>
	)
}
