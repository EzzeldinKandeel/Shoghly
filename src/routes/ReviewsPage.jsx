import React, { useContext, useEffect, useState } from "react"
import ReviewBox from "../components/ReviewBox"
import AuthContext from "../context/AuthProvider"
import api from "../api/axios"
import "../styles/ReviewsPage.css"

function ReviewsPage() {
	document.title = "التعليقات - شغلي"
	const { auth } = useContext(AuthContext)
	const [reviews, setReviews] = useState([])
	useEffect(async () => {
		try {
			const response = await api.get(`/workers/${auth.id}`)
			setReviews(
				response.data.data.reviews
					.filter((review) =>
						Object.values(review).every((value) => value !== null)
					)
					.sort(
						(a, b) =>
							new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
					)
			)
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
		<h1 className="content-does-not-exist">لا توجد تعليقات</h1>
	)
}

export default ReviewsPage
