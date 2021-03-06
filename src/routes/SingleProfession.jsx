import React, { useEffect, useState } from "react"
import { useParams, useOutletContext } from "react-router-dom"
import LargeWorkerCard from "../components/LargeWorkerCard"
import "../styles/SingleProfession.css"
import api from "../api/axios"
import noResultsFound from "../images/no-results.png"

function SingleProfession() {
	const { city } = useOutletContext()
	let params = useParams()
	let profession = params.profession
	document.title = `${profession} - شغلي`

	const [workers, setWorkers] = useState([])
	const [noWorkers, setNoWorkers] = useState(false)
	useEffect(async () => {
		try {
			const response = await api.get("/workers", {
				params: { city: city, profession: profession }
			})
			setWorkers(response.data.data.workers)
			if (response.data.data.count === 0) setNoWorkers(true)
			else setNoWorkers(false)
		} catch (err) {
			console.error(err.message)
		}
	}, [city])

	return noWorkers ? (
		<>
			<h1 className="content-does-not-exist">لا يوجد حرفيين.</h1>
			<img src={noResultsFound} className="no-results-picture" />
		</>
	) : (
		<div className="workers">
			{workers.map((worker) => (
				<LargeWorkerCard
					key={worker.id}
					worker={worker}
					showProfession={false}
				/>
			))}
		</div>
	)
}

export default SingleProfession
