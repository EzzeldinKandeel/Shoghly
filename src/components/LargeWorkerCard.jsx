import React from "react"
import { Link } from "react-router-dom"
import avatar from "../images/avatar.png"
import "../styles/LargeWorkerCard.css"
import CustomRating from "./CustomRating"
import FavoriteToggle from "./FavoriteToggle"

function LargeWorkerCard({ worker, showProfession }) {
	return (
		<div className="large-worker-card">
			<Link to={`/worker${worker.id}`} className="large-worker-card-content">
				<img
					src={worker.picture || avatar}
					className="image-cover large-worker-card-pic background-multiply"
				/>
				<div className="large-worker-card-info">
					<h2>{`${worker.firstName} ${worker.lastName}`}</h2>
					<h4>
						{worker.averageRating ? (
							<CustomRating
								name="workerRating"
								value={parseInt(Math.round(worker.averageRating))}
								readOnly
							/>
						) : (
							"لا يوجد تقييم"
						)}
					</h4>
					{showProfession && <h4>{worker.profession}</h4>}
				</div>
			</Link>
		</div>
	)
}

export default LargeWorkerCard
