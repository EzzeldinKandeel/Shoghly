import React from "react"
import ProfessionCard from "../components/ProfessionCard"
import "../styles/professions.css"
import { getProfessions } from "../data"

function Professions() {
	const professions = getProfessions()

	return (
		<div className="profession-cards">
			{professions.map((profession) => {
				return <ProfessionCard key={profession} profession={profession} />
			})}
		</div>
	)
}

export default Professions
