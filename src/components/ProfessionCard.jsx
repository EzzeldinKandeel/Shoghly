import React from "react"
import { HashLink as Link } from "react-router-hash-link"

function ProfessionCard(props) {
	return (
		<div className="profession-card">
			<Link
				className="profession-card-content"
				to={`/professions/${props.profession.name}/#`}
			>
				<img
					className="image-cover profession-card-picture"
					src={props.profession.picture}
				/>
				<span className="profession-card-name">{props.profession.name}</span>
			</Link>
		</div>
	)
}

export default ProfessionCard
