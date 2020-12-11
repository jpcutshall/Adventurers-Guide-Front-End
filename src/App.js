import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Axios from "axios"
import Header from "./components/layout/Header"
import Home from "./components/pages/Home"
import Login from "./components/auth/Login"
import Post from "./components/pages/Post"
import About from "./components/pages/About"
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
			try {
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
				console.log('tokenRes.data', tokenRes.data)
				if (tokenRes.data) {
					const userRes = await Axios.get(process.env.REACT_APP_API_URL + "/users/" ,
					{ 
						headers: {"x-auth-token": token}
					})
					console.log('tokenRes tokenIsValid', tokenRes)
					console.log('userRes', userRes)
					setUserData({
						token,
						user: userRes.data,
					})
				}
			} catch (err) {

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
				<Route path="/about" component={About} />
				<Route path="/posts/:id"> <ShowPost /></Route>
				<Route path="/edit/:id"> <EditPost /></Route>
			</Switch>
		</UserContext.Provider>
		</BrowserRouter>
	</>
}
