import React from "react"
import UserContext from "../context/UserProvider"
import ReviewBox from "./ReviewBox"
import "../styles/WorkerPages.css"

function WorkerReviews() {
	const { user } = React.useContext(UserContext)
	return user.reviews.length ? (
		<div className="reviews-page">
			{user.reviews.map((review) => (
				<ReviewBox review={review} key={user.reviews.indexOf(review)} />
			))}
		</div>
	) : (
		<h1 style={{ margin: "auto", color: "gray", fontWeight: "200" }}>
			لا توجد تعليقات
		</h1>
	)
}

export default WorkerReviews
