import React from 'react'
import Footer from '../components/footer'
import WorkerDetails from '../components/WorkerDetails'
import Navbar from './../components/navbar'
import { useParams } from 'react-router-dom'
import api from "../api/axios"

function WorkerPage() {
	let params = useParams()

	const [worker, setWorker] = React.useState({})
	React.useEffect(async () => {
		try {
			const response = await api.get("/users", {params: {id: params.workerId}})
			setWorker(response.data[0])
		} catch (err) {
			console.error(err.message)
		}
	},[])

	return (
		<div className='container'>
			<Navbar />
			{Boolean(Object.keys(worker).length) && <WorkerDetails key={worker.id} worker={worker} />}
			<Footer />
		</div>
	)
}

export default WorkerPage
