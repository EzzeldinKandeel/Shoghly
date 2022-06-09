import React from "react"
import LargeWorkerCard from "../components/LargeWorkerCard"
import "../styles/SingleProfession.css"
import UserContext from "../context/UserProvider"
import api from "../api/axios"

function Favorites() {
	const { user } = React.useContext(UserContext)
	const [favorites, setFavorites] = React.useState(null)
	React.useEffect(async () => {
		if (user.favoritesId.length) {
			try {
				const response = await api.get("/users", {
					params: { id: user.favoritesId }
				})
				setFavorites(response.data)
			} catch (err) {
				console.error(err.message)
			}
		}
	}, [])

	return favorites ? (
		<div className="workers">
			{favorites.map((worker) => (
				<LargeWorkerCard key={worker.id} worker={worker} />
			))}
		</div>
	) : (
		<h1 style={{ margin: "auto", fontWeight: "200", color: "gray" }}>
			لا توجد مفضلات
		</h1>
	)
}

export default Favorites
