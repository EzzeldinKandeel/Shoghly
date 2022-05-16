import React from "react"
import WorkerReviews from "../components/WorkerReviews"
import Navbar from "../components/navbar"
import Footer from "../components/footer"

function WorkerReviewsPage() {
	return (
		<div className="container">
			<Navbar />
			<WorkerReviews />
			<Footer />
		</div>
	)
}

export default WorkerReviewsPage
