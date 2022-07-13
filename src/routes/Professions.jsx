import React from "react"
import ProfessionCard from "../components/ProfessionCard"
import "../styles/professions.css"
import { getProfessionPictures } from "../data"

function Professions() {
	document.title = "الخدمات - شغلي"
	const professions = getProfessionPictures()

	return (
		<div className="profession-cards">
			{professions.map((profession) => {
				return <ProfessionCard key={profession.name} profession={profession} />
			})}
		</div>
	)
}

export default Professions
