import React, { useContext, useState, useEffect } from "react"
import "../styles/WorkerDetails.css"
import workerPic from "../images/placeholder_300px_300px.png"
import ReviewBox from "../components/ReviewBox"
import { useParams } from "react-router-dom"
import api from "../api/axios"
import NewReview from "../components/NewReview"
import CustomRating from "../components/CustomRating"
import PhoneIcon from "@mui/icons-material/Phone"
import AuthContext from "../context/AuthProvider"

function WorkerPage() {
	const { auth } = useContext(AuthContext)
	let params = useParams()

	const [getTrigger, setGetTrigger] = useState(true)
	const [worker, setWorker] = useState(null)
	const [reviews, setReviews] = useState(null)
	const [newReview, setNewReview] = useState(false)
	const [currentUserHasReviewed, setCurrentUserHasReviewed] = useState(false)
	useEffect(async () => {
		try {
			const workerResponse = await api.get(`/profile/${params.workerId}`)
			setWorker({ ...workerResponse.data.info, id: params.workerId })
			if (auth) {
				const reviewsResponse = await api.get(
					`/workers/${params.workerId}/reviews`,
					{ headers: { Authorization: `Bearer ${auth.token}` } }
				)
				console.log(reviewsResponse.data)
				setReviews(reviewsResponse.data.reviews)
			}
			console.log(workerResponse.data)
		} catch (err) {
			console.error(err.message)
		}
	}, [getTrigger])

	useEffect(() => {
		setCurrentUserHasReviewed(
			reviews?.some((review) => review.clientId === auth.id)
		)
	}, [reviews])
	console.log(worker)
	return (
		worker && (
			<div className="worker-details">
				<div className="main-details">
					<div className="main-details--image">
						<img
							width="300"
							height="300"
							src={worker.picture || workerPic}
							alt="Picture of The Worker"
						/>
					</div>
					<div className="main-details--text">
						<h1>
							{worker.firstName} {worker.lastName}
						</h1>
						<h4>{worker.profession}</h4>
						<h4>{worker.city}</h4>
						{worker.line && <h4>{worker.line}</h4>}
						<h4 style={{ display: "flex", alignItems: "center", gap: "5px" }}>
							<PhoneIcon />
							{worker.phone}
						</h4>
						<h4 style={{ fontSize: "12px" }}>
							{worker.rating ? (
								<CustomRating
									name="workerRating"
									value={parseInt(worker.rating)}
									readOnly
								/>
							) : (
								"لا يوجد تقييم"
							)}
						</h4>
					</div>
				</div>
				{/* <div className='bio'>
				{worker.bio}
			</div> */}
				{/* {Boolean(worker.projects.length) && (
					<div className="projects">
						<h2>المعرض</h2>
						<div className="photos">
							{worker.projects.map((project) => (
								<img src={`${imageServerUrl}/${project}`} height="200px" />
							))}
						</div>
					</div>
				)} */}

				<div className="reviews">
					<h2>التعليقات</h2>
					{auth &&
						auth.id != worker.id &&
						!currentUserHasReviewed &&
						(newReview ? (
							<div style={{ marginBottom: "1rem" }}>
								<NewReview
									setNewReview={setNewReview}
									setGetTrigger={setGetTrigger}
									worker={worker}
								/>
							</div>
						) : (
							<button
								className="main-button"
								style={{ width: "150px", marginBottom: "1rem" }}
								onClick={() => setNewReview(true)}
							>
								أضف تعليق
							</button>
						))}
					{Boolean(reviews?.length) && (
						<div className="review-boxes">
							{reviews.map((review) => (
								<ReviewBox
									key={review.reviewId}
									setGetTrigger={setGetTrigger}
									review={review}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		)
	)
}

export default WorkerPage
