import React from "react"
import api from "../api/axios"
import "../styles/NewReview.css"
import CustomRating from "./CustomRating"
import AuthContext from "../context/AuthProvider"
import ErrorBackdrop from "./ErrorBackdrop"

function NewReview(props) {
	const { auth } = React.useContext(AuthContext)
	const [reviewData, setReviewData] = React.useState({
		rating: 1,
		description: ""
	})
	const [error, setError] = useState(false)

	function handleChange(e) {
		const { name, value } = e.target
		setReviewData((prevReviewData) => ({
			...prevReviewData,
			[name]: value
		}))
	}

	async function handleSubmit(e) {
		e.preventDefault()
		try {
			const response = await api.post(
				`/workers/${props.worker.id}/reviews`,
				reviewData,
				{ headers: { Authorization: `Bearer ${auth.token}` } }
			)
			props.setGetTrigger((prevGetTrigger) => !prevGetTrigger)
			props.setNewReview(false)
		} catch (err) {
			setError(true)
		}
	}

	return (
		<form className="review-box" onSubmit={handleSubmit}>
			<ErrorBackdrop open={error} close={() => setError(false)} />
			<div className="rating">
				<label htmlFor="rating">التقييم</label>
				<CustomRating
					name="rating"
					value={parseInt(reviewData.rating)}
					onChange={handleChange}
				/>
			</div>
			<textarea
				name="description"
				cols="30"
				rows="10"
				value={reviewData.description}
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
