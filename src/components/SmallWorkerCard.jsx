import React from "react"
import "../styles/card.css"
import { Link } from "react-router-dom"
import avatar from "../images/avatar.png"

function SmallWorkerCard(props) {
	return (
		<Link to={`/${props.id}`} className="card">
			<img height="150" width="150" src={avatar} className="image-cover" />
			<h3 id="worker-name"></h3>
			<h4 id="profession"></h4>
		</Link>
	)
}

export default SmallWorkerCard
