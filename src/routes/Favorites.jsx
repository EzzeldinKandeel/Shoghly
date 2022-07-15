import React, { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import LargeWorkerCard from "../components/LargeWorkerCard"
import api from "../api/axios"
import "../styles/Favorites.css"
import AuthContext from "../context/AuthProvider"

function Favorites() {
	document.title = "المفضلات - شغلي"
	const { auth } = useContext(AuthContext)
	const [favorites, setFavorites] = useState([])

	useEffect(async () => {
		try {
			const favoritesResponse = await api.get("/favorites", {
				headers: { Authorization: `Bearer ${auth.token}` }
			})
			setFavorites(favoritesResponse.data.data)
		} catch (err) {}
	}, [])

	return favorites.length ? (
		<div className="favorites-page">
			<h2>المفضلات</h2>
			<div className="favorite-workers">
				{favorites.map((fav) => (
					<LargeWorkerCard
						key={fav.worker.id}
						worker={fav.worker}
						showProfession={true}
					/>
				))}
			</div>
		</div>
	) : (
		<h1 className="content-does-not-exist">لم تقم بإضافة أى حرفي حتى الآن.</h1>
	)
}

export default Favorites
