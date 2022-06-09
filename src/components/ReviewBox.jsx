import React, { useContext, useState, useEffect } from "react"
import "../styles/ReviewBox.css"
import client_photo from "../images/placeholder_50px_50px.png"
import api from "../api/axios"
import CustomRating from "./CustomRating"
import AuthContext from "../context/AuthProvider"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"

function ReviewBox(props) {
	let reviewDate = new Date(props.review.createdAt)
	let editDate = new Date(props.review.updatedAt)
	let originalReview = {
		rating: props.review.rating,
		description: props.review.description
	}
	const { auth } = useContext(AuthContext)
	const [reviewer, setReviewer] = useState({})
	const [edit, setEdit] = useState(false)
	const [editData, setEditData] = useState(originalReview)

	function addZeroOnTheLeft(inputNumber) {
		let outputNumber = String(inputNumber)
		if (outputNumber.length === 1) {
			outputNumber = "0" + outputNumber
		}
		return outputNumber
	}
	useEffect(async () => {
		try {
			const response = await api.get(`/profile/${props.review.clientId}`)
			setReviewer(response.data.info)
		} catch (err) {
			console.error(err.message)
		}
	}, [])

	function handleChange(e) {
		const { name, value } = e.target
		setEditData((prevEditData) => ({ ...prevEditData, [name]: value }))
	}

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

	async function confirmEdit() {
		try {
			const response = await api.put(
				`/reviews/${props.review.reviewId}`,
				editData,
				{ headers: { Authorization: `Bearer ${auth.token}` } }
			)
			setEdit(false)
			props.setGetTrigger((prevGetTrigger) => !prevGetTrigger)
		} catch (err) {
			console.error(err)
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
				{auth && props.review.clientId === auth.id && !edit && (
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
			<div className="review-date">
				<span>
					الوقت:&nbsp;
					{addZeroOnTheLeft(reviewDate.getMinutes())} :&nbsp;
					{addZeroOnTheLeft(reviewDate.getHours())}
					&nbsp;&nbsp;&nbsp; التاريخ:&nbsp;
					{addZeroOnTheLeft(reviewDate.getDate())} /&nbsp;
					{addZeroOnTheLeft(reviewDate.getMonth() + 1)} /&nbsp;
					{String(reviewDate.getFullYear())}
				</span>
			</div>
			{props.review.createdAt !== props.review.updatedAt && (
				<div className="review-date" style={{ marginBlockStart: "-0.2rem" }}>
					<span>
						أخر تعديل&nbsp;-&nbsp; الوقت:&nbsp;
						{addZeroOnTheLeft(editDate.getMinutes())} :&nbsp;
						{addZeroOnTheLeft(editDate.getHours())}
						&nbsp;&nbsp;&nbsp; التاريخ:&nbsp;
						{addZeroOnTheLeft(editDate.getDate())} /&nbsp;
						{addZeroOnTheLeft(editDate.getMonth() + 1)} /&nbsp;
						{String(editDate.getFullYear())}
					</span>
				</div>
			)}
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
