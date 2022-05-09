import React from "react"
import UserContext from "../context/UserProvider"
import api from "../api/axios"
import "../styles/NewReview.css"
import CustomRating from "./CustomRating"

function NewReview(props) {
	const { user } = React.useContext(UserContext)
	const [reviewData, setReviewData] = React.useState({
		rating: 1,
		title: "",
		body: ""
	})

	function handleChange(e) {
		const { name, value } = e.target
		setReviewData((prevReviewData) => ({
			...prevReviewData,
			[name]: value
		}))
	}

	async function handleSubmit(e) {
		e.preventDefault()
		const finalReviewData = {
			...reviewData,
			dateTime: new Date(),
			clientId: user.id,
			id: props.worker.reviews.length
		}
		try {
			const response = await api.patch(`/users/${props.worker.id}`, {
				reviews: [...props.worker.reviews, finalReviewData]
			})
			props.setGetTrigger((prevGetTrigger) => !prevGetTrigger)
			props.setNewReview(false)
		} catch (err) {
			console.error(err.message)
		}
	}

	return (
		<form className="review-box" onSubmit={handleSubmit}>
			<div className="rating">
				<label htmlFor="rating">التقييم</label>
				<CustomRating
					name="rating"
					value={parseInt(reviewData.rating)}
					onChange={handleChange}
				/>
			</div>
			<label htmlFor="title">العنوان</label>
			<textarea
				name="title"
				id="title"
				cols="30"
				rows="1"
				value={reviewData.title}
				onChange={handleChange}
			></textarea>
			<label htmlFor="body">التعليق</label>
			<textarea
				name="body"
				id="body"
				cols="30"
				rows="10"
				value={reviewData.body}
				onChange={handleChange}
			></textarea>
			<div className="review-box--buttons">
				<button
					type="button"
					className="review-box--button secondary-button"
					onClick={() => props.setNewReview(false)}
				>
					إلغاء
				</button>
				<button type="submit" className="review-box--button main-button">
					نشر
				</button>
			</div>
		</form>
	)
}

export default NewReview
