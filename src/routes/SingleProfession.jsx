import React from "react"
import { useParams } from "react-router-dom"
import LargeWorkerCard from "../components/LargeWorkerCard"
import "../styles/SingleProfession.css"
import api from "../api/axios"
import UserContext from "../context/UserProvider"

function SingleProfession() {
	const { user } = React.useContext(UserContext)
	let params = useParams()
	let profession = params.profession

	const [workers, setWorkers] = React.useState([])
	React.useEffect(async () => {
		try {
			const response = await api.get("/users", {
				params: { profession: profession }
			})
			setWorkers(response.data)
		} catch (err) {
			console.error(err.message)
		}
	}, [])

	return (
			<div className="workers">
				{user
					? workers
							.filter((worker) => worker.id != user.id)
							.map((worker) => (
								<LargeWorkerCard key={worker.id} worker={worker} />
							))
					: workers.map((worker) => (
							<LargeWorkerCard key={worker.id} worker={worker} />
					  ))}
			</div>
	)
}

export default SingleProfession
