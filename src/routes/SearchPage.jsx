import React, { useState, useEffect, useContext } from "react"
import AuthContext from "../context/AuthProvider"
import api from "../api/axios"
// import "../styles/SearchPage.css"
import MiniWorkerCard from "../components/MiniWorkerCard"
import { getCities } from "./../data"

function SearchPage() {
	const { auth } = useContext(AuthContext)
	const cities = getCities()
	const [searchQuery, setSearchQuery] = useState("")
	const [city, setCity] = useState("")
	const [liveResults, setLiveResults] = useState([])
	useEffect(async () => {
		try {
			const cityResponse = await api.get("/users", {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			setCity(cityResponse.data.data.city)
		} catch (err) {
			console.error(err)
		}
	}, [])
	useEffect(async () => {
		if (searchQuery.length > 0) {
			try {
				const response = await api.get("/autoComplete", {
					params: { text: searchQuery, city: city },
					headers: { Authorization: `Bearer ${auth.token}` }
				})
				setLiveResults(response.data.results)
			} catch (err) {
				setLiveResults([])
			}
		} else {
			setLiveResults([])
		}
	}, [searchQuery, city])

	function handleChange(e) {
		let value = e.target.value
		setSearchQuery(value)
	}
	function handleCitySelection(e) {
		let value = e.target.value
		setCity(value)
	}

	return (
		<div className="search-page">
			<div className="city-and-query">
				<input
					name="search"
					value={searchQuery}
					onChange={handleChange}
					type="search"
					className="input-box search-box"
					placeholder="بحث"
					autoComplete="off"
				/>
				<select
					name="city"
					value={city}
					onChange={handleCitySelection}
					className="input-box city-select"
					required
				>
					{cities.map((city) => (
						<option key={cities.indexOf(city)} value={city}>
							{city}
						</option>
					))}
				</select>
			</div>
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
