import React from "react"
import { Link } from "react-router-dom"

function DashboadEntry(props) {
	return (
		<div className="dashboard-entry">
			<Link to={props.path} className="dashboard-entry-content">
				<props.icon />
				<h3>{props.entryName}</h3>
			</Link>
		</div>
	)
}

export default DashboadEntry
