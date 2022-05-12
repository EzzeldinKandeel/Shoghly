import React from "react"
import Favorites from "../components/Favorites"
import Footer from "../components/footer"
import Navbar from "../components/navbar"

function FavoritesPage() {
	return (
		<div className="container">
			<Navbar />
			<Favorites />
			<Footer />
		</div>
	)
}

export default FavoritesPage
