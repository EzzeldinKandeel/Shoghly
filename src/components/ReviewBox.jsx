import React from "react"
import "../styles/ReviewBox.css"
import client_photo from "../images/placeholder_50px_50px.png"
import api from "../api/axios"
import CustomRating from "./CustomRating"
import AuthContext from "../context/AuthProvider"
import DeleteIcon from '@mui/icons-material/Delete';

function ReviewBox(props) {
	const { auth } = React.useContext(AuthContext)
	const [reviewer, setReviewer] = React.useState({})
	React.useEffect(async () => {
		try {
			const response = await api.get(`/profile/${props.review.clientId}`)
			setReviewer(response.data.info)
		} catch (err) {
			console.error(err.message)
		}
	}, [])

	let reviewDate = new Date(props.review.createdAt)
	async function deleteReview() {
		try {
			const response = await api.delete(`/reviews/${props.review.reviewId}`, {
				headers: { Authorization: `Bearer ${auth.token}` }
			})
			props.setGetTrigger((prevGetTrigger) => !prevGetTrigger)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="review-box">
			<div className="client-info">
				<img
					width="50"
					height="50"
					src={reviewer.picture || client_photo}
					alt="Picture of the client who wrote the review"
				/>
				<h5>
					{reviewer.firstName} {reviewer.lastName}
				</h5>
				{auth && props.review.clientId === auth.id && (
					<button className="delete-review-button" onClick={deleteReview}>
						<DeleteIcon />
					</button>
				)}
			</div>
			<div className="review-date">
				<span>
					الوقت:&nbsp;
					{reviewDate.getMinutes()} :&nbsp;
					{reviewDate.getHours()}
					&nbsp;&nbsp;&nbsp; التاريخ:&nbsp;
					{reviewDate.getDate()} /&nbsp;
					{reviewDate.getMonth() + 1} /&nbsp;
					{reviewDate.getFullYear()}
				</span>
			</div>
			<div className="rating-and-title">
				<CustomRating
					name="reviewRating"
					value={parseInt(props.review.rating)}
					readOnly
				/>
			</div>
			<div className="review-body">
				<p>{props.review.description}</p>
			</div>
		</div>
	)
}

export default ReviewBox
