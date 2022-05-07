import React from "react"
import Footer from "../components/footer"
import WorkerDetails from "../components/WorkerDetails"
import Navbar from "./../components/navbar"
import { useParams } from "react-router-dom"
import api from "../api/axios"

function WorkerPage() {
	return (
		<div className="container">
			<Navbar />
			<WorkerDetails />
			<Footer />
		</div>
	)
}

export default WorkerPage
