import React from "react"
import { Link } from "react-router-dom"

function MiniWorkerCard(props) {
	let worker = props.worker
	return (
		<div>
			<Link className="mini-card" to={`/worker${worker.userId}`}>
				<img height="70px" width="70px" src={worker.picture} />
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
