import React from "react"
import { Link } from "react-router-dom"

function ProfessionCard(props) {
	return (
		<div className="profession-card" style={{backgroundImage:`url(${props.profession.picture})`}}>
			<Link className="profession-card-content" to={`/professions/${props.profession.name}`}>
				<h3>{props.profession.name}</h3>
			</Link>
		</div>
	)
}

export default ProfessionCard
