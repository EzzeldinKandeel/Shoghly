import React from "react"
import Footer from "../components/footer"
import Navbar from "../components/navbar"
import Settings from "../components/Settings"

function SettingsPage() {
	return (
		<div className="container">
			<Navbar />
			<Settings />
			<Footer />
		</div>
	)
}

export default SettingsPage
