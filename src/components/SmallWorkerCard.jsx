import React from "react"
import "../styles/card.css"
import worker_picture from "../images/placeholder_150px_150px.png"
import { Link } from "react-router-dom"

function SmallWorkerCard(props) {
	return (
		<Link to={`/${props.id}`} className="card">
			<img height="150" width="150" src={worker_picture} alt="picture of the worker" className="image-cover" />
			<h3 id="worker-name"></h3>
			<h4 id="profession"></h4>
		</Link>
	)
}

export default SmallWorkerCard
