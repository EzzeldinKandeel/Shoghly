import React from 'react'
import { Link } from 'react-router-dom'

function ProfessionCard(props) {
	return (
		<div>
			<Link
				className='profession-card'
				to={`/professions/${props.profession}`}
			>
				<div>{props.profession}</div>
			</Link>
		</div>
	)
}

export default ProfessionCard
