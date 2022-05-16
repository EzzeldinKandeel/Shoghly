import React from "react"
import LargeWorkerCard from "./LargeWorkerCard"
import "../styles/SingleProfession.css"
import UserContext from "../context/UserProvider"
import api from "../api/axios"

function Favorites() {
	const { user } = React.useContext(UserContext)
	const [favorites, setFavorites] = React.useState(null)
	React.useEffect(async () => {
		try {
			const response = await api.get("/users", {
				params: { id: user.favoritesId }
			})
			setFavorites(response.data)
		} catch (err) {
			console.error(err.message)
		}
	}, [])

	return (
		favorites && (
			<div className="workers">
				{favorites.map((worker) => (
					<LargeWorkerCard key={worker.id} worker={worker} />
				))}
			</div>
		)
	)
}

export default Favorites
