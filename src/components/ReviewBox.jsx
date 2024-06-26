import React, { useContext, useState } from "react"
import "../styles/ReviewBox.css"
import api from "../api/axios"
import CustomRating from "./CustomRating"
import AuthContext from "../context/AuthProvider"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import avatar from "../images/avatar.png"
import DateView from "./DateView"
import ErrorBackdrop from "./ErrorBackdrop"

function ReviewBox(props) {
	let originalReview = {
		rating: props.review.rating,
		description: props.review.description
	}
	const { auth } = useContext(AuthContext)
	const [edit, setEdit] = useState(false)
	const [editData, setEditData] = useState(originalReview)
	const [error, setError] = useState(false)

	function handleChange(e) {
		const { name, value } = e.target
		setEditData((prevEditData) => ({ ...prevEditData, [name]: value }))
	}

	async function deleteReview() {
		try {
			const response = await api.delete(
				`/workers/reviews/${props.review.reviewId}`,
				{
					headers: { Authorization: `Bearer ${auth.token}` }
				}
			)
			props.setGetTrigger((prevGetTrigger) => !prevGetTrigger)
		} catch (error) {
			setError(true)
		}
	}

	async function confirmEdit() {
		try {
			const response = await api.put(
				`/workers/reviews/${props.review.reviewId}`,
				editData,
				{ headers: { Authorization: `Bearer ${auth.token}` } }
			)
			setEdit(false)
			props.setGetTrigger((prevGetTrigger) => !prevGetTrigger)
		} catch (err) {
			setError(true)
		}
	}

	return (
		<div className="review-box">
			<ErrorBackdrop open={error} close={() => setError(false)} />
			<div className="client-info">
				<img
					width="50"
					height="50"
					src={props.review.client.picture || avatar}
					className="image-cover"
				/>
				<h5>
					{props.review.client.firstName} {props.review.client.lastName}
				</h5>
				{auth && props.review.client.id === auth.id && !edit && (
					<>
						<button
							className="delete-review-button"
							onClick={() => {
								setEdit(true)
							}}
							style={{ marginInlineStart: "auto" }}
						>
							<EditIcon />
						</button>
						<button
							className="delete-review-button"
							onClick={deleteReview}
							style={{ marginInlineStart: "-1rem" }}
						>
							<DeleteIcon />
						</button>
					</>
				)}
			</div>
			<DateView
				dateCreated={props.review.createdAt}
				dateUpdated={props.review.updatedAt}
			/>
			<div className="rating-and-title">
				{edit ? (
					<CustomRating
						name="rating"
						value={parseInt(editData.rating)}
						onChange={handleChange}
					/>
				) : (
					<CustomRating
						name="reviewRating"
						value={parseInt(props.review.rating)}
						readOnly
					/>
				)}
			</div>
			<div className="review-body">
				{edit ? (
					<textarea
						name="description"
						style={{ width: "100%" }}
						cols="30"
						rows="10"
						value={editData.description}
						onChange={handleChange}
					></textarea>
				) : (
					<p>{props.review.description}</p>
				)}
			</div>
			{edit && (
				<div className="review-box--buttons">
					<button
						className="review-box--button secondary-button"
						onClick={() => {
							setEdit(false)
							setEditData(originalReview)
						}}
					>
						إلغاء
					</button>
					<button
						className="review-box--button main-button"
						onClick={confirmEdit}
					>
						تعديل
					</button>
				</div>
			)}
		</div>
	)
}

export default ReviewBox
