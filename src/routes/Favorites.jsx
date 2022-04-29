import React from 'react'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import LargeWorkerCard from '../components/LargeWorkerCard'
import { getClient, getData } from '../data'
import '../styles/SingleProfession.css'
import { getWorker } from './../data'

function Favorites() {
	let current_user = getClient(0)
	let favorites = current_user.favorites_id.map((workerId) =>
		getWorker(workerId)
	)
	console.log(favorites)

	return (
		<div className='container'>
			<Navbar />
			<div className='workers'>
				{favorites.map((worker) => {
					return <LargeWorkerCard key={worker.id} worker={worker} />
				})}
			</div>
			<Footer />
		</div>
	)
}

export default Favorites
