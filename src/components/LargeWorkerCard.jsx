import React from 'react'
import { Link } from 'react-router-dom'
import workerPic from '../images/placeholder_200px_200px.png'
import '../styles/LargeWorkerCard.css'

function LargeWorkerCard(props) {
	var rating = 0
	// props.worker.reviews.forEach((review) => {
	// 	rating += review.rating / props.worker.reviews.length
	// })

	return (
		<div>
			<Link to={`/worker${props.worker.id}`}>
				<div className='large-worker-card'>
					<div className='right-section'>
						<img src={workerPic} alt='picture of the worker' />
					</div>
					<div className='left-section'>
						<h2>{`${props.worker.firstName} ${props.worker.lastName}`}</h2>
						<h4>{rating ? `${rating}/5` : 'لا يوجد تقييم'}</h4>
					</div>
				</div>
			</Link>
		</div>
	)
}

export default LargeWorkerCard
