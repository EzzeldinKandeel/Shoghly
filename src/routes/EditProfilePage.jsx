import React from "react"
import EditProfile from "../components/EditProfile"
import Footer from "../components/footer"
import Navbar from "../components/navbar"

function EditProfilePage() {
	return (
		<div className="container">
			<Navbar />
			<EditProfile />
			<Footer />
		</div>
	)
}

export default EditProfilePage
