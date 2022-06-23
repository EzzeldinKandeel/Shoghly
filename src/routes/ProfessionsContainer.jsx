import React, { useState, useEffect, useContext } from "react"
import { Outlet } from "react-router-dom"
import AuthContext from "../context/AuthProvider"
import { getCities } from "./../data"
import api from "../api/axios"

function ProfessionsContainer() {
	const { auth } = useContext(AuthContext)
	const cities = getCities()
	const [city, setCity] = useState()
	const style = {
		display: "flex",
		flexDirection: "column",
		gap: "2rem",
		width: "90%",
		marginInline: "auto"
	}
	useEffect(async () => {
		if (auth) {
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
		}
	}, [])

	function handleCitySelection(e) {
		let value = e.target.value
		setCity(value)
	}

	return (
		<div style={style}>
			<select
				name="city"
				value={city}
				onChange={handleCitySelection}
				className="input-box city-select"
				required
                style={{alignSelf: "flex-end", width: "200px"}}
			>
				{cities.map((city) => (
					<option key={cities.indexOf(city)} value={city}>
						{city}
					</option>
				))}
			</select>
			<Outlet context={{city}} />
		</div>
	)
}

export default ProfessionsContainer
