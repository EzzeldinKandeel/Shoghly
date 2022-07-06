import React from "react"
import "../styles/SmallWorkerCard.css"
import { Link } from "react-router-dom"
import avatar from "../images/avatar.png"

function SmallWorkerCard(props) {
	const { worker } = props
	return (
		<div className="small-worker-card">
			<Link to={`/worker${worker.id}`} className="small-worker-card-content">
				<img
					height="150"
					width="150"
					src={worker.picture || avatar}
					className="image-cover background-multiply"
				/>
				<h3>
					{worker.firstName} {worker.lastName}
				</h3>
				<h4>{worker.profession}</h4>
			</Link>
		</div>
	)
}

export default SmallWorkerCard
