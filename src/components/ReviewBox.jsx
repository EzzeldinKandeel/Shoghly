import React from "react"
import "../styles/ReviewBox.css"
import client_photo from "../images/placeholder_50px_50px.png"
import api from "../api/axios"
import { imageServerUrl } from './../api/imageServerApi';

function ReviewBox(props) {
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
	})

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
			</div>
			<div className="review-date">
				<span>
					الوقت:&nbsp;
					{props.review.date.minute} :&nbsp;
					{props.review.date.hour}
					&nbsp;&nbsp;&nbsp; التاريخ:&nbsp;
					{props.review.date.day} /&nbsp;
					{props.review.date.month} /&nbsp;
					{props.review.date.year}
				</span>
			</div>
			<div className="rating-and-title">
				<h6>{props.review.rating} / 5</h6>
				<h5>{props.review.head}</h5>
			</div>
			<div className="review-body">
				<p>{props.review.body}</p>
			</div>
		</div>
	)
}

export default ReviewBox
