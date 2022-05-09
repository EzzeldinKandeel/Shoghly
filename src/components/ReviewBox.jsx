import React from "react"
import "../styles/ReviewBox.css"
import client_photo from "../images/placeholder_50px_50px.png"
import api from "../api/axios"
import { imageServerUrl } from "./../api/imageServerApi"
import CustomRating from "./CustomRating"
import UserContext from "../context/UserProvider"

function ReviewBox(props) {
	const { user } = React.useContext(UserContext)
	const [reviewer, setReviewer] = React.useState({})
	React.useEffect(async () => {
		try {
			const response = await api.get("/users", {
				params: {
					id: props.review.clientId
				}
			})
			setReviewer(response.data[0])
		} catch (err) {
			console.error(err.message)
		}
	}, [])

	let reviewDate = new Date(props.review.dateTime)

	return (
		<div className="review-box">
			<div className="client-info">
				<img
					width="50"
					height="50"
					src={
						reviewer.profilePictureUrl
							? `${imageServerUrl}/${reviewer.profilePictureUrl}`
							: client_photo
					}
					alt="Picture of the client who wrote the review"
				/>
				<h5>
					{reviewer.firstName} {reviewer.lastName}
				</h5>
				{user && props.review.clientId === user.id && (
					<button className="delete-review-button" onClick={props.deleteReview}>
						حذف التعليق
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
				<h5>{props.review.title}</h5>
			</div>
			<div className="review-body">
				<p>{props.review.body}</p>
			</div>
		</div>
	)
}

export default ReviewBox
