import React, { useEffect, useContext, useState } from "react"
import "../styles/MainContent.css"
import api from "../api/axios"
import AuthContext from "../context/AuthProvider"
import SmallWorkerCard from "../components/SmallWorkerCard"

function HomeScreen() {
	const { auth } = useContext(AuthContext)
	const [firstName, setFirstName] = useState("")
	useEffect(async () => {
		if (auth) {
			try {
				const response = await api.get(`/profile/${auth.id}`)
				setFirstName(response.data.info.firstName)
			} catch (err) {
				console.error(err)
			}
		}
	})

	return (
		<div className="main-content">
			{auth && <h2 style={{ color: "var(--gray)" }}>أهلًا، {firstName}!</h2>}
			<section className="main-section">
				<SmallWorkerCard />
				<SmallWorkerCard />
				<SmallWorkerCard />
				<SmallWorkerCard />
				<SmallWorkerCard />
				<SmallWorkerCard />
			</section>
		</div>
	)
}

export default HomeScreen
