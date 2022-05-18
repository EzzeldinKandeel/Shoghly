import React, { useEffect, useContext, useState } from "react"
import "../styles/MainContent.css"
import Card from "./card"
import api from "../api/axios"
import AuthContext from "../context/AuthProvider"

function MainContent() {
	const {auth} = useContext(AuthContext)
	const [firstName, setFirstName] = useState("")
	useEffect(async ()=>{
		if (auth) {try {
			const response = await api.get(`/profile/${auth.id}`)
			setFirstName(response.data.info.firstName)
		} catch (err) {
			console.error(err)
		}}
	})

	return (
		<div className="main-content">
			{auth && <h2 style={{color: "var(--gray)"}}>أهلًا، {firstName}!</h2>}
			<section className="main-section">
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</section>
		</div>
	)
}

export default MainContent
