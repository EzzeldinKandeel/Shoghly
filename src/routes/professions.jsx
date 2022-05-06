import React from "react"
import Footer from "../components/footer"
import Navbar from "../components/navbar"
import ProfessionCards from "../components/ProfessionCards"
import api from "../api/axios"
import "../styles/professions.css"

function Profession() {
	const [professions, setProfessions] = React.useState([])
	React.useEffect(async () => {
		try {
			const response = await api.get("/professions")
			console.log(response.data)
			setProfessions(response.data)
		} catch (err) {
			console.error(err.message)
		}
	}, [])

	return (
		<div className="container">
			<Navbar />
			<div className="profession-cards">
				{professions.map((profession) => {
					return <ProfessionCards key={profession} profession={profession} />
				})}
			</div>
			<Footer />
		</div>
	)
}

export default Profession
