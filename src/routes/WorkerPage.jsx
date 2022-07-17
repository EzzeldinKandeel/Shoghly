import React, { useContext, useState, useEffect } from "react"
import "../styles/WorkerDetails.css"
import avatar from "../images/avatar.png"
import ReviewBox from "../components/ReviewBox"
import { useParams } from "react-router-dom"
import api from "../api/axios"
import NewReview from "../components/NewReview"
import CustomRating from "../components/CustomRating"
import PhoneIcon from "@mui/icons-material/Phone"
import AuthContext from "../context/AuthProvider"
import ProjectPreview from "./../components/ProjectPreview"
import FavoriteToggle from "./../components/FavoriteToggle"
import ChatIcon from "@mui/icons-material/Chat"
import { HashLink as Link } from "react-router-hash-link"

function WorkerPage() {
	const { auth } = useContext(AuthContext)
	let params = useParams()

	const [getTrigger, setGetTrigger] = useState(true)
	const [worker, setWorker] = useState(null)
	const [reviews, setReviews] = useState([])
	const [projects, setProjects] = useState(null)
	const [newReview, setNewReview] = useState(false)
	const [currentUserHasReviewed, setCurrentUserHasReviewed] = useState(false)
	document.title = Boolean(worker)
		? `${worker.firstName} ${worker.lastName} - شغلي`
		: "شغلي"
	useEffect(async () => {
		try {
			const workerResponse = await api.get(`/workers/${params.workerId}`)
			setWorker(workerResponse.data.data)
			setReviews(
				workerResponse.data.data.reviews
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
	}, [getTrigger])
	useEffect(() => {
		if (auth) {
			setCurrentUserHasReviewed(
				worker?.reviews?.some((review) => review.client?.id === auth.id)
			)
		}
	}, [reviews])
	useEffect(async () => {
		if (auth) {
			try {
				const projectsResponse = await api.get(
					`/workers/${params.workerId}/projects`
				)
				setProjects(projectsResponse.data.data)
			} catch (err) {
				console.error(err)
			}
		}
	}, [])
	console.log(worker)

	return (
		worker && (
			<div className="worker-details">
				<div className="main-details">
					<div className="main-details--image">
						<img
							width="300"
							height="300"
							src={worker.picture || avatar}
							className="image-cover"
						/>
					</div>
					<div className="main-details--text">
						<h1 className="align-icon">
							{worker.firstName} {worker.lastName}
							{auth?.role === "client" && (
								<>
									<FavoriteToggle workerId={worker.id} />
									<Link
										className="jump-to-chat-btn"
										to={`/conversations/${worker.id}/#`}
									>
										<ChatIcon color="inheret" />
									</Link>
								</>
							)}
						</h1>
						<h4>{worker.profession}</h4>
						<h4>{worker.city}</h4>
						{worker.line && <h4>{worker.line}</h4>}
						<h4>
							<a
								style={{ display: "flex", alignItems: "center", gap: "5px" }}
								href={`tel:${worker.phone}`}
							>
								<PhoneIcon />
								{worker.phone}
							</a>
						</h4>
						<h4 className="align-icon" style={{ fontSize: "12px" }}>
							{worker.reviewsAverage ? (
								<>
									<CustomRating
										name="workerRating"
										value={parseInt(Math.round(worker.reviewsAverage))}
										readOnly
									/>
									<span
										style={{ color: "gray" }}
									>{`(${worker.reviewsCount})`}</span>
								</>
							) : (
								"لا يوجد تقييم"
							)}
						</h4>
					</div>
				</div>
				{Boolean(projects?.length) && (
					<div className="projects">
						<h2>المعرض</h2>
						<div className="project-cards">
							{projects
								.filter((project) => project.pictures[0] !== null)
								.map((project) => (
									<ProjectPreview project={project} key={project.id} />
								))}
						</div>
					</div>
				)}

				<div className="reviews">
					<h2>التعليقات</h2>
					{auth &&
						auth.role === "client" &&
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
					{Boolean(reviews.length) && (
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
