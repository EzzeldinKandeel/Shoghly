import React, { useContext, useEffect, useState } from "react"
import ReviewBox from "../components/ReviewBox"
import AuthContext from "../context/AuthProvider"
import api from "../api/axios"
import "../styles/ReviewsPage.css"

function ReviewsPage() {
	const { auth } = useContext(AuthContext)
	const [reviews, setReviews] = useState([])
	useEffect(async () => {
		try {
			const response = await api.get(`/workers/${auth.id}/reviews`, {
				headers: { Authorization: `Bearer ${auth.token}` }
			})
			setReviews(response.data.data.reviews)
		} catch (err) {
			console.error(err)
		}
	}, [])

	return reviews.length ? (
		<div className="reviews-container">
			<h2>جميع تقييماتك</h2>
			<div className="review-boxes-container">
				{reviews.map((review) => (
					<ReviewBox key={review.reviewId} review={review} />
				))}
			</div>
		</div>
	) : (
		<h1 style={{ margin: "auto", fontWeight: "200", color: "gray" }}>
			لا توجد تعليقات
		</h1>
	)
}

export default ReviewsPage
