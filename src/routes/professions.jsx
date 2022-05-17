import React from "react"
import Footer from "../components/footer"
import Navbar from "../components/navbar"
import ProfessionCards from "../components/ProfessionCards"
import "../styles/professions.css"
import { getProfessions } from "../data"

function Profession() {
	const professions = getProfessions()

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
