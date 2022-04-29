import React from 'react'
import Footer from '../components/footer'
import WorkerDetails from '../components/WorkerDetails'
import Navbar from './../components/navbar'
import { useParams } from 'react-router-dom'
import { getWorker } from './../data'

function WorkerPage() {
	let params = useParams()
	let worker = getWorker(params.workerId)

	return (
		<div className='container'>
			<Navbar />
			<WorkerDetails key={worker.id} worker={worker} />
			<Footer />
		</div>
	)
}

export default WorkerPage
