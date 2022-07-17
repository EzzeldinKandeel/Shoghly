import React from "react"
import avatar from "../images/avatar.png"
import "../styles/SearchPage.css"
import { HashLink as Link } from "react-router-hash-link"

function MiniWorkerCard(props) {
	let worker = props.worker
	return (
		<div>
			<Link className="mini-card" to={`/worker${worker.userId}/#`}>
				<img
					height="70"
					width="70"
					src={worker.picture || avatar}
					className="image-cover background-multiply"
				/>
				<h2>{worker.fullName}</h2>
				<h4
					style={{
						marginInlineStart: "auto",
						marginInlineEnd: "1rem",
						fontWeight: "400"
					}}
				>
					{worker.profession}
				</h4>
			</Link>
		</div>
	)
}

export default MiniWorkerCard
