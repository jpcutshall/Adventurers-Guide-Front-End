import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Axios from "axios"
import Header from "./components/layout/Header"
import Home from "./components/pages/Home"
import Login from "./components/auth/Login"
import Post from "./components/pages/Post"
import Register from "./components/auth/Register"
import UserContext from "./components/context/UserContext"
import ShowPost from "./components/pages/ShowPost"
import EditPost from "./components/pages/EditPost"


export default function App() {
	const [userData, setUserData] = useState({
		token: undefined,
		user: undefined,
	})


	// called on page loading must make async func inside this
	useEffect(() => {
		const checkLoggedIn = async () => {
			let token = localStorage.getItem("auth-token")
			if (token === null) {
				localStorage.setItem("auth-token", "")
				token = ""
			}
			const tokenRes = await Axios.post(
				process.env.REACT_APP_API_URL + "/users/tokenIsValid",
				null,
				{
					headers: { "x-auth-token": token}
				}
			)
			if (tokenRes.data) {
				const userRes = await Axios.get(process.env.REACT_APP_API_URL + "/users/",
				{ headers: {"x-auth-token": token}
				})
				
				setUserData({
					token,
					user: userRes.data,
				})
			}
			
		}

		checkLoggedIn()
	}, [])

	return <>
		<BrowserRouter>
		<UserContext.Provider value={{userData, setUserData}}>
			<Header />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/post" component={Post} />
				<Route path="/posts/:id"> <ShowPost /></Route>
				<Route path="/posts/edit/:id"> <EditPost /></Route>
			</Switch>
		</UserContext.Provider>
		</BrowserRouter>
	</>
}
