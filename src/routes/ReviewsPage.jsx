import React from "react"
import UserContext from "../context/UserProvider"
import ReviewBox from "../components/ReviewBox"
import "../styles/ReviewsPage.css"

function ReviewsPage() {
	const { user } = React.useContext(UserContext)
	console.log(user.reviews)
	
	return (
		<div className="reviews-container">
			<h2>جميع تقييماتك</h2>
			<div className="review-boxes-container">
				{user.reviews.map((review) => (
					<ReviewBox key={user.reviews.indexOf(review)} review={review} />
				))}
			</div>
		</div>
	)
}

export default ReviewsPage
