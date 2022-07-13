import React, { useState, useContext, useEffect } from "react"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd"
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove"
import "../styles/FavoriteToggle.css"
import api from "../api/axios"
import AuthContext from "../context/AuthProvider"
import ErrorBackdrop from "./ErrorBackdrop"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"

function FavoriteToggle(props) {
	const { workerId } = props
	const { auth } = useContext(AuthContext)
	const [isFavorite, setIsFavorite] = useState(false)
	const [error, setError] = useState(false)

	useEffect(async () => {
		try {
			const favoritesResponse = await api.get("/favorites", {
				headers: { Authorization: `Bearer ${auth.token}` }
			})
			setIsFavorite(() =>
				favoritesResponse.data.data
					.map((favorite) => favorite.worker.id)
					.includes(workerId)
			)
		} catch (err) {
			console.error(err)
		}
	}, [])

	function renderToggle() {
		if (!isFavorite) return <FavoriteBorderIcon fontSize="large" />
		else if (isFavorite) return <FavoriteIcon fontSize="large" />
	}
	async function toggle() {
		if (isFavorite) {
			try {
				await api.delete(`/favorites/workers/${workerId}`, {
					headers: { Authorization: `Bearer ${auth.token}` }
				})
				setIsFavorite(false)
			} catch (err) {
				setError(true)
			}
		} else if (!isFavorite) {
			try {
				await api.post(`/favorites/workers/${workerId}`, null, {
					headers: { Authorization: `Bearer ${auth.token}` }
				})
				setIsFavorite(true)
			} catch (err) {
				setError(true)
			}
		}
	}

	return (
		<>
			<ErrorBackdrop open={error} close={() => setError(false)} />
			<button className="favorite-toggle" onClick={toggle}>
				{renderToggle()}
			</button>
		</>
	)
}

export default FavoriteToggle
