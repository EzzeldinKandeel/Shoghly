import React, { useState, useEffect, useContext } from "react"
import AuthContext from "../context/AuthProvider"
import api from "../api/axios"
import "../styles/SearchPage.css"
import MiniWorkerCard from "../components/MiniWorkerCard"

function SearchPage() {
	const { auth } = useContext(AuthContext)
	const [searchQuery, setSearchQuery] = useState("")
	const [city, setCity] = useState("")
	const [liveResults, setLiveResults] = useState([])
	function handleChange(e) {
		let value = e.target.value
		setSearchQuery(value)
	}
	async function getCity() {
		try {
			const cityResponse = await api.get(`/profile/${auth.id}`)
			setCity(cityResponse.data.info.city)
		} catch (err) {
			console.error(err)
		}
	}
	useEffect(async () => {
		if (searchQuery.length > 0) {
			try {
				const response = await api.get("/autoComplete", {
					params: { text: searchQuery, city: city },
					headers: { Authorization: `Bearer ${auth.token}` }
				})
				setLiveResults(response.data.results)
			} catch (err) {
				console.error(err)
			}
		} else {
			setLiveResults([])
		}
	}, [searchQuery])

	return (
		<div className="search-page">
			<input
				name="search"
				value={searchQuery}
				onChange={handleChange}
				onFocus={getCity}
				type="search"
				className="input-box search-box"
				placeholder="بحث"
				autoComplete="off"
			/>
			{liveResults.length ? (
				<div className="live-search-results">
					{liveResults.map((worker) => (
						<MiniWorkerCard key={worker.userId} worker={worker} />
					))}
				</div>
			) : (
				<h1
					style={{ marginBlockStart: "1rem", fontWeight: "200", color: "gray" }}
				>
					لا توجد نتائج
				</h1>
			)}
		</div>
	)
}

export default SearchPage
