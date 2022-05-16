import React from "react"
import WorkerProjects from "../components/WorkerProjects"
import Navbar from "../components/navbar"
import Footer from "../components/footer"

function WorkerProjectsPage() {
	return (
		<div className="container">
			<Navbar />
			<WorkerProjects />
			<Footer />
		</div>
	)
}

export default WorkerProjectsPage
